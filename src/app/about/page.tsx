"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const aboutSlides = [
  "/products/cali-06.jpg",
  "/products/cali-18.jpg",
  "/products/cali-07.jpg",
  "/products/cali-13.jpg",
  "/products/cali-01.jpg",
];

export default function AboutPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % aboutSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="relative h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden bg-brand-50">
        {aboutSlides.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Cali Packs stock"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center img-polish"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-brand-50/70 to-brand-500/25" />
          </div>
        ))}
        <div className="absolute inset-0 container-site flex flex-col justify-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-surface-950 mb-2 shine-text">
            About <span className="text-gradient-pink">Cali Packs</span>
          </h1>
          <p className="text-surface-800/70 max-w-lg font-semibold text-sm md:text-base">
            UK best sellers of cali packs — real stock, bold designs, fast delivery.
          </p>
        </div>
        <button
          onClick={() => setIndex((i) => (i - 1 + aboutSlides.length) % aboutSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-brand-200 text-brand-700 flex items-center justify-center shadow-md"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % aboutSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-brand-200 text-brand-700 flex items-center justify-center shadow-md"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {aboutSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-500" : "w-1.5 bg-brand-300/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="container-site max-w-3xl space-y-5 text-surface-800/70 leading-relaxed">
          <p className="text-lg font-semibold text-surface-950">
            Cali Packs supplies UK shops and buyers with printed cali packs, can jars, glassware,
            digital scales and accessories — from our real shelves.
          </p>
          <p className="font-medium">
            Browse, add to cart, and get delivery within 2–3 business days. Based in Manchester.
          </p>
          <ul className="space-y-2.5 list-none pl-0">
            {[
              "Best-selling cali pack designs across the UK",
              "Can jars, glass, scales and cases in one place",
              "Online cart + WhatsApp ordering",
              "2–3 day UK delivery",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-semibold text-surface-900">
                <span className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-2 px-6 py-3 bg-brand-600 text-white font-extrabold rounded-xl hover:bg-brand-500 transition-colors shadow-md shadow-brand-200"
          >
            Shop the catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
