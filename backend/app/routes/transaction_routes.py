from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.core.security import get_current_user
from app.crud.transaction_crud import get_user_transactions

router = APIRouter()

@router.get("/history")
def transaction_history(db: Session = Depends(get_db), user=Depends(get_current_user)):
    transactions = get_user_transactions(db, user.id)
    return transactions
