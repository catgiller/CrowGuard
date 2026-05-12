"use client";

import { useState } from "react";
import { Search, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductAnalysisPage() {
  const [url, setUrl] = useState("");

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Geri Dön
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">Ürün Analizi</h1>
        <p className="text-gray-500 dark:text-gray-400">Analiz etmek istediğiniz ürünün bağlantısını veya adını girin.</p>
      </div>

      <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
        <div className="relative flex items-center bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl p-2 pl-4 focus-within:border-gray-400 dark:focus-within:border-white/30 transition-colors">
          <LinkIcon className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://amazon.com.tr/..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
          />
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            Analiz Et
          </button>
        </div>
      </div>
      
      {/* Placeholder for results */}
      <div className="mt-12 text-center text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-20">
        <Search className="h-8 w-8 mx-auto mb-4 opacity-50" />
        <p>Arama sonuçları ve veri grafikleri burada görünecek.</p>
      </div>
    </div>
  );
}
