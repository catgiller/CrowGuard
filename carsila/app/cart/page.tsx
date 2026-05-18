"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black mb-2" style={{ color: "var(--dark)" }}>Sepetim</h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>{items.length} ürün</p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--dark)" }}>Sepetiniz boş</h2>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Alışverişe başlamak için ürünlere göz atın.</p>
            <Link
              href="/products"
              className="inline-block py-3 px-8 rounded-full text-white font-bold text-sm shadow"
              style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
            >
              Ürünlere Bak
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Items */}
            <div className="md:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl border bg-white"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2" style={{ color: "var(--dark)" }}>{item.name}</h3>
                    <p className="font-black text-base mb-2" style={{ color: "var(--brand)" }}>{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
                        <button
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-bold"
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                        >−</button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm font-bold"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <button
                        className="text-xs hover:underline"
                        style={{ color: "var(--muted)" }}
                        onClick={() => removeItem(item.id)}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black" style={{ color: "var(--dark)" }}>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-24 p-6 rounded-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-black text-lg mb-4" style={{ color: "var(--dark)" }}>Sipariş Özeti</h2>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted)" }}>Ürünler toplamı</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted)" }}>Kargo</span>
                    <span className="text-green-600 font-semibold">{totalPrice >= 500 ? "Ücretsiz" : "₺49"}</span>
                  </div>
                </div>
                <div className="border-t pt-4 mb-5" style={{ borderColor: "var(--border)" }}>
                  <div className="flex justify-between font-black text-lg">
                    <span>Toplam</span>
                    <span style={{ color: "var(--brand)" }}>{formatPrice(totalPrice >= 500 ? totalPrice : totalPrice + 49)}</span>
                  </div>
                </div>
                <button
                  className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90 shadow-md mb-3"
                  style={{ background: "linear-gradient(135deg, var(--brand), #C44A1A)" }}
                >
                  Siparişi Tamamla
                </button>
                <button
                  className="w-full text-xs py-2 hover:underline"
                  style={{ color: "var(--muted)" }}
                  onClick={clearCart}
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
