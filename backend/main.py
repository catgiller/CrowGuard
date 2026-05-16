from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analysis, advisor, auth
from database import engine, Base
from dotenv import load_dotenv
import os

# .env dosyasını yükle
load_dotenv()

# Veritabanı tablolarını oluştur
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CrowGuard AI Backend")


# CORS Ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotaları Dahil Et
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(analysis.router, tags=["Analysis"])
app.include_router(advisor.router, tags=["Advisor"])


@app.get("/")
def home():
    return {"status": "CrowGuard AI Backend is running"}