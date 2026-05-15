"use client";

import { motion } from "framer-motion";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const sections = [
  {
    title: "Hizmet Tanımı",
    content: `CrowGuard AI, kullanıcıların e-ticaret platformlarındaki ürünleri daha bilinçli değerlendirmesine yardımcı olmak amacıyla yapay zeka destekli analiz sunan bir platformdur.

Sunduğumuz başlıca özellikler:
• Fiyat analizi ve tarihsel karşılaştırma
• Sahte yorum tespiti ve güven skoru
• İade riski tahmini
• Doğal dil ile akıllı ürün önerisi

Bu hizmetler bilgilendirme amaçlıdır. Satın alma kararlarınızın nihai sorumluluğu size aittir.`,
  },
  {
    title: "Kullanım Koşulları",
    content: `Platforma kaydolarak veya hizmeti kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:

• Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.
• Hesabınızı başkalarıyla paylaşamazsınız.
• Sistemi yalnızca kişisel ve ticari olmayan amaçlarla kullanabilirsiniz.
• Sağlanan analiz sonuçları tahmin niteliğindedir; kesinlik garantisi verilmez.
• Hizmeti kullanmak için 18 yaşını doldurmuş olmanız gerekir.`,
  },
  {
    title: "Yasaklanan Kullanımlar",
    content: `Aşağıdaki kullanımlar kesinlikle yasaktır ve hesap askıya alınmasına veya kapatılmasına yol açabilir:

• Platformun API'lerine veya sistemlerine otomatik (bot) erişim sağlamak.
• Analiz sonuçlarını üçüncü taraflara ücret karşılığında satmak.
• Hizmeti kandırıcı, yanıltıcı veya yasadışı faaliyetler için kullanmak.
• Sistemin güvenliğini test etmeye yönelik saldırı girişiminde bulunmak.
• Diğer kullanıcıların verilerine izinsiz erişmeye çalışmak.`,
  },
  {
    title: "Fikri Mülkiyet",
    content: `CrowGuard AI platformunun tüm içeriği, tasarımı, kodu ve marka unsurları CrowGuard AI'ya aittir.

• Kullanıcılar platforma girecekleri içeriklerden (ürün URL'leri, mesajlar vb.) kendileri sorumludur.
• Platform içeriğini izinsiz kopyalamak, yeniden dağıtmak veya türev çalışmalar oluşturmak yasaktır.
• Açık kaynaklı bileşenler kendi lisansları kapsamında kullanılmaktadır.`,
  },
  {
    title: "Sorumluluk Reddi",
    content: `CrowGuard AI aşağıdaki konularda sorumluluk kabul etmez:

• Analiz sonuçlarına dayanılarak alınan kararların sonuçları.
• Üçüncü taraf e-ticaret platformlarındaki değişiklikler veya hatalar.
• Hizmetin kesintisiz veya hatasız çalışacağına dair garanti.
• Beklenmedik teknik arızalar nedeniyle oluşabilecek veri kayıpları.

Hizmet "olduğu gibi" sunulmaktadır. Analiz sonuçları yardımcı bir araç niteliğindedir, nihai karar her zaman kullanıcıya aittir.`,
  },
  {
    title: "Değişiklikler ve Fesih",
    content: `Bu Kullanım Koşulları zaman zaman güncellenebilir. Önemli değişiklikler öncesinde kayıtlı e-posta adresinize bildirim göndeririz.

• Koşulları kabul etmiyorsanız hesabınızı istediğiniz zaman silebilirsiniz.
• Koşulları ihlal eden hesaplar önceden bildirim yapılmaksızın askıya alınabilir.
• Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir.

Son güncelleme: Mayıs 2026`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
      <MarketingNav />

      <section className="pt-24 pb-12 px-6 sm:px-14 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-5">Yasal</p>
          <h1
            className="text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Kullanım Koşulları
          </h1>
          <p className="text-gray-500 font-light text-sm">
            CrowGuard AI'yı kullanmadan önce lütfen bu koşulları okuyunuz. Hizmeti kullanmaya
            devam ederek bu koşulları kabul etmiş sayılırsınız.
          </p>
        </motion.div>
      </section>

      <section className="px-6 sm:px-14 pb-24 max-w-3xl mx-auto space-y-4">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border border-gray-100 dark:border-white/10 rounded-2xl p-7 bg-gray-50 dark:bg-white/[0.02]"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-base">{section.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>

      <MarketingFooter />
    </main>
  );
}
