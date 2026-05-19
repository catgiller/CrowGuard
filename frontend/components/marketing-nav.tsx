"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const NAV_LINKS = [
  { href: "/about",   label: "Hakkında" },
  { href: "/pricing", label: "Fiyatlar" },
  { href: "/faq",     label: "SSS" },
  { href: "/contact", label: "İletişim" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-overlay { display: none; position: fixed; inset: 0; z-index: 190; background: rgba(0,0,0,0.45); backdrop-filter: blur(4px); }
        .mobile-overlay.open { display: block; }
        .mobile-drawer { position: fixed; top: 0; right: 0; bottom: 0; z-index: 195; width: min(280px, 80vw); background: var(--bg); border-left: 1px solid var(--border); display: flex; flex-direction: column; padding: 1.5rem 1.25rem; gap: 0.375rem; transform: translateX(100%); transition: transform 0.28s cubic-bezier(0.22,1,0.36,1); }
        .mobile-drawer.open { transform: translateX(0); }
        .drawer-close { align-self: flex-end; width: 36px; height: 36px; border-radius: 50%; background: var(--bg2); border: 1.5px solid var(--border); color: var(--fg2); display: flex; align-items: center; justify-content: center; cursor: pointer; margin-bottom: 0.75rem; flex-shrink: 0; }
        .drawer-close svg { width: 16px; height: 16px; }
        .drawer-link { display: block; padding: 0.75rem 0.875rem; border-radius: var(--r-md); font-size: 1rem; font-weight: 500; color: var(--fg2); text-decoration: none; transition: background 0.15s, color 0.15s; }
        .drawer-link:hover { background: var(--bg2); color: var(--fg); }
        .drawer-divider { height: 1px; background: var(--border); margin: 0.5rem 0; }
        .drawer-cta { display: block; text-align: center; margin-top: 0.5rem; }
        .hamburger-btn { display: none; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--r-md); background: var(--bg2); border: 1.5px solid var(--border); color: var(--fg2); cursor: pointer; flex-shrink: 0; }
        .hamburger-btn svg { width: 18px; height: 18px; }
        @media (max-width: 767px) { .hamburger-btn { display: flex; } }
      ` }} />

      {/* Overlay */}
      <div className={`mobile-overlay${open ? " open" : ""}`} onClick={close} aria-hidden />

      {/* Drawer */}
      <div className={`mobile-drawer${open ? " open" : ""}`} role="dialog" aria-label="Navigasyon menüsü">
        <button className="drawer-close" onClick={close} aria-label="Menüyü kapat">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="drawer-link" onClick={close}>{l.label}</Link>
        ))}
        <div className="drawer-divider" />
        <Link href="/login" className="drawer-link" onClick={close}>Giriş Yap</Link>
        <Link href="/login" className="btn btn-grad drawer-cta" onClick={close}>Ücretsiz Başla</Link>
      </div>

      {/* Nav */}
      <nav className="site-nav">
        <BrandLogo href="/" height={42} />

        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link hide-sm">{l.label}</Link>
          ))}
          <Link href="/login" className="nav-link hide-sm">Giriş Yap</Link>
          <Link href="/login" className="btn btn-grad btn-sm">Ücretsiz Başla</Link>
          <button className="hamburger-btn" onClick={() => setOpen(true)} aria-label="Menüyü aç">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
