from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine, SessionLocal
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt



models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AbanckOS")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users", response_model=schemas.UserOut, status_code=201)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(400, "Username already exists")
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(400, "Email already exists")
    hashed = hash_password(user.password)
    return crud.create_user(db, user.username, user.email, hashed)

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid token")
    try:
         # DECODIFICA EL TOKEN
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    return user


@app.get("/me")
def read_me(current_user = Depends(get_current_user)):
    return {"username": current_user.username, "email": current_user.email}


