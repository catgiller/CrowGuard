"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="w-full h-full flex flex-col md:flex-row relative overflow-hidden">
      
      {/* LEFT PANEL: Product Analysis */}
      <motion.div
        layout
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => router.push("/dashboard/product-analysis")}
        className="relative h-full flex flex-col justify-center px-10 lg:px-20 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10 transition-colors duration-500 overflow-hidden cursor-pointer group bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-[#050505]"
        style={{
          flex: hoveredSide === "left" ? 1.5 : hoveredSide === "right" ? 0.75 : 1,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(74,222,128,0.03)_0%,_transparent_50%)]" />

        <motion.div layout className="relative z-10 max-w-xl mx-auto w-full text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
              <Search className="h-8 w-8 text-gray-900 dark:text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Ürün Analizi
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
            Spesifik bir ürünün fiyat geçmişini, gerçek değerini ve sahte yorum riskini tek tıkla analiz edin.
          </p>

          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-black dark:text-white group-hover:gap-4 transition-all duration-300">
            Analize Başla <ArrowRight className="h-4 w-4" />
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL: Smart Advisor */}
      <motion.div
        layout
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => router.push("/dashboard/smart-advisor")}
        className="relative h-full flex flex-col justify-center px-10 lg:px-20 transition-colors duration-500 overflow-hidden cursor-pointer group bg-gray-50 dark:bg-[#050505] hover:bg-white dark:hover:bg-[#0a0a0a]"
        style={{
          flex: hoveredSide === "right" ? 1.5 : hoveredSide === "left" ? 0.75 : 1,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(129,140,248,0.04)_0%,_transparent_50%)]" />

        <motion.div layout className="relative z-10 max-w-xl mx-auto w-full text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Akıllı Asistan
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
            Sadece niyetinizi ve bütçenizi söyleyin. Yapay zeka sizin için en optimal, fiyat-performans seçeneklerini bulsun.
          </p>

          <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 group-hover:gap-4 transition-all duration-300">
            Asistana Danış <ArrowRight className="h-4 w-4" />
          </div>
        </motion.div>
      </motion.div>

      {/* Center Divider "YA DA" */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:flex items-center justify-center transition-opacity duration-300">
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 text-xs font-semibold tracking-widest px-4 py-2 rounded-full shadow-sm">
          YA DA
        </div>
      </div>

    </div>
  );
}
