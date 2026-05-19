import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from models.advisor import AdvisorRequest, AdvisorResponse
from agents.advisor_agent import run_advisor_agent
from auth.dependencies import get_current_user_optional

router = APIRouter()

_CACHE_TTL_HOURS = 24


@router.post("/smart-advisor", response_model=AdvisorResponse)
async def get_advice(
    data: AdvisorRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):
    cutoff = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=_CACHE_TTL_HOURS)
    existing_advice = (
        db.query(db_models.AnalysisResult)
        .filter(
            db_models.AnalysisResult.input_data == data.query,
            db_models.AnalysisResult.type == "advisor",
            db_models.AnalysisResult.created_at >= cutoff,
        )
        .order_by(db_models.AnalysisResult.created_at.desc())
        .first()
    )

    if existing_advice:
        return existing_advice.result_data

    try:
        result = await run_advisor_agent(data.query)

        new_result = db_models.AnalysisResult(
            user_id=current_user.id if current_user else None,
            type="advisor",
            input_data=data.query,
            result_data=result,
            expires_at=datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=_CACHE_TTL_HOURS),
        )
        db.add(new_result)
        db.commit()

        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=503, detail="Asistan şu an çok yoğun, lütfen biraz sonra tekrar deneyin.")
