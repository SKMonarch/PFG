from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class Crypto(Base):
    __tablename__ = "cryptos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    symbol = Column(String, unique=True, nullable=False)
    price_usd = Column(Float, nullable=False, default=0.0)

class UserCrypto(Base):
    __tablename__ = "user_cryptos"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    crypto_id = Column(Integer, ForeignKey("cryptos.id"))
    amount = Column(Float, default=0.0)