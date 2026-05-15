"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const faqs = [
  {
    q: "CrowGuard AI nedir?",
    a: "CrowGuard AI, yapay zeka destekli bir alışveriş karar platformudur. Bir ürün linki veya isim girdiğinizde; fiyat geçmişini analiz eder, yorumların ne kadarının sahte olduğunu tespit eder ve o ürünü iade etme riskinizi hesaplar. Amacımız tek bir şey: pişmanlık yaşamadan alışveriş yapmanıza yardımcı olmak.",
  },
  {
    q: "Hangi e-ticaret platformlarını destekliyor?",
    a: "Şu an Trendyol, Amazon Türkiye ve Hepsiburada'daki ürünleri analiz edebiliyoruz. Ürün linkini yapıştırmanız yeterli; sistem gerisini halleder. Desteklenen platform listesi büyümeye devam ediyor.",
  },
  {
    q: "Sahte yorum tespiti nasıl çalışıyor?",
    a: "AI modelimiz yorum dilini, hesap oluşturma tarihlerini, satın alma doğrulamalarını ve yorum zaman örüntülerini analiz eder. Gerçek bir insan yorumu ile otomatik üretilmiş yorum arasındaki farkı istatistiksel olarak tespit ederek size bir güven skoru sunar.",
  },
  {
    q: "Fiyat analizi neye göre yapılıyor?",
    a: "Ürünün geçmiş fiyat verilerini toplayıp mevcut fiyatıyla karşılaştırıyoruz. Şu an piyasa ortalamasının üzerinde mi, altında mı? Kampanya dönemi mi yaklaşıyor? Bu sorulara göre AL, BEKLE ya da ALTERNATİF önerisi sunuyoruz.",
  },
  {
    q: "İade riski skoru ne anlama geliyor?",
    a: "Her ürün kategorisinin tarihsel iade oranı ve o ürüne özgü faktörler (beden uyumu, teknik karmaşıklık, paketleme kalitesi vb.) bir araya getirilerek bir risk yüzdesi hesaplanır. %70 ve üzeri yüksek risk olarak işaretlenir.",
  },
  {
    q: "Akıllı Asistan ne işe yarıyor?",
    a: "Doğal dilde ihtiyacınızı söylemeniz yeterli: \"Sevgilime teknoloji hediyesi, 800₺ bütçe\" gibi. Asistan bu bilgileri işleyerek size en uygun ürün önerilerini analiz raporu ile birlikte sunar.",
  },
  {
    q: "Ücretsiz mi? Ücretli plan var mı?",
    a: "Temel özellikler tamamen ücretsiz. Ürün analizi, sahte yorum tespiti ve fiyat karşılaştırması ücretsiz hesapla kullanılabilir. İleride daha gelişmiş özellikler için ücretli planlar sunmayı planlıyoruz.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Evet. Analiz ettiğiniz ürün verileri sunucularımızda kalıcı olarak saklanmaz. Kişisel bilgileriniz şifreli olarak tutulur ve üçüncü taraflarla paylaşılmaz. Detaylı bilgi için Gizlilik Politikamıza bakabilirsiniz.",
  },
];

function FaqItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/[0.02]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left gap-4 hover:bg-white dark:hover:bg-white/[0.04] transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{item.q}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-7 pb-6 text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      <MarketingNav />

      <section className="pt-24 pb-16 px-6 sm:px-14 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-5">Sık Sorulan Sorular</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
            Aklınızdaki sorular,
            <br />
            <span className="italic font-normal text-gray-400 dark:text-gray-500">net cevaplar.</span>
          </h1>
          <p className="text-gray-500 font-light">
            Burada bulamazsanız{" "}
            <Link href="/contact" className="text-indigo-500 hover:text-indigo-600 transition-colors underline underline-offset-4">
              bize yazın
            </Link>
            .
          </p>
        </motion.div>
      </section>

      <section className="px-6 sm:px-14 pb-24 max-w-3xl mx-auto space-y-3">
        {faqs.map((item, i) => (
          <FaqItem key={i} item={item} index={i} />
        ))}
      </section>

      <MarketingFooter />
    </main>
  );
}
