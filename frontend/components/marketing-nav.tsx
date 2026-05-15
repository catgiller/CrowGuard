"use client";

import Link from "next/link";
import { NavLogo } from "@/components/nav-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function MarketingNav() {
  return (
    <nav className="flex items-center justify-between px-6 sm:px-14 py-5 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl transition-colors sticky top-0 z-50">
      <NavLogo />
      <div className="flex items-center gap-2 sm:gap-6">
        <ThemeToggle />
        <Link href="/about" className="hidden md:block text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Hakkında</Link>
        <Link href="/pricing" className="hidden md:block text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Fiyatlar</Link>
        <Link href="/faq" className="hidden md:block text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">SSS</Link>
        <Link href="/contact" className="hidden md:block text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">İletişim</Link>
        <Link
          href="/login"
          className="text-sm bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Giriş Yap
        </Link>
      </div>
    </nav>
  );
}
