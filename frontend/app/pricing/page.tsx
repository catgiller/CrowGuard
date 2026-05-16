"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const plans = [
  {
    name: "Ücretsiz",
    price: { monthly: 0, yearly: 0 },
    desc: "Başlamak için her şey.",
    accent: "#6b7280",
    cta: "Hemen Başla",
    ctaHref: "/login",
    featured: false,
    features: [
      "Günlük 5 ürün analizi",
      "Sahte yorum tespiti",
      "Fiyat karşılaştırması",
      "İade riski skoru",
      "Akıllı Asistan (3 sorgu/gün)",
    ],
    missing: [
      "Sınırsız analiz",
      "Fiyat alarm bildirimleri",
      "Geçmiş arama geçmişi",
      "Öncelikli destek",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 79, yearly: 59 },
    desc: "Alışverişi ciddiye alanlar için.",
    accent: "#6366f1",
    cta: "Pro'ya Geç",
    ctaHref: "/login",
    featured: true,
    features: [
      "Sınırsız ürün analizi",
      "Sahte yorum tespiti",
      "Fiyat karşılaştırması",
      "İade riski skoru",
      "Sınırsız Akıllı Asistan",
      "Fiyat alarm bildirimleri",
      "Geçmiş arama geçmişi",
      "Öncelikli e-posta desteği",
    ],
    missing: [],
  },
  {
    name: "Kurumsal",
    price: { monthly: null, yearly: null },
    desc: "Büyük ekipler ve özel entegrasyonlar.",
    accent: "#a855f7",
    cta: "Bize Ulaşın",
    ctaHref: "/contact",
    featured: false,
    features: [
      "Pro'daki her şey",
      "API erişimi",
      "Özel entegrasyon desteği",
      "Takım hesabı yönetimi",
      "SLA garantisi",
      "Özel fiyatlandırma",
    ],
    missing: [],
  },
];

const fallIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-14 px-6 sm:px-14 max-w-4xl mx-auto text-center">
        <motion.div {...fallIn(0)}>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-5">Fiyatlandırma</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Cüzdanınıza uygun,
            <br />
            <span className="italic font-normal text-gray-400 dark:text-gray-500">kararlarınız paha biçilemez.</span>
          </h1>
          <p className="text-gray-500 font-light max-w-md mx-auto mb-10">
            Küçük başlayın, büyüdükçe yükseltin. Kredi kartı gerektirmez.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-white/5 rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" : "text-gray-500"}`}
            >
              Aylık
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm" : "text-gray-500"}`}
            >
              Yıllık
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                %25 indirim
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="px-6 sm:px-14 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...fallIn(i * 0.1)}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                plan.featured
                  ? "border-indigo-400/40 dark:border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.12)]"
                  : "border-gray-100 dark:border-white/10"
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-purple-500" />
              )}
              {plan.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-400/20 uppercase tracking-wider">
                    <Zap className="h-3 w-3" /> Popüler
                  </span>
                </div>
              )}

              <div className={`p-7 ${plan.featured ? "bg-white dark:bg-[#0d0d0d]" : "bg-gray-50 dark:bg-white/[0.02]"}`}>
                {/* Header */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: plan.accent }}>{plan.name}</p>
                  <p className="text-sm text-gray-500 font-light">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  {plan.price.monthly === null ? (
                    <p className="text-4xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                      Özel
                    </p>
                  ) : plan.price.monthly === 0 ? (
                    <p className="text-4xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                      Ücretsiz
                    </p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <p className="text-4xl font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                        ₺{yearly ? plan.price.yearly : plan.price.monthly}
                      </p>
                      <span className="text-gray-400 text-sm mb-1.5">/ay</span>
                    </div>
                  )}
                  {yearly && plan.price.yearly !== null && plan.price.yearly !== 0 && (
                    <p className="text-xs text-gray-400 mt-1">Yıllık ₺{(plan.price.yearly! * 12).toLocaleString("tr-TR")} faturalandırılır</p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all mb-8 group ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-100"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: plan.accent }} />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-400 line-through">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 opacity-30" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p {...fallIn(0.4)} className="text-center text-sm text-gray-400 font-light mt-10">
          Tüm planlar 14 günlük ücretsiz deneme içerir. İstediğiniz zaman iptal edebilirsiniz.{" "}
          <Link href="/faq" className="text-indigo-500 hover:text-indigo-600 transition-colors underline underline-offset-4">
            SSS
          </Link>
          'ye bakın.
        </motion.p>
      </section>

      <MarketingFooter />
    </main>
  );
}
