"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus, ArrowRight, Loader2, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLogo } from "@/components/nav-logo";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Ervanur arka planı bitirene kadar sahte (mock) yönlendirme
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    }, 800);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* ─── LEFT SIDE: Auth Form ─── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[45%] min-h-screen px-10 sm:px-16 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        
        {/* Top Navbar */}
        <div className="absolute top-8 left-10 sm:left-16 right-10 flex justify-between items-center">
          <NavLogo />
          <ThemeToggle />
        </div>

        <div className="max-w-sm w-full mx-auto mt-16">
          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-head" : "register-head"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-10"
            >
              <h2
                className="text-4xl font-semibold text-gray-900 dark:text-white mb-2 leading-tight transition-colors"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {isLogin ? "Tekrar\nHoşgeldiniz." : "Hesap\nOluşturun."}
              </h2>
              <p className="text-gray-500 text-sm font-light tracking-wide">
                {isLogin
                  ? "Alışveriş asistanınız sizi bekliyor."
                  : "Akıllı alışverişe ilk adımı atın."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative group pb-1">
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Ad Soyad</label>
                    <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[1px] bg-black dark:bg-white transition-all duration-300" />
                    <div className="flex items-center border-b border-gray-300 dark:border-gray-700 group-focus-within:border-transparent pb-2 gap-3 transition-colors">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-600 group-focus-within:text-black dark:group-focus-within:text-white transition-colors shrink-0" />
                      <input
                        type="text"
                        className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none text-sm transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group pb-1">
              <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">E-Posta</label>
              <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[1px] bg-black dark:bg-white transition-all duration-300" />
              <div className="flex items-center border-b border-gray-300 dark:border-gray-700 group-focus-within:border-transparent pb-2 gap-3 transition-colors">
                <Mail className="h-4 w-4 text-gray-400 dark:text-gray-600 group-focus-within:text-black dark:group-focus-within:text-white transition-colors shrink-0" />
                <input
                  type="email"
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none text-sm transition-colors"
                  placeholder="isim@sirket.com"
                />
              </div>
            </div>

            <div className="relative group pb-1">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] uppercase tracking-widest text-gray-500">Şifre</label>
                {isLogin && (
                  <button type="button" className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    Unuttum
                  </button>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-0 group-focus-within:w-full h-[1px] bg-black dark:bg-white transition-all duration-300" />
              <div className="flex items-center border-b border-gray-300 dark:border-gray-700 group-focus-within:border-transparent pb-2 gap-3 transition-colors">
                <Lock className="h-4 w-4 text-gray-400 dark:text-gray-600 group-focus-within:text-black dark:group-focus-within:text-white transition-colors shrink-0" />
                <input
                  type="password"
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-6 py-3 rounded-full font-medium text-sm tracking-widest uppercase group transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isLogin ? (
                  <LogIn className="h-4 w-4" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {isLoading ? "Bekleniyor..." : isLogin ? "Giriş Yap" : "Kayıt Ol"}
                {!isLoading && (
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                )}
              </motion.button>
            </div>
          </form>

          {/* Toggle */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 transition-colors">
            <p className="text-xs text-gray-500 tracking-wide">
              {isLogin ? "Henüz hesabınız yok mu?" : "Zaten hesabınız var mı?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-1 text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white underline underline-offset-4 transition-colors"
            >
              {isLogin ? "Ücretsiz kaydolun" : "Giriş yapın"}
            </button>
          </div>
        </div>

        {/* Bottom subtle tag */}
        <p className="absolute bottom-8 left-10 sm:left-16 text-[10px] text-gray-500 tracking-widest uppercase">
          © 2026 Pitoresk AI
        </p>
      </div>

      {/* ─── RIGHT SIDE: Video / Placeholder ─── */}
      <div className="hidden lg:block lg:w-[55%] relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/bg-ecommerce.png"
        >
          <source src="/login-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/20" />
        {/* Gradient overlay to blend with left panel */}
        <div className="absolute inset-0 w-32 bg-gradient-to-r from-gray-50 dark:from-[#0a0a0a] to-transparent transition-colors duration-500" />

        {/* Tagline overlay */}
        <div className="absolute bottom-12 left-10 right-10">
          <p
            className="text-4xl font-semibold text-white/90 leading-snug drop-shadow-md"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Daha akıllı kararlar.<br />
            <span className="text-white/70 font-normal italic drop-shadow-md">Her satın almada.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
