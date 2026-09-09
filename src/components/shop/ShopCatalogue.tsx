"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { WholesaleBanner } from "@/components/shop/WholesaleBanner";
import { ShopCategoriesNav } from "@/components/products/ShopCategoriesNav";
import { LoadMoreGrid } from "@/components/shop/LoadMoreGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { products, searchProducts } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export function ShopCatalogue() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const isNew = params.get("filter") === "new";

  const displayProducts = useMemo(() => {
    if (query) return searchProducts(query);
    if (isNew) return products.filter((p) => p.isNew);
    return products;
  }, [query, isNew]);

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
          "/products/pack-040.jpg",
          "/products/pack-072.jpg",
          "/products/pack-096.jpg",
        ]}
        ctaLabel={isNew ? "View all packs" : undefined}
        ctaHref={isNew ? "/shop" : undefined}
      />
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
            {displayProducts.length} pack{displayProducts.length !== 1 ? "s" : ""} · £0.20 each · min
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
              <LoadMoreGrid key={`${query}-${isNew}`} products={displayProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
