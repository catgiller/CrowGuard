from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import db_models
from models.product import ReviewInput, ProductAnalysisRequest, ProductAnalysisResponse
from services.gemini_service import analyze_review
from services.product_service import analyze_product_details
import json

router = APIRouter()

@router.post("/analyze-review")
def analyze(data: ReviewInput, db: Session = Depends(get_db)):
    result = analyze_review(data.review)
    
    # Veritabanına kaydet (Şimdilik user_id=1 veriyoruz, auth ekleyince düzelteceğiz)
    new_result = db_models.AnalysisResult(
        user_id=1, 
        type="review",
        input_data=data.review,
        result_data=result
    )
    db.add(new_result)
    db.commit()
    
    return result

@router.post("/analyze-product", response_model=ProductAnalysisResponse)
def analyze_product(data: ProductAnalysisRequest, db: Session = Depends(get_db)):
    # 1. ÖNCE VERİTABANINA BAK (CACHE)
    existing_analysis = db.query(db_models.AnalysisResult).filter(
        db_models.AnalysisResult.input_data == data.url,
        db_models.AnalysisResult.type == "product"
    ).order_by(db_models.AnalysisResult.created_at.desc()).first()

    # Eğer son 24 saat içinde yapılmış bir analiz varsa onu döndür
    if existing_analysis:
        return existing_analysis.result_data

    # 2. YOKSA GEMINI'YE SOR
    try:
        result = analyze_product_details(data.url)
        
        # 3. YENİ SONUCU KAYDET
        new_result = db_models.AnalysisResult(
            user_id=1,
            type="product",
            input_data=data.url,
            result_data=result.dict()
        )
        db.add(new_result)
        db.commit()
        
        return result
    except Exception as e:
        print(f"KRİTİK HATA (Product Analysis): {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Sunucu Hatası: {str(e)}")
