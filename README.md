<div align="center">

<img src="frontend/public/logo.png" alt="Pitoresk / CrowGuard" width="140" />

# Pitoresk · CrowGuard
### Türkiye için akıllı ürün analiz ve alışveriş asistanı

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Proprietary-lightgrey)](#lisans)

**Bir ürün linki yapıştır → Pitoresk fiyatı, yorumları, iade riskini ve "şimdi al / bekle / alternatif" tavsiyesini saniyeler içinde sunsun.**

</div>

---

## İçindekiler

- [Pitoresk Nedir?](#pitoresk-nedir)
- [Öne Çıkan Özellikler](#öne-çıkan-özellikler)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Mimari](#mimari)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Hızlı Başlangıç](#hızlı-başlangıç)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [API Uçları](#api-uçları)
- [Proje Yapısı](#proje-yapısı)
- [Geliştirme Notları](#geliştirme-notları)
- [Yol Haritası](#yol-haritası)
- [Lisans](#lisans)

---

## Pitoresk Nedir?

**Pitoresk** (marka adı **CrowGuard**), Türkiye'deki büyük e-ticaret sitelerinden (Trendyol, Hepsiburada, Amazon TR) bir ürün sayfasının linkini alan; sayfayı kazıyıp Google Gemini ile yorumları, fiyatı ve risk sinyallerini analiz eden bir **AI alışveriş asistanıdır**.

Kullanıcının amacı tek bir soruya cevap vermek:

> "Bu ürünü **şimdi mi almalıyım**, **biraz beklemeli miyim**, yoksa **daha iyi bir alternatif** var mı?"

---

## Öne Çıkan Özellikler

| | |
|---|---|
| 🔗 **URL ile analiz** | Trendyol / Hepsiburada / Amazon TR ürün linkini yapıştır, anında detaylı analiz al. |
| 🧠 **Gemini destekli yorum analizi** | Sahte yorum skoru, duygu analizi, öne çıkan olumlu/olumsuz temalar. |
| 📈 **Fiyat tavsiyesi** | "BUY / WAIT / ALTERNATIVE" sinyali, beklenen düşüş ve süresi. |
| 🛡️ **İade riski skoru** | Yorumlardan ve ürün verisinden çıkarılmış iade olasılığı (0-100). |
| 🤖 **Akıllı asistan (Smart Advisor)** | "1500₺ altı düğün hediyesi" gibi niyet + bütçe ile ürün önerisi. |
| 📜 **Analiz geçmişi** | Giriş yapan kullanıcılar son 20 analizini kayıt altında görür. |
| ⚡ **Cache** | Aynı URL için tekrar analiz yapılmaz; sonuçlar arka planda saklanır. |
| 🔐 **Auth + JWT** | E-posta/şifre ile kayıt, korumalı dashboard. |
| 🎨 **Tasarım sistemi** | Manrope/DM Sans/Crimson Text + Tailwind v4, koyu/açık tema. |

---

## Ekran Görüntüleri

> Aşağıdaki görseller `docs/screenshots/` klasöründe yer alır.
> Henüz eklenmediyse `docs/screenshots/` altına PNG'leri bırakman yeterli; dosya adları aşağıdaki referanslarla eşleşmelidir.

### Landing — Ana Sayfa
![Landing Page](docs/screenshots/01-landing.png)

### Ürün Analizi
URL → AI analizi → tavsiye, fiyat geçmişi ve risk skorları.

![Ürün Analizi](docs/screenshots/02-product-analysis.png)

### Akıllı Asistan
Niyet + bütçe → öneri kartları.

![Smart Advisor](docs/screenshots/03-smart-advisor.png)

### Dashboard
Hızlı arama, son aramalar ve istatistik kartları.

![Dashboard](docs/screenshots/04-dashboard.png)

### Analiz Geçmişi
![Analiz Geçmişi](docs/screenshots/05-history.png)

### Giriş / Kayıt
![Login](docs/screenshots/06-login.png)

---

## Mimari

```
┌────────────────────────────┐         ┌──────────────────────────────┐
│   Next.js 16 (App Router)  │  HTTPS  │      FastAPI Backend         │
│   React 19 · Tailwind v4   │ ──────▶ │   /analyze-product           │
│   contexts/auth · lib/api  │ ◀────── │   /smart-advisor             │
└────────────┬───────────────┘  JSON   │   /history · /auth/* · /likes│
             │                         └──────────────┬───────────────┘
             │                                        │
             │                          ┌─────────────┴───────────────┐
             │                          │                             │
             ▼                          ▼                             ▼
   Vercel (frontend deploy)   ┌──────────────────┐         ┌──────────────────┐
                              │  scraping_service│         │ gemini_service   │
                              │  (Trendyol/HB/AZ)│         │ (Google Gemini)  │
                              └────────┬─────────┘         └────────┬─────────┘
                                       │                            │
                                       └────────────┬───────────────┘
                                                    ▼
                                          ┌──────────────────┐
                                          │ SQLAlchemy + DB  │
                                          │  (SQLite → Postgres)
                                          └──────────────────┘
```

**Akış (ürün analizi):**
1. Kullanıcı dashboard'da URL girer.
2. Frontend `POST /analyze-product` çağrısı yapar.
3. Backend cache'i kontrol eder (`cache_service`).
4. Cache yoksa `scraping_service` ile sayfayı kazır, `gemini_service` ile yorumları analiz eder, `price_algorithm` ile tavsiye üretir.
5. Sonuç JSON olarak döner; arka planda DB'ye yazılır.
6. Kullanıcı giriş yapmışsa kayıt `history`'ye eklenir.

---

## Teknoloji Yığını

**Frontend**
- Next.js 16 (App Router, RSC), React 19, TypeScript 5
- Tailwind CSS v4, `next/font` (Manrope / DM Sans / Crimson Text)
- `next-themes` (koyu/açık tema)
- Client-side auth context + JWT (localStorage)

**Backend**
- FastAPI 0.136, Uvicorn
- SQLAlchemy 2 + SQLite (dev) / Postgres (prod hedefi)
- Google Gemini (`google-genai`) — yorum/tavsiye AI
- BeautifulSoup4 + lxml + curl-cffi — scraping
- pytrends — Google Trends sinyali
- python-jose + passlib (bcrypt) — JWT auth
- slowapi — rate limiting

**Diğer**
- Vercel (frontend), `start.sh` (dev orkestrasyon)
- `docs/api_contract.md`, `docs/implementation_plan.md`

---

## Hızlı Başlangıç

### Önkoşullar
- Python 3.11+
- Node.js 20+
- Google AI Studio'dan **Gemini API key**

### 1) Repoyu klonla
```bash
git clone https://github.com/<user>/Pitoresk.git
cd Pitoresk
```

### 2) Backend
```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt

# .env oluştur (aşağıdaki "Ortam Değişkenleri" bölümüne bak)
cd backend
uvicorn main:app --reload
# → http://localhost:8000
```

### 3) Frontend
```bash
cd frontend
npm install

# .env.local oluştur:
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
# → http://localhost:3000
```

### 4) Tek komutla (macOS / Linux / Git Bash)
```bash
./start.sh
```

> **Windows için:** `start.sh` Bash betiğidir; PowerShell'de `bash start.sh` (Git Bash gerekir) ya da iki terminalde manuel başlat.

---

## Ortam Değişkenleri

### `backend/.env`
```ini
GEMINI_API_KEY=your_google_ai_studio_key
JWT_SECRET=please-change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=sqlite:///./pitoresk.db
# Production örneği:
# DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/pitoresk
```

### `frontend/.env.local`
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## API Uçları

Backend root: `http://localhost:8000`

| Yöntem | Yol | Açıklama | Auth |
|---|---|---|---|
| `GET`  | `/`                  | Sağlık + sürüm | ❌ |
| `GET`  | `/health`            | Health check   | ❌ |
| `POST` | `/auth/register`     | Kayıt          | ❌ |
| `POST` | `/auth/login`        | Giriş (JWT)    | ❌ |
| `GET`  | `/auth/me`           | Mevcut kullanıcı | ✅ |
| `POST` | `/analyze-product`   | Ürün URL analizi | opsiyonel |
| `POST` | `/analyze-review`    | Tek yorum analizi (legacy) | opsiyonel |
| `POST` | `/smart-advisor`     | Niyet + bütçe ile öneri | opsiyonel |
| `GET`  | `/history`           | Son 20 analiz | ✅ |
| `POST` | `/likes/*`           | Beğeni işlemleri | ✅ |

**Örnek istek:**
```bash
curl -X POST http://localhost:8000/analyze-product \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.trendyol.com/marka/urun-p-123456"}'
```

> **Not:** `docs/api_contract.md` ilk taslakta `/api/v1/agents/*` yolları içeriyor; **gerçek kod yukarıdaki kök yolları kullanıyor**. Sözleşme güncellenecektir (bkz. [eksiklikler.txt](eksiklikler.txt)).

---

## Proje Yapısı

```
Pitoresk/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, router'lar
│   ├── database.py              # SQLAlchemy engine + Base
│   ├── auth/                    # JWT, password hashing, dependencies
│   ├── routes/                  # analysis · advisor · auth · likes
│   ├── services/                # scraping · gemini · price · cache · trends · youtube
│   ├── agents/                  # advisor_agent
│   ├── models/                  # Pydantic + SQLAlchemy modelleri
│   └── test_main.py
├── frontend/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # Landing
│   │   ├── login/ · about/ · contact/ · faq/ · pricing/ · privacy/ · terms/
│   │   └── dashboard/
│   │       ├── product-analysis/
│   │       ├── smart-advisor/
│   │       ├── history/
│   │       └── profile/
│   ├── components/              # marketing-nav, brand-logo, advisor-recommendations…
│   ├── contexts/                # auth context
│   ├── lib/                     # api · auth · analysis · advisor
│   └── public/                  # logo.png
├── docs/
│   ├── api_contract.md
│   ├── implementation_plan.md
│   └── screenshots/             # README görselleri (ekle)
├── carsila/  shoprill/          # Bağımsız Next.js prototipleri (deneysel)
├── eksiklikler.txt              # TODO / eksiklikler dökümü
├── requirements.txt
├── start.sh
└── README.md
```

---

## Geliştirme Notları

- **Veritabanı:** Şu an `Base.metadata.create_all` ile şema otomatik oluşturulur. Production öncesi **Alembic** migration eklenmelidir.
- **Cache:** Aynı URL kısa süre içinde tekrar istendiğinde scrape + AI çağrısı yapılmaz; arka planda yazılır.
- **Scraping yasal uyarısı:** Trendyol/Hepsiburada/Amazon TR sayfaları yalnızca **kişisel/araştırma** amaçlı kazınır. Üçüncü taraf sitelerin ToS'larına saygı gösterin ve robots.txt'i takip edin.
- **Test:** `backend/test_main.py` minimum kapsam; PR'larla genişletilmesi beklenir.
- **Lint:** `cd frontend && npm run lint`
- **Eksiklikler:** Tüm bilinen açıklar ve teknik borçlar [eksiklikler.txt](eksiklikler.txt) içinde listelidir.

---

## Yol Haritası

- [ ] Ürün **adı ile arama** (URL'siz)
- [ ] **Çoklu platform karşılaştırma** (aynı ürün, farklı sitelerde)
- [ ] Gerçek **fiyat geçmişi** (zaman serisi DB)
- [ ] **Bildirim:** "Fiyat hedefe düştü" e-posta/push
- [ ] **Plan toggle** çalışır hale gelsin (ödeme/abonelik)
- [ ] **İletişim formu** gerçek e-posta servisine bağlansın
- [ ] **Alembic migration**, Postgres'e geçiş
- [ ] **Docker / docker-compose**
- [ ] **CI:** lint + test + build pipeline
- [ ] **SEO:** metadata, sitemap, robots, OG görselleri
- [ ] **Sentry / analytics**

---

## Lisans

Bu repo şu an için **özel/proprietary**'dir. Açık kaynak lisansı belirleninceye kadar kod yalnızca proje sahiplerinin izniyle kullanılabilir.

---

<div align="center">

**Pitoresk** · Made with 🦅 in Türkiye

</div>
