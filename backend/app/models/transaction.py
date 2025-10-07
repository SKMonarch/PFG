from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from datetime import datetime
from app.database.base import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    amount = Column(Float, nullable=False)
    # Multiples opcciones en la transaccion.
    type = Column(String, nullable=False) 
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
