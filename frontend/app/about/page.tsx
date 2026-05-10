"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLogo } from "@/components/nav-logo";

const team = [
  {
    name: "Nazife Atlas",
    role: "Frontend Developer",
    bio: "Kullanıcı deneyimini ve arayüz tasarımını üstlenerek platformun görsel kimliğini ve etkileşimli katmanlarını hayata geçirdi. React, Next.js ve modern CSS ile kullanıcı dostu ve estetik bir deneyim inşa etti.",
    initials: "NA",
    accent: "#818cf8",
  },
  {
    name: "Ervanur Şahin",
    role: "Backend Developer",
    bio: "Yapay zeka ajan mimarisini, FastAPI backend'ini ve LangGraph ile orkestre edilen çok ajanlı sistemi tasarlayıp geliştirdi. Veri akışları, API sözleşmeleri ve Gemini entegrasyonunun mimarı.",
    initials: "EŞ",
    accent: "#4ade80",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-6 sm:px-14 py-5 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl transition-colors">
        <NavLogo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="text-sm bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Giriş Yap
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-20 pb-20 px-6 sm:px-14 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-6">Ekibimiz</p>
          <h1
            className="text-4xl sm:text-6xl font-semibold text-black dark:text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            İnsanların daha iyi
            <br />
            <span className="italic font-normal text-gray-400 dark:text-gray-500">alışveriş yapmasına</span>
            <br />
            inanıyoruz.
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Pitoresk AI, bir hackathon ruhunun ürünüdür.
            İki geliştirici, sahte yorumlarla dolu, fiyat karşılaştırmasının zor olduğu
            ve iade oranlarının yüksek olduğu e-ticaret dünyasını değiştirmeye karar verdi.
          </p>
        </motion.div>
      </section>

      {/* ── Team Cards ── */}
      <section className="px-6 sm:px-14 pb-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-10 bg-gray-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden"
            >
              {/* Accent top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: member.accent }}
              />

              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-semibold mb-6 tracking-wider"
                style={{ backgroundColor: `${member.accent}25`, color: member.accent }}
              >
                {member.initials}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-black dark:text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {member.name}
              </h2>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-5">{member.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-light">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Project context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 border border-gray-100 dark:border-white/10 rounded-2xl p-8 sm:p-10 bg-gray-50 dark:bg-white/[0.02] text-center"
        >
          <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4">Proje</p>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-black dark:text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hackathon&apos;dan doğdu.
          </h3>
          <p className="text-gray-500 text-sm font-light max-w-lg mx-auto leading-relaxed">
            Pitoresk AI, LangGraph + Gemini API + FastAPI + Next.js yığını üzerine inşa edilmiş
            çok ajanlı bir e-ticaret karar platformudur. Fiyat avı, sahte yorum tespiti,
            akıllı sepet danışmanlığı ve iade riski tahmini tek çatı altında.
          </p>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 dark:border-white/5 px-6 sm:px-14 py-6 flex items-center justify-between text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-700">
        <span style={{ fontFamily: "var(--font-playfair)" }}>Pitoresk AI</span>
        <span>© 2025</span>
      </footer>
    </main>
  );
}
