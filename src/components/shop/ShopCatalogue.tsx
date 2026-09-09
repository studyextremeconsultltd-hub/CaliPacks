"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { WholesaleBanner } from "@/components/shop/WholesaleBanner";
import { LoadMoreGrid } from "@/components/shop/LoadMoreGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { products, searchProducts } from "@/data/products";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ShopCatalogue() {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const isNew = params.get("filter") === "new";
  const newCount = useMemo(() => products.filter((product) => product.isNew).length, []);

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
          name: isNew ? "New Cali Packs" : "Cali Packs",
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
        eyebrow={isNew ? "Fresh stock" : "Wholesale catalogue"}
        title={isNew ? "New" : "Cali"}
        accent={isNew ? "Arrivals" : "Packs"}
        description={
          isNew
            ? "Latest drops from the Manchester shop — £0.20 per pack, minimum 50 pcs. HD studio photos, ready for UK delivery."
            : "108 named designs in one catalogue. £0.20 per pack · minimum 50 pcs. Smell-proof 3.5g packs photographed in HD."
        }
        images={[
          "/products/pack-040.webp",
          "/products/pack-072.webp",
          "/products/pack-096.webp",
        ]}
        ctaLabel={isNew ? "View all packs" : undefined}
        ctaHref={isNew ? "/shop" : undefined}
      />

      <div className="container-site py-8 md:py-12">
        <WholesaleBanner />

        <div className="mb-8 overflow-hidden rounded-[1.6rem] border-2 border-brand-200 bg-gradient-to-br from-white via-brand-50/70 to-white p-4 shadow-[0_16px_40px_rgba(236,72,153,0.12)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-600">
                <Sparkles className="h-3.5 w-3.5" />
                {query ? "Search" : "Cali Packs"}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-black md:text-3xl">
                {query
                  ? `Results for “${query}”`
                  : isNew
                    ? "New arrivals"
                    : "The full collection"}
              </h2>
              <p className="mt-1 text-sm font-semibold text-black/50">
                {displayProducts.length} pack{displayProducts.length !== 1 ? "s" : ""} · £0.20
                each · min 50 pcs
              </p>
            </div>

            {!query ? (
              <div className="flex rounded-2xl border-2 border-brand-200 bg-white p-1">
                <Link
                  href="/shop"
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-black transition",
                    !isNew
                      ? "bg-black text-white shadow-md"
                      : "text-black/70 hover:bg-brand-50 hover:text-brand-700"
                  )}
                >
                  All {products.length}
                </Link>
                <Link
                  href="/shop?filter=new"
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-sm font-black transition",
                    isNew
                      ? "bg-brand-600 text-white shadow-md"
                      : "text-black/70 hover:bg-brand-50 hover:text-brand-700"
                  )}
                >
                  New {newCount}
                </Link>
              </div>
            ) : (
              <Link
                href="/shop"
                className="inline-flex w-fit rounded-xl bg-black px-4 py-2.5 text-sm font-black text-white"
              >
                Clear search
              </Link>
            )}
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-brand-200 py-16 text-center">
            <p className="mb-3 font-semibold text-black/60">No products found.</p>
            <Link href="/shop" className="font-bold text-brand-600 hover:underline">
              Browse all packs
            </Link>
          </div>
        ) : (
          <LoadMoreGrid key={`${query}-${isNew}`} products={displayProducts} />
        )}
      </div>
    </div>
  );
}
