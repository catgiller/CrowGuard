import { NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

  return NextResponse.json({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    subcategory: product.subcategory,
    description: product.description,
    features: product.features,
    images: product.images,
    price: product.prices.shoprill,
    stock: product.stock.shoprill,
    rating: product.rating,
    reviewCount: product.reviewCount,
    badge: product.badge ?? null,
    store: "shoprill",
    storeUrl: "https://shoprill.store",
  });
}
