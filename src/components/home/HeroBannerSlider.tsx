"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { HeroBanner } from "@/data/hero-banners";

interface HeroBannerSliderProps {
  banners: HeroBanner[];
  productImages: string[];
}

export function HeroBannerSlider({
  banners,
  productImages,
}: HeroBannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tileOffset, setTileOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const total = banners.length;
  const isRunning = !isHovered && isPageVisible;

  // De-dupe preview images so the same file never appears twice in the hero grid
  const uniquePreviews = useMemo(
    () => Array.from(new Set(productImages.filter(Boolean))),
    [productImages]
  );

  useEffect(() => {
    const onVisibilityChange = () => setIsPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isRunning || total <= 1) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % total),
      6500
    );
    return () => window.clearInterval(timer);
  }, [isRunning, total]);

  useEffect(() => {
    if (!isRunning || uniquePreviews.length <= 4) return;
    const timer = window.setInterval(
      () => setTileOffset((offset) => (offset + 4) % uniquePreviews.length),
      3200
    );
    return () => window.clearInterval(timer);
  }, [isRunning, uniquePreviews.length]);

  const showcase = useMemo(() => {
    if (!uniquePreviews.length) return [];
    const count = Math.min(4, uniquePreviews.length);
    return Array.from({ length: count }, (_, index) => {
      return uniquePreviews[(tileOffset + index) % uniquePreviews.length];
    });
  }, [uniquePreviews, tileOffset]);

  if (!total) return null;

  const activeBanner = banners[activeIndex];
  const goTo = (index: number) =>
    setActiveIndex(((index % total) + total) % total);

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-brand-50 via-white to-brand-50/40 py-3 sm:py-5"
      aria-label="Cali Packs featured hero"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-site relative">
        <div className="hero-frame-glow relative overflow-hidden rounded-[1.5rem] border border-brand-200/40 bg-black shadow-[0_24px_70px_rgba(15,10,20,0.35)] sm:rounded-3xl">
          <div key={activeBanner.id} className="hero-slide-enter absolute inset-0">
            <div className="hero-kenburns-active absolute inset-0">
              <Image
                src={activeBanner.image}
                alt={activeBanner.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                quality={75}
                priority={activeIndex === 0}
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </div>

          <div className="absolute right-3 top-3 z-20 flex flex-col items-end gap-2 sm:right-6 sm:top-6">
            <div className="rounded-xl bg-black/80 px-3 py-2 font-display text-xs font-black tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:px-4 sm:text-base">
              CALI <span className="text-brand-300">PACKS</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-300/40 bg-brand-600/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-100 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              AI Studio Photos
            </div>
          </div>

          <div className="relative z-10 grid min-h-[480px] lg:min-h-[460px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-5 pb-6 pt-24 sm:px-8 sm:py-12 lg:px-11">
              <div className="max-w-lg">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-100 backdrop-blur-md sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-brand-300" />
                  UK Wholesale Ready
                </div>
                <h1 className="font-display text-3xl font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-[2.85rem]">
                  {activeBanner.headline}
                </h1>
                <p className="mb-7 mt-3 max-w-md text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
                  {activeBanner.subline}
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <Link
                    href={activeBanner.ctaHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 sm:text-base"
                  >
                    {activeBanner.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/custom-orders"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/95 px-5 py-3 text-sm font-extrabold text-black transition hover:bg-white sm:text-base"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative px-3 pb-10 pt-2 sm:p-5 lg:p-6 lg:pl-2">
              <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/70 sm:text-xs">
                <span>Product highlights</span>
                <span>{uniquePreviews.length} unique</span>
              </div>
              <div className="grid h-36 grid-cols-4 gap-2 sm:h-auto sm:min-h-[340px] sm:grid-cols-2 sm:gap-3.5 lg:min-h-[390px]">
                {showcase.map((src, index) => (
                  <div
                    key={`${src}-${tileOffset}-${index}`}
                    className="hero-product-enter relative overflow-hidden rounded-xl border border-white/20 bg-white sm:rounded-2xl"
                  >
                    <Image
                      src={src}
                      alt="Cali Packs product"
                      fill
                      sizes="(max-width: 639px) 22vw, (max-width: 1024px) 40vw, 280px"
                      quality={75}
                      className="object-contain p-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {total > 1 && (
            <>
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="absolute bottom-3 left-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-lg transition hover:bg-brand-600 hover:text-white sm:bottom-auto sm:left-3 sm:top-1/2 sm:-translate-y-1/2"
                aria-label="Previous hero image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="absolute bottom-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-lg transition hover:bg-brand-600 hover:text-white sm:bottom-auto sm:right-3 sm:top-1/2 sm:-translate-y-1/2"
                aria-label="Next hero image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {banners.map((banner, index) => (
                  <button
                    key={banner.id}
                    onClick={() => goTo(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? "w-8 bg-brand-300" : "w-2 bg-white/55"
                    }`}
                    aria-label={`Show hero slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
