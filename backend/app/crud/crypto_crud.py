from sqlalchemy.orm import Session
from app.models.crypto import Crypto, UserCrypto

def get_crypto_by_symbol(db: Session, symbol: str):
    return db.query(Crypto).filter(Crypto.symbol == symbol).first()

def update_or_create_user_crypto(db: Session, user_id: int, crypto_id: int, amount: float):
    user_crypto = db.query(UserCrypto).filter_by(user_id=user_id, crypto_id=crypto_id).first()
    if user_crypto:
        user_crypto.amount += amount
    else:
        user_crypto = UserCrypto(user_id=user_id, crypto_id=crypto_id, amount=amount)
        db.add(user_crypto)
    db.commit()
    db.refresh(user_crypto)
    return user_crypto
