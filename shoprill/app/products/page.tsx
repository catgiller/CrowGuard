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
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest font-medium mb-1" style={{ color: "var(--gold)" }}>Shoprill</p>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>Tüm Ürünler</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{products.length} ürün listeleniyor</p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          <Link href="/products" className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "var(--navy)" }}>
            Tümü
          </Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className="px-4 py-1.5 rounded-lg text-sm font-medium border hover:border-navy-500 transition-colors" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
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
