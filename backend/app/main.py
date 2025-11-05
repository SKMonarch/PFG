from fastapi import FastAPI
from app.database.base import Base
from app.database.session import engine
from app.routes import auth_routes, user_routes, crypto_routes, transaction_routes
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(title="AbanckOS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(crypto_routes.router, prefix="/crypto", tags=["Crypto"])
app.include_router(transaction_routes.router, prefix="/transactions", tags=["Transactions"])
