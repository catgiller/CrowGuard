import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--bg)", fontFamily: "var(--ff-b)", textAlign: "center", padding: "2rem" }}>
      <style dangerouslySetInnerHTML={{__html:`
        .nf-code { font-family: var(--ff-d); font-size: clamp(5rem,16vw,9rem); font-weight: 900; line-height: 1; background: var(--grad-h); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.5rem; }
        .nf-title { font-family: var(--ff-d); font-size: clamp(1.375rem,3vw,1.875rem); font-weight: 700; color: var(--fg); margin-bottom: 0.875rem; }
        .nf-desc { font-size: 0.9375rem; color: var(--fg3); line-height: 1.7; max-width: 380px; margin: 0 auto 2.5rem; }
        .nf-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
      `}} />

      <div className="nf-code">404</div>
      <h1 className="nf-title">Sayfa bulunamadı</h1>
      <p className="nf-desc">Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.</p>

      <div className="nf-actions">
        <Link href="/" className="btn btn-grad">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "15px", height: "15px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Ana Sayfa
        </Link>
        <Link href="/dashboard" className="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: "15px", height: "15px" }}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </Link>
      </div>
    </main>
  );
}
