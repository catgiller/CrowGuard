"use client";

import { useState } from "react";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

const faqs = [
  { q: "CrowGuard AI nedir?", a: "CrowGuard AI, yapay zeka destekli bir alışveriş karar platformudur. Bir ürün linki veya isim girdiğinizde; fiyat geçmişini analiz eder, yorumların ne kadarının sahte olduğunu tespit eder ve o ürünü iade etme riskinizi hesaplar. Amacımız tek bir şey: pişmanlık yaşamadan alışveriş yapmanıza yardımcı olmak." },
  { q: "Hangi e-ticaret platformlarını destekliyor?", a: "Şu an Trendyol, Amazon Türkiye ve Hepsiburada'daki ürünleri analiz edebiliyoruz. Ürün linkini yapıştırmanız yeterli; sistem gerisini halleder. Desteklenen platform listesi büyümeye devam ediyor." },
  { q: "Sahte yorum tespiti nasıl çalışıyor?", a: "AI modelimiz yorum dilini, hesap oluşturma tarihlerini, satın alma doğrulamalarını ve yorum zaman örüntülerini analiz eder. Gerçek bir insan yorumu ile otomatik üretilmiş yorum arasındaki farkı istatistiksel olarak tespit ederek size bir güven skoru sunar." },
  { q: "Fiyat analizi neye göre yapılıyor?", a: "Ürünün geçmiş fiyat verilerini toplayıp mevcut fiyatıyla karşılaştırıyoruz. Şu an piyasa ortalamasının üzerinde mi, altında mı? Kampanya dönemi mi yaklaşıyor? Bu sorulara göre AL, BEKLE ya da ALTERNATİF önerisi sunuyoruz." },
  { q: "İade riski skoru ne anlama geliyor?", a: "Her ürün kategorisinin tarihsel iade oranı ve o ürüne özgü faktörler (beden uyumu, teknik karmaşıklık, paketleme kalitesi vb.) bir araya getirilerek bir risk yüzdesi hesaplanır. %70 ve üzeri yüksek risk olarak işaretlenir." },
  { q: "Akıllı Asistan ne işe yarıyor?", a: "Doğal dilde ihtiyacınızı söylemeniz yeterli: \"Sevgilime teknoloji hediyesi, 800₺ bütçe\" gibi. Asistan bu bilgileri işleyerek size en uygun ürün önerilerini analiz raporu ile birlikte sunar." },
  { q: "Ücretsiz mi? Ücretli plan var mı?", a: "Temel özellikler tamamen ücretsiz. Ürün analizi, sahte yorum tespiti ve fiyat karşılaştırması ücretsiz hesapla kullanılabilir. Sınırsız analiz ve fiyat alarmları için Pro planına geçilebilir." },
  { q: "Verilerim güvende mi?", a: "Evet. Analiz ettiğiniz ürün verileri sunucularımızda kalıcı olarak saklanmaz. Kişisel bilgileriniz şifreli olarak tutulur ve üçüncü taraflarla paylaşılmaz." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .faq-page-wrap { max-width: 760px; margin: 0 auto; padding: 0 clamp(1rem,4vw,3.5rem); }
        .faq-list { display: flex; flex-direction: column; gap: 0.625rem; }
        .faq-item { background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-lg); overflow: hidden; transition: border-color 0.25s; }
        .faq-item.open { border-color: rgba(210,96,165,0.25); }
        .faq-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 1.5rem; text-align: left; background: transparent; border: none; cursor: pointer; font-family: var(--ff-b); transition: background 0.2s; }
        .faq-btn:hover { background: var(--bg2); }
        .faq-q { font-size: clamp(0.9rem,1.5vw,1rem); font-weight: 600; color: var(--fg); line-height: 1.45; }
        .faq-chevron { width: 20px; height: 20px; flex-shrink: 0; color: var(--fg3); transition: transform 0.3s ease; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--c4); }
        .faq-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .faq-item.open .faq-body { max-height: 400px; }
        .faq-a { padding: 0 1.5rem 1.25rem; font-size: 0.9rem; color: var(--fg2); line-height: 1.75; border-top: 1px solid var(--border); padding-top: 1rem; }
        .contact-strip { margin-top: 2.5rem; background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-xl); padding: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .contact-strip h3 { font-family: var(--ff-d); font-size: 1.125rem; font-weight: 700; color: var(--fg); margin-bottom: 0.25rem; }
        .contact-strip p { font-size: 0.875rem; color: var(--fg3); }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 3.5rem)", paddingBottom: "5rem" }}>
        <div className="faq-page-wrap">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label">Sık Sorulan Sorular</p>
            <h1 className="t-xl" style={{ color: "var(--fg)", marginBottom: "1rem" }}>
              Aklınızdaki sorular,<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg3)" }}>net cevaplar.</em>
            </h1>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
                <button className="faq-btn" onClick={() => toggle(i)}>
                  <span className="faq-q">{faq.q}</span>
                  <svg className="faq-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div className="faq-body">
                  <p className="faq-a">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-strip">
            <div>
              <h3>Burada bulamadınız mı?</h3>
              <p>Her soruyu yanıtlamaya hazırız. Genellikle 24 saat içinde geri dönüyoruz.</p>
            </div>
            <Link href="/contact" className="btn btn-grad">Bize Yazın</Link>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
