import productsData from "@/data/products.json";

export type Review = {
  author: string;
  stars: number;
  date: string;
  text: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  images: string[];
  prices: { carsila: number; shopgrill: number };
  stock: { carsila: number; shopgrill: number };
  rating: number;
  reviewCount: number;
  badge: string;
  starRatings: number[];
  reviews: Review[];
};

export const products: Product[] = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}

export function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR") + " TL";
}
