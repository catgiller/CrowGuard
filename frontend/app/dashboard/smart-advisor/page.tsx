"use client";

import { useState } from "react";
import { Sparkles, ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";

export default function SmartAdvisorPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Geri Dön
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">Akıllı Asistan</h1>
        <p className="text-gray-500 dark:text-gray-400">Niyetinizi ve bütçenizi söyleyin, yapay zeka sizin için en iyi ürünleri bulsun.</p>
      </div>

      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <div className="relative flex items-center bg-indigo-50/50 dark:bg-[#050505] border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-2 pl-4 focus-within:border-indigo-300 dark:focus-within:border-indigo-500/50 transition-colors">
          <Zap className="h-5 w-5 text-indigo-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sevgilime hediye, teknolojik, 800₺ bütçe..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
          />
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">
            Asistana Sor
          </button>
        </div>
      </div>
      
      {/* Placeholder for results */}
      <div className="mt-12 text-center text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-20">
        <Sparkles className="h-8 w-8 mx-auto mb-4 opacity-50 text-indigo-400" />
        <p>Yapay zekanın size özel hazırladığı ürün listesi burada görünecek.</p>
      </div>
    </div>
  );
}
