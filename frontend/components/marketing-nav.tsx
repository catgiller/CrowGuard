"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingNav() {
  return (
    <nav className="site-nav">
      <Link href="/" className="nav-logo">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "36px", width: "36px", flexShrink: 0 }}>
          <defs>
            <linearGradient id="mNavGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#f89957"/>
              <stop offset="30%"  stopColor="#f17628"/>
              <stop offset="55%"  stopColor="#d5332a"/>
              <stop offset="80%"  stopColor="#d260a5"/>
              <stop offset="100%" stopColor="#a21f65"/>
            </linearGradient>
          </defs>
          <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" fill="url(#mNavGrad)" opacity="0.15"/>
          <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" stroke="url(#mNavGrad)" strokeWidth="1.5" fill="none"/>
          <path d="M12 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4.1 1.6L24 14l-1.5 3H24l-2 2.5c.3.6.5 1.3.5 2 0 3.3-2.7 6-6 6s-6-2.7-6-6z" fill="url(#mNavGrad)"/>
          <circle cx="20" cy="19" r="1" fill="white" opacity="0.9"/>
        </svg>
        <div className="nav-logo-wrap">
          <span className="nav-logo-name">CrowGuard</span>
          <span className="nav-logo-sub">Shopping Assistant</span>
        </div>
      </Link>

      <div className="nav-links">
        <Link href="/about"   className="nav-link hide-sm">Hakkında</Link>
        <Link href="/pricing" className="nav-link hide-sm">Fiyatlar</Link>
        <Link href="/faq"     className="nav-link hide-sm">SSS</Link>
        <Link href="/contact" className="nav-link hide-sm">İletişim</Link>
        <ThemeToggle />
        <Link href="/login"   className="nav-link hide-sm">Giriş Yap</Link>
        <Link href="/login"   className="btn btn-grad btn-sm">Ücretsiz Başla</Link>
      </div>
    </nav>
  );
}
