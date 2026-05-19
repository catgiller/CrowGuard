"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-3 h-3" viewBox="0 0 20 20" fill={i <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round(((product.prices.shoprill - product.prices.carsila) / product.prices.shoprill) * 100);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, slug: product.slug, name: product.name, price: product.prices.carsila, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border bg-white" style={{ borderColor: "var(--border)" }}>
        {/* Image */}
        <div className="relative h-52 bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          {product.badge && (
            <span
              className="absolute top-2.5 left-2.5 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
              style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
            >
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              %{discount}
            </span>
          )}
          {/* Favorite */}
          <button
            className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors text-gray-400 hover:text-red-500"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--brand)" }}>{product.brand}</p>
          <h3 className="text-sm font-semibold mb-2 line-clamp-2 leading-snug" style={{ color: "var(--dark)" }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-xs font-medium text-amber-600">{product.rating.toFixed(1)}</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-black" style={{ color: "var(--brand)" }}>
              {formatPrice(product.prices.carsila)}
            </span>
            {discount > 0 && (
              <span className="text-xs line-through" style={{ color: "var(--muted)" }}>
                {formatPrice(product.prices.shoprill)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
            style={{ background: added ? "#16a34a" : "linear-gradient(135deg, var(--brand), #C44A1A)" }}
          >
            {added ? "✓ Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </Link>
  );
}
