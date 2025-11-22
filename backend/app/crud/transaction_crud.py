from sqlalchemy.orm import Session
from app.models.transaction import Transaction

def create_transaction(db: Session, sender_id, receiver_id, amount, type, description):
    tx = Transaction(
        sender_id=sender_id,
        receiver_id=receiver_id,
        amount=amount,
        type=type,
        description=description
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

def get_user_transactions(db: Session, user_id: int):
    return db.query(Transaction).filter(
        (Transaction.sender_id == user_id) | (Transaction.receiver_id == user_id)
    ).order_by(Transaction.timestamp.desc()).all()
