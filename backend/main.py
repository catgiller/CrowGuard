from fastapi import FastAPI

app = FastAPI()

class Review(BaseModel):
    review : str
@app.post("/analyze-review")
def analyze_review(review : Review):
    
    