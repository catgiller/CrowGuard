"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const CheckOn = () => (
  <div className="check-icon on">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
  </div>
);
const CheckOff = () => (
  <div className="check-icon off">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
  </div>
);

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .pricing-wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1rem,4vw,3.5rem); }
        .billing-toggle { display: inline-flex; align-items: center; gap: 0; background: var(--bg2); border: 1.5px solid var(--border); border-radius: var(--r-full); padding: 4px; }
        .billing-btn { padding: 0.5em 1.25em; border-radius: var(--r-full); font-size: 0.875rem; font-weight: 600; cursor: pointer; border: none; background: transparent; color: var(--fg3); transition: all 0.2s; font-family: var(--ff-b); }
        .billing-btn.active { background: var(--bg); color: var(--fg); box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
        .save-badge { display: inline-flex; align-items: center; padding: 0.2em 0.625em; border-radius: var(--r-full); font-size: 0.625rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; background: rgba(22,163,74,0.12); color: #16a34a; border: 1px solid rgba(22,163,74,0.25); margin-left: 0.375rem; }
        .plans-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; align-items: start; }
        @media (max-width: 860px) { .plans-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
        .plan-card { background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-xl); padding: 2rem; transition: all 0.3s; position: relative; overflow: hidden; }
        .plan-card:hover { border-color: var(--border); box-shadow: var(--shadow); }
        .plan-card.featured { border-color: transparent; }
        .plan-card.featured::before { content:''; position:absolute; inset:0; border-radius: var(--r-xl); border: 1.5px solid transparent; background: var(--grad) border-box; -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); -webkit-mask-composite: destination-out; mask-composite: exclude; pointer-events:none; }
        .plan-card.featured::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: var(--grad); border-radius: var(--r-xl) var(--r-xl) 0 0; }
        .popular-badge { position: absolute; top: 1.25rem; right: 1.25rem; display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3em 0.75em; border-radius: var(--r-full); font-size: 0.625rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; background: var(--grad); color: #fff; }
        .popular-badge svg { width: 10px; height: 10px; }
        .plan-name { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .plan-desc { font-size: 0.875rem; color: var(--fg3); margin-bottom: 1.5rem; }
        .plan-price { font-family: var(--ff-d); font-size: clamp(2.25rem,4vw,3rem); font-weight: 800; color: var(--fg); line-height: 1; margin-bottom: 0.25rem; }
        .plan-price sup { font-size: 1.25rem; font-weight: 700; vertical-align: super; }
        .plan-period { font-size: 0.8125rem; color: var(--fg3); margin-bottom: 0.5rem; }
        .plan-annual { font-size: 0.75rem; color: var(--fg3); margin-bottom: 1.5rem; min-height: 1.2em; }
        .plan-cta { width: 100%; padding: 0.85em; border-radius: var(--r-full); font-family: var(--ff-b); font-size: 0.9375rem; font-weight: 700; text-align: center; text-decoration: none; display: block; transition: all 0.2s; margin-bottom: 1.75rem; border: none; cursor: pointer; }
        .plan-cta.solid { background: var(--fg); color: var(--bg); }
        .plan-cta.solid:hover { opacity: 0.88; }
        .plan-cta.grad { background: var(--grad); color: #fff; box-shadow: 0 4px 18px rgba(213,51,42,.25); }
        .plan-cta.grad:hover { box-shadow: 0 8px 28px rgba(213,51,42,.35); transform: translateY(-1px); }
        .plan-cta.outline { background: transparent; color: var(--fg2); border: 1.5px solid var(--border); }
        .plan-cta.outline:hover { border-color: var(--c5); color: var(--fg); }
        .features-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .feature-item { display: flex; align-items: flex-start; gap: 0.625rem; font-size: 0.875rem; color: var(--fg2); line-height: 1.45; }
        .feature-item.missing { color: var(--fg3); text-decoration: line-through; opacity: 0.6; }
        .check-icon { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .check-icon.on { background: var(--grad); }
        .check-icon.off { background: var(--bg3); }
        .check-icon svg { width: 10px; height: 10px; color: #fff; }
        .check-icon.off svg { color: var(--fg3); }
        .faq-strip { margin-top: 3rem; text-align: center; padding: clamp(2rem,4vw,3rem); background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r-xl); }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 3rem)" }}>
        <div className="pricing-wrap">

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label">Fiyatlandırma</p>
            <h1 className="t-xl" style={{ color: "var(--fg)", marginBottom: "1rem" }}>
              Cüzdanınıza uygun,<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg3)" }}>kararlarınız paha biçilemez.</em>
            </h1>
            <p className="t-body t-muted" style={{ maxWidth: "420px", margin: "0 auto 2rem" }}>Küçük başlayın, büyüdükçe yükseltin. Kredi kartı gerektirmez.</p>

            <div className="billing-toggle">
              <button className={`billing-btn${!yearly ? " active" : ""}`} onClick={() => setYearly(false)}>Aylık</button>
              <button className={`billing-btn${yearly ? " active" : ""}`} onClick={() => setYearly(true)}>
                Yıllık <span className="save-badge">%25 Tasarruf</span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="plans-grid">
            {/* Free */}
            <div className="plan-card">
              <p className="plan-name" style={{ color: "var(--fg3)" }}>Ücretsiz</p>
              <p className="plan-desc">Başlamak için her şey.</p>
              <div className="plan-price">Ücretsiz</div>
              <p className="plan-period">&nbsp;</p>
              <p className="plan-annual">&nbsp;</p>
              <Link href="/login" className="plan-cta solid">Hemen Başla</Link>
              <ul className="features-list">
                <li className="feature-item"><CheckOn />Günlük 5 ürün analizi</li>
                <li className="feature-item"><CheckOn />Sahte yorum tespiti</li>
                <li className="feature-item"><CheckOn />Fiyat karşılaştırması</li>
                <li className="feature-item"><CheckOn />İade riski skoru</li>
                <li className="feature-item"><CheckOn />Akıllı Asistan (Günlük 3 sorgu)</li>
                <li className="feature-item missing"><CheckOff />Sınırsız analiz</li>
                <li className="feature-item missing"><CheckOff />Fiyat alarm bildirimleri (yakında)</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="plan-card featured">
              <span className="popular-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Popüler
              </span>
              <p className="plan-name" style={{ background: "var(--grad-h)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Pro</p>
              <p className="plan-desc">Alışverişi ciddiye alanlar için.</p>
              <div className="plan-price"><sup>₺</sup>{yearly ? "59" : "79"}</div>
              <p className="plan-period">/ay</p>
              <p className="plan-annual">{yearly ? "Yıllık ₺708 faturalandırılır" : " "}</p>
              <Link href="/login" className="plan-cta grad">Erken Erişim Al</Link>
              <p style={{ fontSize: "0.6875rem", color: "var(--fg3)", textAlign: "center", marginBottom: "0.5rem" }}>Pro planı yakında aktif olacak</p>
              <ul className="features-list">
                <li className="feature-item"><CheckOn />Sınırsız ürün analizi</li>
                <li className="feature-item"><CheckOn />Sahte yorum tespiti</li>
                <li className="feature-item"><CheckOn />Fiyat karşılaştırması + alarmlar (yakında)</li>
                <li className="feature-item"><CheckOn />İade riski skoru</li>
                <li className="feature-item"><CheckOn />Akıllı Asistan</li>
                <li className="feature-item"><CheckOn />Geçmiş arama geçmişi</li>
                <li className="feature-item"><CheckOn />Öncelikli e-posta desteği</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="plan-card">
              <p className="plan-name" style={{ color: "var(--c5)" }}>Kurumsal</p>
              <p className="plan-desc">Büyük ekipler ve özel entegrasyonlar.</p>
              <div className="plan-price">Özel</div>
              <p className="plan-period">&nbsp;</p>
              <p className="plan-annual">&nbsp;</p>
              <Link href="/contact" className="plan-cta outline">Bize Ulaşın</Link>
              <ul className="features-list">
                <li className="feature-item"><CheckOn />Pro&apos;daki her şey</li>
                <li className="feature-item"><CheckOn />API erişimi</li>
                <li className="feature-item"><CheckOn />Özel entegrasyon desteği</li>
                <li className="feature-item"><CheckOn />Takım hesabı yönetimi</li>
                <li className="feature-item"><CheckOn />SLA garantisi</li>
                <li className="feature-item"><CheckOn />Özel fiyatlandırma</li>
              </ul>
            </div>
          </div>

          {/* FAQ strip */}
          <div className="faq-strip" style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: ".8125rem", color: "var(--fg3)" }}>Pro planı şu an hazırlık aşamasındadır. Ücretsiz plan ile tüm temel özellikleri kullanabilirsiniz. Sorularınız mı var?</p>
            <Link href="/faq" style={{ fontSize: ".875rem", fontWeight: 700, color: "var(--c2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".375rem", marginTop: ".625rem" }}>
              SSS&apos;ye bakın
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ width: "14px", height: "14px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
