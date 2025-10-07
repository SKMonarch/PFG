from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.core.security import get_current_user
from app.crud.crypto_crud import get_crypto_by_symbol, update_or_create_user_crypto
from app.crud.transaction_crud import create_transaction
from app.models.crypto import Crypto
from app.services.crypto_service import get_crypto_price

router = APIRouter()

@router.get("/prices")
def get_prices(db: Session = Depends(get_db)):
    cryptos = db.query(Crypto).all()
    result = []
    for c in cryptos:
        price = get_crypto_price(c.symbol)
        c.price_usd = price
        db.commit()
        result.append({"symbol": c.symbol, "price_usd": price})
    return result

@router.post("/buy")
def buy_crypto(symbol: str, amount: float, db: Session = Depends(get_db), user=Depends(get_current_user)):
    crypto = get_crypto_by_symbol(db, symbol)
    if not crypto:
        raise HTTPException(404, "Criptomoneda no encontrada")
    total = crypto.price_usd * amount
    if user.balance < total:
        raise HTTPException(400, "Fondos insuficientes")

    user.balance -= total
    update_or_create_user_crypto(db, user.id, crypto.id, amount)
    create_transaction(db, user.id, None, total, "compra_crypto", f"Compra de {amount} {symbol}")
    db.commit()
    return {"message": "Compra realizada", "balance": user.balance}

@router.post("/sell")
def sell_crypto(symbol: str, amount: float, db: Session = Depends(get_db), user=Depends(get_current_user)):
    crypto = get_crypto_by_symbol(db, symbol)
    if not crypto:
        raise HTTPException(404, "Criptomoneda no encontrada")
    user_crypto = db.query(Crypto).filter_by(id=crypto.id).first()
    if not user_crypto or user_crypto.amount < amount:
        raise HTTPException(400, "No tienes suficientes criptos")
    total = crypto.price_usd * amount

    user_crypto.amount -= amount
    user.balance += total
    create_transaction(db, None, user.id, total, "venta_crypto", f"Venta de {amount} {symbol}")
    db.commit()
    return {"message": "Venta realizada", "balance": user.balance}
