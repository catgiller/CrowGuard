from fastapi import APIRouter
from models.product import ReviewInput, ProductAnalysisRequest, ProductAnalysisResponse
from services.gemini_service import analyze_review
from services.product_service import analyze_product_details

router = APIRouter()

@router.post("/analyze-review")
def analyze(data: ReviewInput):
    return analyze_review(data.review)

@router.post("/analyze-product", response_model=ProductAnalysisResponse)
def analyze_product(data: ProductAnalysisRequest):
    return analyze_product_details(data.url)
