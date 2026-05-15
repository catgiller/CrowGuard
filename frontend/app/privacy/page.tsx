"use client";

import { motion } from "framer-motion";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const sections = [
  {
    title: "Hangi verileri topluyoruz?",
    content: `Hizmetimizi kullanırken aşağıdaki verileri toplayabiliriz:

• Hesap bilgileri: Kayıt sırasında verdiğiniz ad, e-posta adresi ve şifre (şifreler hashlenmiş olarak saklanır).
• Kullanım verileri: Analiz ettiğiniz ürün URL'leri ve arama geçmişiniz, hizmetin kalitesini artırmak amacıyla kayıt altına alınabilir.
• Teknik veriler: IP adresi, tarayıcı türü, cihaz bilgisi gibi standart log kayıtları güvenlik amacıyla tutulur.

Analiz ettiğiniz ürünlere ait üçüncü taraf içerikler (ürün bilgileri, fiyat verileri, yorumlar) sunucularımızda kalıcı olarak saklanmaz.`,
  },
  {
    title: "Verilerinizi nasıl kullanıyoruz?",
    content: `Topladığımız veriler yalnızca şu amaçlarla kullanılır:

• Hizmeti sunmak ve kişiselleştirmek (ürün analiz sonuçları, arama geçmişi).
• Güvenliği sağlamak ve kötüye kullanımı önlemek.
• Hizmet kalitesini artırmak için anonim istatistikler üretmek.
• Hesabınızla ilgili önemli bildirimleri size iletmek.

Verileriniz hiçbir koşulda üçüncü taraf reklamcılara satılmaz, kiralanmaz veya bu amaçla paylaşılmaz.`,
  },
  {
    title: "Çerezler (Cookies)",
    content: `CrowGuard AI, yalnızca işlevsel çerezler kullanır:

• Oturum çerezleri: Giriş durumunuzu korumak için zorunludur.
• Tema tercihi: Açık/koyu mod tercihlerinizi hatırlamak için kullanılır.

Takip çerezi, reklam çerezi veya üçüncü taraf analitik çerezi kullanmıyoruz. Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz, ancak bu durumda bazı özellikler çalışmayabilir.`,
  },
  {
    title: "Veri güvenliği",
    content: `Verilerinizin güvenliği için şu önlemleri alıyoruz:

• Tüm veri transferleri HTTPS ile şifrelenir.
• Şifreler bcrypt ile hashlenerek saklanır; düz metin hiçbir zaman tutulmaz.
• Sistemlerimize yetkisiz erişimi tespit etmek için düzenli güvenlik denetimleri yapılır.

Bununla birlikte, hiçbir internet tabanlı sistem %100 güvenli değildir. Güvenliğiniz için güçlü, benzersiz bir şifre kullanmanızı tavsiye ederiz.`,
  },
  {
    title: "Haklarınız",
    content: `KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:

• Verilerinize erişim hakkı: Hangi verilerinizin işlendiğini öğrenebilirsiniz.
• Düzeltme hakkı: Yanlış veya eksik verilerin düzeltilmesini talep edebilirsiniz.
• Silme hakkı: Hesabınızı ve tüm verilerinizi silmemizi talep edebilirsiniz.
• İtiraz hakkı: Belirli veri işleme faaliyetlerine itiraz edebilirsiniz.

Bu haklarınızı kullanmak için hello@crowguard.ai adresine yazabilirsiniz. Taleplerinize en geç 30 gün içinde yanıt veririz.`,
  },
  {
    title: "Politika değişiklikleri",
    content: `Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda sizi kayıtlı e-posta adresiniz üzerinden bilgilendiririz. Politikanın güncel halini her zaman bu sayfada bulabilirsiniz.

Son güncelleme: Mayıs 2026`,
  },
];

export default function PrivacyPage() {
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
            Gizlilik Politikası
          </h1>
          <p className="text-gray-500 font-light text-sm">
            Bu politika, CrowGuard AI olarak hangi verileri topladığımızı, nasıl kullandığımızı
            ve sizi nasıl koruduğumuzu açıklar.
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
