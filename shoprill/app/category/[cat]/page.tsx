import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { getProductsByCategory, getCategories } from "@/lib/products";

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ cat: encodeURIComponent(cat) }));
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const decoded = decodeURIComponent(cat);
  const prods = getProductsByCategory(decoded);
  if (!prods.length) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs mb-6 text-gray-400">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{decoded}</span>
        </nav>

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Category</p>
            <h1 className="text-3xl font-black text-[#0F1B35]">{decoded}</h1>
          </div>
          <p className="text-sm text-gray-400">{prods.length} products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {prods.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}