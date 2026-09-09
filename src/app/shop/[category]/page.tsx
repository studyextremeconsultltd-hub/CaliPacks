import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopCategoriesNav } from "@/components/products/ShopCategoriesNav";
import { WholesaleBanner } from "@/components/shop/WholesaleBanner";
import { getCategoryBySlug, categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 36;

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
    openGraph: {
      title: `${category.name} — £0.20 per pack`,
      description: category.description,
      images: [{ url: category.image }],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: slug } = await params;
  const { page: pageParam } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);
  const page = Math.max(1, Number(pageParam) || 1);
  const visibleCount = Math.min(categoryProducts.length, page * PAGE_SIZE);
  const visibleProducts = categoryProducts.slice(0, visibleCount);
  const hasMore = visibleCount < categoryProducts.length;

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

        <WholesaleBanner />

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopCategoriesNav activeSlug={slug} />
          <div className="flex-1">
            <ProductGrid products={visibleProducts} eagerCount={page === 1 ? 4 : 0} />
            {hasMore && (
              <div className="mt-10 text-center">
                <Link
                  href={`/shop/${slug}?page=${page + 1}`}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-brand-200 transition hover:bg-brand-500"
                >
                  Load more packs
                </Link>
                <p className="mt-2 text-xs font-semibold text-black/45">
                  {categoryProducts.length - visibleCount} more designs
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
