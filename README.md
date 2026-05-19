<div align="center">

<img src="frontend/public/logo.png" alt="CrowGuard" width="140" />

# CrowGuard

### Türkiye için akıllı alışveriş ve ürün analiz platformu

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

**Bir ürün linki yapıştırın, CrowGuard fiyatını, yorumlarını, iade riskini ve _"şimdi al / bekle"_ tavsiyesini saniyeler içinde sunsun.**

[🌐 Canlı Demo](https://pitoresk.tech) · [📘 API Dokümantasyonu](https://pitoresk.onrender.com/docs) · [🐛 Hata Bildir](https://github.com/catgiller/CrowGuard/issues)

</div>

---

## İçindekiler

- [Hakkında](#hakkında)
- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Mimari](#mimari)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Canlı Servisler](#canlı-servisler)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [API Uçları](#api-uçları)
- [Proje Yapısı](#proje-yapısı)
- [Ekip](#ekip)
- [Teşekkürler](#teşekkürler)
- [Lisans](#lisans)

---

## Hakkında

**CrowGuard**, tüketicilerin alışveriş kararlarını veriye dayalı verebilmesi için tasarlanmış bir akıllı alışveriş asistanıdır. Kullanıcı bir ürün linki yapıştırır; platform ürünün fiyat geçmişini, kullanıcı yorumlarını, iade riskini ve mağazalar arası fiyat farklarını analiz ederek net bir tavsiye üretir.

> _"Bu ürünü **şimdi mi almalıyım**, **biraz beklemeli miyim**, yoksa **daha iyi bir alternatif** var mı?"_

CrowGuard bu tek soruya cevap vermek için kuruldu.

Proje **BTK Akademi Hackathon 2026** kapsamında geliştirildi.

---

## Öne Çıkan Özellikler

| Özellik | Açıklama |
|---|---|
| 🔗 **URL ile Analiz** | Ürün linkini yapıştırın, fiyat–yorum–iade riski raporunu anında alın. |
| 📊 **Mağaza Karşılaştırma** | Aynı ürünün farklı mağazalardaki fiyatını ve puanını yan yana görün. |
| 🧠 **Akıllı Asistan** | "1500₺ altı düğün hediyesi" gibi doğal dil sorgularıyla ürün önerisi alın. |
| 📈 **Fiyat Tavsiyesi** | _AL / BEKLE / ALTERNATİF_ sinyali ve fiyat trend grafiği. |
| 🛡️ **İade Riski Skoru** | Ürün özelliklerinden ve yorumlardan hesaplanan iade olasılığı. |
| 📜 **Analiz Geçmişi** | Kullanıcı son 20 analizini kayıt altında görür, dilediğinde siler. |
| 🔐 **Güvenli Hesap Yönetimi** | JWT tabanlı kimlik doğrulama, şifre sıfırlama, e-posta ile bağlantı. |
| ⚡ **Akıllı Cache** | Tekrar eden sorgular hızlandırılır, AI maliyeti optimize edilir. |
| 🎨 **Modern Tasarım** | Koyu/açık tema, mobil-uyumlu arayüz, erişilebilirlik öncelikli. |

---

## Ekran Görüntüleri

### Ana Sayfa
![Ana Sayfa](docs/screenshots/01-landing.png)

### Ürün Analizi
![Ürün Analizi](docs/screenshots/02-product-analysis.png)

### Akıllı Asistan
![Akıllı Asistan](docs/screenshots/03-smart-advisor.png)

---

## Mimari

```
┌────────────────────────────┐         ┌──────────────────────────────┐
│   Next.js 16 (App Router)  │  HTTPS  │      FastAPI Backend         │
│   React 19 · Tailwind v4   │ ──────▶ │   REST API · JWT Auth        │
│   TypeScript 5             │ ◀────── │   Rate Limiting · CORS       │
└────────────┬───────────────┘  JSON   └──────────────┬───────────────┘
             │                                        │
             │                          ┌─────────────┴───────────────┐
             ▼                          ▼                             ▼
     Vercel (Edge CDN)         ┌──────────────────┐         ┌──────────────────┐
                               │  Gemini AI       │         │  PostgreSQL      │
                               │  (Google Cloud)  │         │  (Render)        │
                               └──────────────────┘         └──────────────────┘
                                          │
                                          ▼
                                ┌──────────────────┐
                                │   Resend         │
                                │   (E-posta)      │
                                └──────────────────┘
```

**İstek akışı (ürün analizi):**

1. Kullanıcı dashboard üzerinden ürün linki girer.
2. Frontend, `POST /analyze-product` isteğiyle backend'e gönderir.
3. Backend cache'i kontrol eder; varsa anında döner.
4. Yoksa mağaza API'sinden ürünü çeker, Gemini ile yorumları analiz eder, fiyat algoritması ile tavsiye üretir.
5. Sonuç JSON olarak döner, PostgreSQL'e kaydedilir.
6. Giriş yapan kullanıcının analiz geçmişine eklenir.

---

## Teknoloji Yığını

### Frontend
- **Next.js 16** (App Router, Server Components)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4**
- **next/font** (Manrope · DM Sans · Crimson Text)
- JWT tabanlı kimlik doğrulama (localStorage + cookie)
- Koyu/açık tema (`next-themes`)

### Backend
- **FastAPI 0.136** + **Uvicorn**
- **SQLAlchemy 2** ORM
- **PostgreSQL 16** (üretim) · **SQLite** (geliştirme)
- **Pydantic v2** — istek/yanıt doğrulama
- **python-jose** + **passlib (bcrypt)** — JWT ve şifre yönetimi
- **slowapi** — rate limiting
- **httpx** — async HTTP istekleri

### Yapay Zekâ
- **Google Gemini 2.0 Flash** (`google-genai` SDK) — yorum analizi ve akıllı tavsiye üretimi

### Altyapı & Servisler
| Servis | Görev |
|---|---|
| **Vercel** | Frontend deploy + Edge CDN |
| **Render** | Backend host + PostgreSQL veritabanı |
| **Resend** | Transactional e-posta gönderimi (şifre sıfırlama) |
| **Google Cloud** | Gemini API |
| **GitHub** | Versiyon kontrolü ve CI |

---

## Canlı Servisler

| Ortam | URL |
|---|---|
| 🌐 **Web Uygulaması** | https://pitoresk.tech |
| ⚙️ **Backend API** | https://pitoresk.onrender.com |
| 📘 **API Dokümantasyonu** | https://pitoresk.onrender.com/docs |
| 💾 **Repo** | https://github.com/catgiller/CrowGuard |

---

## Hızlı Başlangıç

### Önkoşullar
- **Python 3.11+**
- **Node.js 20+**
- **Google AI Studio** üzerinden bir Gemini API anahtarı
- (Opsiyonel) **Resend** hesabı — e-posta için
- (Opsiyonel) **PostgreSQL** — üretim için (yoksa SQLite kullanılır)

### 1) Repoyu klonlayın
```bash
git clone https://github.com/catgiller/CrowGuard.git
cd CrowGuard
```

### 2) Backend
```bash
python -m venv venv
source venv/bin/activate    # Windows: .\venv\Scripts\activate

pip install -r requirements.txt

cd backend
cp .env.example .env        # değişkenleri doldurun
uvicorn main:app --reload
```
Backend `http://localhost:8000` adresinde çalışacaktır.

### 3) Frontend
```bash
cd frontend
npm install

echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```
Frontend `http://localhost:3000` adresinde çalışacaktır.

### 4) Tek komutla (Linux / macOS)
```bash
./start.sh
```

---

## Ortam Değişkenleri

### `backend/.env`
```ini
# AI
GEMINI_API_KEY=your_google_ai_studio_key

# Auth
JWT_SECRET=please-change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Veritabanı (geliştirme için SQLite)
DATABASE_URL=sqlite:///./crowguard.db
# Üretim örneği:
# DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/crowguard

# E-posta (opsiyonel — şifre sıfırlama için)
RESEND_API_KEY=re_xxx

# Frontend URL (e-posta linkleri için)
FRONTEND_URL=https://pitoresk.tech
```

### `frontend/.env.local`
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## API Uçları

| Yöntem | Yol | Açıklama | Auth |
|---|---|---|---|
| `GET`    | `/`                       | Sağlık + sürüm bilgisi | ❌ |
| `GET`    | `/health`                 | Health check | ❌ |
| `POST`   | `/auth/register`          | Kullanıcı kaydı | ❌ |
| `POST`   | `/auth/login`             | Giriş (JWT döner) | ❌ |
| `GET`    | `/auth/me`                | Mevcut kullanıcı bilgisi | ✅ |
| `POST`   | `/auth/forgot-password`   | Şifre sıfırlama linki gönderir | ❌ |
| `POST`   | `/auth/reset-password`    | Yeni şifre belirler | ❌ |
| `POST`   | `/auth/change-password`   | Mevcut şifreyi değiştirir | ✅ |
| `DELETE` | `/auth/account`           | Hesabı siler | ✅ |
| `POST`   | `/analyze-product`        | Ürün URL analizi | opsiyonel |
| `POST`   | `/compare`                | İki mağaza arası karşılaştırma | opsiyonel |
| `POST`   | `/smart-advisor`          | Niyet + bütçe ile öneri | opsiyonel |
| `GET`    | `/history`                | Son 20 analiz | ✅ |
| `DELETE` | `/history/{id}`           | Analiz kaydını siler | ✅ |
| `POST`   | `/likes/*`                | Beğeni işlemleri | ✅ |

İnteraktif Swagger UI: **[pitoresk.onrender.com/docs](https://pitoresk.onrender.com/docs)**

**Örnek istek:**
```bash
curl -X POST https://pitoresk.onrender.com/analyze-product \
  -H "Content-Type: application/json" \
  -d '{"url":"https://shopgrill.store/products/example-product"}'
```

---

## Proje Yapısı

```
CrowGuard/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, router'lar
│   ├── database.py              # SQLAlchemy engine + Base
│   ├── auth/                    # JWT, şifre hash, dependencies
│   ├── routes/                  # analysis · advisor · auth · likes · compare
│   ├── services/                # gemini · price · cache · compare · store_search
│   ├── agents/                  # advisor_agent
│   ├── models/                  # Pydantic + SQLAlchemy modelleri
│   └── test_main.py
│
├── frontend/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # Ana sayfa
│   │   ├── login/               # Giriş + kayıt
│   │   ├── forgot-password/     # Şifre sıfırlama isteği
│   │   ├── reset-password/      # Yeni şifre belirleme
│   │   ├── about · faq · pricing · privacy · terms · contact
│   │   └── dashboard/
│   │       ├── product-analysis/
│   │       ├── smart-advisor/
│   │       ├── history/
│   │       └── profile/
│   ├── components/              # marketing-nav · brand-logo · advisor-recommendations…
│   ├── contexts/                # dashboard-context (auth state)
│   ├── lib/                     # api · auth · analysis · advisor
│   └── public/                  # logo.png
│
├── requirements.txt
├── start.sh
└── README.md
```

---

## Ekip

- **Erva Nur Şahin** — Backend & DevOps
- **Nazife Atlas** — Frontend & Tasarım

---

## Teşekkürler

- **BTK Akademi** — Hackathon ev sahipliği için
- **Google Cloud** — Gemini API ve sponsorluk için
- **Vercel** — Frontend hosting için
- **Render** — Backend ve veritabanı hosting için
- **Resend** — E-posta altyapısı için

---

## Lisans

Bu proje şu an için **özel/proprietary** olarak yayınlanmıştır. Açık kaynak lisansı belirleninceye kadar kod yalnızca proje sahiplerinin izniyle kullanılabilir.

---

<div align="center">

**CrowGuard** · Made with 🦅 in Türkiye

</div>
