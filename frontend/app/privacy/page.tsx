"use client";

import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const sections = [
  {
    title: "Hangi verileri topluyoruz?",
    content: `Hizmetimizi kullanırken aşağıdaki verileri toplayabiliriz:\n\n• Hesap bilgileri: Kayıt sırasında verdiğiniz ad, e-posta adresi ve şifre (şifreler hashlenmiş olarak saklanır).\n• Kullanım verileri: Analiz ettiğiniz ürün URL'leri ve arama geçmişiniz, hizmetin kalitesini artırmak amacıyla kayıt altına alınabilir.\n• Teknik veriler: IP adresi, tarayıcı türü, cihaz bilgisi gibi standart log kayıtları güvenlik amacıyla tutulur.\n\nAnaliz ettiğiniz ürünlere ait üçüncü taraf içerikler (ürün bilgileri, fiyat verileri, yorumlar) sunucularımızda kalıcı olarak saklanmaz.`,
  },
  {
    title: "Verilerinizi nasıl kullanıyoruz?",
    content: `Topladığımız veriler yalnızca şu amaçlarla kullanılır:\n\n• Hizmeti sunmak ve kişiselleştirmek (ürün analiz sonuçları, arama geçmişi).\n• Güvenliği sağlamak ve kötüye kullanımı önlemek.\n• Hizmet kalitesini artırmak için anonim istatistikler üretmek.\n• Hesabınızla ilgili önemli bildirimleri size iletmek.\n\nVerileriniz hiçbir koşulda üçüncü taraf reklamcılara satılmaz, kiralanmaz veya bu amaçla paylaşılmaz.`,
  },
  {
    title: "Çerezler (Cookies)",
    content: `CrowGuard AI, yalnızca işlevsel çerezler kullanır:\n\n• Oturum çerezleri: Giriş durumunuzu korumak için zorunludur.\n• Tema tercihi: Açık/koyu mod tercihlerinizi hatırlamak için kullanılır.\n\nTakip çerezi, reklam çerezi veya üçüncü taraf analitik çerezi kullanmıyoruz. Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz, ancak bu durumda bazı özellikler çalışmayabilir.`,
  },
  {
    title: "Veri güvenliği",
    content: `Verilerinizin güvenliği için şu önlemleri alıyoruz:\n\n• Tüm veri transferleri HTTPS ile şifrelenir.\n• Şifreler bcrypt ile hashlenerek saklanır; düz metin hiçbir zaman tutulmaz.\n• Sistemlerimize yetkisiz erişimi tespit etmek için düzenli güvenlik denetimleri yapılır.\n\nBununla birlikte, hiçbir internet tabanlı sistem %100 güvenli değildir. Güvenliğiniz için güçlü, benzersiz bir şifre kullanmanızı tavsiye ederiz.`,
  },
  {
    title: "Haklarınız",
    content: `KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:\n\n• Verilerinize erişim hakkı: Hangi verilerinizin işlendiğini öğrenebilirsiniz.\n• Düzeltme hakkı: Yanlış veya eksik verilerin düzeltilmesini talep edebilirsiniz.\n• Silme hakkı: Hesabınızı ve tüm verilerinizi silmemizi talep edebilirsiniz.\n• İtiraz hakkı: Belirli veri işleme faaliyetlerine itiraz edebilirsiniz.\n\nBu haklarınızı kullanmak için hello@crowguard.ai adresine yazabilirsiniz. Taleplerinize en geç 30 gün içinde yanıt veririz.`,
  },
  {
    title: "Politika değişiklikleri",
    content: `Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda sizi kayıtlı e-posta adresiniz üzerinden bilgilendiririz. Politikanın güncel halini her zaman bu sayfada bulabilirsiniz.\n\nSon güncelleme: Mayıs 2026`,
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .legal-wrap { max-width: 760px; margin: 0 auto; padding: 0 clamp(1rem,4vw,3.5rem); }
        .legal-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .legal-card { background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-xl); padding: 1.75rem; }
        .legal-card h2 { font-family: var(--ff-d); font-size: 1rem; font-weight: 700; color: var(--fg); margin-bottom: 0.875rem; }
        .legal-card p { font-size: 0.875rem; color: var(--fg2); line-height: 1.8; white-space: pre-line; }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 3.5rem)", paddingBottom: "5rem" }}>
        <div className="legal-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label">Yasal</p>
            <h1 className="t-xl" style={{ color: "var(--fg)", marginBottom: "1rem" }}>
              Gizlilik<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg3)" }}>Politikası</em>
            </h1>
            <p className="t-body t-muted" style={{ maxWidth: "480px", margin: "0 auto" }}>
              Bu politika, CrowGuard AI olarak hangi verileri topladığımızı, nasıl kullandığımızı ve sizi nasıl koruduğumuzu açıklar.
            </p>
          </div>

          <div className="legal-list">
            {sections.map((s, i) => (
              <div key={i} className="legal-card">
                <h2>{s.title}</h2>
                <p>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
