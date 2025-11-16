from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.session import engine, SessionLocal  
from app.routes import auth_routes, user_routes, crypto_routes, transaction_routes, mortgage_routes
from app.routes.crypto_routes import update_crypto_prices

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AbanckOS")

# Evento de arranque para cargar criptos automáticamente
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        update_crypto_prices(db)
        print(" Criptomonedas cargadas al iniciar backend")
    except Exception as e:
        print(" Error cargando criptos al iniciar:", e)
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(crypto_routes.router, prefix="/crypto", tags=["Crypto"])
app.include_router(transaction_routes.router, prefix="/transactions", tags=["Transactions"])
app.include_router(mortgage_routes.router, prefix="/mortgage", tags=["Mortgage"])
