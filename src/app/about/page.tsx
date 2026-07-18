import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

const highlights = [
  "Best-selling Cali pack designs across the UK",
  "Can jars, glass, scales and cases in one place",
  "Online cart and WhatsApp ordering",
  "Fast 2–3 day UK delivery",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Manchester stock"
        title="About"
        accent="Cali Smoke"
        description="A real Manchester shop bringing bold Cali packs, glassware, hookahs, scales and accessories together in one fast online catalogue."
        images={[
          "/cali-shop-hero.jpg",
          "/products/cali-18.jpg",
          "/products/cali-06.jpg",
        ]}
        ctaLabel="Shop the catalogue"
        ctaHref="/shop"
      />

      <section className="bg-white py-10 sm:py-14">
        <div className="container-site">
          <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/70 to-brand-100/60 p-6 shadow-[0_18px_55px_rgba(236,72,153,0.12)] sm:p-9 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-lg font-bold leading-relaxed text-brand-950 sm:text-xl">
                Cali Smoke supplies UK shops and buyers with products selected
                directly from our real shelves.
              </p>
              <p className="mt-4 font-medium leading-relaxed text-brand-950/65">
                Browse online, add products to your cart, or contact us through
                WhatsApp for stock and wholesale questions.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-brand-200 transition hover:bg-brand-500"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="grid gap-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold text-brand-950 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
