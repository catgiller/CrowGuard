"use client";

import { useState } from "react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "";
    const body = `Ad: ${name}%0AKonu: ${subject}%0A%0A${message}`;
    window.location.href = `mailto:hello@crowguard.ai?subject=${encodeURIComponent(subject || "İletişim")}&body=${body}`;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .contact-page-wrap { max-width: 960px; margin: 0 auto; padding: 0 clamp(1rem,4vw,3.5rem); }
        .contact-grid { display: grid; grid-template-columns: 5fr 7fr; gap: 1.5rem; }
        @media (max-width: 700px) { .contact-grid { grid-template-columns: 1fr; } }
        .info-card { background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-lg); padding: 1.5rem; }
        .info-icon { width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .info-icon svg { width: 20px; height: 20px; }
        .info-label { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); margin-bottom: 0.375rem; }
        .info-value { font-size: 0.9375rem; font-weight: 600; color: var(--fg); text-decoration: none; transition: color 0.2s; display: block; }
        .info-value:hover { color: var(--c2); }
        .info-note { font-size: 0.8125rem; color: var(--fg3); margin-top: 0.375rem; }
        .form-card { background: var(--card); border: 1.5px solid var(--card-b); border-radius: var(--r-xl); padding: 2rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } }
        .cfield { display: flex; flex-direction: column; gap: 0.5rem; }
        .cfield label { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); }
        .success-state { text-align: center; padding: 3rem 2rem; }
        .success-icon { width: 56px; height: 56px; border-radius: 50%; background: rgba(22,163,74,0.12); border: 1.5px solid rgba(22,163,74,0.25); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .success-icon svg { width: 26px; height: 26px; color: #16a34a; }
        .success-state h3 { font-family: var(--ff-d); font-size: 1.375rem; font-weight: 700; color: var(--fg); margin-bottom: 0.5rem; }
        .success-state p { font-size: 0.9rem; color: var(--fg3); }
      `}}/>

      <MarketingNav />

      <div style={{ flex: 1, paddingTop: "calc(var(--nav-h) + 3.5rem)", paddingBottom: "5rem" }}>
        <div className="contact-page-wrap">

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label">İletişim</p>
            <h1 className="t-xl" style={{ color: "var(--fg)", marginBottom: "1rem" }}>
              Bir şey mi sormak<br /><em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--fg3)" }}>istiyorsunuz?</em>
            </h1>
            <p className="t-body t-muted" style={{ maxWidth: "400px", margin: "0 auto" }}>
              Geri bildirim, iş birliği teklifi ya da teknik soru — her konuda dinliyoruz.
            </p>
          </div>

          <div className="contact-grid">
            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div className="info-card">
                <div className="info-icon" style={{ background: "rgba(241,118,40,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#f17628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="info-label">E-Posta</div>
                <span className="info-value">hello@crowguard.ai</span>
                <p className="info-note">Adres yakında aktif olacak. Şimdilik formu kullanabilirsiniz.</p>
              </div>

              <div className="info-card">
                <div className="info-icon" style={{ background: "rgba(162,31,101,0.1)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a21f65" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </div>
                <div className="info-label">GitHub</div>
                <span className="info-value">github.com/crowguard-ai</span>
                <p className="info-note">Repo yakında yayınlanacak.</p>
              </div>

              <div className="info-card">
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>🪶</div>
                <div style={{ fontFamily: "var(--ff-d)", fontSize: "1rem", fontWeight: 700, color: "var(--fg)", marginBottom: "0.375rem" }}>Proje hakkında</div>
                <p style={{ fontSize: "0.8125rem", color: "var(--fg3)", lineHeight: 1.6 }}>İki kişilik bir ekibiz. Her mesaj bize direkt ulaşır — bürokratik filtre yok.</p>
              </div>
            </div>

            {/* Form */}
            <div className="form-card">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Mesajınız ulaştı.</h3>
                  <p>En kısa sürede geri döneceğiz.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--ff-d)", fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)", marginBottom: "1.5rem" }}>Mesaj Gönderin</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-grid" style={{ marginBottom: "1rem" }}>
                      <div className="cfield">
                        <label>Ad Soyad</label>
                        <input type="text" name="name" className="cg-input" placeholder="Adınız Soyadınız" required />
                      </div>
                      <div className="cfield">
                        <label>E-Posta</label>
                        <input type="email" name="email" className="cg-input" placeholder="isim@ornek.com" required />
                      </div>
                    </div>
                    <div className="cfield" style={{ marginBottom: "1rem" }}>
                      <label>Konu</label>
                      <input type="text" name="subject" className="cg-input" placeholder="Ne hakkında konuşmak istiyorsunuz?" />
                    </div>
                    <div className="cfield" style={{ marginBottom: "1.5rem" }}>
                      <label>Mesajınız</label>
                      <textarea name="message" className="cg-input" placeholder="Mesajınızı buraya yazın..." rows={5} required />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-grad"
                      disabled={loading}
                      style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "16px", height: "16px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                      {loading ? "Gönderiliyor..." : "Gönder"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </main>
  );
}
