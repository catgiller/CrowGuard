"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

type Props = { productId: number; slug: string; name: string; price: number; image: string; };

export default function AddToCartButton({ productId, slug, name, price, image }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id: productId, slug, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button onClick={handleAdd} className="w-full py-3.5 rounded-2xl font-bold text-white text-base transition-all hover:opacity-90 shadow-md" style={{ backgroundColor: added ? "#16a34a" : "var(--navy)" }}>
      {added ? "✓ Sepete Eklendi!" : "Sepete Ekle"}
    </button>
  );
}
