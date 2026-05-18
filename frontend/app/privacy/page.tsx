import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .legal-wrap { max-width: 1000px; margin: 0 auto; padding: 0 clamp(1.5rem,5vw,4rem); }
        .legal-body { display: grid; grid-template-columns: 200px 1fr; gap: clamp(2rem,5vw,5rem); align-items: start; }
        @media (max-width: 700px) { .legal-body { grid-template-columns: 1fr; } }
        .legal-toc { position: sticky; top: calc(var(--nav-h) + 2rem); }
        .legal-toc-title { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fg3); margin-bottom: 1rem; }
        .legal-toc a { display: block; font-size: 0.8125rem; color: var(--fg3); text-decoration: none; padding: 0.3rem 0; border-left: 2px solid var(--border); padding-left: 0.875rem; transition: color 0.2s, border-color 0.2s; line-height: 1.4; }
        .legal-toc a:hover { color: var(--fg); border-color: var(--c2); }
        @media (max-width: 700px) { .legal-toc { display: none; } }
        .legal-content { padding-bottom: 5rem; }
        .legal-section { margin-bottom: 2.75rem; }
        .legal-section h2 { font-family: var(--ff-d); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 0.875rem; padding-top: 0.25rem; }
        .legal-section p { font-size: 0.9375rem; color: var(--fg2); line-height: 1.85; margin-bottom: 0.875rem; }
        .legal-section p:last-child { margin-bottom: 0; }
        .legal-section ul { list-style: none; margin: 0.5rem 0 0.875rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .legal-section ul li { font-size: 0.9375rem; color: var(--fg2); line-height: 1.7; padding-left: 1.25rem; position: relative; }
        .legal-section ul li::before { content: "—"; position: absolute; left: 0; color: var(--fg3); }
        .legal-divider { height: 1px; background: var(--border); margin-bottom: 2.75rem; }
        .legal-meta { font-size: 0.8125rem; color: var(--fg3); margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
      `}} />

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 4rem)" }}>
        <div className="legal-wrap">

          <div style={{ marginBottom: "3.5rem" }}>
            <p className="section-label">Yasal</p>
            <h1 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.875rem", lineHeight: 1.1 }}>
              Gizlilik Politikası
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.75, maxWidth: "560px" }}>
              CrowGuard olarak hangi verileri topladığımızı, nasıl kullandığımızı ve sizi nasıl koruduğumuzu açıklar.
            </p>
          </div>

          <div className="legal-body">

            {/* İçindekiler */}
            <nav className="legal-toc">
              <div className="legal-toc-title">İçindekiler</div>
              <a href="#toplanan-veriler">Hangi verileri topluyoruz?</a>
              <a href="#veri-kullanimi">Verileri nasıl kullanıyoruz?</a>
              <a href="#cerezler">Çerezler</a>
              <a href="#guvenlik">Veri güvenliği</a>
              <a href="#haklariniz">Haklarınız</a>
              <a href="#degisiklikler">Politika değişiklikleri</a>
            </nav>

            {/* İçerik */}
            <div className="legal-content">

              <div className="legal-section" id="toplanan-veriler">
                <h2>Hangi verileri topluyoruz?</h2>
                <p>Hizmetimizi kullanırken aşağıdaki verileri toplayabiliriz:</p>
                <ul>
                  <li><strong>Hesap bilgileri:</strong> Kayıt sırasında verdiğiniz ad, e-posta adresi ve şifre. Şifreler bcrypt ile hashlenerek saklanır; düz metin hiçbir zaman tutulmaz.</li>
                  <li><strong>Kullanım verileri:</strong> Analiz ettiğiniz ürün URL'leri ve arama geçmişiniz, hizmetin kalitesini artırmak amacıyla kayıt altına alınabilir.</li>
                  <li><strong>Teknik veriler:</strong> IP adresi, tarayıcı türü ve cihaz bilgisi gibi standart log kayıtları güvenlik amacıyla tutulur.</li>
                </ul>
                <p>Analiz ettiğiniz ürünlere ait üçüncü taraf içerikler (ürün bilgileri, fiyat verileri, yorumlar) sunucularımızda kalıcı olarak saklanmaz.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="veri-kullanimi">
                <h2>Verilerinizi nasıl kullanıyoruz?</h2>
                <p>Topladığımız veriler yalnızca şu amaçlarla kullanılır:</p>
                <ul>
                  <li>Hizmeti sunmak ve kişiselleştirmek (ürün analiz sonuçları, arama geçmişi).</li>
                  <li>Güvenliği sağlamak ve kötüye kullanımı önlemek.</li>
                  <li>Hizmet kalitesini artırmak için anonim istatistikler üretmek.</li>
                  <li>Hesabınızla ilgili önemli bildirimleri size iletmek.</li>
                </ul>
                <p>Verileriniz hiçbir koşulda üçüncü taraf reklamcılara satılmaz, kiralanmaz veya bu amaçla paylaşılmaz.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="cerezler">
                <h2>Çerezler</h2>
                <p>CrowGuard yalnızca işlevsel çerezler kullanır:</p>
                <ul>
                  <li><strong>Oturum çerezleri:</strong> Giriş durumunuzu korumak için zorunludur.</li>
                  <li><strong>Tema tercihi:</strong> Açık/koyu mod tercihlerinizi hatırlamak için kullanılır.</li>
                </ul>
                <p>Takip çerezi, reklam çerezi veya üçüncü taraf analitik çerezi kullanmıyoruz. Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler çalışmayabilir.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="guvenlik">
                <h2>Veri güvenliği</h2>
                <p>Verilerinizin güvenliği için şu önlemleri alıyoruz:</p>
                <ul>
                  <li>Tüm veri transferleri HTTPS ile şifrelenir.</li>
                  <li>Şifreler bcrypt ile hashlenerek saklanır; düz metin hiçbir zaman tutulmaz.</li>
                  <li>Yetkisiz erişimi tespit etmek için düzenli güvenlik denetimleri yapılır.</li>
                </ul>
                <p>Bununla birlikte hiçbir internet tabanlı sistem %100 güvenli değildir. Güvenliğiniz için güçlü ve benzersiz bir şifre kullanmanızı tavsiye ederiz.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="haklariniz">
                <h2>Haklarınız</h2>
                <p>KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul>
                  <li><strong>Erişim hakkı:</strong> Hangi verilerinizin işlendiğini öğrenebilirsiniz.</li>
                  <li><strong>Düzeltme hakkı:</strong> Yanlış veya eksik verilerin düzeltilmesini talep edebilirsiniz.</li>
                  <li><strong>Silme hakkı:</strong> Hesabınızı ve tüm verilerinizi silmemizi talep edebilirsiniz.</li>
                  <li><strong>İtiraz hakkı:</strong> Belirli veri işleme faaliyetlerine itiraz edebilirsiniz.</li>
                </ul>
                <p>Bu haklarınızı kullanmak için <strong>hello@crowguard.ai</strong> adresine yazabilirsiniz. Taleplerinize en geç 30 gün içinde yanıt veririz.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="degisiklikler">
                <h2>Politika değişiklikleri</h2>
                <p>Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda sizi kayıtlı e-posta adresiniz üzerinden bilgilendiririz. Politikanın güncel halini her zaman bu sayfada bulabilirsiniz.</p>
              </div>

              <div className="legal-meta">
                Son güncelleme: Mayıs 2026 · <Link href="/terms" style={{ color: "var(--c2)", textDecoration: "none" }}>Kullanım Koşulları</Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
