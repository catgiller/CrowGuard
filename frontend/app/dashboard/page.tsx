"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] transition-colors duration-500 px-4">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16 select-none pointer-events-none"
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400 dark:text-gray-600 mb-3 font-semibold">
          Pitoresk AI
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-white/85 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Bugün ne{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
            keşfediyoruz?
          </span>
        </h1>
      </motion.div>

      {/* Panels Row */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-0">

        {/* LEFT — Ürün Analizi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex-1 flex flex-col px-10 lg:px-14 group/panel"
        >
          <div className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(99,102,241,0.08) 0%, transparent 65%)" }}
          />
          <div className="relative z-10">
            <div className="mb-3">
              <Search className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ürün Analizi
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base font-light leading-relaxed mb-8 max-w-xs">
              Ürün linki ya da isim girin. Fiyat geçmişini, sahte yorum riskini ve en ucuz alternatifleri saniyeler içinde görün.
            </p>
            <button
              onClick={() => router.push("/dashboard/product-analysis")}
              className="group relative inline-flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 cursor-pointer"
            >
              <span>Analize Başla</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: "linear-gradient(90deg, #6366f1, #38bdf8)" }}
              />
            </button>
          </div>
        </motion.div>

        {/* CENTER — YA DA */}
        <div className="hidden md:flex flex-col items-center justify-center px-6 shrink-0">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent" />
          <div className="my-3 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/[0.08] px-3.5 py-1.5 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-sky-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
              ya da
            </span>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 dark:via-white/10 to-transparent" />
        </div>

        {/* RIGHT — Akıllı Asistan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative flex-1 flex flex-col px-10 lg:px-14 group/panel"
        >
          <div className="absolute inset-0 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
            style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(168,85,247,0.08) 0%, transparent 65%)" }}
          />
          <div className="relative z-10">
            <div className="mb-3">
              <Sparkles className="h-7 w-7 text-violet-500 dark:text-violet-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-gradient-to-br from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Akıllı Asistan
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base font-light leading-relaxed mb-8 max-w-xs">
              Ne aradığınızı tam bilmiyorsanız sorun değil. Bütçenizi ve ihtiyacınızı anlatın; yapay zeka en uygun ürünleri bulsun.
            </p>
            <button
              onClick={() => router.push("/dashboard/smart-advisor")}
              className="group relative inline-flex items-center gap-2.5 text-sm font-semibold tracking-widest uppercase text-violet-500 dark:text-violet-400 cursor-pointer"
            >
              <span>Asistana Danış</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)" }}
              />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
