import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

interface HeroBannerSliderProps {
  products: Product[];
}

export function HeroBannerSlider({ products }: HeroBannerSliderProps) {
  const tiles = products.slice(0, 4);

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-brand-50 via-white to-brand-50/40 py-3 sm:py-5"
      aria-label="Smoke Cali featured packs"
    >
      <div className="container-site relative">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-200/40 bg-black shadow-[0_24px_70px_rgba(15,10,20,0.35)] sm:rounded-3xl">
          <div className="absolute inset-0">
            <Image
              src="/hero-cali-packs.jpg"
              alt="Smoke Cali Cali Packs wall"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={80}
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
          </div>

          <div className="relative z-10 grid min-h-[420px] lg:min-h-[500px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-5 pb-6 pt-10 sm:px-8 sm:py-12 lg:px-11">
              <div className="max-w-lg">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-200 sm:text-xs">
                  Smoke Cali · Manchester
                </p>
                <h1 className="font-display text-3xl font-black leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-[2.85rem]">
                  108 Cali Packs. Studio HD.
                </h1>
                <p className="mb-7 mt-3 max-w-md text-sm font-semibold leading-relaxed text-white/80 sm:text-base">
                  £0.20 per pack · Minimum 50 pcs. Smell-proof 3.5g designs photographed for the web.
                </p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 sm:text-base"
                  >
                    Shop Cali Packs
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

            <div className="relative px-3 pb-6 pt-2 sm:p-5 lg:p-6 lg:pl-2">
              <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/70 sm:text-xs">
                <span>Featured packs</span>
                <span>108 designs · £0.20 · min 50</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:min-h-[340px] sm:gap-3.5 lg:min-h-[390px]">
                {tiles.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="relative aspect-square overflow-hidden rounded-xl border border-white/20 bg-white sm:rounded-2xl sm:aspect-auto sm:min-h-[160px] lg:min-h-[185px]"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 639px) 42vw, (max-width: 1024px) 28vw, 250px"
                      quality={70}
                      priority={index < 2}
                      className="pack-fill"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
