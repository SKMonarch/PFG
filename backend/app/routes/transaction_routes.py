from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.core.security import get_current_user
from app.crud.transaction_crud import get_user_transactions, create_transaction


router = APIRouter()

@router.get("/history")
def transaction_history(db: Session = Depends(get_db), user=Depends(get_current_user)):
    transactions = get_user_transactions(db, user.id)
    return transactions


@router.post("/transfer")
def transfer(receiver_username: str, amount: float, db: Session = Depends(get_db), user=Depends(get_current_user)):
    from app.crud.user_crud import get_user_by_username

    receiver = get_user_by_username(db, receiver_username)
    if not receiver:
        raise HTTPException(404, "Receptor no encontrado")
    if user.balance < amount:
        raise HTTPException(400, "Fondos insuficientes")

    user.balance -= amount
    receiver.balance += amount


    create_transaction(db, user.id, receiver.id, amount, "transfer", f"Transferencia a {receiver_username}")
    db.commit()
    return {"message": "Transferencia completada", "balance": user.balance}
