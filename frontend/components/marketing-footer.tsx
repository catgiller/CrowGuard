import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function MarketingFooter() {
  return (
    <footer className="cg-footer">
      <div className="footer-inner">
        <BrandLogo href="/" height={40} showWordmark subLabel="Alışveriş Asistanı" />

        <ul className="footer-links">
          <li>
            <Link href="/about">Hakkında</Link>
          </li>
          <li>
            <Link href="/pricing">Fiyatlar</Link>
          </li>
          <li>
            <Link href="/faq">SSS</Link>
          </li>
          <li>
            <Link href="/privacy">Gizlilik</Link>
          </li>
          <li>
            <Link href="/terms">Koşullar</Link>
          </li>
          <li>
            <Link href="/contact">İletişim</Link>
          </li>
        </ul>

        <span className="footer-copy">© 2026 CrowGuard. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
