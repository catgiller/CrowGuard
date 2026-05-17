"use client";

import { useState, useCallback } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuButton } from "@/components/menu-button";

const platformsData = [
  { id: 't', name: 'Trendyol', dot: '#f27a1a', price: '₺3.299', priceNum: 3299, verdict: 'bk', score: 3.4, realScore: 2.8, returns: 78, alts: 2, priceTrend: '+%18', fakeRate: 42, reasons: ['Kalıbı dar — 1 numara büyük önerilir', 'Renk görsellerde daha parlak (%34 alıcı)', 'Taban malzemesi beklentinin altında'] },
  { id: 'a', name: 'Amazon TR', dot: '#ff9900', price: '₺3.150', priceNum: 3150, verdict: 'bk', score: 4.1, realScore: 3.5, returns: 62, alts: 1, priceTrend: '+%12', fakeRate: 28, reasons: ['Kalıbı standart boyutun biraz dar tarafında', 'Uzun teslimat süresi şikayeti var'] },
  { id: 'h', name: 'Hepsiburada', dot: '#ff6000', price: '₺2.999', priceNum: 2999, verdict: 'al', score: 3.8, realScore: 3.6, returns: 45, alts: 3, priceTrend: '-%4', fakeRate: 15, reasons: ['Numara genellikle standart uyumlu', 'Teslimat hızlı ve güvenilir'] },
];

const altsData = [
  { name: 'Adidas Stan Smith Beyaz', price: '₺2.650', score: '4.5' },
  { name: 'New Balance 327', price: '₺2.899', score: '4.3' },
  { name: 'Vans Old Skool Pro', price: '₺2.499', score: '4.4' },
];

type Platform = (typeof platformsData)[number];

function verdictLabel(v: string) {
  if (v === "al") return "AL";
  if (v === "bk") return "BEKLE";
  return "ALTERNATİF";
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 860px)").matches;
}

