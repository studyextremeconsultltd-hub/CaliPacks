"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { WholesaleBanner } from "@/components/shop/WholesaleBanner";
import { ShopCategoriesNav } from "@/components/shop/ShopCategoriesNav";
import { LoadMoreGrid } from "@/components/shop/LoadMoreGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { products, searchProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

interface ShopCatalogueProps {
  categorySlug?: string;
}

interface ShopViewProps {
  categorySlug?: string;
  query: string;
  isNew: boolean;
}

function ShopView({ categorySlug, query, isNew }: ShopViewProps) {
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  const scoped = useMemo(() => {
    if (categorySlug) return products.filter((p) => p.categorySlug === categorySlug);
    return products;
  }, [categorySlug]);

  const newCount = useMemo(
    () => scoped.filter((product) => product.isNew).length,
    [scoped]
  );

  const displayProducts = useMemo(() => {
    if (query) {
      const hits = searchProducts(query);
      return categorySlug ? hits.filter((p) => p.categorySlug === categorySlug) : hits;
    }
    if (isNew) return scoped.filter((p) => p.isNew);
    if (!categorySlug) {
      const stock = scoped.filter((p) => p.categorySlug !== "cali-packs");
      const packs = scoped.filter((p) => p.categorySlug === "cali-packs");
      return [...stock, ...packs];
    }
    return scoped;
  }, [query, isNew, scoped, categorySlug]);

  let title = "All";
  let accent = "Products";
  if (isNew) {
    title = "New";
    accent = "Arrivals";
  } else if (category) {
    const parts = category.name.split(" ");
    title = parts[0];
    accent = parts.slice(1).join(" ") || "Shop";
  }
  const description =
    query
      ? `Search results across named HD products.`
      : category?.description ??
        (isNew
          ? "Latest drops from the Manchester shop — Cali Packs at £0.20 (min 50) plus new shop-floor stock."
          : "Cali Packs at £0.20 per pack (min 50 pcs) plus grinders, glass, hookahs, scales, and accessories from the shop floor.");

  const heroImages = category
    ? [category.image, ...displayProducts.slice(0, 2).map((p) => p.image)]
    : isNew
      ? ["/shop/cartoon-travel-kit.webp", "/shop/gold-honeycomb-grinder.webp", "/shop/candy-stash-cans.webp"]
      : ["/products/pack-040.webp", "/shop/colour-novelty-hookah.webp", "/shop/gold-honeycomb-grinder.webp"];

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: category?.name ?? (isNew ? "New arrivals" : "Smoke Cali shop"),
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
        eyebrow={category ? "Category" : isNew ? "Fresh stock" : "Manchester shop"}
        title={title}
        accent={accent}
        description={description}
        images={heroImages}
        size={isNew ? "showcase" : "default"}
        ctaLabel={isNew ? "View all products" : undefined}
        ctaHref={isNew ? "/shop" : undefined}
      />

      <div className="container-site py-8 md:py-12">
        {categorySlug === "cali-packs" ? <WholesaleBanner /> : null}

        <ShopCategoriesNav activeSlug={categorySlug} isNew={isNew} />

        <div className="mb-8 overflow-hidden rounded-[1.6rem] border-2 border-brand-200 bg-gradient-to-br from-white via-brand-50/70 to-white p-4 shadow-[0_16px_40px_rgba(236,72,153,0.12)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-1 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-600">
                <Sparkles className="h-3.5 w-3.5" />
                {query ? "Search" : category?.name ?? "All products"}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-black md:text-3xl">
                {query
                  ? `Results for “${query}”`
                  : isNew
                    ? "New arrivals"
                    : category
                      ? category.name
                      : "The full collection"}
              </h2>
              <p className="mt-1 text-sm font-semibold text-black/50">
                {displayProducts.length} item{displayProducts.length !== 1 ? "s" : ""}
                {categorySlug === "cali-packs" ? " · £0.20 each · min 50 pcs" : ""}
                {category?.tagline && categorySlug !== "cali-packs" ? ` · ${category.tagline}` : ""}
              </p>
            </div>

            {!query && !categorySlug ? (
              <div className="flex rounded-2xl border-2 border-brand-200 bg-white p-1">
                <Link
                  href="/shop/"
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
                  href="/shop/?filter=new"
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
            ) : query ? (
              <Link
                href="/shop/"
                className="inline-flex w-fit rounded-xl bg-black px-4 py-2.5 text-sm font-black text-white"
              >
                Clear search
              </Link>
            ) : null}
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-brand-200 py-16 text-center">
            <p className="mb-3 font-semibold text-black/60">No products found.</p>
            <Link href="/shop/" className="font-bold text-brand-600 hover:underline">
              Browse the shop
            </Link>
          </div>
        ) : (
          <LoadMoreGrid key={`${query}-${isNew}-${categorySlug ?? "all"}`} products={displayProducts} />
        )}
      </div>
    </div>
  );
}

function ShopCatalogueFromUrl({ categorySlug }: ShopCatalogueProps) {
  const params = useSearchParams();
  const query = params.get("q") || "";
  const isNew = !categorySlug && params.get("filter") === "new";
  return <ShopView categorySlug={categorySlug} query={query} isNew={isNew} />;
}

export function ShopCatalogue({ categorySlug }: ShopCatalogueProps) {
  return (
    <Suspense fallback={<ShopView categorySlug={categorySlug} query="" isNew={false} />}>
      <ShopCatalogueFromUrl categorySlug={categorySlug} />
    </Suspense>
  );
}
