import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopLegacyRedirect } from "@/components/shop/ShopLegacyRedirect";
import { getCategoryBySlug, categories } from "@/data/categories";
import { pageUrl } from "@/lib/site";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: "Cali Packs",
    description: category.description,
    robots: { index: false, follow: true },
    alternates: { canonical: pageUrl("/shop") },
    openGraph: {
      url: pageUrl("/shop"),
      title: "Cali Packs — £0.20 per pack | Smoke Cali",
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  if (!getCategoryBySlug(slug)) notFound();
  return <ShopLegacyRedirect />;
}
