from pydantic import BaseModel
from datetime import datetime

class TransactionOut(BaseModel):
    id: int
    sender_id: int | None
    receiver_id: int | None
    amount: float
    type: str
    description: str | None
    timestamp: datetime

    class Config:
        from_attributes = True
