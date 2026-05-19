"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simüle edilmiş API isteği
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", background: "var(--bg)", position: "relative", overflowX: "hidden", fontFamily: "var(--ff-b)", padding: "5rem clamp(1rem, 5vw, 2rem) 2rem" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .orb { position: fixed; border-radius: 50%; pointer-events: none; filter: blur(90px); opacity: 0.16; animation: float 8s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
        .top-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem clamp(1.25rem,4vw,3rem); }
        .back-link { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; font-weight: 600; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; letter-spacing: 0.02em; }
        html:not(.dark) .back-link { color: var(--fg2); }
        .back-link:hover { color: rgba(255,255,255,0.8); }
        html:not(.dark) .back-link:hover { color: var(--fg); }
        .back-link svg { width: 16px; height: 16px; }
        .login-card { position: relative; z-index: 10; width: 100%; max-width: 420px; margin: auto 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: clamp(2rem,5vw,3rem); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); }
        html:not(.dark) .login-card { background: rgba(253,250,247,0.88); border-color: rgba(120,70,90,0.10); }
        .card-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; }
        .card-logo-name { font-family: var(--ff-logo); font-size: 1.25rem; font-weight: 700; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-heading { font-family: var(--ff-d); font-size: clamp(1.75rem,4vw,2.25rem); font-weight: 800; line-height: 1.2; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-top: 0; margin-bottom: 0.375rem; }
        .card-sub { font-size: 0.875rem; color: rgba(255,255,255,0.38); margin-bottom: 2rem; font-weight: 400; line-height: 1.5; }
        html:not(.dark) .card-sub { color: var(--fg3); }
        .field { margin-bottom: 1.5rem; }
        .field-label { display: block; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 0.625rem; }
        html:not(.dark) .field-label { color: var(--fg3); }
        .field-row { display: flex; align-items: center; gap: 0.625rem; border-bottom: 1.5px solid rgba(255,255,255,0.12); padding-bottom: 0.625rem; transition: border-color 0.25s; }
        html:not(.dark) .field-row { border-bottom-color: var(--border); }
        .field-row:focus-within { border-color: var(--c4); }
        .field-row svg { width: 15px; height: 15px; color: rgba(255,255,255,0.25); flex-shrink: 0; transition: color 0.2s; }
        html:not(.dark) .field-row svg { color: var(--fg3); }
        .field-row:focus-within svg { color: var(--c4); }
        .field-row input { flex: 1; background: transparent; border: none; outline: none; font-family: var(--ff-b); font-size: 0.9375rem; color: rgba(255,255,255,0.88); }
        html:not(.dark) .field-row input { color: var(--fg); }
        .field-row input::placeholder { color: rgba(255,255,255,0.2); }
        html:not(.dark) .field-row input::placeholder { color: var(--fg3); }
        .submit-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.625rem; background: var(--grad); color: #fff; font-family: var(--ff-b); font-size: 0.9375rem; font-weight: 700; padding: 0.9em 2em; border-radius: var(--r-full); border: none; cursor: pointer; margin-top: 0.5rem; box-shadow: 0 4px 24px rgba(213,51,42,0.25); transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(213,51,42,0.38); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn svg { width: 16px; height: 16px; }
        .card-copy { text-align: center; margin-top: 1.5rem; font-size: 0.5625rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.18); }
        html:not(.dark) .card-copy { color: var(--fg3); }
        .success-box { margin-bottom: 1.5rem; padding: 1rem; border-radius: var(--r-md); font-size: 0.875rem; line-height: 1.5; background: rgba(46, 204, 113, 0.12); border: 1px solid rgba(46, 204, 113, 0.25); color: #2ecc71; text-align: center; }
      `}} />

      {/* Floating orbs */}
      <div className="orb" style={{ width: "500px", height: "500px", top: "-10%", left: "-15%", background: "#f17628", animationDelay: "0s" }} />
      <div className="orb" style={{ width: "560px", height: "560px", bottom: "-20%", right: "-12%", background: "#a21f65", animationDelay: "-4s" }} />
      <div className="orb" style={{ width: "320px", height: "320px", top: "35%", right: "10%", background: "#d5332a", animationDelay: "-2s", opacity: 0.09 }} />

      {/* Top bar */}
      <div className="top-bar">
        <Link href="/login" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Giriş Sayfası
        </Link>
      </div>

      {/* Card */}
      <div className="login-card">
        <BrandLogo height={36} variant="compact" showWordmark />

        <h2 className="card-heading">Şifremi Unuttum</h2>
        <p className="card-sub">
          Hesabınıza kayıtlı e-posta adresini girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>

        {isSent ? (
          <div className="success-box">
            <p style={{ margin: 0, fontWeight: 600, marginBottom: "0.5rem" }}>Bağlantı gönderildi!</p>
            <p style={{ margin: 0, fontSize: "0.8125rem", opacity: 0.9 }}>Lütfen gelen kutunuzu kontrol edin. Geçici olarak demo amaçlı <Link href="/reset-password" style={{ color: "inherit", textDecoration: "underline" }}>buraya tıklayarak</Link> sıfırlama ekranına gidebilirsiniz.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="field-label">E-Posta</label>
              <div className="field-row">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input type="email" name="email" autoComplete="email" placeholder="isim@sirket.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Gönderiliyor..." : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Sıfırlama Bağlantısı Gönder
                </>
              )}
            </button>
          </form>
        )}

        <p className="card-copy">© 2026 CrowGuard</p>
      </div>
    </div>
  );
}
