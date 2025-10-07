from datetime import datetime, timedelta
from jose import jwt, JWTError

SECRET_KEY = "a4d9e56c0a8f9b3c7f61d48e2b7c91b8f4c39a0d72e58a6c1e02b7f3a6d0b9c7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
