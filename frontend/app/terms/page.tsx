import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const sections = [
  {
    title: "Hizmet Tanımı",
    content: `CrowGuard AI, kullanıcıların e-ticaret platformlarındaki ürünleri daha bilinçli değerlendirmesine yardımcı olmak amacıyla yapay zeka destekli analiz sunan bir platformdur.\n\nSunduğumuz başlıca özellikler:\n• Fiyat analizi ve tarihsel karşılaştırma\n• Sahte yorum tespiti ve güven skoru\n• İade riski tahmini\n• Doğal dil ile akıllı ürün önerisi\n\nBu hizmetler bilgilendirme amaçlıdır. Satın alma kararlarınızın nihai sorumluluğu size aittir.`,
  },
  {
    title: "Kullanım Koşulları",
    content: `Platforma kaydolarak veya hizmeti kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:\n\n• Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.\n• Hesabınızı başkalarıyla paylaşamazsınız.\n• Sistemi yalnızca kişisel ve ticari olmayan amaçlarla kullanabilirsiniz.\n• Sağlanan analiz sonuçları tahmin niteliğindedir; kesinlik garantisi verilmez.\n• Hizmeti kullanmak için 18 yaşını doldurmuş olmanız gerekir.`,
  },
  {
    title: "Yasaklanan Kullanımlar",
    content: `Aşağıdaki kullanımlar kesinlikle yasaktır ve hesap askıya alınmasına veya kapatılmasına yol açabilir:\n\n• Platformun API'lerine veya sistemlerine otomatik (bot) erişim sağlamak.\n• Analiz sonuçlarını üçüncü taraflara ücret karşılığında satmak.\n• Hizmeti kandırıcı, yanıltıcı veya yasadışı faaliyetler için kullanmak.\n• Sistemin güvenliğini test etmeye yönelik saldırı girişiminde bulunmak.\n• Diğer kullanıcıların verilerine izinsiz erişmeye çalışmak.`,
  },
  {
    title: "Fikri Mülkiyet",
    content: `CrowGuard AI platformunun tüm içeriği, tasarımı, kodu ve marka unsurları CrowGuard AI'ya aittir.\n\n• Kullanıcılar platforma girecekleri içeriklerden (ürün URL'leri, mesajlar vb.) kendileri sorumludur.\n• Platform içeriğini izinsiz kopyalamak, yeniden dağıtmak veya türev çalışmalar oluşturmak yasaktır.\n• Açık kaynaklı bileşenler kendi lisansları kapsamında kullanılmaktadır.`,
  },
  {
    title: "Sorumluluk Reddi",
    content: `CrowGuard AI aşağıdaki konularda sorumluluk kabul etmez:\n\n• Analiz sonuçlarına dayanılarak alınan kararların sonuçları.\n• Üçüncü taraf e-ticaret platformlarındaki değişiklikler veya hatalar.\n• Hizmetin kesintisiz veya hatasız çalışacağına dair garanti.\n• Beklenmedik teknik arızalar nedeniyle oluşabilecek veri kayıpları.\n\nHizmet "olduğu gibi" sunulmaktadır. Analiz sonuçları yardımcı bir araç niteliğindedir, nihai karar her zaman kullanıcıya aittir.`,
  },
  {
    title: "Değişiklikler ve Fesih",
    content: `Bu Kullanım Koşulları zaman zaman güncellenebilir. Önemli değişiklikler öncesinde kayıtlı e-posta adresinize bildirim göndeririz.\n\n• Koşulları kabul etmiyorsanız hesabınızı istediğiniz zaman silebilirsiniz.\n• Koşulları ihlal eden hesaplar önceden bildirim yapılmaksızın askıya alınabilir.\n• Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir.\n\nSon güncelleme: Mayıs 2026`,
  },
];

export default function TermsPage() {
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
              Kullanım<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg3)" }}>Koşulları</em>
            </h1>
            <p className="t-body t-muted" style={{ maxWidth: "480px", margin: "0 auto" }}>
              CrowGuard AI&apos;yı kullanmadan önce lütfen bu koşulları okuyunuz. Hizmeti kullanmaya devam ederek bu koşulları kabul etmiş sayılırsınız.
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
