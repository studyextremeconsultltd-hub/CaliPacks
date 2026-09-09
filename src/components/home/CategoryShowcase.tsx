import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

export function CategoryShowcase({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50 to-white" />

      <div className="container-site relative mb-7 sm:mb-9">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-950 via-brand-800 to-fuchsia-700 px-6 py-7 shadow-[0_20px_60px_rgba(190,24,93,0.3)] sm:px-9 sm:py-9">
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-100 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-brand-300" />
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
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-brand-800 shadow-lg transition hover:bg-brand-50"
            >
              Shop all 108 packs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-site relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative overflow-hidden rounded-[1.4rem] bg-white shadow-[0_16px_40px_rgba(190,24,93,0.16)] ring-1 ring-brand-100 transition hover:shadow-[0_22px_55px_rgba(190,24,93,0.28)]"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                quality={70}
                className="pack-fill transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 sm:p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-200">
                £0.20 · min 50
              </p>
              <h3 className="mt-1 font-display text-base font-black leading-tight text-white sm:text-lg">
                {product.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
