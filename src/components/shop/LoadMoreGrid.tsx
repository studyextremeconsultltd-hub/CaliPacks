"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductGrid } from "@/components/products/ProductGrid";

const PAGE_SIZE = 36;

export function LoadMoreGrid({ products }: { products: Product[] }) {
  const [page, setPage] = useState(1);
  const visibleCount = Math.min(products.length, page * PAGE_SIZE);
  const visible = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  );
  const hasMore = visibleCount < products.length;

  return (
    <>
      <ProductGrid products={visible} eagerCount={page === 1 ? 4 : 0} />
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-brand-200 transition hover:bg-brand-500"
          >
            Load more packs
          </button>
          <p className="mt-2 text-xs font-semibold text-black/45">
            {products.length - visibleCount} more designs
          </p>
        </div>
      )}
    </>
  );
}
