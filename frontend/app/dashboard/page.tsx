"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative">

      {/* Top greeting — floats above both panels */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center pt-10 pointer-events-none select-none">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] uppercase tracking-[0.35em] text-gray-400 dark:text-gray-600 mb-2 font-semibold"
        >
          Pitoresk AI
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-semibold text-gray-800 dark:text-white/80 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bugün ne{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            keşfediyoruz?
          </span>
        </motion.h1>
      </div>

      {/* LEFT — Ürün Analizi */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => router.push("/dashboard/product-analysis")}
        className="relative flex-1 h-full flex flex-col items-center justify-center px-14 lg:px-24 cursor-pointer group overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-sm w-full text-center md:text-left">
          <div className="mb-5 inline-flex items-center justify-center md:justify-start">
            <Search className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-5 bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ürün Analizi
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed mb-8">
            Bir ürün linki yapıştırın. Fiyat geçmişini, sahte yorumları ve iade riskini anında görün.
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 group-hover:gap-3 transition-all duration-300">
            Başla <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>

      {/* CENTER — Kısa dikey çizgi + YA DA */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent" />
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-600 text-[10px] font-bold tracking-[0.3em] uppercase px-3.5 py-1.5 rounded-full">
          ya da
        </div>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent" />
      </div>

      {/* RIGHT — Akıllı Asistan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => router.push("/dashboard/smart-advisor")}
        className="relative flex-1 h-full flex flex-col items-center justify-center px-14 lg:px-24 cursor-pointer group overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(168,85,247,0.13) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-sm w-full text-center md:text-left">
          <div className="mb-5 inline-flex items-center justify-center md:justify-start">
            <Sparkles className="h-8 w-8 text-violet-500 dark:text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-5 bg-gradient-to-br from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Akıllı Asistan
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed mb-8">
            Niyetinizi ve bütçenizi söyleyin. Yapay zeka en iyi seçenekleri sizin için bulsun.
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 group-hover:gap-3 transition-all duration-300">
            Danış <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
