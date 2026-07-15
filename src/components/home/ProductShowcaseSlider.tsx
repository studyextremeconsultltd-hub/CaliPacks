"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Product } from "@/types";
import { getCategoryBySlug } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductShowcaseSliderProps {
  products: Product[];
}

export function ProductShowcaseSlider({ products }: ProductShowcaseSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const total = products.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [activeIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % total);
  }, [activeIndex, goTo, total]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + total) % total);
  }, [activeIndex, goTo, total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, total]);

  if (products.length === 0) return null;

  return (
    <section
      className="relative bg-surface-950"
      aria-label="Featured products showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main slide area */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden">
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          const category = getCategoryBySlug(product.categorySlug);

          return (
            <div
              key={product.id}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out",
                isActive
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-950/95 via-surface-950/70 to-surface-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

              <div className="absolute inset-0 container-site flex items-center">
                <div
                  className={cn(
                    "max-w-2xl transition-all duration-700 delay-100",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-600/90 text-white text-xs font-semibold uppercase tracking-wider">
                      <Package className="w-3.5 h-3.5" />
                      {category?.name ?? "Products"}
                    </span>
                    {product.isNew && (
                      <span className="px-3 py-1 rounded-full bg-gold-500/90 text-surface-900 text-xs font-semibold uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-tight mb-4 text-balance">
                    {product.name}
                  </h2>

                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 max-w-lg line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">
                        From
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {formatPrice(product.price)}
                        <span className="text-sm font-normal text-white/50 ml-1">
                          / unit
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-surface-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg shadow-black/20"
                    >
                      View Product
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {category && (
                      <Link
                        href={`/shop/${category.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                      >
                        Browse {category.name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation arrows */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Progress bar */}
        {total > 1 && !isPaused && (
          <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
            <div
              key={activeIndex}
              className="h-full bg-brand-500 origin-left animate-[slider-progress_5s_linear_forwards]"
            />
          </div>
        )}
      </div>

      {/* Product name thumbnail strip */}
      <div className="border-t border-white/10 bg-surface-950/95 backdrop-blur-sm">
        <div className="container-site py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Shop Products
            </p>
            <Link
              href="/shop"
              className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
            {products.map((product, index) => {
              const category = getCategoryBySlug(product.categorySlug);
              const isActive = index === activeIndex;

              return (
                <button
                  key={product.id}
                  onClick={() => goTo(index)}
                  className={cn(
                    "flex-shrink-0 snap-start flex items-center gap-3 p-2 pr-4 rounded-xl border transition-all duration-300 min-w-[200px] max-w-[280px] text-left",
                    isActive
                      ? "bg-white/10 border-brand-500/50 ring-1 ring-brand-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  )}
                  aria-label={`Show ${product.name}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-surface-800">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-wider font-medium mb-0.5 truncate",
                        isActive ? "text-brand-400" : "text-white/40"
                      )}
                    >
                      {category?.name}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-semibold leading-snug line-clamp-2",
                        isActive ? "text-white" : "text-white/70"
                      )}
                    >
                      {product.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dot indicators (mobile-friendly) */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-6 bg-brand-500"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
