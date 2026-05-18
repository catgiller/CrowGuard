import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { getProductsByCategory, getCategories } from "@/lib/products";
import Link from "next/link";

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ cat: encodeURIComponent(cat) }));
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const category = decodeURIComponent(cat);
  const categoryProducts = getProductsByCategory(category);
  const allCategories = getCategories();

  if (categoryProducts.length === 0) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <span>/</span>
          <span style={{ color: "var(--text)" }}>{category}</span>
        </nav>

        <h1 className="text-2xl font-black mb-2" style={{ color: "var(--dark)" }}>{category}</h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>{categoryProducts.length} ürün bulundu</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          <Link href="/products" className="px-4 py-1.5 rounded-full text-sm font-medium border hover:border-orange-400 transition-colors" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Tümü
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c}
              href={`/category/${encodeURIComponent(c)}`}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
              style={c === category
                ? { backgroundColor: "var(--brand)", color: "white" }
                : { border: "1px solid var(--border)", color: "var(--text)" }
              }
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
