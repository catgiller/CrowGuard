"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingNav() {
  return (
    <nav className="site-nav">
      <BrandLogo href="/" height={42} />

      <div className="nav-links">
        <Link href="/about" className="nav-link hide-sm">
          Hakkında
        </Link>
        <Link href="/pricing" className="nav-link hide-sm">
          Fiyatlar
        </Link>
        <Link href="/faq" className="nav-link hide-sm">
          SSS
        </Link>
        <Link href="/contact" className="nav-link hide-sm">
          İletişim
        </Link>
        <ThemeToggle />
        <Link href="/login" className="nav-link hide-sm">
          Giriş Yap
        </Link>
        <Link href="/login" className="btn btn-grad btn-sm">
          Ücretsiz Başla
        </Link>
      </div>
    </nav>
  );
}
