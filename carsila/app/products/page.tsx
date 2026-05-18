import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { products, getCategories } from "@/lib/products";
import Link from "next/link";

export default function ProductsPage() {
  const categories = getCategories();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-2" style={{ color: "var(--dark)" }}>Tüm Ürünler</h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>{products.length} ürün listeleniyor</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          <Link
            href="/products"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--brand)" }}
          >
            Tümü
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border hover:border-orange-400 transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
