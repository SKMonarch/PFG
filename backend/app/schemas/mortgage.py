from pydantic import BaseModel
from typing import List, Optional

class MortgageRequest(BaseModel):
    amount: float
    years: int
    interest_rate: float  
    type: str  # "fija" o "variable"

class AmortizationRow(BaseModel):
    month: int
    payment: float
    principal: float
    interest: float
    balance: float

class MortgageResponse(BaseModel):
    monthly_payment: float
    total_paid: float
    total_interest: float
    amortization: Optional[List[AmortizationRow]] = None
