import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products, getCategories } from "@/lib/products";

const CATEGORY_ICONS: Record<string, string> = {
  "Elektronik": "📱",
  "Ev & Yaşam": "🏠",
  "Giyim": "👗",
  "Sağlık & Güzellik": "✨",
  "Spor & Outdoor": "🏃",
  "Aksesuar": "💍",
};

export default function HomePage() {
  const categories = getCategories();
  const newest = products.slice(0, 4);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const featured = products[1]; // Aurex kulaklık

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section style={{ backgroundColor: "var(--navy)" }} className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: "var(--gold)" }}>
                Yeni Sezon Koleksiyonu
              </p>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Premium Ürünler,<br />
                <span style={{ color: "var(--gold)" }}>Eşsiz Fiyatlar</span>
              </h1>
              <p className="text-white/60 mb-8 leading-relaxed max-w-md">
                Dünya markalarını kapınıza getiriyoruz. Kaliteli alışveriş, güvenilir teslimat.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="px-8 py-3.5 font-semibold text-sm rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
                >
                  Koleksiyonu Keşfet
                </Link>
                <Link
                  href="/category/Elektronik"
                  className="px-8 py-3.5 font-medium text-sm rounded-lg border transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
                >
                  Elektronik →
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden hidden md:block">
              <Image
                src={featured.images[0]}
                alt={featured.name}
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 50%, rgba(15,27,53,0.6) 100%)" }}></div>
              <div className="absolute bottom-5 right-5 bg-white/10 backdrop-blur-sm rounded-xl p-4 border" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <p className="text-white text-xs mb-1">{featured.brand}</p>
                <p className="text-white font-semibold text-sm">{featured.name}</p>
                <p className="font-bold mt-1" style={{ color: "var(--gold)" }}>
                  {featured.prices.shoprill.toLocaleString("tr-TR")} TL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ backgroundColor: "var(--navy-light)" }} className="py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
            {[
              ["25+", "Marka"],
              ["6 Kategori", "Seçenek"],
              ["Ücretsiz", "Kargo 500 TL+"],
              ["30 Gün", "İade Garantisi"],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-sm font-bold" style={{ color: "var(--gold)" }}>{val}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Kategoriler */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: "var(--gold)" }}>Keşfet</p>
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>Kategoriler</h2>
            </div>
            <Link href="/products" className="text-sm font-medium" style={{ color: "var(--navy)" }}>
              Tümünü gör →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border bg-white hover:shadow-md transition-all duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat] ?? "🛍️"}</span>
                <span className="text-xs font-medium text-center" style={{ color: "var(--text)" }}>{cat}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* En Yüksek Puanlı */}
        <section style={{ backgroundColor: "#EDEEF2" }} className="py-14 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: "var(--gold)" }}>En Popüler</p>
                <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>En Yüksek Puanlı Ürünler</h2>
              </div>
              <Link href="/products" className="text-sm font-medium" style={{ color: "var(--navy)" }}>Tümü →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topRated.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Yeni Gelenler */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: "var(--gold)" }}>Öne Çıkanlar</p>
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>Seçtiklerimiz</h2>
            </div>
            <Link href="/products" className="text-sm font-medium" style={{ color: "var(--navy)" }}>Tümü →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newest.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-6 md:mx-auto max-w-7xl rounded-2xl overflow-hidden mb-14">
          <div style={{ backgroundColor: "var(--navy)" }} className="p-10 md:p-14 text-center">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "var(--gold)" }}>
              Shoprill Avantajı
            </p>
            <h3 className="text-2xl font-light text-white mb-4">
              İlk siparişinde %10 indirim kazan
            </h3>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              Hemen kaydol, özel üye fiyatlarından yararlan. Binlerce ürünü daha uygun fiyata keşfet.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
            >
              Alışverişe Başla
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
