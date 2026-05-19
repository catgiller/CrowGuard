import { NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let result = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    subcategory: p.subcategory,
    price: p.prices.shoprill,
    stock: p.stock.shoprill,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.images[0] ?? null,
    badge: p.badge ?? null,
    store: "shoprill",
  }));

  if (category) result = result.filter((p) => p.category === category);
  if (q) result = result.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));

  return NextResponse.json(result);
}
