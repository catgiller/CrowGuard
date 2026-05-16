"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const fallIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      <MarketingNav />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 sm:px-14 max-w-4xl mx-auto text-center">
        <motion.div {...fallIn(0)}>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-5">İletişim</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Bir şey mi sormak
            <br />
            <span className="italic font-normal text-gray-400 dark:text-gray-500">istiyorsunuz?</span>
          </h1>
          <p className="text-gray-500 font-light max-w-md mx-auto">
            Geri bildirim, iş birliği teklifi ya da teknik bir soru — ne olursa olsun dinliyoruz.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-6 sm:px-14 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Info */}
          <motion.div {...fallIn(0.1)} className="md:col-span-2 space-y-5">
            <div className="border border-gray-100 dark:border-white/10 rounded-2xl p-6 bg-gray-50 dark:bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4">
                <Mail className="h-5 w-5 text-indigo-500" />
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">E-Posta</p>
              <a href="mailto:hello@crowguard.ai" className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-500 transition-colors">
                hello@crowguard.ai
              </a>
              <p className="text-xs text-gray-400 mt-2 font-light">Genellikle 24 saat içinde yanıt veriyoruz.</p>
            </div>

            <div className="border border-gray-100 dark:border-white/10 rounded-2xl p-6 bg-gray-50 dark:bg-white/[0.02]">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                <ExternalLink className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">GitHub</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-500 transition-colors">
                github.com/crowguard-ai
              </a>
              <p className="text-xs text-gray-400 mt-2 font-light">Hata bildirimi için Issues kullanabilirsiniz.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fallIn(0.15)} className="md:col-span-3">
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center border border-gray-100 dark:border-white/10 rounded-2xl p-12 bg-gray-50 dark:bg-white/[0.02]">
                <CheckCircle className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mesajınız ulaştı.</h3>
                <p className="text-sm text-gray-500 font-light">En kısa sürede geri döneceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-gray-100 dark:border-white/10 rounded-2xl p-8 bg-gray-50 dark:bg-white/[0.02] space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">E-Posta</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="isim@ornek.com"
                      className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Mesajınız</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ne söylemek istiyorsunuz?"
                    rows={6}
                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading" || !form.name || !form.email || !form.message}
                  className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-7 py-3 rounded-full font-medium text-sm tracking-wide hover:bg-gray-700 dark:hover:bg-gray-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === "loading" ? "Gönderiliyor..." : "Gönder"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
