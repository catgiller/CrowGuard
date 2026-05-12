from fastapi import FastAPI
from models.product import ReviewInput, ProductAnalysisRequest, ProductAnalysisResponse

from services.gemini_service import analyze_review
from services.product_service import analyze_product_details

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Frontend'in erişimine izin ver
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze-review")
def analyze(data: ReviewInput):
    return analyze_review(data.review)

@app.post("/analyze-product", response_model=ProductAnalysisResponse)
def analyze_product(data: ProductAnalysisRequest):
    return analyze_product_details(data.url)