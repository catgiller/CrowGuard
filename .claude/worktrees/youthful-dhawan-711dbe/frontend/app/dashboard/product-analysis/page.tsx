"use client";

import { useState } from "react";
import {
  Search, ArrowLeft, ArrowRight, Loader2, AlertTriangle,
  Star, ShoppingBag, TrendingDown, BarChart2, CheckCircle, XCircle, Clock
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProductAnalysisResult {
  product_name: string;
  price_analysis: {
    current: number;
    average: number;
    recommendation: "AL" | "BEKLE" | "ALT";
  };
  review_analysis: {
    total_reviews: number;
    fake_percentage: number;
    trust_score: number;
  };
  return_risk: {
    percentage: number;
    reasons: string[];
  };
}

const BADGE_CONFIG = {
  AL: { label: "AL", color: "bg-emerald-500 text-white" },
  BEKLE: { label: "BEKLE", color: "bg-amber-500 text-white" },
  ALT: { label: "ALTERNATİF", color: "bg-blue-500 text-white" },
};

export default function ProductAnalysisPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ProductAnalysisResult | null>(null);
  const [detail, setDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setDetail(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: query.trim() }),
      });
      if (!response.ok) throw new Error(`Hata: ${response.status}`);
      const data: ProductAnalysisResult = await response.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const badge = result ? BADGE_CONFIG[result.price_analysis.recommendation] : null;
  const isFake = result ? result.review_analysis.fake_percentage > 50 : false;
  const trustScore = result ? result.review_analysis.trust_score : 0;

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">

      {/* Back */}
      {detail ? (
        <button
          onClick={() => setDetail(false)}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Geri
        </button>
      ) : (
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Geri Dön
        </Link>
      )}

      {!detail && (
        <>
          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-4xl font-semibold tracking-tight mb-2 bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ürün Analizi
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Ürün linki ya da isim girin. Fiyat, sahte yorum ve iade riskini analiz et.
            </p>
          </div>

          {/* Input */}
          <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 bg-white dark:bg-[#111] shadow-sm mb-6">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3">
                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyze()}
                  placeholder="Ürün linki veya isim..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
              <button
                onClick={analyze}
                disabled={loading || !query.trim()}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40 transition-all hover:opacity-90 active:scale-95 shrink-0"
                style={{ background: "linear-gradient(135deg, #6366f1, #38bdf8)" }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analiz Et"}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-500 text-sm mb-6"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Card */}
          <AnimatePresence>
            {result && badge && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#111] shadow-sm cursor-pointer hover:border-indigo-400/30 transition-colors"
                onClick={() => setDetail(true)}
              >
                {/* Card row */}
                <div className="p-5 flex items-center gap-5">
                  {/* Product icon placeholder */}
                  <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate mb-1">
                      {result.product_name}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {result.price_analysis.current.toLocaleString("tr-TR")} ₺
                      </span>
                      <span className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-3 w-3 ${s <= Math.round(trustScore / 20) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                        ))}
                      </span>
                      <span>{result.review_analysis.total_reviews} yorum</span>
                    </div>
                  </div>

                  {/* 3 Badges */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {/* 1. Öneri */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                      {result.price_analysis.recommendation === "ALT" ? "ALTERNATİF" : result.price_analysis.recommendation}
                    </span>
                    {/* 2. Sahte Yorum — yalnızca %50 üzerinde */}
                    {isFake && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400">
                        <XCircle className="h-3 w-3" />
                        Sahte Yorum %{result.review_analysis.fake_percentage}
                      </span>
                    )}
                    {/* 3. İade Oranı */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      result.return_risk.percentage > 50
                        ? "bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400"
                        : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
                    }`}>
                      <AlertTriangle className="h-3 w-3" />
                      İade %{result.return_risk.percentage}
                    </span>
                  </div>
                </div>

                {/* Bottom hint */}
                <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span>Detayları görmek için tıkla</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!result && !loading && !error && (
            <div className="text-center text-gray-300 dark:text-gray-700 border border-dashed border-gray-200 dark:border-white/[0.06] rounded-2xl p-16">
              <BarChart2 className="h-7 w-7 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Analiz sonuçları burada görünecek.</p>
            </div>
          )}
        </>
      )}

      {/* ───── DETAIL VIEW ───── */}
      <AnimatePresence>
        {detail && result && badge && (
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>

            {/* Product header */}
            <div className="flex gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">{result.product_name}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {result.price_analysis.current.toLocaleString("tr-TR")} ₺
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                    {result.price_analysis.recommendation}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Yorumu */}
            <div className="border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-5 mb-5 bg-indigo-50 dark:bg-indigo-500/5">
              <p className="text-xs uppercase tracking-widest text-indigo-400 mb-2 font-semibold">AI Yorumu</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Ortalama piyasa fiyatı <strong>{result.price_analysis.average.toLocaleString("tr-TR")} ₺</strong> olan bu ürün şu an{" "}
                <strong>{result.price_analysis.current > result.price_analysis.average ? "ortalama üzerinde" : "ortalama altında"}</strong> fiyatlandırılmış.{" "}
                Yorumların <strong>%{result.review_analysis.fake_percentage}</strong>'i sahte görünüyor, güven skoru <strong>%{result.review_analysis.trust_score}</strong>.{" "}
                İade riski <strong>%{result.return_risk.percentage}</strong> seviyesinde.
              </p>
            </div>

            {/* Scores grid */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-center bg-white dark:bg-[#111]">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">%{result.review_analysis.trust_score}</p>
                <p className="text-xs text-gray-500">Güven Skoru</p>
              </div>
              <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-center bg-white dark:bg-[#111]">
                <p className="text-2xl font-bold text-red-500 mb-1">%{result.review_analysis.fake_percentage}</p>
                <p className="text-xs text-gray-500">Sahte Yorum</p>
              </div>
              <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-center bg-white dark:bg-[#111]">
                <p className="text-2xl font-bold text-amber-500 mb-1">%{result.return_risk.percentage}</p>
                <p className="text-xs text-gray-500">İade Riski</p>
              </div>
            </div>

            {/* Price comparison */}
            <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-5 mb-5 bg-white dark:bg-[#111]">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold flex items-center gap-2">
                <TrendingDown className="h-3.5 w-3.5" /> Fiyat Karşılaştırması
              </p>
              <div className="flex items-end gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Şu anki fiyat</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.price_analysis.current.toLocaleString("tr-TR")} ₺</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Ortalama fiyat</p>
                  <p className="text-2xl font-bold text-gray-400">{result.price_analysis.average.toLocaleString("tr-TR")} ₺</p>
                </div>
              </div>
              {/* Simple bar visualization */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-20">Şu an</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((result.price_analysis.current / (result.price_analysis.average * 1.5)) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className={`h-full rounded-full ${result.price_analysis.current > result.price_analysis.average ? "bg-red-400" : "bg-emerald-400"}`}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-20">Ortalama</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((result.price_analysis.average / (result.price_analysis.average * 1.5)) * 100, 100)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full bg-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Return risk reasons */}
            {result.return_risk.reasons.length > 0 && (
              <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-5 mb-5 bg-white dark:bg-[#111]">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">İade Risk Nedenleri</p>
                <ul className="space-y-2">
                  {result.return_risk.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <a
                href={query.startsWith("http") ? query : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366f1, #38bdf8)" }}
              >
                <ShoppingBag className="h-4 w-4 inline mr-2" />
                Mağazaya Git
              </a>
              <button
                onClick={() => setDetail(false)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Alternatif Göster
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
