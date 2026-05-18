"use client";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart, totalCount, totalPrice } = useCart();
  const freeShipping = totalPrice >= 500;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black mb-2 text-[#0F1B35]">Your Cart</h1>
        <p className="text-sm text-gray-400 mb-8">{totalCount} item{totalCount !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <p className="text-xl font-bold text-[#0F1B35] mb-2">Your cart is empty</p>
            <p className="text-gray-400 mb-6">Browse our curated selection and add items you love.</p>
            <Link href="/products" className="inline-block px-8 py-3 rounded-xl font-bold text-sm bg-[#0F1B35] text-white hover:bg-[#1a2d5a] transition-colors">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Item list */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-bold text-sm text-[#0F1B35] hover:text-[#C9A84C] transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-[#C9A84C] font-black mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors font-bold"
                    >−</button>
                    <span className="w-8 text-center font-bold text-sm text-[#0F1B35]">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors font-bold"
                    >+</button>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-sm text-[#0F1B35]">{formatPrice(item.price * item.quantity)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >Remove</button>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-2 underline"
              >
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <h2 className="font-black text-[#0F1B35] uppercase tracking-widest text-sm mb-5">Order Summary</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({totalCount} items)</span>
                    <span className="font-semibold text-[#0F1B35]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className={freeShipping ? "text-emerald-600 font-semibold" : "font-semibold text-[#0F1B35]"}>
                      {freeShipping ? "Free" : formatPrice(29)}
                    </span>
                  </div>
                  {!freeShipping && (
                    <p className="text-xs text-gray-400">
                      Add {formatPrice(500 - totalPrice)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between font-black">
                    <span className="text-[#0F1B35]">Total</span>
                    <span className="text-[#C9A84C] text-lg">{formatPrice(freeShipping ? totalPrice : totalPrice + 29)}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl font-bold text-sm bg-[#0F1B35] text-white hover:bg-[#1a2d5a] transition-colors mb-3">
                  Proceed to Checkout
                </button>
                <Link href="/products" className="block text-center text-sm text-[#C9A84C] hover:underline font-semibold">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}