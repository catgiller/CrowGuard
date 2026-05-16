"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Sparkles, History, User, LogOut, Home } from "lucide-react";
import { NavLogo } from "@/components/nav-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { name: "Ana Sayfa", href: "/dashboard", icon: Home },
  { name: "Ürün Analizi", href: "/dashboard/product-analysis", icon: Search },
  { name: "Akıllı Asistan", href: "/dashboard/smart-advisor", icon: Sparkles },
  { name: "Geçmiş Aramalar", href: "/dashboard/history", icon: History },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="hidden md:flex flex-col justify-between border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505] transition-colors duration-500 shrink-0 overflow-hidden"
    >
      <div className="w-[280px] p-5 pt-6">
        {/* Logo */}
        <div className="mb-10 -ml-1">
          <NavLogo />
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm border border-gray-200 dark:border-white/5"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-500 dark:text-indigo-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="w-[280px] p-5 border-t border-gray-200 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Tema</span>
          <ThemeToggle />
        </div>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5 transition-all whitespace-nowrap"
        >
          <User className="h-4 w-4 shrink-0" />
          Profilim
        </Link>

        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all whitespace-nowrap"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Çıkış Yap
        </button>
      </div>
    </motion.aside>
  );
}
