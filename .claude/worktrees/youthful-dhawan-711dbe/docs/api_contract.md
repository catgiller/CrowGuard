# API Contract (Frontend <-> Backend)

This document defines the API endpoints the Next.js frontend expects from the Python FastAPI backend.
All endpoints assume an `application/json` content type.
Base URL: `/api/v1` (Frontend will proxy to backend).

---

## 1. Price Hunter (Analyze URL)
**Endpoint:** `POST /agents/price-hunter`
**Description:** Analyzes a given product URL, checks prices across sources, and returns recommendations.

**Request:**
```json
{
  "url": "https://example.com/product/123",
  "product_name": null 
}
```
*(Note: Either `url` or `product_name` can be provided).*

**Response:**
```json
{
  "product": {
    "id": "prod_123",
    "name": "Sony WH-1000XM5",
    "current_price": 8500,
    "currency": "TRY",
    "image_url": "https://example.com/image.jpg"
  },
  "recommendation": {
    "action": "WAIT", // BUY | WAIT | ALTERNATIVE
    "reasoning": "Price is historically high. Expected to drop by 500₺ in 14 days.",
    "wait_details": {
      "expected_drop_amount": 500,
      "expected_days": 14
    }
  },
  "price_history": [
    { "date": "2026-04-01", "price": 9000 },
    { "date": "2026-04-15", "price": 8500 },
    { "date": "2026-05-01", "price": 8800 }
  ],
  "fake_review_score": 85, // 0-100 (100 = 100% genuine)
  "return_risk_score": 15 // 0-100 (percentage chance of return)
}
```

---

## 2. Smart Cart Advisor (Agentic Search)
**Endpoint:** `POST /agents/smart-advisor`
**Description:** Takes intent and budget, returning a list of recommended products.

**Request:**
```json
{
  "intent": "gift for wedding",
  "budget_max": 1500,
  "currency": "TRY",
  "preferences": ["kitchen", "electronic"]
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "product_id": "prod_456",
      "name": "Philips Airfryer XXL",
      "price": 1450,
      "currency": "TRY",
      "match_score": 92,
      "reasoning": "Fits the budget perfectly and is a highly desired wedding gift.",
      "fake_review_score": 90,
      "return_risk_score": 5,
      "image_url": "https://..."
    }
  ]
}
```

---

## 3. Alternative Products (For "Alternative" Stamp)
**Endpoint:** `GET /products/{id}/alternatives`
**Description:** Fetches alternative products for a given product ID.

**Response:**
```json
{
  "alternatives": [
    {
      "product_id": "prod_789",
      "name": "Bose QuietComfort 45",
      "price": 7500,
      "currency": "TRY",
      "reasoning": "Similar ANC performance for 1000₺ less.",
      "image_url": "https://..."
    }
  ]
}
```
