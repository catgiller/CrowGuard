import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .page-wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1rem,4vw,3.5rem); }
        .section-block { margin-bottom: clamp(3rem,6vw,5rem); }
        .about-hero { text-align: center; padding: calc(var(--nav-h) + 3.5rem) clamp(1rem,4vw,3.5rem) 3.5rem; max-width: 820px; margin: 0 auto; }
        .about-hero h1 { color: var(--fg); margin-bottom: 1.25rem; }
        .about-hero h1 em { font-style: italic; font-weight: 400; color: var(--fg3); }
        .about-hero p { color: var(--fg2); line-height: 1.8; max-width: 640px; margin: 0 auto; }
        .about-hero p strong { color: var(--fg); font-weight: 600; }
        .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
        @media (max-width: 700px) { .values-grid { grid-template-columns: 1fr; } }
        .value-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-lg); padding: 1.75rem; }
        .value-icon { width: 44px; height: 44px; border-radius: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .value-icon svg { width: 22px; height: 22px; }
        .value-title { font-family: var(--ff-d); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
        .value-desc { font-size: 0.875rem; color: var(--fg3); line-height: 1.65; }
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
        @media (max-width: 700px) { .steps-grid { grid-template-columns: 1fr; } }
        .step-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-lg); padding: 2rem 1.75rem; position: relative; overflow: hidden; }
        .step-num-bg { position: absolute; top: 1rem; right: 1.25rem; font-family: var(--ff-d); font-size: 4.5rem; font-weight: 800; line-height: 1; opacity: 0.05; pointer-events: none; color: var(--fg); }
        .step-bar { width: 3px; height: 36px; border-radius: 2px; background: var(--grad); margin-bottom: 1.25rem; }
        .step-title { font-family: var(--ff-d); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 0.625rem; }
        .step-desc { font-size: 0.875rem; color: var(--fg3); line-height: 1.65; }
        .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }
        .team-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-xl); padding: 2.25rem; position: relative; overflow: hidden; transition: border-color 0.3s; }
        .team-card::after { content:''; position:absolute; top:0; left:0; right:0; height:2px; background: var(--grad); opacity:0; transition: opacity 0.3s; }
        .team-card:hover { border-color: transparent; }
        .team-card:hover::after { opacity:1; }
        .team-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.25rem; }
        .team-avatar { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-family: var(--ff-d); font-size: 1.0625rem; font-weight: 800; }
        .team-name { font-family: var(--ff-d); font-size: 1.375rem; font-weight: 700; color: var(--fg); margin-bottom: 0.25rem; }
        .team-role { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); margin-bottom: 1rem; }
        .team-bio { font-size: 0.9rem; color: var(--fg2); line-height: 1.7; }
        .tech-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-xl); padding: 2rem; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
        .tech-tag { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375em 0.875em; border-radius: var(--r-full); font-size: 0.8125rem; font-weight: 600; }
        .tech-tag .cat { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; }
        .frontend { background: rgba(248,153,87,0.1); color: var(--c1); }
        .backend  { background: rgba(22,163,74,0.1); color: #16a34a; }
        .ai       { background: rgba(162,31,101,0.1); color: var(--c6); }
        .ext-link { color: var(--fg3); display: flex; align-items: center; transition: color 0.2s; }
        .ext-link:hover { color: var(--fg2); }
        .ext-link svg { width: 16px; height: 16px; }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1 }}>
        {/* Hero */}
        <div className="about-hero">
          <p className="section-label">Hakkımızda</p>
          <h1 className="t-xl">Bir gün bir ürün aldık.<br /><em>Berbattı.</em></h1>
          <p className="t-body" style={{ marginTop: "1.25rem" }}>
            Yorumlar muhteşemdi. Fiyat da uygundu. Ürün geldi — berbattı. Sonra fark ettik ki yorumların yarısı bottu, fiyat bir hafta önce daha düşüktü ve o kategori iadeleriyle ünlüydü. Hiçbirini bilmiyorduk çünkü bunu söyleyen bir araç yoktu. <strong>CrowGuard AI bu yüzden var.</strong>
          </p>
        </div>

        <div className="page-wrap">

          {/* Values */}
          <div className="section-block">
            <p className="section-label">Değerlerimiz</p>
            <h2 className="t-lg" style={{ color: "var(--fg)", marginBottom: "1.5rem" }}>Neye inanıyoruz?</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon" style={{ background: "rgba(213,51,42,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d5332a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div className="value-title">Güven</div>
                <p className="value-desc">Her yorumun, her fiyatın arkasında gerçek mi var? Bunu sormadan alışveriş yapılmamalı.</p>
              </div>
              <div className="value-card">
                <div className="value-icon" style={{ background: "rgba(241,118,40,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </div>
                <div className="value-title">Şeffaflık</div>
                <p className="value-desc">Fiyat geçmişi, sahte yorum oranı, iade riski — bunlar gizli değil, sadece dağınık. Biz bir araya getiriyoruz.</p>
              </div>
              <div className="value-card">
                <div className="value-icon" style={{ background: "rgba(162,31,101,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a21f65" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <div className="value-title">Zeka</div>
                <p className="value-desc">İnsan beyninin işleyemeyeceği veriyi AI işler. Bu zekayı herkesin hizmetine sunuyoruz.</p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="section-block">
            <p className="section-label">Süreç</p>
            <h2 className="t-lg" style={{ color: "var(--fg)", marginBottom: "1.5rem" }}>Nasıl çalışır?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num-bg">01</div>
                <div className="step-bar"></div>
                <div className="step-title">Ürünü Gir</div>
                <p className="step-desc">Bir ürün linki veya isim yaz. Trendyol, Amazon, Hepsiburada — platform fark etmez.</p>
              </div>
              <div className="step-card">
                <div className="step-num-bg">02</div>
                <div className="step-bar" style={{ background: "linear-gradient(var(--c3),var(--c5))" }}></div>
                <div className="step-title">AI Analiz Eder</div>
                <p className="step-desc">Çok ajanlı sistemimiz eş zamanlı olarak fiyat geçmişini, yorum örüntülerini ve iade verilerini tarar.</p>
              </div>
              <div className="step-card">
                <div className="step-num-bg">03</div>
                <div className="step-bar" style={{ background: "linear-gradient(var(--c5),var(--c6))" }}></div>
                <div className="step-title">Karar Ver</div>
                <p className="step-desc">AL, BEKLE ya da ALTERNATİF — net bir öneri ve arkasındaki sebepler sana sunulur.</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="section-block">
            <p className="section-label">Ekip</p>
            <h2 className="t-lg" style={{ color: "var(--fg)", marginBottom: "1.5rem" }}>İki kişi, bir fikir.</h2>
            <div className="team-grid">
              <div className="team-card">
                <div className="team-top">
                  <div className="team-avatar" style={{ background: "rgba(248,153,87,0.15)", color: "var(--c1)" }}>NA</div>
                </div>
                <div className="team-name">Nazife Atlas</div>
                <div className="team-role">Frontend Developer</div>
                <p className="team-bio">Kullanıcının ekrana ilk baktığı andan itibaren ne hissedeceğini düşünerek tasarladı. React ve Next.js ile hem hızlı hem de estetik bir deneyim inşa etti. Arayüzün her detayı — Nazife&apos;nin titiz bakışının ürünü.</p>
              </div>
              <div className="team-card">
                <div className="team-top">
                  <div className="team-avatar" style={{ background: "rgba(162,31,101,0.15)", color: "var(--c5)" }}>ES</div>
                </div>
                <div className="team-name">Ervanur Şahin</div>
                <div className="team-role">Backend Developer</div>
                <p className="team-bio">Sistemin beynini kurdu. LangGraph ile orkestre edilen çok ajanlı mimari, FastAPI backend&apos;i ve Gemini API entegrasyonu — bunların hepsi Ervanur&apos;un tasarladığı altyapı üzerinde çalışıyor.</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="section-block">
            <div className="tech-card">
              <p className="section-label">Teknoloji</p>
              <h3 className="t-md" style={{ color: "var(--fg)" }}>Neyle inşa edildi?</h3>
              <div className="tech-tags">
                <span className="tech-tag frontend">Next.js 16 <span className="cat">Frontend</span></span>
                <span className="tech-tag frontend">TypeScript <span className="cat">Frontend</span></span>
                <span className="tech-tag frontend">Tailwind CSS <span className="cat">Frontend</span></span>

                <span className="tech-tag backend">FastAPI <span className="cat">Backend</span></span>
                <span className="tech-tag backend">SQLite <span className="cat">Backend</span></span>
                <span className="tech-tag ai">LangGraph <span className="cat">AI</span></span>
                <span className="tech-tag ai">Gemini API <span className="cat">AI</span></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
