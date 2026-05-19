import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ backgroundColor: "var(--navy)" }}>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-black text-xl mb-2 text-white">Shop<span style={{ color: "var(--gold)" }}>rill</span></p>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Premium alışveriş deneyimi. Seçkin ürünler, rekabetçi fiyatlar.</p>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold mb-3 text-xs uppercase tracking-widest">Kategoriler</h4>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {["Elektronik","Giyim","Ev & Yaşam","Sağlık & Güzellik","Spor & Outdoor","Aksesuar"].map(c => (
                  <li key={c}><Link href={`/category/${encodeURIComponent(c)}`} className="hover:text-white transition-colors">{c}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold mb-3 text-xs uppercase tracking-widest">Hesabım</h4>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <li><Link href="/profile" className="hover:text-white transition-colors">Profilim</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Sepetim</Link></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Siparişlerim</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Favorilerim</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold mb-3 text-xs uppercase tracking-widest">Güvenli Alışveriş</h4>
              <div className="flex flex-wrap gap-2">
                {["SSL","3D Secure","256-bit"].map(t => (
                  <span key={t} className="text-xs px-2 py-1 rounded border" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-xs text-center" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
            © 2026 Shoprill Ltd. — All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
