from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from models.product import ReviewInput, ProductAnalysisRequest, ProductAnalysisResponse
from services.gemini_service import analyze_review
from services.product_service import analyze_product_details
from services.cache_service import make_cache_key, get_cached, set_cache_background
from auth.dependencies import get_current_user_optional

router = APIRouter()


@router.post("/analyze-review")
def analyze(
    data: ReviewInput,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):
    result = analyze_review(data.review)

    new_result = db_models.AnalysisResult(
        user_id=current_user.id if current_user else None,
        type="review",
        input_data=data.review,
        cache_key=None,
        result_data=result,
    )
    db.add(new_result)
    db.commit()
    return result


@router.post("/analyze-product", response_model=ProductAnalysisResponse)
async def analyze_product(
    data: ProductAnalysisRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):
    url = data.url.strip()
    cache_key = make_cache_key(url)

    # 1. Cache kontrolü
    cached = get_cached(db, cache_key)
    if cached:
        return cached

    # 2. Scrape + AI analiz
    try:
        result = await analyze_product_details(url, db)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analiz hatası: {str(e)}")

    result_dict = result.model_dump()

    # 3. Cache'e yaz (background'da — kullanıcıyı beklettirme)
    background_tasks.add_task(
        set_cache_background,
        url=url,
        cache_key=cache_key,
        result_data=result_dict,
        user_id=current_user.id if current_user else None,
    )

    return result


@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional),
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Giriş yapmanız gerekiyor")

    analyses = (
        db.query(db_models.AnalysisResult)
        .filter(
            db_models.AnalysisResult.user_id == current_user.id,
            db_models.AnalysisResult.type == "product",
        )
        .order_by(db_models.AnalysisResult.created_at.desc())
        .limit(20)
        .all()
    )

    return [
        {
            "id": a.id,
            "url": a.input_data,
            "product_name": a.result_data.get("product_name") if a.result_data else None,
            "store_name": a.result_data.get("store_name") if a.result_data else None,
            "created_at": a.created_at.isoformat() if a.created_at else None,
        }
        for a in analyses
    ]
