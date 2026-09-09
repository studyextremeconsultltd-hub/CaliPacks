import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  eagerCount?: number;
}

export function ProductGrid({ products, eagerCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-surface-800/60">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          accentIndex={i}
          priority={i < eagerCount}
        />
      ))}
    </div>
  );
}

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
  className?: string;
  eagerCount?: number;
}

export function CategorySection({
  title,
  subtitle,
  products,
  viewAllHref,
  className,
  eagerCount = 0,
}: CategorySectionProps) {
  return (
    <section className={className ?? "py-12 md:py-16"}>
      <div className="container-site">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <div className="w-12 h-1 bg-gradient-to-r from-brand-500 to-brand-300 mb-4 rounded-full" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gradient-pink">
              {title}
            </h2>
            {subtitle && (
              <p className="text-black/55 mt-2 text-sm md:text-base max-w-xl leading-relaxed font-semibold">
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <ProductGrid products={products} eagerCount={eagerCount} />
      </div>
    </section>
  );
}
