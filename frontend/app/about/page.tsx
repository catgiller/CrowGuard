"use client";

import { motion } from "framer-motion";
import { Brain, ShieldCheck, TrendingDown, Sparkles, ExternalLink } from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const team = [
  {
    name: "Nazife Atlas",
    role: "Frontend Developer",
    bio: "Kullanıcının ekrana ilk baktığı andan itibaren ne hissedeceğini düşünerek tasarladı. React, Next.js ve Framer Motion ile hem hızlı hem de estetik bir deneyim inşa etti. Arayüzün her animasyonu, her geçişi — Nazife'nin detaycı bakışının ürünü.",
    initials: "NA",
    accent: "#818cf8",
    github: "https://github.com",
  },
  {
    name: "Ervanur Şahin",
    role: "Backend Developer",
    bio: "Sistemin beynini kurdu. LangGraph ile orkestre edilen çok ajanlı mimari, FastAPI backend'i ve Gemini API entegrasyonu — bunların hepsi Ervanur'un tasarladığı altyapı üzerinde çalışıyor. Bir ürün URL'si girdiğinde arka planda dönen onlarca analiz adımı, onun imzası.",
    initials: "EŞ",
    accent: "#4ade80",
    github: "https://github.com",
  },
];

const mission = [
  { icon: ShieldCheck, title: "Güven", desc: "Her yorumun, her fiyatın arkasında gerçek mi var? Bunu sormadan alışveriş yapılmamalı.", accent: "#6366f1" },
  { icon: TrendingDown, title: "Şeffaflık", desc: "Fiyat geçmişi, sahte yorum oranı, iade riski — bunlar gizli değil, sadece dağınık. Biz bir araya getiriyoruz.", accent: "#38bdf8" },
  { icon: Brain, title: "Zeka", desc: "İnsan beyninin saniyeler içinde işleyemeyeceği veriyi AI işler. Bu zekayı herkesin hizmetine sunuyoruz.", accent: "#a855f7" },
];

const howItWorks = [
  { step: "01", title: "Ürünü Gir", desc: "Bir ürün linki veya isim yazman yeterli. Trendyol, Amazon, Hepsiburada — platform fark etmez.", accent: "#6366f1" },
  { step: "02", title: "AI Analiz Eder", desc: "Çok ajanlı sistemimiz eş zamanlı olarak fiyat geçmişini, yorum örüntülerini ve iade verilerini tarar.", accent: "#38bdf8" },
  { step: "03", title: "Karar Ver", desc: "AL, BEKLE ya da ALTERNATİF — net bir öneri ve arkasındaki sebepler sana sunulur.", accent: "#a855f7" },
];

const techStack = [
  { name: "Next.js 16", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "LangGraph", category: "AI" },
  { name: "Gemini API", category: "AI" },
  { name: "SQLite", category: "Backend" },
];

const categoryColor: Record<string, string> = {
  Frontend: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Backend: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  AI: "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const fallIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-20 px-6 sm:px-14 max-w-4xl mx-auto text-center">
        <motion.div {...fallIn(0)}>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-5">Hakkımızda</p>
          <h1 className="text-4xl sm:text-6xl font-semibold text-black dark:text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Bir gün bir ürün aldık.{" "}
            <span className="italic font-normal text-gray-400 dark:text-gray-500">Berbattı.</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Yorumlar muhteşemdi. Fiyat da uygundu. Ürün geldi — berbattı. Sonra fark ettik ki yorumların
            yarısı bottu, fiyat bir hafta önce daha düşüktü ve o kategori iadeleriyle ünlüydü.
            Hiçbirini bilmiyorduk çünkü bunu söyleyen bir araç yoktu.{" "}
            <span className="text-gray-900 dark:text-white font-medium">CrowGuard AI bu yüzden var.</span>
          </p>
        </motion.div>
      </section>

      {/* Misyon */}
      <section className="px-6 sm:px-14 pb-20 max-w-6xl mx-auto">
        <motion.div {...fallIn(0)} className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">Değerlerimiz</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>Neye inanıyoruz?</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {mission.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} {...fallIn(i * 0.1)} className="border border-gray-100 dark:border-white/10 rounded-2xl p-7 bg-gray-50 dark:bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${item.accent}18` }}>
                  <Icon className="h-5 w-5" style={{ color: item.accent }} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="px-6 sm:px-14 pb-20 max-w-6xl mx-auto">
        <motion.div {...fallIn(0)} className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">Süreç</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>Nasıl çalışır?</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((item, i) => (
            <motion.div key={item.step} {...fallIn(i * 0.12)} className="relative border border-gray-100 dark:border-white/10 rounded-2xl p-8 bg-gray-50 dark:bg-white/[0.02] overflow-hidden">
              <span className="absolute top-6 right-6 text-6xl font-bold opacity-[0.06] select-none" style={{ color: item.accent, fontFamily: "var(--font-playfair)" }}>{item.step}</span>
              <div className="w-2 h-8 rounded-full mb-6" style={{ backgroundColor: item.accent }} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ekip */}
      <section className="px-6 sm:px-14 pb-20 max-w-6xl mx-auto">
        <motion.div {...fallIn(0)} className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">Ekip</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white" style={{ fontFamily: "var(--font-playfair)" }}>İki kişi, bir fikir.</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div key={member.name} {...fallIn(i * 0.15)} className="group relative border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-10 bg-gray-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: member.accent }} />
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-semibold tracking-wider" style={{ backgroundColor: `${member.accent}25`, color: member.accent }}>
                  {member.initials}
                </div>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{member.name}</h2>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{member.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 sm:px-14 pb-24 max-w-6xl mx-auto">
        <motion.div {...fallIn(0)} className="border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-10 bg-gray-50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <p className="text-[11px] uppercase tracking-widest text-gray-400">Teknoloji</p>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-black dark:text-white mb-8" style={{ fontFamily: "var(--font-playfair)" }}>Neyle inşa edildi?</h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span key={tech.name} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${categoryColor[tech.category]}`}>
                {tech.name}
                <span className="text-[10px] opacity-60 uppercase tracking-wider">{tech.category}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <MarketingFooter />
    </main>
  );
}
