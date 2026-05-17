"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dotNav = dotNavRef.current;
    if (!root || !dotNav) return;

    const sections = root.querySelectorAll('.slide');
    
    // Clear and build dots
    dotNav.innerHTML = '';
    sections.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Slayt ${i + 1}`);
      btn.addEventListener('click', () => {
        const target = sections[i] as HTMLElement;
        if (target) root.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      });
      dotNav.appendChild(btn);
    });

    const updateDots = (idx: number) => {
      dotNav.querySelectorAll('button').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
      });
    };

    const counted = new Set<Element>();
    const animateCounters = (slide: Element) => {
      slide.querySelectorAll('[data-count]').forEach((el) => {
        if (counted.has(el)) return;
        counted.add(el);
        const htmlEl = el as HTMLElement;
        const end = +(htmlEl.dataset.count || 0);
        const suf = htmlEl.dataset.suffix || '';
        let startTime: number | null = null;
        const dur = 1400;
        
        const step = (ts: number) => {
          if (!startTime) startTime = ts;
          const p = Math.min((ts - startTime) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          htmlEl.textContent = Math.round(ease * end) + suf;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = +(e.target as HTMLElement).dataset.slide!;
          updateDots(idx);
          animateCounters(e.target);
        }
      });
    }, { root, threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
    updateDots(0);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .snap-root { position: fixed; inset: 0; overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none; }
        .snap-root::-webkit-scrollbar { display: none; }
        .slide { height: 100dvh; scroll-snap-align: start; position: relative; overflow: hidden; }
        .dot-nav { position: fixed; right: 1.5rem; top: 50%; transform: translateY(-50%); z-index: 300; display: flex; flex-direction: column; gap: 0.625rem; }
        .dot-nav button { width: 9px; height: 9px; border-radius: 50%; border: none; padding: 0; background: rgba(255,255,255,0.18); cursor: pointer; transition: background 0.25s, transform 0.25s; }
        .dot-nav button.active { background: #fff; transform: scale(1.25); }
        html:not(.dark) .dot-nav button { background: rgba(0,0,0,0.15); }
        html:not(.dark) .dot-nav button.active { background: var(--c3); }
        @media (max-width: 600px) { .dot-nav { display: none; } }
        .hero-bg { position: absolute; inset: 0; background: #100c14; }
        .hero-bg::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 55% at 15% 60%, rgba(241,118,40,0.11) 0%, transparent 70%), radial-gradient(ellipse 55% 50% at 85% 25%, rgba(162,31,101,0.10) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 55% 85%, rgba(213,51,42,0.07) 0%, transparent 60%); }
        .hero-content { position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column; }
        .hero-body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 clamp(1rem,5vw,5rem); padding-top: var(--nav-h); }
        .hero-label { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 1.75rem; }
        .hero-label span { width: 20px; height: 1.5px; background: var(--grad-h); border-radius: 1px; }
        .hero-h1 { font-family: var(--ff-d); font-weight: 800; font-size: clamp(2.75rem, 7vw + 0.5rem, 8rem); line-height: 1.07; color: #fff; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
        .hero-h1 em { font-style: italic; font-weight: 700; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-size: clamp(1rem, 1.8vw, 1.25rem); font-weight: 300; color: rgba(255,255,255,0.55); max-width: 560px; line-height: 1.75; margin-bottom: 2.5rem; }
        .hero-actions { display: flex; gap: 0.875rem; flex-wrap: wrap; justify-content: center; }
        .hero-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.25); animation: float 2.8s ease-in-out infinite; }
        .hero-scroll svg { width: 20px; height: 20px; }
        .problem-slide { display: flex; align-items: center; justify-content: center; background: var(--bg); padding: clamp(1.5rem,4vw,4rem); padding-top: calc(var(--nav-h) + 2rem); }
        .problem-inner { text-align: center; max-width: 900px; width: 100%; }
        .problem-h { color: var(--fg); margin-bottom: 1.25rem; }
        .problem-h em { font-style: italic; font-weight: 400; color: var(--fg3); }
        .problem-sub { color: var(--fg2); max-width: 620px; margin: 0 auto 3.5rem; }
        .stats { display: flex; gap: clamp(2rem,6vw,5rem); justify-content: center; flex-wrap: wrap; }
        .stat-num { font-family: var(--ff-d); font-weight: 800; font-size: clamp(3rem, 6vw, 6rem); line-height: 1; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-lbl { font-size: 0.8125rem; color: var(--fg3); font-weight: 500; margin-top: 0.5rem; max-width: 140px; line-height: 1.45; }
        .problem-coda { margin-top: 3.5rem; font-family: var(--ff-d); font-size: clamp(1.1rem,2vw,1.5rem); font-weight: 600; color: var(--fg); }
        .problem-coda .mark { color: var(--c3); }
        .feat-slide { display: flex; align-items: center; background: var(--bg); padding: 0 clamp(1rem,4vw,3.5rem); padding-top: var(--nav-h); gap: clamp(2rem,5vw,6rem); }
        .feat-slide.rev { flex-direction: row-reverse; }
        .feat-text { flex: 1; min-width: 0; }
        .feat-icon { width: clamp(40px,5vw,56px); height: clamp(40px,5vw,56px); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
        .feat-icon svg { width: 24px; height: 24px; }
        .feat-num { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.75rem; }
        .feat-h { color: var(--fg); margin-bottom: 1rem; }
        .feat-desc { color: var(--fg2); max-width: 480px; }
        .feat-pill { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.75rem; padding: 0.4em 1em; border-radius: var(--r-full); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid; color: inherit; }
        .feat-mock { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; }
        .mock { background: var(--card); border: 1px solid var(--card-b); border-radius: var(--r-xl); padding: 1.5rem; width: 100%; max-width: 400px; min-width: 260px; box-shadow: var(--shadow); transition: background 0.35s, border-color 0.35s; }
        .mock-header { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 1.25rem; }
        .mock-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mock-icon svg { width: 18px; height: 18px; }
        .mock-title { font-size: 0.8125rem; font-weight: 700; color: var(--fg); line-height: 1.25; }
        .mock-sub { font-size: 0.6875rem; color: var(--fg3); }
        .risk-bar-track { height: 8px; background: var(--bg2); border-radius: 4px; overflow: hidden; margin: 0.625rem 0; }
        .risk-bar-fill { height: 100%; border-radius: 4px; background: var(--grad); }
        .risk-label { display: flex; justify-content: space-between; font-size: 0.6875rem; font-weight: 600; }
        .reason-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; }
        .reason-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8125rem; color: var(--fg2); }
        .reason-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c2); flex-shrink: 0; margin-top: 0.375rem; }
        .price-tabs { display: flex; gap: 0.375rem; margin-bottom: 1.25rem; }
        .price-tab { flex: 1; text-align: center; padding: 0.5em 0.25em; border-radius: 8px; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: 1.5px solid var(--border); color: var(--fg3); cursor: default; }
        .price-tab.active-al { background: rgba(34,197,94,0.1); color: #16a34a; border-color: #16a34a44; }
        .price-tab.active-bk { background: rgba(248,153,87,0.12); color: var(--c2); border-color: rgba(241,118,40,0.35); }
        .price-tab.active-sw { background: rgba(162,31,101,0.1); color: var(--c6); border-color: rgba(162,31,101,0.3); }
        .price-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.8125rem; }
        .price-row:last-child { border-bottom: none; }
        .price-row .lbl { color: var(--fg3); font-weight: 500; }
        .price-row .val { font-weight: 700; color: var(--fg); }
        .trust-stars { display: flex; gap: 2px; }
        .star { font-size: 1rem; }
        .star.full { color: #f59e0b; }
        .star.half { color: #f59e0b; opacity: 0.5; }
        .star.empty { color: var(--bg3); }
        .trust-section { margin: 1rem 0 0.5rem; }
        .trust-meter-track { height: 6px; background: var(--bg2); border-radius: 3px; overflow: hidden; margin: 0.375rem 0; }
        .trust-meter-fill { height: 100%; border-radius: 3px; }
        .chat-bubble { background: var(--bg2); border-radius: 16px 16px 16px 4px; padding: 0.875rem 1rem; font-size: 0.8125rem; color: var(--fg); margin-bottom: 0.75rem; line-height: 1.5; }
        .chat-reply { background: var(--grad); border-radius: 16px 16px 4px 16px; padding: 0.875rem 1rem; font-size: 0.8125rem; color: #fff; line-height: 1.5; }
        .chat-product { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.15); }
        .chat-product-img { width: 38px; height: 38px; border-radius: 8px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
        .chat-product-info .name { font-weight: 700; font-size: 0.8125rem; }
        .chat-product-info .meta { font-size: 0.6875rem; opacity: 0.75; }
        @media (max-width: 900px) { .feat-slide { flex-direction: column !important; padding-top: calc(var(--nav-h) + 1.25rem); } .feat-mock { width: 100%; max-width: 400px; margin: 0 auto; } .feat-text { text-align: center; } .feat-desc { margin: 0 auto; } .feat-pill { margin-top: 1.25rem; } }
        .cta-slide { display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg); text-align: center; padding: 0 clamp(1rem,4vw,3.5rem); padding-top: var(--nav-h); }
        .cta-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 50% 40% at 30% 40%, rgba(241,118,40,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(162,31,101,0.06) 0%, transparent 70%); }
        .cta-h { color: var(--fg); margin-bottom: 1.25rem; }
        .cta-h em { font-style: italic; font-weight: 400; color: var(--fg3); }
        .cta-sub { color: var(--fg2); max-width: 440px; margin: 0 auto 2.5rem; }
        .cta-footer-bar { position: absolute; bottom: 0; left: 0; right: 0; border-top: 1px solid var(--border); padding: 1.375rem clamp(1rem,4vw,3.5rem); background: var(--bg); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; }
        .cta-footer-links { display: flex; flex-wrap: wrap; gap: 0.375rem 1.25rem; list-style: none; }
        .cta-footer-links a { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg3); transition: color 0.2s; }
        .cta-footer-links a:hover { color: var(--c2); }
      `}} />

      <nav className="site-nav">
        <Link href="/" className="nav-logo">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="mr-2 shrink-0">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#f89957" />
                <stop offset="30%"  stopColor="#f17628" />
                <stop offset="55%"  stopColor="#d5332a" />
                <stop offset="80%"  stopColor="#d260a5" />
                <stop offset="100%" stopColor="#a21f65" />
              </linearGradient>
            </defs>
            <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" fill="url(#logoGrad)" opacity="0.15"/>
            <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none"/>
            <path d="M12 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4.1 1.6L24 14l-1.5 3H24l-2 2.5c.3.6.5 1.3.5 2 0 3.3-2.7 6-6 6s-6-2.7-6-6z" fill="url(#logoGrad)"/>
            <circle cx="20" cy="19" r="1" fill="white" opacity="0.9"/>
          </svg>
          <div className="nav-logo-wrap">
            <span className="nav-logo-name">CrowGuard</span>
            <span className="nav-logo-sub">Shopping Assistant</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/about" className="nav-link hide-sm">Hakkında</Link>
          <Link href="/pricing" className="nav-link hide-sm">Fiyatlar</Link>
          <Link href="/faq" className="nav-link hide-sm">SSS</Link>
          <Link href="/contact" className="nav-link hide-sm">İletişim</Link>
          <ThemeToggle />
          <Link href="/login" className="nav-link hide-sm">Giriş Yap</Link>
          <Link href="/login" className="btn btn-grad btn-sm">Ücretsiz Başla</Link>
        </div>
      </nav>

      <nav className="dot-nav" ref={dotNavRef} aria-label="Sayfa navigasyonu"></nav>

      <main className="snap-root" ref={rootRef}>
        
        {/* SLIDE 0 */}
        <section className="slide" data-slide="0">
          <div className="hero-bg"></div>
          <div className="hero-content">
            <div className="hero-body">
              <div className="hero-label anim-fade-up"><span></span> YZ Destekli Alışveriş Koruması</div>
              <h1 className="hero-h1 anim-fade-up anim-d1">
                Akıllıca alışveriş.<br /><em>Her zaman.</em>
              </h1>
              <p className="hero-sub anim-fade-up anim-d2">
                Yapay zeka destekli fiyat takibi, sahte yorum tespiti ve iade riski analizi ile her satın almada doğru kararı verin.
              </p>
              <div className="hero-actions anim-fade-up anim-d3">
                <Link href="/login" className="btn btn-grad btn-lg">Ücretsiz Başla</Link>
                <button onClick={() => {
                  const target = rootRef.current?.querySelectorAll('.slide')[1] as HTMLElement;
                  if (target) rootRef.current?.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                }} className="btn btn-outline-light btn-lg">Özellikleri Keşfet</button>
              </div>
            </div>
            <div className="hero-scroll" role="presentation">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
          </div>
        </section>

        {/* SLIDE 1 */}
        <section className="slide problem-slide" data-slide="1" style={{ fontFamily: 'DM Sans' }}>
          <div className="problem-inner">
            <p className="section-label">Problem</p>
            <h2 className="t-xl problem-h anim-fade-up">
              Online alışveriş hâlâ<br /><em>bir güven sorunu.</em>
            </h2>
            <p className="t-body problem-sub anim-fade-up anim-d1">
              Manipüle yorumlar, yapay fiyatlar ve ürün gerçekliği arasındaki uçurum — her gün milyonlarca tüketiciyi yanıltıyor.
            </p>
            <div className="stats">
              <div className="anim-fade-up anim-d1">
                <div className="stat-num" data-count="67" data-suffix="%">0%</div>
                <p className="stat-lbl">tüketici çevrimiçi yorumlara güvenme konusunda kararsız</p>
              </div>
              <div className="anim-fade-up anim-d2">
                <div className="stat-num" data-count="31" data-suffix="%">0%</div>
                <p className="stat-lbl">e-ticaret iadesi yanlış satın alma kararından kaynaklanıyor</p>
              </div>
              <div className="anim-fade-up anim-d3">
                <div className="stat-num" data-count="4" data-suffix="x">0x</div>
                <p className="stat-lbl">daha akıllı kararlar ile iade oranı düşüyor</p>
              </div>
            </div>
            <p className="problem-coda anim-fade-up anim-d4" style={{ fontFamily: "Crimson Text" }}>
              <span className="mark" style={{ fontFamily: "Crimson Text" }}>CrowGuard AI</span> bu kaosu sona erdirmek için burada.
            </p>
          </div>
        </section>

        {/* SLIDE 2 */}
        <section className="slide feat-slide" data-slide="2">
          <div className="feat-text">
            <div className="feat-icon" style={{ background: "rgba(248,153,87,0.12)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/></svg>
            </div>
            <h2 className="t-lg feat-h">İade<br />Tahminleme</h2>
            <p className="t-body feat-desc">Bir ürünü sepete atmadan önce iade riskini öğrenin. Geçmiş binlerce veriyi semantik olarak analiz ederek size net bir risk skoru ve kök neden raporu sunarız.</p>
            <span className="feat-pill" style={{ color: "var(--c2)", borderColor: "rgba(241,118,40,0.3)", background: "rgba(241,118,40,0.07)" }}>Return Intelligence</span>
          </div>
          <div className="feat-mock">
            <div className="mock">
              <div className="mock-header">
                <div className="mock-icon" style={{ background: "rgba(241,118,40,0.12)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div><div className="mock-title">Nike Air Force 1 &apos;07</div><div className="mock-sub">Trendyol · Spor Ayakkabı</div></div>
              </div>
              <div className="risk-label"><span style={{ color: "var(--fg3)", fontSize: ".6875rem", fontWeight: 600 }}>İade Riski</span><span style={{ color: "var(--c3)", fontWeight: 800, fontSize: ".875rem" }}>%78 Yüksek</span></div>
              <div className="risk-bar-track"><div className="risk-bar-fill" style={{ width: "78%" }}></div></div>
              <ul className="reason-list">
                <li className="reason-item"><div className="reason-dot"></div>Kalıbı dar — 1 numara büyük önerilir</li>
                <li className="reason-item"><div className="reason-dot" style={{ background: "var(--c4)" }}></div>Renk ekrandakinden farklı rapor edilmiş</li>
                <li className="reason-item"><div className="reason-dot" style={{ background: "var(--c6)" }}></div>Taban malzemesi beklentinin altında</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SLIDE 3 */}
        <section className="slide feat-slide rev" data-slide="3">
          <div className="feat-text">
            <div className="feat-icon" style={{ background: "rgba(213,51,42,0.10)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d5332a" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/></svg>
            </div>
            <h2 className="t-lg feat-h">Stratejik<br />Fiyat Radarı</h2>
            <p className="t-body feat-desc">Fiyat karşılaştırmanın ötesine geçin. AI, fiyatın değerini sorgular — AL, BEKLE ya da ALTERNATİF önerir. Net. Veriye dayalı. Anında.</p>
            <span className="feat-pill" style={{ color: "var(--c3)", borderColor: "rgba(213,51,42,0.3)", background: "rgba(213,51,42,0.07)" }}>Price Guard</span>
          </div>
          <div className="feat-mock">
            <div className="mock">
              <div className="mock-header">
                <div className="mock-icon" style={{ background: "rgba(213,51,42,0.10)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d5332a" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div><div className="mock-title">MacBook Air M3 13&quot;</div><div className="mock-sub">Apple · Laptop</div></div>
              </div>
              <div className="price-tabs">
                <div className="price-tab">AL</div>
                <div className="price-tab active-bk">BEKLE ✓</div>
                <div className="price-tab">ALTERNATİF</div>
              </div>
              <div className="price-row"><span className="lbl">Güncel Fiyat</span><span className="val" style={{ color: "var(--c3)" }}>₺52.999</span></div>
              <div className="price-row"><span className="lbl">Tarihi Ortalama</span><span className="val">₺46.500</span></div>
              <div className="price-row"><span className="lbl">Tahmini Düşüş</span><span className="val" style={{ color: "#16a34a" }}>~3 hafta</span></div>
              <p style={{ fontSize: ".75rem", color: "var(--fg3)", marginTop: ".875rem", lineHeight: 1.5 }}>Fiyat son kampanyadan sonra %14 şişti. Beklemek önerilir.</p>
            </div>
          </div>
        </section>

        {/* SLIDE 4 */}
        <section className="slide feat-slide" data-slide="4">
          <div className="feat-text">
            <div className="feat-icon" style={{ background: "rgba(210,96,165,0.10)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d260a5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h2 className="t-lg feat-h">Güven ve<br />Şeffaflık</h2>
            <p className="t-body feat-desc">4.8 yıldızlı ürün aslında 3.2 mi? Yorumların dil örüntüsünü, geliş hızını ve hesap profillerini analiz ederek gerçek güven skorunu ortaya çıkarırız.</p>
            <span className="feat-pill" style={{ color: "var(--c4)", borderColor: "rgba(210,96,165,0.3)", background: "rgba(210,96,165,0.07)" }}>Integrity Radar</span>
          </div>
          <div className="feat-mock">
            <div className="mock">
              <div className="mock-header">
                <div className="mock-icon" style={{ background: "rgba(210,96,165,0.10)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#d260a5" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                </div>
                <div><div className="mock-title">Xiaomi Mi Robot Süpürge</div><div className="mock-sub">Hepsiburada · Ev Aletleri</div></div>
              </div>
              <div style={{ marginBottom: ".875rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".375rem" }}>
                  <span style={{ fontSize: ".6875rem", fontWeight: 600, color: "var(--fg3)" }}>Gösterilen Skor</span>
                  <div className="trust-stars">
                    <span className="star full">★</span><span className="star full">★</span><span className="star full">★</span><span className="star full">★</span><span className="star half">★</span>
                    <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--fg)", marginLeft: ".25rem" }}>4.8</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: ".6875rem", fontWeight: 600, color: "var(--fg3)" }}>Gerçek Güven Skoru</span>
                  <div className="trust-stars">
                    <span className="star full">★</span><span className="star full">★</span><span className="star full">★</span><span className="star empty">★</span><span className="star empty">★</span>
                    <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--c4)", marginLeft: ".25rem" }}>3.2</span>
                  </div>
                </div>
              </div>
              <div className="trust-meter-track"><div className="trust-meter-fill" style={{ width: "42%", background: "linear-gradient(90deg,var(--c3),var(--c4))" }}></div></div>
              <p style={{ fontSize: ".75rem", color: "var(--c3)", fontWeight: 700, marginTop: ".375rem" }}>%42 yorum şüpheli — bot aktivitesi tespit edildi</p>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: ".875rem" }}>
                <span style={{ fontSize: ".625rem", fontWeight: 700, padding: ".25em .6em", borderRadius: "4px", background: "rgba(213,51,42,0.1)", color: "var(--c3)" }}>Toplu Hesap</span>
                <span style={{ fontSize: ".625rem", fontWeight: 700, padding: ".25em .6em", borderRadius: "4px", background: "rgba(210,96,165,0.1)", color: "var(--c4)" }}>Dil Tekrarı</span>
                <span style={{ fontSize: ".625rem", fontWeight: 700, padding: ".25em .6em", borderRadius: "4px", background: "rgba(241,118,40,0.1)", color: "var(--c2)" }}>Hızlı Yorum</span>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5 */}
        <section className="slide feat-slide rev" data-slide="5">
          <div className="feat-text">
            <div className="feat-icon" style={{ background: "rgba(162,31,101,0.10)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a21f65" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <h2 className="t-lg feat-h">Çok Ajanlı<br />Akıllı Danışman</h2>
            <p className="t-body feat-desc">Ne aradığınızı tam bilmiyorsanız sorun değil. Bütçenizi ve ihtiyacınızı doğal dilde anlatın — Gemini tabanlı AI sistemi en optimize ürünleri sizin için bulur.</p>
            <span className="feat-pill" style={{ color: "var(--c6)", borderColor: "rgba(162,31,101,0.3)", background: "rgba(162,31,101,0.07)" }}>Multi-Agent Advisor</span>
          </div>
          <div className="feat-mock">
            <div className="mock">
              <div className="chat-bubble">&quot;Hafta sonu kamp yapacağım, yeni başlayanlar için fiyat/performans odaklı bir çadır seti öner — bütçem 2000₺&quot;</div>
              <div className="chat-reply">
                Sizin için 3 seçenek analiz ettim ✓
                <div className="chat-product">
                  <div className="chat-product-img">⛺</div>
                  <div className="chat-product-info">
                    <div className="name">Vanguard Pro 2+1 Kamp Seti</div>
                    <div className="meta">₺1.850 · ⭐ 4.6 Gerçek · %9 İade Riski · Stokta ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 6 */}
        <section className="slide cta-slide" data-slide="6">
          <div className="cta-glow"></div>
          <div style={{ position: "relative", zIndex: 10, paddingBottom: "6rem" }}>
            <p className="section-label">Hazır mısınız?</p>
            <h2 className="t-xl cta-h" style={{ marginBottom: "1.25rem" }}>
              Pişmanlıksız alışveriş<br /><em>bugün başlıyor.</em>
            </h2>
            <p className="t-body cta-sub">Kredi kartı gerektirmez. Ücretsiz başlayın, ihtiyaç duydukça yükseltin.</p>
            <div style={{ display: "flex", gap: ".875rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/login" className="btn btn-grad btn-xl">Ücretsiz Başla</Link>
              <Link href="/pricing" className="btn btn-ghost btn-xl">Planları İncele</Link>
            </div>
          </div>
          <div className="cta-footer-bar">
            <div>
              <div className="footer-logo-name" style={{ textAlign: "left" }}>CrowGuard</div>
              <div className="footer-logo-sub">Shopping Assistant</div>
            </div>
            <ul className="cta-footer-links">
              <li><Link href="/about">Hakkında</Link></li>
              <li><Link href="/pricing">Fiyatlar</Link></li>
              <li><Link href="/faq">SSS</Link></li>
              <li><Link href="/contact">İletişim</Link></li>
              <li><Link href="/privacy">Gizlilik</Link></li>
              <li><Link href="/terms">Koşullar</Link></li>
            </ul>
            <span className="footer-copy">© 2026 CrowGuard AI</span>
          </div>
        </section>
      </main>
    </>
  );
}
