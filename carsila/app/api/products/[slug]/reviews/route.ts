import { NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

  return NextResponse.json({
    slug: product.slug,
    rating: product.rating,
    reviewCount: product.reviewCount,
    reviews: product.reviews,
    store: "carsila",
  });
}
