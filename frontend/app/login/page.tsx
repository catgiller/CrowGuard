"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ApiError } from "@/lib/api";
import {
  loginUser,
  registerAndLogin,
  setSession,
  getToken,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getToken()) router.replace("/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = isLogin
        ? await loginUser(email.trim(), password)
        : await registerAndLogin(name.trim(), email.trim(), password);
      setSession(result.access_token, result.user);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status >= 500) {
          setError(
            "Sunucu hatası. Backend ekibine iletin (kayıt/giriş servisi yanıt vermiyor)."
          );
        } else {
          setError(err.message);
        }
      } else {
        setError("Bağlantı kurulamadı. Backend çalışıyor mu? (.env NEXT_PUBLIC_API_URL)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", position: "relative", overflow: "hidden", fontFamily: "var(--ff-b)" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .orb { position: fixed; border-radius: 50%; pointer-events: none; filter: blur(90px); opacity: 0.16; animation: float 8s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
        .top-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem clamp(1.25rem,4vw,3rem); }
        .back-link { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; font-weight: 600; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; letter-spacing: 0.02em; }
        html:not(.dark) .back-link { color: var(--fg2); }
        .back-link:hover { color: rgba(255,255,255,0.8); }
        html:not(.dark) .back-link:hover { color: var(--fg); }
        .back-link svg { width: 16px; height: 16px; }
        .login-card { position: relative; z-index: 10; width: 100%; max-width: 420px; margin: 0 clamp(1rem,5vw,2rem); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: clamp(2rem,5vw,3rem); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); }
        html:not(.dark) .login-card { background: rgba(253,250,247,0.88); border-color: rgba(120,70,90,0.10); }
        .card-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; }
        .card-logo-name { font-family: var(--ff-logo); font-size: 1.25rem; font-weight: 700; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-heading { font-family: var(--ff-d); font-size: clamp(1.75rem,4vw,2.25rem); font-weight: 800; line-height: 1.2; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.375rem; }
        .card-sub { font-size: 0.875rem; color: rgba(255,255,255,0.38); margin-bottom: 2rem; font-weight: 400; }
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
        .field-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.625rem; }
        .forgot { font-size: 0.625rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s; }
        html:not(.dark) .forgot { color: var(--fg3); }
        .forgot:hover { color: var(--c2); }
        .name-field { overflow: hidden; max-height: 0; transition: max-height 0.35s ease; margin-bottom: 0; }
        .name-field.open { max-height: 80px; margin-bottom: 1.5rem; }
        .submit-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.625rem; background: var(--grad); color: #fff; font-family: var(--ff-b); font-size: 0.9375rem; font-weight: 700; padding: 0.9em 2em; border-radius: var(--r-full); border: none; cursor: pointer; margin-top: 0.5rem; box-shadow: 0 4px 24px rgba(213,51,42,0.25); transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(213,51,42,0.38); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .submit-btn svg { width: 16px; height: 16px; }
        .toggle-area { margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        html:not(.dark) .toggle-area { border-top-color: var(--border); }
        .toggle-area p { font-size: 0.8125rem; color: rgba(255,255,255,0.35); }
        html:not(.dark) .toggle-area p { color: var(--fg3); }
        .toggle-btn { font-size: 0.8125rem; color: rgba(255,255,255,0.7); font-family: var(--ff-b); background: none; border: none; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
        html:not(.dark) .toggle-btn { color: var(--fg2); }
        .toggle-btn:hover { color: var(--c2); }
        .card-copy { text-align: center; margin-top: 1.5rem; font-size: 0.5625rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.18); }
        html:not(.dark) .card-copy { color: var(--fg3); }
        .form-error { margin-bottom: 1rem; padding: 0.75rem 1rem; border-radius: var(--r-md); font-size: 0.8125rem; line-height: 1.5; background: rgba(213,51,42,0.12); border: 1px solid rgba(213,51,42,0.25); color: var(--c3); }
      `}}/>

      {/* Floating orbs */}
      <div className="orb" style={{ width: "500px", height: "500px", top: "-10%", left: "-15%", background: "#f17628", animationDelay: "0s" }} />
      <div className="orb" style={{ width: "560px", height: "560px", bottom: "-20%", right: "-12%", background: "#a21f65", animationDelay: "-4s" }} />
      <div className="orb" style={{ width: "320px", height: "320px", top: "35%", right: "10%", background: "#d5332a", animationDelay: "-2s", opacity: 0.09 }} />

      {/* Top bar */}
      <div className="top-bar">
        <Link href="/" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Ana Sayfa
        </Link>
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="login-card">
        {/* Logo */}
        <div className="card-logo">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "36px", width: "36px" }}>
            <defs>
              <linearGradient id="lgLogo" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f89957"/><stop offset="30%" stopColor="#f17628"/><stop offset="55%" stopColor="#d5332a"/><stop offset="80%" stopColor="#d260a5"/><stop offset="100%" stopColor="#a21f65"/>
              </linearGradient>
            </defs>
            <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" fill="url(#lgLogo)" opacity="0.15"/>
            <path d="M18 3L5 8v10c0 7.4 5.6 13.4 13 15 7.4-1.6 13-7.6 13-15V8L18 3z" stroke="url(#lgLogo)" strokeWidth="1.5" fill="none"/>
            <path d="M12 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4.1 1.6L24 14l-1.5 3H24l-2 2.5c.3.6.5 1.3.5 2 0 3.3-2.7 6-6 6s-6-2.7-6-6z" fill="url(#lgLogo)"/>
            <circle cx="20" cy="19" r="1" fill="white" opacity="0.9"/>
          </svg>
          <span className="card-logo-name">CrowGuard</span>
        </div>

        <h2 className="card-heading">{isLogin ? "Tekrar Hoşgeldiniz" : "Hesap Oluşturun"}</h2>
        <p className="card-sub">{isLogin ? "Alışveriş asistanınız sizi bekliyor." : "Akıllı alışverişe ilk adımı atın."}</p>

        {error && <p className="form-error" role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name (register only) */}
          <div className={`field name-field${!isLogin ? " open" : ""}`}>
            <label className="field-label">Ad Soyad</label>
            <div className="field-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <input type="text" name="name" autoComplete="name" placeholder="Adınız Soyadınız" required={!isLogin} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label className="field-label">E-Posta</label>
            <div className="field-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <input type="email" name="email" autoComplete="email" placeholder="isim@sirket.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Password */}
          <div className="field">
            <div className="field-meta">
              <label className="field-label" style={{ marginBottom: 0 }}>Şifre</label>
              {isLogin && <Link href="#" className="forgot">Unuttum</Link>}
            </div>
            <div className="field-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input type="password" name="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder="••••••••" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14"/></svg>
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <div className="toggle-area">
          <p>{isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}</p>
          <button type="button" className="toggle-btn" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
            {isLogin ? "Ücretsiz kaydolun" : "Giriş yapın"}
          </button>
        </div>

        <p className="card-copy">© 2026 CrowGuard AI</p>
      </div>
    </div>
  );
}