function ProductDetail({
  query,
  platform,
}: {
  query: string;
  platform: Platform;
}) {
  return (
    <div className="detail-content">
      <div className="detail-head">
        <div>
          <div className="detail-name">{query}</div>
          <div className="detail-meta">{platform.name} · Spor Ayakkabı</div>
        </div>
        <span className={`verdict-lg v-${platform.verdict}`}>{verdictLabel(platform.verdict)}</span>
      </div>
      <div className="metrics-row">
        <div className="metric-box">
          <div className="mlabel">Güncel Fiyat</div>
          <div className="mval" style={{ color: "var(--c3)" }}>{platform.price}</div>
          <div className="mhint">Tarihi ort. {platform.priceTrend}</div>
        </div>
        <div className="metric-box">
          <div className="mlabel">Güven Skoru</div>
          <div className="mval" style={{ color: "var(--c4)" }}>
            {platform.realScore}
            <span style={{ fontSize: ".875rem", color: "var(--fg3)" }}>/5</span>
          </div>
          <div className="mhint">%{platform.fakeRate} yorum şüpheli</div>
        </div>
        <div className="metric-box">
          <div className="mlabel">İade Riski</div>
          <div className="mval" style={{ color: "var(--c2)" }}>%{platform.returns}</div>
          <div className="mhint">
            {platform.returns > 60 ? "Yüksek" : platform.returns > 35 ? "Orta" : "Düşük"} risk
          </div>
        </div>
      </div>
      <div className="card-block">
        <div className="block-title">Fiyat Geçmişi (6 ay)</div>
        <div className="price-bars">
          {[55, 48, 62, 50, 45, 58, 52, 65, 55, 48, 68, 100].map((h, i) => (
            <div key={i} className={`pbar ${i === 11 ? "hi" : ""}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".375rem", fontSize: ".625rem", color: "var(--fg3)" }}>
          <span>Kas 2025</span>
          <span>May 2026</span>
        </div>
      </div>
      <div className="card-block">
        <div className="block-title">İade Risk Analizi — %{platform.returns}</div>
        <div className="risk-track">
          <div className="risk-fill" style={{ width: `${platform.returns}%` }} />
        </div>
        <ul className="reason-list" style={{ marginTop: ".75rem" }}>
          {platform.reasons.map((r, i) => (
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
            <div className="ts-num" style={{ color: "var(--fg3)" }}>{platform.score}</div>
            <div className="ts-lbl">Görünen</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18, color: "var(--fg3)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="trust-score">
            <div className="ts-num" style={{ color: "var(--c4)" }}>{platform.realScore}</div>
            <div className="ts-lbl">Gerçek</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: ".8125rem", fontWeight: 700, color: "var(--c3)" }}>
            %{platform.fakeRate} şüpheli yorum
          </div>
        </div>
        <div className="tag-row">
          <span className="ttag" style={{ background: "rgba(213,51,42,.1)", color: "var(--c3)" }}>Toplu Hesap</span>
          <span className="ttag" style={{ background: "rgba(210,96,165,.1)", color: "var(--c4)" }}>Dil Tekrarı</span>
          <span className="ttag" style={{ background: "rgba(241,118,40,.1)", color: "var(--c2)" }}>Hızlı Yorum</span>
        </div>
      </div>
      <div className="card-block">
        <div className="block-title">Akıllı Alternatifler</div>
        {altsData.map((a, i) => (
          <div key={i} className="alt-item">
            <span className="alt-n">0{i + 1}</span>
            <span className="alt-nm">{a.name}</span>
            <span style={{ fontSize: ".6875rem", color: "var(--fg3)" }}>⭐{a.score}</span>
            <span className="alt-p">{a.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductAnalysisPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const doSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setIsSearching(true);
    setSelectedId(platformsData[0].id);
    setMobileDetailOpen(false);
  };

  const selectPlatform = useCallback((id: string) => {
    setSelectedId(id);
    if (isMobileViewport()) setMobileDetailOpen(true);
  }, []);

  const selectedPlatform = platformsData.find((p) => p.id === selectedId);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .search-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; }
        .search-headline { font-family: var(--ff-d); font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; color: var(--fg); margin-bottom: 0.625rem; line-height: 1.2; }
        .search-headline em { font-style: normal; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .search-sub { font-size: 0.9375rem; color: var(--fg3); margin-bottom: 1.75rem; max-width: 480px; line-height: 1.6; }
        .search-box { width: 100%; max-width: 580px; background: var(--bg2); border: 1.5px solid var(--border); border-radius: 16px; display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem 0.625rem 0.625rem 1.125rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .search-box:focus-within { border-color: var(--c4); box-shadow: 0 0 0 3px rgba(210,96,165,0.1); }
        .search-box input { flex: 1; background: transparent; border: none; outline: none; font-family: var(--ff-b); font-size: 0.9375rem; color: var(--fg); padding: 0.25rem 0; min-width: 0; }
        .search-box input::placeholder { color: var(--fg3); }
        .search-go { background: var(--grad); color: #fff; border: none; cursor: pointer; border-radius: 12px; padding: 0.625rem 1.25rem; font-family: var(--ff-b); font-size: 0.875rem; font-weight: 700; flex-shrink: 0; transition: opacity 0.2s, transform 0.2s; }
        .search-go:hover { opacity: 0.88; transform: translateY(-1px); }
        .chip-row { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 1.25rem; max-width: 580px; }
        .chip { padding: 0.4em 0.875em; border-radius: var(--r-full); font-size: 0.8125rem; border: 1.5px solid var(--border); color: var(--fg2); cursor: pointer; background: transparent; font-family: var(--ff-b); transition: all 0.2s; }
        .chip:hover { border-color: var(--c4); color: var(--fg); background: rgba(210,96,165,0.07); }
        .results-screen { flex: 1; display: flex; overflow: hidden; }
        .cards-panel { width: 340px; flex-shrink: 0; border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
        @media (max-width: 860px) { .cards-panel { width: 100%; border-right: none; } }
        .compact-search { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0; }
        .compact-search input { flex: 1; background: var(--bg2); border: 1.5px solid var(--border); border-radius: var(--r-full); padding: 0.5rem 0.875rem; font-family: var(--ff-b); font-size: 0.8125rem; color: var(--fg); outline: none; transition: border-color 0.2s; min-width: 0; }
        .compact-search input:focus { border-color: var(--c4); }
        .compact-search button { background: var(--grad); color: #fff; border: none; cursor: pointer; border-radius: var(--r-full); padding: 0.5rem 1rem; font-family: var(--ff-b); font-size: 0.8125rem; font-weight: 700; flex-shrink: 0; white-space: nowrap; }
        .cards-list { flex: 1; overflow-y: auto; }
        .cards-label { padding: 0.75rem 1rem 0.375rem; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg3); }
        .pcard { padding: 1rem 1.125rem; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; display: flex; flex-direction: column; gap: 0.5rem; border-left: 3px solid transparent; }
        .pcard:hover { background: var(--bg2); }
        .pcard.selected { background: var(--bg2); border-left-color: var(--c3); }
        .pcard-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
        .pcard-platform { display: flex; align-items: center; gap: 0.375rem; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); }
        .pdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .pcard-price { font-family: var(--ff-d); font-size: 1rem; font-weight: 800; color: var(--fg); }
        .pcard-name { font-size: 0.875rem; font-weight: 600; color: var(--fg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pcard-bottom { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .vbadge { display: inline-flex; align-items: center; gap: 0.2rem; padding: 0.18em 0.55em; border-radius: var(--r-full); font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; flex-shrink: 0; }
        .v-al  { background: rgba(22,163,74,0.12);  color: #16a34a; }
        .v-bk  { background: rgba(241,118,40,0.12); color: var(--c2); }
        .v-alt { background: rgba(162,31,101,0.12); color: var(--c6); }
        .pcard-stats { display: flex; align-items: center; gap: 0.625rem; }
        .pcard-stat { font-size: 0.6875rem; color: var(--fg3); font-weight: 500; white-space: nowrap; }
        .pcard-arrow { margin-left: auto; color: var(--fg3); font-size: 0.8125rem; transition: transform 0.2s, color 0.2s; }
        .pcard:hover .pcard-arrow, .pcard.selected .pcard-arrow { transform: translateX(3px); color: var(--c2); }
        .detail-panel { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        @media (max-width: 860px) { .detail-panel { display: none; } }
        .detail-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--fg3); text-align: center; padding: 2rem; }
        .detail-empty svg { width: 40px; height: 40px; opacity: 0.25; margin-bottom: 0.875rem; }
        .detail-empty p { font-size: 0.9rem; }
        .detail-content { padding: clamp(1.25rem, 2.5vw, 1.75rem); display: flex; flex-direction: column; gap: 1rem; }
        .detail-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .detail-name { font-family: var(--ff-d); font-size: 1.25rem; font-weight: 700; color: var(--fg); margin-bottom: 0.25rem; }
        .detail-meta { font-size: 0.8125rem; color: var(--fg3); }
        .verdict-lg { display: inline-flex; align-items: center; gap: 0.375rem; padding: 0.4em 1em; border-radius: var(--r-full); font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; flex-shrink: 0; }
        .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .metric-box { background: var(--bg2); border-radius: var(--r-md); padding: 0.875rem; }
        .mlabel { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.375rem; }
        .mval { font-family: var(--ff-d); font-size: 1.375rem; font-weight: 800; color: var(--fg); line-height: 1; }
        .mhint { font-size: 0.6875rem; color: var(--fg3); margin-top: 0.25rem; line-height: 1.4; }
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
        .alt-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border); }
        .alt-item:last-child { border-bottom: none; }
        .alt-n { font-family: var(--ff-d); font-size: 0.8125rem; font-weight: 800; color: var(--fg3); width: 16px; flex-shrink: 0; }
        .alt-nm { font-size: 0.8125rem; font-weight: 600; color: var(--fg); flex: 1; }
        .alt-p { font-size: 0.8125rem; font-weight: 700; color: #16a34a; }
        .trust-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
        .trust-score { text-align: center; }
        .ts-num { font-family: var(--ff-d); font-size: 1.75rem; font-weight: 800; line-height: 1; }
        .ts-lbl { font-size: 0.6875rem; color: var(--fg3); }
        .tag-row { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.75rem; }
        .ttag { font-size: 0.5625rem; font-weight: 800; padding: 0.25em 0.625em; border-radius: 5px; letter-spacing: 0.04em; }
        @media (max-width: 520px) { .metrics-row { grid-template-columns: 1fr; } }
        .detail-sheet-backdrop { display: none; }
        @media (max-width: 860px) {
          .detail-sheet-backdrop { display: block; position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); }
          .detail-sheet { position: fixed; left: 0; right: 0; bottom: 0; z-index: 70; max-height: 88dvh; background: var(--bg); border-radius: var(--r-xl) var(--r-xl) 0 0; border-top: 1px solid var(--border); transform: translateY(100%); transition: transform 0.28s cubic-bezier(0.22,1,0.36,1); display: flex; flex-direction: column; }
          .detail-sheet.open { transform: translateY(0); }
          .detail-sheet-handle { flex-shrink: 0; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
          .detail-sheet-body { flex: 1; overflow-y: auto; }
          .detail-sheet-close { width: 36px; height: 36px; border-radius: var(--r-md); background: var(--bg2); border: 1.5px solid var(--border); color: var(--fg2); cursor: pointer; font-size: 1.25rem; line-height: 1; }
        }
      `}}/>

      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Ürün Analizi</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: ".75rem", alignItems: "center" }}>
          <ThemeToggle />
        </div>
      </div>

      {!isSearching ? (
        <div className="search-screen">
          <h1 className="search-headline">Hangi ürünü <em>analiz edelim?</em></h1>
          <p className="search-sub">Ürün adı, link veya model numarası — Trendyol, Amazon ve Hepsiburada aynı anda taranır.</p>
          <div className="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "18px", height: "18px", color: "var(--fg3)", flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Nike Air Force 1, trendyol.com/..." 
              onKeyDown={e => e.key === 'Enter' && doSearch(query)}
            />
            <button className="search-go" onClick={() => doSearch(query)}>Analiz Et</button>
          </div>
          <div className="chip-row">
            <button className="chip" onClick={() => doSearch('Nike Air Force 1')}>Nike Air Force 1</button>
            <button className="chip" onClick={() => doSearch('MacBook Air M3')}>MacBook Air M3</button>
            <button className="chip" onClick={() => doSearch('Dyson V15')}>Dyson V15</button>
            <button className="chip" onClick={() => doSearch('Samsung Galaxy S25')}>Samsung Galaxy S25</button>
          </div>
        </div>
      ) : (
        <div className="results-screen">
          {/* LEFT: cards */}
          <div className="cards-panel">
            <div className="compact-search">
              <input 
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch(query)}
              />
              <button onClick={() => doSearch(query)}>Ara</button>
            </div>
            <div className="cards-list">
              <p className="cards-label">&quot;{query}&quot; için sonuçlar</p>
              {platformsData.map(p => (
                <div key={p.id} className={`pcard ${selectedId === p.id ? 'selected' : ''}`} onClick={() => selectPlatform(p.id)}>
                  <div className="pcard-top">
                    <span className="pcard-platform"><span className="pdot" style={{ background: p.dot }}></span>{p.name}</span>
                    <span className="pcard-price">{p.price}</span>
                  </div>
                  <div className="pcard-name">{query}</div>
                  <div className="pcard-bottom">
                    <span className={`vbadge v-${p.verdict}`}>{verdictLabel(p.verdict)}</span>
                    <div className="pcard-stats">
                      <span className="pcard-stat">⭐ {p.realScore} güven</span>
                      <span className="pcard-stat">%{p.returns} iade</span>
                    </div>
                    <span className="pcard-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: detail */}
          <div className="detail-panel">
            {!selectedPlatform ? (
              <div className="detail-empty">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                <p>Detayları görmek için<br/>bir platform seçin</p>
              </div>
            ) : (
              <ProductDetail query={query} platform={selectedPlatform} />
            )}
          </div>

          {mobileDetailOpen && selectedPlatform && (
            <>
              <div className="detail-sheet-backdrop" onClick={() => setMobileDetailOpen(false)} aria-hidden="true" />
              <div className="detail-sheet open" role="dialog" aria-modal="true" aria-label="Ürün analiz detayı">
                <div className="detail-sheet-handle">
                  <span style={{ fontFamily: "var(--ff-d)", fontWeight: 700, fontSize: ".9375rem", color: "var(--fg)" }}>{selectedPlatform.name}</span>
                  <button type="button" className="detail-sheet-close" aria-label="Kapat" onClick={() => setMobileDetailOpen(false)}>×</button>
                </div>
                <div className="detail-sheet-body">
                  <ProductDetail query={query} platform={selectedPlatform} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
