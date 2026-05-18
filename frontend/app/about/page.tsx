import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .about-wrap { max-width: 1100px; margin: 0 auto; padding: 0 clamp(1.5rem,5vw,4rem); }

        /* Hero */
        .about-hero { padding: calc(var(--nav-h) + 4.5rem) 0 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem,5vw,6rem); align-items: center; }
        @media (max-width: 700px) { .about-hero { grid-template-columns: 1fr; } }
        .about-hero h1 { font-family: var(--ff-d); font-size: clamp(2.25rem,4.5vw,3.5rem); font-weight: 800; color: var(--fg); line-height: 1.1; margin-bottom: 1.5rem; }
        .about-hero-lead { font-size: 1.0625rem; color: var(--fg2); line-height: 1.85; margin-bottom: 1rem; }
        .about-hero-lead:last-child { margin-bottom: 0; }
        .about-hero-stat { display: flex; flex-direction: column; gap: 1rem; }
        .hero-stat-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-lg); padding: 1.5rem 1.75rem; }
        .hero-stat-num { font-family: var(--ff-d); font-size: 2.25rem; font-weight: 800; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.375rem; }
        .hero-stat-lbl { font-size: 0.875rem; color: var(--fg3); line-height: 1.5; }

        /* Divider */
        .divider { height: 1px; background: var(--border); margin: 3.5rem 0; }

        /* Vision */
        .vision-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 2rem; }
        @media (max-width: 700px) { .vision-grid { grid-template-columns: 1fr; } }
        .vision-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-xl); padding: 1.75rem; }
        .vision-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .vision-icon svg { width: 20px; height: 20px; }
        .vision-title { font-family: var(--ff-d); font-size: 1rem; font-weight: 700; color: var(--fg); margin-bottom: 0.625rem; }
        .vision-desc { font-size: 0.875rem; color: var(--fg2); line-height: 1.7; }

        /* How */
        .how-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; margin-top: 2rem; }
        @media (max-width: 700px) { .how-row { grid-template-columns: 1fr; } }
        .how-step { padding: 1.75rem; border: 1px solid var(--card-b); background: var(--card); }
        .how-step:first-child { border-radius: var(--r-xl) 0 0 var(--r-xl); }
        .how-step:last-child  { border-radius: 0 var(--r-xl) var(--r-xl) 0; }
        @media (max-width: 700px) { .how-step:first-child { border-radius: var(--r-xl) var(--r-xl) 0 0; } .how-step:last-child { border-radius: 0 0 var(--r-xl) var(--r-xl); } }
        .how-step + .how-step { border-left: none; }
        @media (max-width: 700px) { .how-step + .how-step { border-left: 1px solid var(--card-b); border-top: none; } }
        .how-num { font-family: var(--ff-d); font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.14em; color: var(--fg3); margin-bottom: 0.75rem; }
        .how-title { font-family: var(--ff-d); font-size: 1.0625rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
        .how-desc { font-size: 0.875rem; color: var(--fg2); line-height: 1.7; }

        /* Team */
        .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2rem; }
        @media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }
        .team-card { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-xl); padding: 2rem; display: flex; gap: 1.5rem; align-items: flex-start; }
        @media (max-width: 480px) { .team-card { flex-direction: column; } }
        .team-photo { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--bg3); }
        .team-photo-placeholder { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--ff-d); font-size: 1.25rem; font-weight: 800; flex-shrink: 0; }
        .team-info { flex: 1; min-width: 0; }
        .team-name { font-family: var(--ff-d); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 0.2rem; }
        .team-role { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.875rem; }
        .team-bio { font-size: 0.875rem; color: var(--fg2); line-height: 1.75; margin-bottom: 1rem; }
        .team-linkedin { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; font-weight: 700; color: var(--fg3); text-decoration: none; transition: color 0.2s; }
        .team-linkedin:hover { color: #0a66c2; }
        .team-linkedin svg { width: 14px; height: 14px; }

        /* Tech */
        .tech-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
        .tech-pill { display: inline-flex; align-items: center; padding: 0.35em 0.875em; border-radius: var(--r-full); font-size: 0.8125rem; font-weight: 600; border: 1px solid var(--border); color: var(--fg2); background: var(--bg2); }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1 }}>
        <div className="about-wrap">

          {/* ── Hero ───────────────────────────── */}
          <div className="about-hero">
            <div>
              <p className="section-label">Hakkımızda</p>
              <h1>Akıllı alışveriş,<br />herkes için.</h1>
              <p className="about-hero-lead">
                CrowGuard AI, e-ticarette kaybolup giden güveni geri getirmek için
                kuruldu. Sahte yorumlar, yapay fiyat indirimleri ve iade riski taşıyan
                ürünler — bunları görmezden gelmek artık zorunda değilsiniz.
              </p>
              <p className="about-hero-lead">
                Bir hackathon fikri olarak doğdu; gerçek bir ürüne dönüştü.
              </p>
            </div>
            <div className="about-hero-stat">
              <div className="hero-stat-card">
                <div className="hero-stat-num">3&nbsp;saniye</div>
                <div className="hero-stat-lbl">Ürün URL'si girdikten sonra ilk analiz sonucuna ulaşma süresi</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-num">4&nbsp;ajan</div>
                <div className="hero-stat-lbl">Aynı anda çalışan yapay zeka ajanı — fiyat, yorum, iade ve öneri</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-num">3&nbsp;platform</div>
                <div className="hero-stat-lbl">Trendyol, Amazon ve Hepsiburada desteği — daha fazlası yolda</div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Vizyon ─────────────────────────── */}
          <div>
            <p className="section-label">Vizyon</p>
            <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.75rem" }}>
              Nereye gidiyoruz?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.8, maxWidth: "680px" }}>
              Hedefimiz basit: online alışverişte aldatılma korkusunu ortadan kaldırmak.
              Bunun için yapay zeka sadece bir araç — asıl mesele doğru soruları sormak ve
              kullanıcıya dürüst yanıtlar vermek.
            </p>
            <div className="vision-grid">
              <div className="vision-card">
                <div className="vision-icon" style={{ background: "rgba(213,51,42,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d5332a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div className="vision-title">Güvenilir veri</div>
                <p className="vision-desc">Yorumları, fiyat geçmişini ve satıcı davranışlarını birlikte analiz ederek manipülasyonu tespit ediyoruz.</p>
              </div>
              <div className="vision-card">
                <div className="vision-icon" style={{ background: "rgba(241,118,40,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div className="vision-title">Anlık karar</div>
                <p className="vision-desc">AL, BEKLE ya da ALTERNATİF — uzun raporlar değil, net ve gerekçeli bir öneri. Hızlı, sade, işe yarar.</p>
              </div>
              <div className="vision-card">
                <div className="vision-icon" style={{ background: "rgba(162,31,101,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a21f65" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div className="vision-title">Herkes için</div>
                <p className="vision-desc">Teknik bilgi gerektirmeden kullanılabilir. Bir URL yeterli — gerisini yapay zeka halleder.</p>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Nasıl çalışır ───────────────────── */}
          <div>
            <p className="section-label">Süreç</p>
            <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.75rem" }}>
              Perde arkasında ne oluyor?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.8, maxWidth: "640px" }}>
              Bir ürün linki girdiğinde LangGraph tabanlı çok ajanlı sistemimiz devreye girer.
              Dört ajan paralel olarak çalışır ve sonuçları birleştirerek tek bir karar üretir.
            </p>
            <div className="how-row">
              <div className="how-step">
                <div className="how-num">01 — VERİ</div>
                <div className="how-title">Bilgi toplanır</div>
                <p className="how-desc">Ürün bilgileri, fiyat geçmişi ve kullanıcı yorumları ilgili platformdan çekilir.</p>
              </div>
              <div className="how-step">
                <div className="how-num">02 — ANALİZ</div>
                <div className="how-title">Ajanlar çalışır</div>
                <p className="how-desc">Fiyat, yorum güvenilirliği ve iade riski ajanları aynı anda analiz yapar. Gemini API her birini değerlendirir.</p>
              </div>
              <div className="how-step">
                <div className="how-num">03 — KARAR</div>
                <div className="how-title">Sonuç sunulur</div>
                <p className="how-desc">Tüm veriler birleştirilir, net bir öneri ve kısa bir gerekçe kullanıcıya iletilir.</p>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Ekip ───────────────────────────── */}
          <div>
            <p className="section-label">Ekip</p>
            <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.75rem" }}>
              Biz kimiz?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.8, maxWidth: "600px" }}>
              İkimiz de yazılım geliştirici ve hayat arkadaşıyız. Bu projeyi hem birlikte
              çalışabildiğimizi görmek hem de gerçek bir şey üretmek için yaptık.
            </p>
            <div className="team-grid">
              <div className="team-card">
                {/* Profil fotoğrafı gelince: <img src="/team/nazife.jpg" alt="Nazife Atlas" className="team-photo" /> */}
                <div className="team-photo-placeholder" style={{ background: "rgba(248,153,87,0.15)", color: "var(--c1)" }}>NA</div>
                <div className="team-info">
                  <div className="team-name">Nazife Atlas</div>
                  <div className="team-role">Frontend Developer</div>
                  <p className="team-bio">
                    Arayüz tasarımı ve kullanıcı deneyimi benim alanım. Projenin görsel
                    dilini, sayfa yapısını ve etkileşimlerini tasarladım.
                    Next.js ve TypeScript ile çalışıyorum.
                  </p>
                  <Link href="https://www.linkedin.com/in/nazife-atlas/" target="_blank" rel="noopener noreferrer" className="team-linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </Link>
                </div>
              </div>
              <div className="team-card">
                {/* Profil fotoğrafı gelince: <img src="/team/ervanur.jpg" alt="Ervanur Şahin" className="team-photo" /> */}
                <div className="team-photo-placeholder" style={{ background: "rgba(162,31,101,0.15)", color: "var(--c5)" }}>ES</div>
                <div className="team-info">
                  <div className="team-name">Ervanur Şahin</div>
                  <div className="team-role">Backend Developer</div>
                  <p className="team-bio">
                    Sistemin çalışma mantığını ve yapay zeka mimarisini kurdum.
                    Çok ajanlı LangGraph yapısı, FastAPI servisleri ve Gemini
                    entegrasyonu benim tarafımdan geliştirildi.
                  </p>
                  <Link href="https://www.linkedin.com/in/erva-şahin-973650392/" target="_blank" rel="noopener noreferrer" className="team-linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Teknoloji ──────────────────────── */}
          <div style={{ marginBottom: "5rem" }}>
            <p className="section-label">Teknoloji</p>
            <h2 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.75rem" }}>
              Altında ne var?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.8, maxWidth: "600px", marginBottom: 0 }}>
              Hız, esneklik ve ölçeklenebilirlik için seçilmiş modern araçlar.
            </p>
            <div className="tech-row">
              <span className="tech-pill">Next.js</span>
              <span className="tech-pill">TypeScript</span>
              <span className="tech-pill">Tailwind CSS</span>
              <span className="tech-pill">FastAPI</span>
              <span className="tech-pill">SQLite</span>
              <span className="tech-pill">LangGraph</span>
              <span className="tech-pill">Gemini API</span>
            </div>
          </div>

        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
