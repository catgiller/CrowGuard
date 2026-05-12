"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Sparkles, History, User, LogOut, Home } from "lucide-react";
import { NavLogo } from "@/components/nav-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Ana Sayfa", href: "/dashboard", icon: Home },
    { name: "Ürün Analizi", href: "/dashboard/product-analysis", icon: Search },
    { name: "Akıllı Asistan", href: "/dashboard/smart-advisor", icon: Sparkles },
    { name: "Geçmiş Aramalar", href: "/dashboard/history", icon: History },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#050505] hidden md:flex flex-col justify-between transition-colors duration-500 shrink-0">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-12">
          <NavLogo />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm border border-gray-200 dark:border-white/5"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-indigo-500 dark:text-indigo-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between px-4">
          <span className="text-sm font-medium text-gray-500">Tema</span>
          <ThemeToggle />
        </div>
        
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5 transition-all"
        >
          <User className="h-4 w-4" />
          Profilim
        </Link>
        
        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
