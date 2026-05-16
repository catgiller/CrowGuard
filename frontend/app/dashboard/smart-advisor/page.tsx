"use client";
import { useState } from "react";
import { Sparkles, ArrowLeft, Zap, Loader2, DollarSign, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Recommendation {
  name: string;
  price: number;
  reason: string;
  confidence: number;
}

export default function SmartAdvisorPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("http://localhost:8000/smart-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("API hatası");
      
      const data = await response.json();
      setResults(data.recommendations || []);
    } catch (err) {
      setError("Asistan şu an yanıt veremiyor. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full min-h-screen">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Geri Dön
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Akıllı Asistan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-light text-lg">Niyetinizi ve bütçenizi söyleyin, yapay zeka sizin için en iyi ürünleri bulsun.</p>
      </div>

      <div className="bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm transition-all focus-within:shadow-indigo-500/5 focus-within:border-indigo-500/30">
        <div className="relative flex items-center bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-xl p-2 pl-5 transition-all focus-within:border-indigo-500/50">
          <Zap className={`h-5 w-5 mr-3 shrink-0 transition-colors ${loading ? "text-indigo-500 animate-pulse" : "text-gray-400"}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Sevgilime hediye, teknolojik, 800₺ bütçe..."
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 py-3 text-lg"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Asistana Sor"}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      {/* Results Container */}
      <div className="mt-12">
        {!results && !loading && (
          <div className="text-center text-gray-400 dark:text-gray-600 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-20 bg-gray-50/50 dark:bg-transparent">
            <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-50 text-indigo-400" />
            <p className="text-lg font-light tracking-wide">Yapay zekanın size özel hazırladığı ürün listesi burada görünecek.</p>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 w-full bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="group bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                   <div className="bg-indigo-500/10 text-indigo-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                     %{item.confidence} Güven
                   </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pr-12">{item.name}</h3>
                
                <div className="flex items-center gap-1.5 text-indigo-500 mb-4">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-lg font-black tracking-tight">{item.price} ₺</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light italic">
                    "{item.reason}"
                  </p>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">En İyi Eşleşme</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
