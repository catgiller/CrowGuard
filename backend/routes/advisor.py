from fastapi import APIRouter
from models.advisor import AdvisorRequest, AdvisorResponse
from agents.advisor_agent import run_advisor_agent

router = APIRouter()

@router.post("/smart-advisor", response_model=AdvisorResponse)
def get_advice(data: AdvisorRequest):
    result = run_advisor_agent(data.query)
    return result
