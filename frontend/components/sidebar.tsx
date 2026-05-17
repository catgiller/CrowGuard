"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Sparkles, History, User, LogOut, Home } from "lucide-react";
import { NavLogo } from "@/components/nav-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

interface SidebarProps { isOpen: boolean; }

const navItems = [
  { name: "Ana Sayfa",      href: "/dashboard",                  icon: Home },
  { name: "Ürün Analizi",   href: "/dashboard/product-analysis", icon: Search },
  { name: "Akıllı Asistan", href: "/dashboard/smart-advisor",    icon: Sparkles },
  { name: "Geçmiş",         href: "/dashboard/history",          icon: History },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="hidden md:flex flex-col justify-between border-r border-gray-100 dark:border-white/5 bg-[#faf8f6] dark:bg-[#13101a] transition-colors duration-500 shrink-0 overflow-hidden"
    >
      <div className="w-[260px] p-5 pt-6 flex flex-col gap-8">
        {/* Logo */}
        <NavLogo />

        {/* Section label */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 px-3 mb-2">Araçlar</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white dark:bg-white/8 text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-white/8"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    className="h-4 w-4 shrink-0"
                    style={isActive ? { color: "#d5332a" } : {}}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="w-[260px] p-5 border-t border-gray-100 dark:border-white/5 space-y-1">
        <div className="flex items-center justify-between px-3 mb-3">
          <span className="text-xs font-medium text-gray-400">Tema</span>
          <ThemeToggle />
        </div>
        <Link href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5 transition-all whitespace-nowrap">
          <User className="h-4 w-4 shrink-0" />
          Profilim
        </Link>
        <div className="pt-3 border-t border-gray-100 dark:border-white/5">
          {/* User avatar row */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#f17628,#d5332a,#d260a5,#a21f65)" }}>
              NA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Kullanıcı</p>
              <p className="text-[10px] text-gray-400">Ücretsiz Plan</p>
            </div>
          </div>
          <button onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-1 whitespace-nowrap">
            <LogOut className="h-4 w-4 shrink-0" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
