import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopCatalogue } from "@/components/shop/ShopCatalogue";
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
    title: category.name,
    description: category.description,
    alternates: { canonical: pageUrl(`/shop/${category.slug}`) },
    openGraph: {
      url: pageUrl(`/shop/${category.slug}`),
      title: `${category.name} | Smoke Cali`,
      description: category.description,
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  if (!getCategoryBySlug(slug)) notFound();

  return <ShopCatalogue categorySlug={slug} />;
}
