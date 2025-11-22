from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.mortgage import MortgageRequest, MortgageResponse, AmortizationRow
from app.database.session import get_db
from typing import List
import math

router = APIRouter()

@router.post("/calculate", response_model=MortgageResponse)
def calculate_mortgage(payload: MortgageRequest, db: Session = Depends(get_db)):
    P = payload.amount
    n_years = payload.years
    r_annual_pct = payload.interest_rate
    mortgage_type = payload.type.lower()

    if P <= 0 or n_years <= 0 or r_annual_pct < 0:
        raise HTTPException(status_code=400, detail="Parámetros inválidos")

    # Convertir a tasas mensuales
    r_month = (r_annual_pct / 100) / 12
    n_months = n_years * 12

    # Hipoteca fija (cuota constante)
    if mortgage_type == "fija":
        if r_month == 0:
            monthly = P / n_months
        else:
            monthly = P * (r_month * (1 + r_month) ** n_months) / ((1 + r_month) ** n_months - 1)

        amort = []
        balance = P
        for m in range(1, n_months + 1):
            interest = balance * r_month
            principal = monthly - interest
            balance = max(0.0, balance - principal)
            amort.append(AmortizationRow(
                month=m,
                payment=round(monthly, 2),
                principal=round(principal, 2),
                interest=round(interest, 2),
                balance=round(balance, 2)
            ))

        total_paid = monthly * n_months
        total_interest = total_paid - P

        return MortgageResponse(
            monthly_payment=round(monthly, 2),
            total_paid=round(total_paid, 2),
            total_interest=round(total_interest, 2),
            amortization=amort
        )

   
