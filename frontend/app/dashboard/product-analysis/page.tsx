"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MenuButton } from "@/components/menu-button";
import { ApiError } from "@/lib/api";
import { getToken } from "@/lib/auth";
import {
  analyzeProduct,
  formatTry,
  mapRecommendationToVerdict,
  normalizeProductUrl,
  type ProductAnalysisResponse,
} from "@/lib/analysis";

function verdictLabel(v: string) {
  const key = mapRecommendationToVerdict(v);
  if (key === "al") return "AL";
  if (key === "bk") return "BEKLE";
  return "ALTERNATİF";
}

function ProductDetailView({ data }: { data: ProductAnalysisResponse }) {
  const verdict = mapRecommendationToVerdict(data.price_analysis.recommendation);
  const maxPrice = Math.max(...data.price_history.map((p) => p.price), 1);
  const bars = data.price_history.slice(-12);

  return (
    <div className="detail-content">
      <div className="detail-head">
        <div>
          <div className="detail-name">{data.product_name}</div>
          <div className="detail-meta">
            {data.store_name} ·{" "}
            <a href={data.store_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--c2)" }}>
              Mağazaya git
            </a>
          </div>
        </div>
        <span className={`verdict-lg v-${verdict}`}>{verdictLabel(data.price_analysis.recommendation)}</span>
      </div>

      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.product_name}
          style={{ maxWidth: 120, borderRadius: "var(--r-md)", marginBottom: "0.5rem" }}
        />
      )}

      {data.ai_comment && (
        <p style={{ fontSize: "0.875rem", color: "var(--fg2)", lineHeight: 1.65, marginBottom: "0.5rem" }}>
          {data.ai_comment}
        </p>
      )}

      <div className="metrics-row">
        <div className="metric-box">
          <div className="mlabel">Güncel Fiyat</div>
          <div className="mval" style={{ color: "var(--c3)" }}>{formatTry(data.price_analysis.current)}</div>
          <div className="mhint">Ortalama {formatTry(data.price_analysis.average)}</div>
        </div>
        <div className="metric-box">
          <div className="mlabel">Güven Skoru</div>
          <div className="mval" style={{ color: "var(--c4)" }}>
            {(data.review_analysis.trust_score / 20).toFixed(1)}
            <span style={{ fontSize: ".875rem", color: "var(--fg3)" }}>/5</span>
          </div>
          <div className="mhint">%{data.review_analysis.fake_percentage} yorum şüpheli</div>
        </div>
        <div className="metric-box">
          <div className="mlabel">İade Riski</div>
          <div className="mval" style={{ color: "var(--c2)" }}>%{data.return_risk.percentage}</div>
          <div className="mhint">
            {data.return_risk.percentage > 60 ? "Yüksek" : data.return_risk.percentage > 35 ? "Orta" : "Düşük"} risk
          </div>
        </div>
      </div>

      {bars.length > 0 && (
        <div className="card-block">
          <div className="block-title">Fiyat Geçmişi</div>
          <div className="price-bars">
            {bars.map((p, i) => (
              <div
                key={`${p.date}-${i}`}
                className={`pbar ${i === bars.length - 1 ? "hi" : ""}`}
                style={{ height: `${Math.max(8, (p.price / maxPrice) * 100)}%` }}
                title={`${p.date}: ${formatTry(p.price)}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="card-block">
        <div className="block-title">İade Risk Analizi — %{data.return_risk.percentage}</div>
        <div className="risk-track">
          <div className="risk-fill" style={{ width: `${Math.min(100, data.return_risk.percentage)}%` }} />
        </div>
        <ul className="reason-list" style={{ marginTop: ".75rem" }}>
          {data.return_risk.reasons.map((r, i) => (
            <li key={i} className="reason-item">
              <div className="rdot" style={{ background: ["var(--c2)", "var(--c3)", "var(--c4)"][i % 3] }} />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-block">
        <div className="block-title">Güven Analizi</div>
        <div className="trust-row">
          <div className="trust-score">
            <div className="ts-num" style={{ color: "var(--c4)" }}>
              {(data.review_analysis.trust_score / 20).toFixed(1)}
            </div>
            <div className="ts-lbl">Güven (5 üzerinden)</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: ".8125rem", fontWeight: 700, color: "var(--c3)" }}>
            {data.review_analysis.total_reviews} yorum · %{data.review_analysis.fake_percentage} şüpheli
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductAnalysisContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProductAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async (raw: string) => {
    const url = normalizeProductUrl(raw);
    if (!url) {
      setError("Geçerli bir ürün linki girin (ör. trendyol.com, hepsiburada.com, amazon.com.tr).");
      return;
    }

    setQuery(url);
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const data = await analyzeProduct(url, getToken());
      setResult(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Analiz yapılamadı. Backend çalışıyor mu? (NEXT_PUBLIC_API_URL)");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setQuery(urlParam);
      runAnalysis(urlParam);
    }
  }, [searchParams, runAnalysis]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .search-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; }
        .search-headline { font-family: var(--ff-d); font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; color: var(--fg); margin-bottom: 0.625rem; line-height: 1.2; }
        .search-headline em { font-style: normal; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .search-sub { font-size: 0.9375rem; color: var(--fg3); margin-bottom: 1.75rem; max-width: 520px; line-height: 1.6; }
        .search-box { width: 100%; max-width: 580px; background: var(--bg2); border: 1.5px solid var(--border); border-radius: 16px; display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 0.625rem 0.625rem 1.125rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .search-box:focus-within { border-color: var(--c4); box-shadow: 0 0 0 3px rgba(210,96,165,0.1); }
        .search-box input { flex: 1; background: transparent; border: none; outline: none; font-family: var(--ff-b); font-size: 0.9375rem; color: var(--fg); padding: 0.25rem 0; min-width: 0; }
        .search-box input::placeholder { color: var(--fg3); }
        .search-go { background: var(--grad); color: #fff; border: none; cursor: pointer; border-radius: 12px; padding: 0.625rem 1.25rem; font-family: var(--ff-b); font-size: 0.875rem; font-weight: 700; flex-shrink: 0; transition: opacity 0.2s, transform 0.2s; }
        .search-go:disabled { opacity: 0.55; cursor: not-allowed; }
        .search-go:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .form-error { margin-top: 1rem; padding: 0.75rem 1rem; border-radius: var(--r-md); font-size: 0.8125rem; background: rgba(213,51,42,0.12); border: 1px solid rgba(213,51,42,0.25); color: var(--c3); max-width: 580px; text-align: left; }
        .loading-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: var(--fg3); font-size: 0.9375rem; }
        .loading-spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--c3); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .results-screen { flex: 1; overflow-y: auto; }
        .compact-search { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0; position: sticky; top: 0; background: var(--bg); z-index: 5; }
        .compact-search input { flex: 1; background: var(--bg2); border: 1.5px solid var(--border); border-radius: var(--r-full); padding: 0.5rem 0.875rem; font-family: var(--ff-b); font-size: 0.8125rem; color: var(--fg); outline: none; min-width: 0; }
        .compact-search button { background: var(--grad); color: #fff; border: none; cursor: pointer; border-radius: var(--r-full); padding: 0.5rem 1rem; font-family: var(--ff-b); font-size: 0.8125rem; font-weight: 700; flex-shrink: 0; }
        .detail-content { padding: clamp(1.25rem, 2.5vw, 1.75rem); display: flex; flex-direction: column; gap: 1rem; max-width: 720px; margin: 0 auto; }
        .detail-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .detail-name { font-family: var(--ff-d); font-size: 1.25rem; font-weight: 700; color: var(--fg); margin-bottom: 0.25rem; }
        .detail-meta { font-size: 0.8125rem; color: var(--fg3); }
        .verdict-lg { display: inline-flex; align-items: center; padding: 0.4em 1em; border-radius: var(--r-full); font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; flex-shrink: 0; }
        .v-al  { background: rgba(22,163,74,0.12);  color: #16a34a; }
        .v-bk  { background: rgba(241,118,40,0.12); color: var(--c2); }
        .v-alt { background: rgba(162,31,101,0.12); color: var(--c6); }
        .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .metric-box { background: var(--bg2); border-radius: var(--r-md); padding: 0.875rem; }
        .mlabel { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.375rem; }
        .mval { font-family: var(--ff-d); font-size: 1.375rem; font-weight: 800; color: var(--fg); line-height: 1; }
        .mhint { font-size: 0.6875rem; color: var(--fg3); margin-top: 0.25rem; }
        .card-block { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-lg); padding: 1rem 1.125rem; }
        .block-title { font-family: var(--ff-d); font-size: 0.875rem; font-weight: 700; color: var(--fg); margin-bottom: 0.75rem; }
        .risk-track { height: 7px; background: var(--bg3); border-radius: 4px; overflow: hidden; margin: 0.5rem 0; }
        .risk-fill { height: 100%; border-radius: 4px; background: var(--grad); }
        .reason-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .reason-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8125rem; color: var(--fg2); line-height: 1.5; }
        .rdot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 0.375rem; }
        .price-bars { display: flex; align-items: flex-end; gap: 3px; height: 36px; }
        .pbar { flex: 1; border-radius: 3px 3px 0 0; background: var(--bg3); }
        .pbar.hi { background: var(--grad); }
        .trust-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .trust-score { text-align: center; }
        .ts-num { font-family: var(--ff-d); font-size: 1.75rem; font-weight: 800; line-height: 1; }
        .ts-lbl { font-size: 0.6875rem; color: var(--fg3); }
        @media (max-width: 520px) { .metrics-row { grid-template-columns: 1fr; } }
      `,
        }}
      />

      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Ürün Analizi</span>
        <div style={{ marginLeft: "auto" }} />
      </div>

      {!result && !isLoading ? (
        <div className="search-screen">
          <h1 className="search-headline">
            Ürün linkini <em>analiz edelim</em>
          </h1>
          <p className="search-sub">
            Trendyol, Hepsiburada veya Amazon TR ürün sayfasının tam linkini yapıştırın. Analiz birkaç saniye sürebilir.
          </p>
          <div className="search-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: 18, height: 18, color: "var(--fg3)", flexShrink: 0 }}
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="https://www.trendyol.com/..."
              onKeyDown={(e) => e.key === "Enter" && !isLoading && runAnalysis(query)}
              disabled={isLoading}
            />
            <button className="search-go" onClick={() => runAnalysis(query)} disabled={isLoading}>
              Analiz Et
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>
      ) : isLoading ? (
        <div className="loading-box">
          <div className="loading-spinner" aria-hidden />
          <p>Ürün taranıyor ve yapay zeka analizi yapılıyor…</p>
        </div>
      ) : result ? (
        <div className="results-screen">
          <div className="compact-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runAnalysis(query)}
            />
            <button type="button" onClick={() => runAnalysis(query)}>
              Yenile
            </button>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setError(null);
              }}
              style={{
                background: "transparent",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--r-full)",
                padding: "0.5rem 0.875rem",
                fontSize: "0.8125rem",
                color: "var(--fg3)",
                cursor: "pointer",
              }}
            >
              Yeni
            </button>
          </div>
          {error && <p className="form-error" style={{ margin: "1rem" }} role="alert">{error}</p>}
          <ProductDetailView data={result} />
        </div>
      ) : null}
    </>
  );
}

export default function ProductAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="loading-box" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          Yükleniyor…
        </div>
      }
    >
      <ProductAnalysisContent />
    </Suspense>
  );
}


