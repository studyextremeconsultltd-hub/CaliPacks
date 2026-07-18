import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopCategoriesNav } from "@/components/products/ShopCategoriesNav";
import { PageHero } from "@/components/layout/PageHero";
import { products, searchProducts } from "@/data/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse Cali Packs, can jars, glassware, scales and accessories. Add to cart — UK delivery in 2–3 days.",
};

interface ShopPageProps {
  searchParams: Promise<{ q?: string; filter?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const filter = params.filter;
  const isNew = filter === "new";

  let displayProducts = products;
  if (query) {
    displayProducts = searchProducts(query);
  } else if (isNew) {
    displayProducts = products.filter((p) => p.isNew);
  }

  return (
    <div className="bg-white">
      {isNew && (
        <PageHero
          eyebrow="Fresh stock"
          title="New"
          accent="Arrivals"
          description="The latest packs, cases, glassware, scales and shop essentials—freshly added and ready for UK delivery."
          images={[
            "/products/cali-28.jpg",
            "/products/cali-13.jpg",
            "/products/cali-18.jpg",
          ]}
          ctaLabel="View all products"
          ctaHref="/shop"
        />
      )}
      <div className="container-site py-8 md:py-12">
        <div className="mb-8">
          {isNew ? (
            <h2 className="mb-2 text-2xl font-black tracking-tight text-black md:text-3xl">
              Available now
            </h2>
          ) : (
            <h1 className="mb-2 text-3xl font-black tracking-tight text-black md:text-4xl">
              {query ? `Results for "${query}"` : "All Products"}
            </h1>
          )}
          <p className="text-black/55 font-semibold">
            {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""} available
            {isNew ? " · fresh drops ready to ship" : ""}
          </p>
          {isNew && (
            <p className="mt-3 inline-block text-sm font-bold text-brand-700 border-b-2 border-brand-400 pb-0.5">
              Pick a category on the left — bold new stock that shops reorder.
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopCategoriesNav activeSlug={isNew ? "new" : null} highlight={isNew} />

          <div className="flex-1">
            {displayProducts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-brand-200">
                <p className="text-black/60 font-semibold mb-3">No products found.</p>
                <Link href="/shop" className="text-brand-600 font-bold hover:underline">
                  Browse all products
                </Link>
              </div>
            ) : (
              <ProductGrid products={displayProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
