import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/5 px-6 sm:px-14 py-8 bg-white dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs tracking-wider text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center sm:items-start gap-0.5">
          <span
            className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-sky-400 to-indigo-600 leading-none"
            style={{ fontFamily: "var(--font-playfair)", filter: "drop-shadow(0 2px 8px rgba(99,102,241,0.3))" }}
          >
            CrowGuard
          </span>
          <span className="text-[9px] font-bold tracking-[0.4em] text-indigo-400/70">SHOPPING ASSISTANT</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-medium">
          <Link href="/about" className="hover:text-gray-900 dark:hover:text-white transition-colors">Hakkında</Link>
          <Link href="/pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Fiyatlar</Link>
          <Link href="/faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">SSS</Link>
          <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Gizlilik</Link>
          <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Koşullar</Link>
          <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">İletişim</Link>
        </div>

        <span className="text-[10px]">© 2026 CrowGuard AI. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
