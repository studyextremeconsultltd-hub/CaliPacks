import Link from "next/link";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface ShopCategoriesNavProps {
  activeSlug?: string | null;
  highlight?: boolean;
}

export function ShopCategoriesNav({ activeSlug, highlight = false }: ShopCategoriesNavProps) {
  return (
    <aside
      className={cn(
        "lg:w-60 flex-shrink-0 rounded-2xl p-4 sm:p-5",
        highlight
          ? "bg-gradient-to-b from-white via-brand-50/80 to-white border-2 border-brand-400 shadow-[0_0_0_1px_rgba(236,72,153,0.12),0_10px_36px_rgba(236,72,153,0.18)]"
          : "bg-white border-2 border-brand-200 shadow-sm"
      )}
    >
      <h2
        className={cn(
          "uppercase tracking-[0.18em] mb-1",
          highlight
            ? "text-sm font-black text-brand-700"
            : "text-xs font-extrabold text-black"
        )}
      >
        Categories
      </h2>
      <p className="text-xs font-semibold text-black/45 mb-4 leading-snug">
        108 Cali Packs · £0.20 each · min 50 pcs.
      </p>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-400 to-transparent mb-4" />
      <nav className="space-y-1">
        <Link
          href="/shop"
          className={cn(
            "block px-3 py-2.5 text-sm rounded-xl transition-colors",
            !activeSlug
              ? "bg-black text-white font-black"
              : "font-bold text-black hover:bg-brand-50 hover:text-brand-700"
          )}
        >
          All Products
        </Link>
        <Link
          href="/shop?filter=new"
          className={cn(
            "block px-3 py-2.5 text-sm rounded-xl transition-colors",
            activeSlug === "new"
              ? "bg-brand-600 text-white font-black"
              : "font-bold text-black hover:bg-brand-50 hover:text-brand-700"
          )}
        >
          New Arrivals
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.slug}`}
            className={cn(
              "block px-3 py-2.5 text-sm rounded-xl transition-colors",
              activeSlug === cat.slug
                ? "bg-brand-600 text-white font-black"
                : "font-bold text-black hover:bg-brand-50 hover:text-brand-700"
            )}
          >
            {cat.name}
            <span
              className={cn(
                "ml-1 font-semibold",
                activeSlug === cat.slug ? "text-white/70" : "text-brand-500"
              )}
            >
              ({cat.productCount})
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
