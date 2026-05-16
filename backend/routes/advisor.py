from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from models.advisor import AdvisorRequest, AdvisorResponse
from agents.advisor_agent import run_advisor_agent

router = APIRouter()

@router.post("/smart-advisor", response_model=AdvisorResponse)
def get_advice(data: AdvisorRequest, db: Session = Depends(get_db)):
    # Önce cache kontrolü
    existing_advice = db.query(db_models.AnalysisResult).filter(
        db_models.AnalysisResult.input_data == data.query,
        db_models.AnalysisResult.type == "advisor"
    ).order_by(db_models.AnalysisResult.created_at.desc()).first()

    if existing_advice:
        return existing_advice.result_data

    try:
        result = run_advisor_agent(data.query)
        
        # Veritabanına kaydet
        new_result = db_models.AnalysisResult(
            user_id=None,
            type="advisor",
            input_data=data.query,
            result_data=result
        )
        db.add(new_result)
        db.commit()
        
        return result
    except Exception as e:
        raise HTTPException(status_code=503, detail="Asistan şu an çok yoğun, lütfen biraz sonra tekrar deneyin.")
