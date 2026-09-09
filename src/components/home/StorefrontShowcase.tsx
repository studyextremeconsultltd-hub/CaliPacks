import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Store } from "lucide-react";
import { contactInfo } from "@/data/social";

export function StorefrontShowcase() {
  return (
    <section className="relative overflow-hidden bg-black py-14 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(236,72,153,0.25),transparent_42%)]" />
      <div className="container-site relative">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border-2 border-brand-400 storefront-glow">
          <Image
            src="/cali-smoke-storefront.jpg"
            alt="Smoke Cali shop front in Manchester"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={70}
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="relative z-10 flex min-h-[520px] max-w-xl flex-col justify-center p-7 sm:p-10 md:p-14">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand-300/50 bg-brand-600/20 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-brand-200 backdrop-blur-md">
              <Store className="h-4 w-4" />
              Our Manchester Store
            </div>
            <h2 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl">
              Step inside{" "}
              <span className="text-gradient-pink">Smoke Cali</span>
            </h2>
            <p className="mt-4 max-w-md text-base font-semibold leading-relaxed text-white/75 sm:text-lg">
              Explore our real shop stock online — 108 HD Cali Packs at £0.20
              per pack, minimum 50 pcs, plus in-store essentials.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-brand-300">
                  Visit us
                </p>
                <p className="mt-1 font-bold text-white">{contactInfo.address}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-black text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500"
              >
                Shop Store Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine-white inline-flex items-center gap-2 rounded-xl px-6 py-3 font-black text-black"
              >
                Get Directions
                <Sparkles className="h-4 w-4 text-brand-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
