import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProductBySlug, products, formatPrice } from "@/lib/products";
import ProductCard from "@/components/product-card";
import StarRating from "@/components/star-rating";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.prices.shoprill,
      priceCurrency: "TRY",
      availability:
        product.stock.shoprill > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <span>/</span>
          <Link href={`/category/${encodeURIComponent(product.category)}`} className="hover:underline">
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Görsel */}
          <div className="space-y-3">
            <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white border" style={{ borderColor: "var(--border)" }}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative h-24 rounded-xl overflow-hidden bg-white border cursor-pointer hover:border-gold transition-colors" style={{ borderColor: "var(--border)" }}>
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="100px" />
                </div>
              ))}
            </div>
          </div>

          {/* Bilgiler */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--gold)" }}>
              {product.brand}
            </p>
            <h1 data-field="product-name" className="text-2xl font-semibold mb-4" style={{ color: "var(--text)" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
              <StarRating rating={product.rating} size="lg" />
              <span data-field="rating" className="font-semibold text-sm">{product.rating.toFixed(1)}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>•</span>
              <span data-field="review-count" className="text-sm" style={{ color: "var(--text-muted)" }}>
                {product.reviewCount} müşteri yorumu
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-4">
                <span data-field="price" className="text-3xl font-bold" style={{ color: "var(--navy)" }}>
                  {formatPrice(product.prices.shoprill)}
                </span>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                KDV dahil • Stokta {product.stock.shoprill} adet
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <button
                className="w-full py-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--navy)", color: "white" }}
              >
                Sepete Ekle
              </button>
              <button
                className="w-full py-4 rounded-xl font-semibold text-sm border transition-colors hover:bg-gray-50"
                style={{ borderColor: "var(--gold)", color: "var(--navy)" }}
              >
                Favorilere Ekle ♡
              </button>
            </div>

            <div className="p-5 rounded-xl border mb-6" style={{ borderColor: "var(--border)", backgroundColor: "#FAFBFC" }}>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
                Özellikler
              </h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: "var(--gold)" }} className="mt-0.5">—</span>
                    <span style={{ color: "var(--text)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>✓ Ücretsiz kargo</span>
              <span>✓ 30 gün iade</span>
              <span>✓ Orijinal ürün</span>
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <section className="mb-14 p-8 rounded-2xl bg-white border" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
            Ürün Hakkında
          </h2>
          <p className="text-sm leading-loose" style={{ color: "var(--text)" }}>{product.description}</p>
        </section>

        {/* Yorumlar */}
        <section data-field="reviews">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
                Müşteri Yorumları ({product.reviewCount} adet)
              </h2>
              <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                Aşağıda {product.reviewCount} yazılı müşteri yorumu listelenmektedir.
              </p>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size="lg" />
                <span className="text-lg font-bold" style={{ color: "var(--navy)" }}>{product.rating.toFixed(1)}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>ortalama puan</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {product.reviews.map((review, i) => (
              <div key={i} className="review p-6 rounded-xl bg-white border" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="reviewer font-semibold text-sm" style={{ color: "var(--navy)" }}>
                      {review.author}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.stars} />
                      <span className="stars hidden">{review.stars}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>Doğrulanmış Alışveriş</span>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{review.date}</span>
                </div>
                <p className="text text-sm leading-relaxed" style={{ color: "var(--text)" }}>{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benzer Ürünler */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "var(--text-muted)" }}>
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
