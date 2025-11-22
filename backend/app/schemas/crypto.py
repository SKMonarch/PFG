from pydantic import BaseModel

class CryptoBase(BaseModel):
    name: str
    symbol: str
    price_usd: float

class CryptoOut(CryptoBase):
    id: int
    class Config:
        from_attributes = True
