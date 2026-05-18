import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ backgroundColor: "var(--dark)" }}>
      {/* Trust bar */}
      <div style={{ backgroundColor: "#1a0a00", borderBottom: "1px solid #3d1f10" }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: "🔒", text: "SSL Güvenli Ödeme" },
              { icon: "🚚", text: "Hızlı Kargo" },
              { icon: "↩️", text: "30 Gün İade" },
              { icon: "📞", text: "7/24 Destek" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/60 text-xs">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-base" style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}>
                Ç
              </div>
              <span className="font-black text-white text-lg">Çarşıla</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#C9B0A4" }}>
              Türkiye'nin güvenilir online pazaryeri. Binlerce ürün, en iyi fiyatlar.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Kategoriler</h4>
            <ul className="space-y-2 text-xs" style={{ color: "#C9B0A4" }}>
              {["Elektronik", "Ev & Yaşam", "Giyim", "Sağlık & Güzellik", "Spor & Outdoor", "Aksesuar"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${encodeURIComponent(cat)}`} className="hover:text-white transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Hesabım</h4>
            <ul className="space-y-2 text-xs" style={{ color: "#C9B0A4" }}>
              {[["Profilim", "/profile"], ["Sepetim", "/cart"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
              {["Siparişlerim", "Favori Ürünlerim"].map((item) => (
                <li key={item}>
                  <span className="hover:text-white transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Güvenli Alışveriş</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {["SSL", "3D Secure", "256-bit"].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded border border-white/20 text-white/70">{tag}</span>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#C9B0A4" }}>Tüm ödemeler şifreli ve güvenli.</p>
          </div>
        </div>
        <div className="border-t pt-6 text-xs text-center" style={{ borderColor: "#3d1f10", color: "#8B6355" }}>
          © 2026 Çarşıla Pazaryeri A.Ş. — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
