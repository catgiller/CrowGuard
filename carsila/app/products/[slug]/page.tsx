import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AddToCartButton from "@/components/add-to-cart-button";
import { getProductBySlug, products, formatPrice } from "@/lib/products";
import ProductCard from "@/components/product-card";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function StarFull({ stars, large = false }: { stars: number; large?: boolean }) {
  const sz = large ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={sz} viewBox="0 0 20 20" fill={i <= Math.round(stars) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const shopDiff = product.prices.shoprill - product.prices.carsila;
  const discount = Math.round((shopDiff / product.prices.shoprill) * 100);
  const starOnlyCount = product.reviewCount - product.reviews.length;

  const similar = products
    .filter((p) => p.subcategory === product.subcategory && p.id !== product.id)
    .slice(0, 4);
  const related = similar.length < 4
    ? [
        ...similar,
        ...products
          .filter((p) => p.category === product.category && p.subcategory !== product.subcategory && p.id !== product.id)
          .slice(0, 4 - similar.length),
      ]
    : similar;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <span>/</span>
          <Link href={`/category/${encodeURIComponent(product.category)}`} className="hover:underline">{product.category}</Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }} className="font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Görseller */}
          <div className="space-y-3">
            <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gray-50 shadow-sm">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <span
                  className="absolute top-4 left-4 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow"
                  style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
                >
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-emerald-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">
                  %{discount} indirim
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative h-24 rounded-2xl overflow-hidden bg-gray-50 cursor-pointer border-2 border-transparent hover:border-orange-400 transition-colors shadow-sm">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          </div>

          {/* Bilgiler */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 text-white" style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}>
              {product.brand}
            </div>
            <h1 data-field="product-name" className="text-2xl font-black mb-4 leading-snug" style={{ color: "var(--dark)" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <StarFull stars={product.rating} large />
              <span data-field="rating" className="font-black text-lg">{product.rating.toFixed(1)}</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                <span data-field="review-count">{product.reviewCount}</span> değerlendirme
              </span>
            </div>

            {/* Fiyat kutusu */}
            <div
              className="rounded-3xl p-6 mb-6 border"
              style={{
                background: "linear-gradient(135deg, #FFF0E8 0%, #FFE8D8 100%)",
                borderColor: "#FFD0B5",
              }}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span data-field="price" className="text-4xl font-black" style={{ color: "var(--brand)" }}>
                  {formatPrice(product.prices.carsila)}
                </span>
                {discount > 0 && (
                  <span className="text-base line-through font-medium" style={{ color: "var(--muted)" }}>
                    {formatPrice(product.prices.shoprill)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm font-semibold text-emerald-700">
                  🎉 Diğer mağazalara göre {formatPrice(shopDiff)} daha ucuz
                </p>
              )}
              <p className="text-xs mt-2 text-green-700 font-medium">
                ✓ Stokta {product.stock.carsila} adet · Ücretsiz kargo {product.prices.carsila >= 500 ? "" : "(500 TL üzeri)"}
              </p>
            </div>

            {/* Butonlar */}
            <div className="space-y-3 mb-6">
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                name={product.name}
                price={product.prices.carsila}
                image={product.images[0]}
              />
              <button
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all border-2 hover:border-orange-400 flex items-center justify-center gap-2"
                style={{ borderColor: "var(--border)", color: "var(--text)", backgroundColor: "#fff" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorilere Ekle
              </button>
            </div>

            {/* Özellikler */}
            <div className="p-5 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-black mb-3 text-sm" style={{ color: "var(--dark)" }}>Öne Çıkan Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: "var(--brand)" }}>✓</span>
                    <span style={{ color: "var(--text)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <section className="mb-10 p-6 rounded-3xl border bg-white shadow-sm" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-lg font-black mb-3" style={{ color: "var(--dark)" }}>Ürün Açıklaması</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{product.description}</p>
        </section>

        {/* Değerlendirmeler */}
        <section data-field="reviews">
          <h2 className="text-lg font-black mb-6" style={{ color: "var(--dark)" }}>
            Müşteri Değerlendirmeleri
            <span className="ml-2 text-base font-medium" style={{ color: "var(--muted)" }}>({product.reviewCount})</span>
          </h2>

          {/* Yıldız dağılımı özeti */}
          <div className="flex items-center gap-6 mb-8 p-5 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
            <div className="text-center">
              <p className="text-5xl font-black" style={{ color: "var(--brand)" }}>{product.rating.toFixed(1)}</p>
              <StarFull stars={product.rating} large />
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{product.reviewCount} puan</p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const allStars = [...product.reviews.map(r => r.stars), ...product.starRatings];
                const count = allStars.filter(s => s === star).length;
                const pct = allStars.length > 0 ? Math.round((count / allStars.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-xs w-4 font-semibold" style={{ color: "var(--muted)" }}>{star}</span>
                    <svg className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="#F59E0B">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "var(--brand)" }} />
                    </div>
                    <span className="text-xs w-7 text-right" style={{ color: "var(--muted)" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metin yorumlar */}
          <div className="space-y-4 mb-6">
            {product.reviews.map((review, i) => (
              <div key={i} className="review p-5 rounded-2xl border bg-white shadow-sm" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="reviewer font-bold text-sm" style={{ color: "var(--dark)" }}>{review.author}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <StarFull stars={review.stars} />
                      <span className="stars sr-only">{review.stars}</span>
                      <span className="text-xs text-amber-600 font-semibold">{review.stars}.0</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100" style={{ color: "var(--muted)" }}>{review.date}</span>
                </div>
                <p className="text text-sm leading-relaxed" style={{ color: "var(--text)" }}>{review.text}</p>
              </div>
            ))}
          </div>

          {/* Yıldız-sadece değerlendirmeler */}
          {starOnlyCount > 0 && (
            <div className="p-5 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--dark)" }}>
                Diğer {starOnlyCount.toLocaleString("tr-TR")} değerlendirme
              </p>
              <div className="flex flex-wrap gap-2">
                {product.starRatings.slice(0, 15).map((stars, i) => (
                  <div key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 border" style={{ borderColor: "var(--border)" }}>
                    <StarFull stars={stars} />
                  </div>
                ))}
                {product.starRatings.length > 15 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-50 border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                    +{(product.starRatings.length - 15 + starOnlyCount - product.starRatings.length).toLocaleString("tr-TR")} daha
                  </span>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Benzer Ürünler */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-black mb-6" style={{ color: "var(--dark)" }}>
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
