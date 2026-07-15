"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { HeroBanner } from "@/data/hero-banners";
import { cn } from "@/lib/utils";

interface HeroBannerSliderProps {
  banners: HeroBanner[];
}

const moodOverlay: Record<HeroBanner["mood"], string> = {
  pink: "from-brand-950/55 via-brand-600/35 to-white/70",
  purple: "from-fuchsia-950/50 via-brand-700/40 to-white/65",
  teal: "from-rose-950/45 via-brand-500/35 to-white/70",
};

export function HeroBannerSlider({ banners }: HeroBannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = banners.length;

  const goTo = useCallback(
    (index: number) => setActiveIndex(((index % total) + total) % total),
    [total]
  );
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(goNext, 6500);
    return () => clearInterval(timer);
  }, [isPaused, goNext, total]);

  if (!banners.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden pt-4 pb-3 sm:pt-5 sm:pb-4"
      aria-label="Cali Packs hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft page wash so hero isn’t flat white */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100 via-brand-50 to-white pointer-events-none" />
      <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-brand-400/30 blur-3xl hero-orb pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-fuchsia-400/25 blur-3xl hero-orb-delay pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="relative overflow-hidden rounded-3xl border-2 border-brand-300 hero-frame-glow shadow-[0_20px_60px_rgba(236,72,153,0.28)]">
          {banners.map((banner, index) => {
            const isActive = index === activeIndex;
            const showcase = banner.floatingImages.slice(0, 4);

            return (
              <div
                key={banner.id}
                className={cn(
                  "transition-opacity duration-700 ease-in-out",
                  isActive
                    ? "relative opacity-100 z-10"
                    : "absolute inset-0 opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={!isActive}
              >
                {/* Moving glow background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 hero-kenburns",
                      isActive && "hero-kenburns-active"
                    )}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.imageAlt}
                      fill
                      sizes="100vw"
                      quality={90}
                      priority={index === 0}
                      className="object-cover object-center img-polish"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r",
                      moodOverlay[banner.mood]
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-brand-200/30" />
                  <div className="absolute inset-0 hero-shine pointer-events-none" />
                  {/* Pulsing glow blobs inside frame */}
                  <div className="absolute -left-16 top-1/4 w-56 h-56 rounded-full bg-brand-500/40 blur-3xl hero-orb" />
                  <div className="absolute -right-10 bottom-0 w-64 h-64 rounded-full bg-fuchsia-500/35 blur-3xl hero-orb-delay" />
                </div>

                <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-0 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
                  {/* Copy */}
                  <div className="relative z-10 flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                    <div
                      className={cn(
                        "max-w-md transition-all duration-700",
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      )}
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 text-brand-200 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-brand-500/40 ring-1 ring-brand-400/50">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-pulse" />
                        UK Best Sellers
                      </div>
                      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-tight leading-[1.1] text-balance mb-3">
                        <span className="text-black drop-shadow-sm">{banner.headline}</span>
                      </h1>
                      <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-6 max-w-sm font-semibold">
                        {banner.subline}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={banner.ctaHref}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 text-white font-extrabold rounded-xl hover:bg-brand-500 transition-colors shadow-lg shadow-brand-400/60 ring-2 ring-brand-300/40"
                        >
                          {banner.ctaLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                          href="/custom-orders"
                          className="btn-shine-white inline-flex items-center gap-2 px-5 py-3 font-extrabold rounded-xl text-black"
                        >
                          Get a Quote
                          <Sparkles className="w-4 h-4 text-brand-500" />
                        </Link>
                        <Link
                          href="/cart"
                          className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-extrabold rounded-xl hover:bg-surface-800 transition-colors shadow-lg shadow-black/30"
                        >
                          View Cart
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Separate large glowing product tiles */}
                  <div className="relative z-10 p-4 sm:p-5 lg:p-6 lg:pl-3">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full min-h-[300px] sm:min-h-[340px] lg:min-h-[400px]">
                      {showcase.map((src, i) => (
                        <div
                          key={`${banner.id}-tile-${i}`}
                          className={cn(
                            "relative rounded-2xl overflow-hidden border-2 border-white/95 bg-brand-50 hero-tile-glow",
                            i % 2 === 0 ? "float-a" : "float-c"
                          )}
                          style={{ animationDelay: `${i * 0.4}s` }}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 45vw, 22vw"
                            quality={90}
                            priority={index === 0}
                            className="object-cover img-polish"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-white/10 pointer-events-none" />
                          <div className="absolute inset-0 hero-tile-shine pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {total > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border-2 border-brand-300 text-brand-700 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors shadow-lg shadow-brand-300/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border-2 border-brand-300 text-brand-700 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors shadow-lg shadow-brand-300/50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-9 bg-gradient-to-r from-brand-600 to-brand-300 shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                    : "w-1.5 bg-white/70 hover:bg-brand-300"
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
