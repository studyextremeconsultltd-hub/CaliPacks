import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function CategoryHub() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50 to-white" />

      <div className="container-site relative">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-brand-600">
              Shop by category
            </p>
            <h2 className="font-display text-3xl font-black tracking-tight text-gradient-pink md:text-4xl">
              Cali Packs & shop stock
            </h2>
            <p className="mt-2 max-w-xl text-sm font-semibold text-black/55 md:text-base">
              Named HD products from the Manchester floor — packs, grinders, glass, hookahs, and more.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-brand-800"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group relative overflow-hidden rounded-[1.4rem] bg-white shadow-[0_16px_40px_rgba(190,24,93,0.16)] ring-1 ring-brand-100 transition hover:shadow-[0_22px_55px_rgba(190,24,93,0.28)]"
            >
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                  quality={72}
                  className={
                    category.slug === "cali-packs"
                      ? "pack-fill transition-transform duration-300"
                      : "product-fit transition-transform duration-300"
                  }
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 sm:p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-200">
                  {category.tagline}
                </p>
                <h3 className="mt-1 font-display text-base font-black leading-tight text-white sm:text-lg">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-bold text-white/70">
                  {category.productCount} item{category.productCount === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
