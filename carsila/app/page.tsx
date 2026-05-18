import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products, getCategories } from "@/lib/products";

const CATEGORY_ICONS: Record<string, string> = {
  "Elektronik": "📱",
  "Ev & Yaşam": "🏠",
  "Giyim": "👕",
  "Sağlık & Güzellik": "✨",
  "Spor & Outdoor": "⛺",
};

export default function HomePage() {
  const categories = getCategories();
  const featured = products.slice(0, 4);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, var(--brand) 0%, #C44A1A 100%)" }} className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Türkiye'nin Pazaryeri
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Binlerce ürün, güvenilir satıcılar ve en iyi fiyatlar — hepsi Çarşıla'da.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:bg-amber-50 shadow-lg"
              style={{ color: "var(--brand)" }}
            >
              Alışverişe Başla →
            </Link>
          </div>
        </section>

        {/* Kategoriler */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-xl font-black mb-6" style={{ color: "var(--dark)" }}>Kategoriler</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "#fff", borderColor: "var(--border)" }}
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat] ?? "🛍️"}</span>
                <span className="text-xs font-semibold text-center" style={{ color: "var(--text)" }}>{cat}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Öne Çıkan Ürünler */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black" style={{ color: "var(--dark)" }}>Öne Çıkan Ürünler</h2>
            <Link href="/products" className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Tümünü gör →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Banner */}
        <section
          className="mx-4 md:mx-auto max-w-7xl rounded-3xl p-8 md:p-12 mb-12 text-center"
          style={{ background: "linear-gradient(135deg, #FFF0E8 0%, #FFD9C7 100%)" }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--brand)" }}>Ücretsiz Kargo</p>
          <h3 className="text-2xl font-black mb-2" style={{ color: "var(--dark)" }}>
            500 TL üzeri siparişlerde kargo bedava!
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Tüm kategorilerde geçerli, bugünkü siparişlerde.</p>
          <Link
            href="/products"
            className="inline-block text-white font-bold text-sm px-8 py-3 rounded-full shadow"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Hemen Alışveriş Yap
          </Link>
        </section>

        {/* En Çok Beğenilenler */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black" style={{ color: "var(--dark)" }}>En Çok Beğenilenler</h2>
            <Link href="/products" className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Tümünü gör →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topRated.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
