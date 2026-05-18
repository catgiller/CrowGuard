import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
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
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 4rem)" }}>
        <div className="legal-wrap">

          <div style={{ marginBottom: "3.5rem" }}>
            <p className="section-label">Yasal</p>
            <h1 style={{ fontFamily: "var(--ff-d)", fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "var(--fg)", marginBottom: "0.875rem", lineHeight: 1.1 }}>
              Kullanım Koşulları
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--fg2)", lineHeight: 1.75, maxWidth: "560px" }}>
              CrowGuard AI&apos;yı kullanmadan önce lütfen bu koşulları okuyunuz. Hizmeti kullanmaya devam ederek bu koşulları kabul etmiş sayılırsınız.
            </p>
          </div>

          <div className="legal-body">

            {/* İçindekiler */}
            <nav className="legal-toc">
              <div className="legal-toc-title">İçindekiler</div>
              <a href="#hizmet-tanimi">Hizmet tanımı</a>
              <a href="#kullanim-kurallari">Kullanım kuralları</a>
              <a href="#yasaklanan">Yasaklanan kullanımlar</a>
              <a href="#fikri-mulkiyet">Fikri mülkiyet</a>
              <a href="#sorumluluk">Sorumluluk reddi</a>
              <a href="#degisiklikler">Değişiklikler ve fesih</a>
            </nav>

            {/* İçerik */}
            <div className="legal-content">

              <div className="legal-section" id="hizmet-tanimi">
                <h2>Hizmet tanımı</h2>
                <p>CrowGuard AI, kullanıcıların e-ticaret platformlarındaki ürünleri daha bilinçli değerlendirmesine yardımcı olmak amacıyla yapay zeka destekli analiz sunan bir platformdur.</p>
                <p>Sunduğumuz başlıca özellikler:</p>
                <ul>
                  <li>Fiyat analizi ve tarihsel karşılaştırma</li>
                  <li>Sahte yorum tespiti ve güven skoru</li>
                  <li>İade riski tahmini</li>
                  <li>Doğal dil ile akıllı ürün önerisi</li>
                </ul>
                <p>Bu hizmetler bilgilendirme amaçlıdır. Satın alma kararlarınızın nihai sorumluluğu size aittir.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="kullanim-kurallari">
                <h2>Kullanım kuralları</h2>
                <p>Platforma kaydolarak veya hizmeti kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:</p>
                <ul>
                  <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.</li>
                  <li>Hesabınızı başkalarıyla paylaşamazsınız.</li>
                  <li>Sistemi yalnızca kişisel ve ticari olmayan amaçlarla kullanabilirsiniz.</li>
                  <li>Sağlanan analiz sonuçları tahmin niteliğindedir; kesinlik garantisi verilmez.</li>
                  <li>Hizmeti kullanmak için 18 yaşını doldurmuş olmanız gerekir.</li>
                </ul>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="yasaklanan">
                <h2>Yasaklanan kullanımlar</h2>
                <p>Aşağıdaki kullanımlar kesinlikle yasaktır ve hesap askıya alınmasına veya kapatılmasına yol açabilir:</p>
                <ul>
                  <li>Platformun API&apos;lerine veya sistemlerine otomatik (bot) erişim sağlamak.</li>
                  <li>Analiz sonuçlarını üçüncü taraflara ücret karşılığında satmak.</li>
                  <li>Hizmeti kandırıcı, yanıltıcı veya yasadışı faaliyetler için kullanmak.</li>
                  <li>Sistemin güvenliğini test etmeye yönelik saldırı girişiminde bulunmak.</li>
                  <li>Diğer kullanıcıların verilerine izinsiz erişmeye çalışmak.</li>
                </ul>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="fikri-mulkiyet">
                <h2>Fikri mülkiyet</h2>
                <p>CrowGuard AI platformunun tüm içeriği, tasarımı, kodu ve marka unsurları CrowGuard AI&apos;ya aittir.</p>
                <ul>
                  <li>Kullanıcılar platforma girecekleri içeriklerden (ürün URL&apos;leri, mesajlar vb.) kendileri sorumludur.</li>
                  <li>Platform içeriğini izinsiz kopyalamak, yeniden dağıtmak veya türev çalışmalar oluşturmak yasaktır.</li>
                  <li>Açık kaynaklı bileşenler kendi lisansları kapsamında kullanılmaktadır.</li>
                </ul>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="sorumluluk">
                <h2>Sorumluluk reddi</h2>
                <p>CrowGuard AI aşağıdaki konularda sorumluluk kabul etmez:</p>
                <ul>
                  <li>Analiz sonuçlarına dayanılarak alınan kararların sonuçları.</li>
                  <li>Üçüncü taraf e-ticaret platformlarındaki değişiklikler veya hatalar.</li>
                  <li>Hizmetin kesintisiz veya hatasız çalışacağına dair garanti.</li>
                  <li>Beklenmedik teknik arızalar nedeniyle oluşabilecek veri kayıpları.</li>
                </ul>
                <p>Hizmet &quot;olduğu gibi&quot; sunulmaktadır. Analiz sonuçları yardımcı bir araç niteliğindedir; nihai karar her zaman kullanıcıya aittir.</p>
              </div>
              <div className="legal-divider" />

              <div className="legal-section" id="degisiklikler">
                <h2>Değişiklikler ve fesih</h2>
                <p>Bu Kullanım Koşulları zaman zaman güncellenebilir. Önemli değişiklikler öncesinde kayıtlı e-posta adresinize bildirim göndeririz.</p>
                <ul>
                  <li>Koşulları kabul etmiyorsanız hesabınızı istediğiniz zaman silebilirsiniz.</li>
                  <li>Koşulları ihlal eden hesaplar önceden bildirim yapılmaksızın askıya alınabilir.</li>
                  <li>Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir.</li>
                </ul>
              </div>

              <div className="legal-meta">
                Son güncelleme: Mayıs 2026 · <Link href="/privacy" style={{ color: "var(--c2)", textDecoration: "none" }}>Gizlilik Politikası</Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
