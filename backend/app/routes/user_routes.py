from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut
from app.crud.user_crud import create_user, get_user_by_username, get_user_by_email
from app.core.hashing import hash_password
from app.database.session import get_db
from app.core.security import get_current_user

router = APIRouter()

@router.post("/", response_model=UserOut, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_username(db, user.username):
        raise HTTPException(400, "El nombre de usuario ya existe")
    if get_user_by_email(db, user.email):
        raise HTTPException(400, "El email ya está registrado")
    hashed = hash_password(user.password)
    return create_user(db, user.username, user.email, hashed)

@router.get("/me")
def get_profile(current_user=Depends(get_current_user)):
    return {"username": current_user.username, "email": current_user.email}
