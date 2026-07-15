import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopCategoriesNav } from "@/components/products/ShopCategoriesNav";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

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
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <div className="py-8 md:py-12">
      <div className="container-site">
        <nav className="text-sm text-black/40 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-brand-700">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-bold">{category.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-2">
            {category.name}
          </h1>
          <p className="text-black/55 max-w-2xl font-semibold">{category.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopCategoriesNav activeSlug={slug} />
          <div className="flex-1">
            <ProductGrid products={categoryProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
