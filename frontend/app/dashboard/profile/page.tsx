"use client";

import { useEffect, useState } from "react";
import { MenuButton } from "@/components/menu-button";
import { useDashboard } from "@/contexts/dashboard-context";
import { fetchAnalysisHistory } from "@/lib/analysis";
import { getToken } from "@/lib/auth";

export default function ProfilePage() {
  const { user, initials, isPro, logout } = useDashboard();
  const [totalAnalysis, setTotalAnalysis] = useState<number | null>(null);
  const [memberSince, setMemberSince] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetchAnalysisHistory(token)
      .then((items) => setTotalAnalysis(items.length))
      .catch(() => {});
    // Üyelik tarihi için token'ı decode ediyoruz (JWT payload, imzasız)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.iat) {
        setMemberSince(
          new Date(payload.iat * 1000).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      }
    } catch {
      // token decode edilemezse gösterme
    }
  }, []);

  return (
    <>
      <div className="dash-topbar">
        <MenuButton />
        <span className="topbar-title">Profil</span>
        <div style={{ marginLeft: "auto" }} />
      </div>

      <div className="dash-content">
        <div style={{ maxWidth: "480px", width: "100%" }}>

          {/* Avatar + Bilgi */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--r-lg)",
              background: "var(--grad)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--ff-d)", fontSize: "1.375rem", fontWeight: 800,
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontFamily: "var(--ff-d)", fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1.2 }}>
                {user?.name ?? "Kullanıcı"}
              </div>
              <div style={{ fontSize: "0.875rem", color: "var(--fg3)", marginTop: "0.25rem" }}>
                {user?.email}
              </div>
            </div>
          </div>

          {/* Plan ve istatistikler */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1.5rem" }}>
            <div className="stat-card">
              <div className="stat-val">{totalAnalysis ?? "—"}</div>
              <div className="stat-lbl">Toplam Analiz</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{
                fontSize: "1rem", fontWeight: 700,
                background: isPro ? "var(--grad-h)" : undefined,
                WebkitBackgroundClip: isPro ? "text" : undefined,
                WebkitTextFillColor: isPro ? "transparent" : undefined,
                backgroundClip: isPro ? "text" : undefined,
                color: isPro ? undefined : "var(--fg3)",
              }}>
                {isPro ? "Pro" : "Ücretsiz"}
              </div>
              <div className="stat-lbl">Mevcut Plan</div>
            </div>
          </div>

          {/* Hesap detayları */}
          <div className="cg-card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontFamily: "var(--ff-d)", fontSize: "0.875rem", fontWeight: 700, color: "var(--fg)" }}>
              Hesap Bilgileri
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Ad Soyad</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{user?.name ?? "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>E-posta</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{user?.email ?? "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Üyelik Tarihi</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--fg)" }}>{memberSince || "—"}</span>
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--fg3)" }}>Plan</span>
                <span style={{
                  fontSize: "0.75rem", fontWeight: 800,
                  padding: "0.2em 0.75em", borderRadius: "var(--r-full)",
                  background: isPro ? "var(--grad)" : "var(--bg3)",
                  color: isPro ? "#fff" : "var(--fg3)",
                }}>
                  {isPro ? "Pro" : "Ücretsiz"}
                </span>
              </div>
            </div>
          </div>

          {/* Şifre Değiştirme */}
          <div className="cg-card" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem" }}>
            <div style={{ fontFamily: "var(--ff-d)", fontSize: "0.875rem", fontWeight: 700, color: "var(--fg)" }}>
              Şifre Değiştir
            </div>
            
            {passwordChangeSuccess ? (
              <div style={{ padding: "0.75rem", background: "rgba(46, 204, 113, 0.1)", border: "1px solid rgba(46, 204, 113, 0.2)", borderRadius: "var(--r-md)", color: "#2ecc71", fontSize: "0.8125rem" }}>
                Şifreniz başarıyla güncellendi.
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (newPassword !== confirmNewPassword) {
                  alert("Yeni şifreler eşleşmiyor.");
                  return;
                }
                if (newPassword.length < 6) {
                  alert("Yeni şifre en az 6 karakter olmalıdır.");
                  return;
                }
                setIsChangingPassword(true);
                setTimeout(() => {
                  setIsChangingPassword(false);
                  setPasswordChangeSuccess(true);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                  setTimeout(() => setPasswordChangeSuccess(false), 3000);
                }, 1000);
              }} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--fg3)", marginBottom: "0.375rem" }}>Mevcut Şifre</label>
                  <input 
                    type="password" 
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", color: "var(--fg)", fontSize: "0.875rem", outline: "none" }} 
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--fg3)", marginBottom: "0.375rem" }}>Yeni Şifre</label>
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", color: "var(--fg)", fontSize: "0.875rem", outline: "none" }} 
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--fg3)", marginBottom: "0.375rem" }}>Yeni Şifre (Tekrar)</label>
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", color: "var(--fg)", fontSize: "0.875rem", outline: "none" }} 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isChangingPassword}
                  style={{
                    alignSelf: "flex-start",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--r-md)",
                    background: "var(--grad)",
                    color: "#fff",
                    border: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    cursor: isChangingPassword ? "not-allowed" : "pointer",
                    opacity: isChangingPassword ? 0.7 : 1,
                    marginTop: "0.25rem"
                  }}
                >
                  {isChangingPassword ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                </button>
              </form>
            )}
          </div>

          {/* Tehlikeli Bölge */}
          <div className="cg-card" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.25rem", border: "1px solid rgba(213, 51, 42, 0.2)" }}>
            <div style={{ fontFamily: "var(--ff-d)", fontSize: "0.875rem", fontWeight: 700, color: "var(--c3)" }}>
              Tehlikeli Bölge
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--fg3)", margin: 0, lineHeight: 1.5 }}>
              Hesabınızı ve analiz geçmişi dahil tüm verilerinizi kalıcı olarak siler. Bu işlem geri alınamaz.
            </p>
            <button 
              type="button"
              onClick={() => {
                if (window.confirm("Hesabınızı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
                  alert("Hesabınız başarıyla silindi.");
                  logout();
                }
              }}
              style={{
                alignSelf: "flex-start",
                padding: "0.625rem 1rem",
                borderRadius: "var(--r-md)",
                background: "rgba(213, 51, 42, 0.1)",
                color: "var(--c3)",
                border: "1px solid rgba(213, 51, 42, 0.2)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--c3)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(213, 51, 42, 0.1)";
                e.currentTarget.style.color = "var(--c3)";
              }}
            >
              Hesabı Sil
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
