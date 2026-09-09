import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopCategoriesNav } from "@/components/products/ShopCategoriesNav";
import { PageHero } from "@/components/layout/PageHero";
import { WholesaleBanner } from "@/components/shop/WholesaleBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { products, searchProducts } from "@/data/products";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Cali Packs",
  description:
    "Shop 108 HD Cali Packs. £0.20 per pack, minimum order 50 pcs. Smell-proof 3.5g designs with UK delivery in 2–3 days.",
  openGraph: {
    title: "Shop Cali Packs — £0.20 per pack",
    description: "108 HD Cali Packs. £0.20 per pack · minimum 50 pcs.",
    images: [{ url: "/hero-cali-packs.jpg" }],
  },
};

const PAGE_SIZE = 36;

interface ShopPageProps {
  searchParams: Promise<{ q?: string; filter?: string; page?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const filter = params.filter;
  const isNew = filter === "new";
  const page = Math.max(1, Number(params.page) || 1);

  let displayProducts = products;
  if (query) {
    displayProducts = searchProducts(query);
  } else if (isNew) {
    displayProducts = products.filter((p) => p.isNew);
  }

  const visibleCount = Math.min(displayProducts.length, page * PAGE_SIZE);
  const visibleProducts = displayProducts.slice(0, visibleCount);
  const hasMore = visibleCount < displayProducts.length;
  const nextHref = query
    ? `/shop?q=${encodeURIComponent(query)}&page=${page + 1}`
    : isNew
      ? `/shop?filter=new&page=${page + 1}`
      : `/shop?page=${page + 1}`;

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: isNew ? "New Cali Packs" : "All Cali Packs",
          numberOfItems: displayProducts.length,
          itemListElement: displayProducts.slice(0, 24).map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/product/${product.slug}`,
            name: product.name,
          })),
        }}
      />
      {page === 1 && (
        <PageHero
          eyebrow={isNew ? "Fresh stock" : "Wholesale Cali Packs"}
          title={isNew ? "New" : "Shop"}
          accent={isNew ? "Arrivals" : "Cali Packs"}
          description={
            isNew
              ? "Latest Cali Pack drops — £0.20 per pack, minimum 50 pcs. HD studio photos, ready for UK delivery."
              : "108 named Cali Packs with clear HD photography. £0.20 per pack & minimum 50 pcs order."
          }
          images={[
            "/products/pack-001.jpg",
            "/products/pack-008.jpg",
            "/products/pack-027.jpg",
          ]}
          ctaLabel={isNew ? "View all packs" : undefined}
          ctaHref={isNew ? "/shop" : undefined}
        />
      )}
      <div className="container-site py-8 md:py-12">
        <WholesaleBanner />
        <div className="mb-8">
          {isNew ? (
            <h2 className="mb-2 text-2xl font-black tracking-tight text-black md:text-3xl">
              Available now
            </h2>
          ) : (
            <h1 className="mb-2 text-3xl font-black tracking-tight text-black md:text-4xl">
              {query ? `Results for "${query}"` : "All Cali Packs"}
            </h1>
          )}
          <p className="text-black/55 font-semibold">
            Showing {visibleProducts.length} of {displayProducts.length} packs · £0.20 each · min
            50 pcs
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopCategoriesNav activeSlug={isNew ? "new" : null} highlight={isNew} />

          <div className="flex-1">
            {displayProducts.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-brand-200">
                <p className="text-black/60 font-semibold mb-3">No products found.</p>
                <Link href="/shop" className="text-brand-600 font-bold hover:underline">
                  Browse all packs
                </Link>
              </div>
            ) : (
              <>
                <ProductGrid products={visibleProducts} eagerCount={page === 1 ? 4 : 0} />
                {hasMore && (
                  <div className="mt-10 text-center">
                    <Link
                      href={nextHref}
                      className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-brand-200 transition hover:bg-brand-500"
                    >
                      Load more packs
                    </Link>
                    <p className="mt-2 text-xs font-semibold text-black/45">
                      {displayProducts.length - visibleCount} more designs
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
