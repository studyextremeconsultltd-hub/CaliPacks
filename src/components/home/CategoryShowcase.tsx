"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    let x = 0;
    const speed = 0.55;
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    const tick = () => {
      if (!paused) {
        x += speed;
        const half = el.scrollWidth / 2;
        if (x >= half) x = 0;
        el.style.transform = `translateX(-${x}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const loop = [...categories, ...categories];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Picture background */}
      <div className="absolute inset-0">
        <Image
          src="/products/cali-06.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover img-polish scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-brand-50/90 to-white/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.18),_transparent_55%)]" />
      </div>

      <div className="container-site relative mb-8">
        <div className="rounded-2xl border-2 border-brand-400 bg-white/85 backdrop-blur-sm px-5 py-5 sm:px-7 sm:py-6 shadow-[0_10px_40px_rgba(236,72,153,0.2)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-brand-400 bg-black text-brand-200 text-xs font-black uppercase tracking-widest mb-3 shadow-sm">
                Collections
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-gradient-pink shine-text">
                Shop by Category
              </h2>
              <p className="text-black/60 mt-2 max-w-md text-sm md:text-base font-bold border-b-2 border-brand-300 pb-2 inline-block">
                One scroll. Every sellable category — packs, glass, scales &amp; accessories.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-black text-black hover:text-brand-600"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <div ref={trackRef} className="flex gap-6 w-max px-4 sm:px-6 lg:px-8 will-change-transform">
          {loop.map((category, i) => (
            <Link
              key={`${category.id}-${i}`}
              href={`/shop/${category.slug}`}
              className="group relative w-[280px] sm:w-[340px] rounded-3xl overflow-hidden aspect-[4/5] bg-white ring-2 ring-brand-300 shadow-xl shadow-brand-200/50 hover:ring-brand-500 hover:scale-[1.03] transition-all shrink-0"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="340px"
                quality={90}
                className="object-cover img-polish group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-brand-900/25 to-transparent" />
              <div className="absolute top-0 left-0 w-14 h-14 bg-brand-500/80 rounded-br-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-brand-300/70 rounded-tl-3xl" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-200 mb-1">
                  {category.tagline}
                </p>
                <h3 className="font-display font-black text-2xl text-white">{category.name}</h3>
                <p className="text-xs text-white/75 mt-1 font-bold">
                  {category.productCount}+ products
                </p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-brand-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
