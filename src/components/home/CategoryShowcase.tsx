import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  const featured = getFeaturedProducts().slice(0, 8);
  const loop = [...featured, ...featured];

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.2),_transparent_58%)]" />
      </div>

      <div className="container-site relative mb-7 sm:mb-9">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-950 via-brand-800 to-fuchsia-700 px-6 py-7 shadow-[0_20px_60px_rgba(190,24,93,0.3)] sm:px-9 sm:py-9">
          <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-brand-300/15 blur-2xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-100 shadow-sm sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_10px_rgba(249,168,212,0.9)]" />
                Featured Cali Packs
              </span>
              <h2 className="font-display text-4xl font-black leading-none tracking-tight text-white md:text-5xl">
                Designs that{" "}
                <span className="bg-gradient-to-r from-brand-200 via-white to-brand-300 bg-clip-text text-transparent">
                  sell
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-relaxed text-white/75 md:text-base">
                £0.20 per pack · minimum 50 pcs. Every pack is named and shot in HD.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Shop all 108 packs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="category-slider-shell relative">
        <div className="category-marquee flex w-max gap-5">
          {loop.map((product, index) => {
            const isDuplicate = index >= featured.length;

            return (
              <Link
                key={`${product.id}-${index}`}
                href={`/product/${product.slug}`}
                aria-hidden={isDuplicate}
                tabIndex={isDuplicate ? -1 : undefined}
                className="group relative aspect-[4/5] w-[240px] shrink-0 overflow-hidden rounded-[1.6rem] bg-white shadow-[0_16px_40px_rgba(190,24,93,0.2)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(190,24,93,0.34)] sm:w-[280px] lg:w-[300px]"
              >
                <Image
                  src={product.image}
                  alt={isDuplicate ? "" : product.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 300px"
                  quality={70}
                  className="object-contain scale-[1.12] p-1 transition-transform duration-700 group-hover:scale-[1.18]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-950/30 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-brand-800 shadow-lg">
                  £0.20 · min 50
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-brand-200">
                    Cali Pack
                  </p>
                  <h3 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">
                    {product.name}
                  </h3>
                </div>
                <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />
      </div>
    </section>
  );
}
