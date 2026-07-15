import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-surface-950 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
      </div>

      <div className="container-site relative py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-gold-400" />
              UK&apos;s Premium Packaging Supplier
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-balance mb-6">
              Custom Packaging That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-gold-400">
                Sells Itself
              </span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-md">
              Premium mylar bags, glass jars, and label sets at wholesale prices. 
              Fast UK delivery with designs your customers will remember.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-900 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
              >
                Shop All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/custom-orders"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Custom Orders
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-white/50">
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p>Designs</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-bold text-white">2–3 Days</p>
                <p>Dispatch</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <p className="text-2xl font-bold text-white">10k+</p>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-600/30 to-gold-500/20 backdrop-blur-sm border border-white/10" />
              <Image
                src="https://images.unsplash.com/photo-1603901167098-08bd1f9f3d48?w=800&q=80"
                alt="Premium custom packaging by CaliPaz"
                fill
                className="object-cover rounded-2xl"
                priority
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
