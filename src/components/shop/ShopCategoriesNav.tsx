"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface ShopCategoriesNavProps {
  activeSlug?: string;
}

export function ShopCategoriesNav({ activeSlug }: ShopCategoriesNavProps) {
  return (
    <nav
      aria-label="Product categories"
      className="mb-8 -mx-1 overflow-x-auto pb-1"
    >
      <div className="flex min-w-max gap-2 px-1">
        <Link
          href="/shop"
          className={cn(
            "rounded-full border-2 px-4 py-2 text-sm font-black transition",
            !activeSlug
              ? "border-black bg-black text-white"
              : "border-brand-200 bg-white text-black/70 hover:border-brand-400 hover:text-brand-700"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-black transition",
              activeSlug === category.slug
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-brand-200 bg-white text-black/70 hover:border-brand-400 hover:text-brand-700"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
