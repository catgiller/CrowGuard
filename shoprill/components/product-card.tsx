"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import StarRating from "@/components/star-rating";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.prices.shoprill - product.prices.carsila) / product.prices.shoprill) * 100);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.prices.shoprill, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "var(--border)" }}>
        <div className="relative h-52 bg-gray-50 overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 50vw, 25vw" />
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "var(--navy)" }}>{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="absolute top-2.5 right-2.5 text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: "var(--gold)" }}>%{discount}</span>
          )}
          <button className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => e.preventDefault()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--navy)" }}>{product.brand}</p>
          <h3 className="text-sm font-semibold mb-2 line-clamp-2" style={{ color: "var(--text)" }}>{product.name}</h3>
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs font-medium" style={{ color: "var(--navy)" }}>{product.rating.toFixed(1)}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              · {product.reviewCount} yorum
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-black" style={{ color: "var(--navy)" }}>{formatPrice(product.prices.shoprill)}</span>
            {discount > 0 && <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>{formatPrice(product.prices.carsila + Math.round(product.prices.carsila * 0.1))}</span>}
          </div>
          <button onClick={handleAdd} className="w-full py-2 rounded-xl text-sm font-bold transition-all active:scale-95 text-white" style={{ backgroundColor: added ? "#16a34a" : "var(--navy)" }}>
            {added ? "✓ Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </Link>
  );
}
