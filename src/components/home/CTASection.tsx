import Link from "next/link";
import { ArrowRight, CreditCard, PackageCheck, ShoppingBag } from "lucide-react";

export function CTASection() {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Select Product",
      description: "Pick packs, glass, scales or cases — add to cart.",
      wrap: "from-brand-500 to-brand-700",
      bar: "bg-brand-500",
    },
    {
      icon: CreditCard,
      title: "Pay Online",
      description: "Checkout online or order via WhatsApp in one tap.",
      wrap: "from-fuchsia-500 to-pink-600",
      bar: "bg-fuchsia-500",
    },
    {
      icon: PackageCheck,
      title: "Get Delivery",
      description: "UK delivery in 2–3 business days.",
      wrap: "from-rose-500 to-brand-600",
      bar: "bg-rose-500",
    },
  ];

  return (
    <section className="py-14 md:py-18 bg-gradient-to-b from-white via-brand-50 to-white">
      <div className="container-site">
        <div className="rounded-3xl bg-white border-2 border-brand-200 p-7 md:p-10 lg:p-12 relative overflow-hidden shadow-xl shadow-brand-100/60">
          <div className="absolute top-0 left-0 w-28 h-28 bg-brand-400/30 rounded-br-[3rem]" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-400/25 rounded-bl-[3rem]" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-rose-300/30 rounded-tr-[2.5rem]" />
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-brand-500/20 rounded-tl-[3rem]" />

          <div className="relative text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block text-brand-600 text-xs font-extrabold uppercase tracking-widest mb-3">
              Why Cali Smoke
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-surface-950 mb-2">
              UK&apos;s{" "}
              <span className="text-gradient-pink shine-text">Best Sellers</span> of Cali Packs
            </h2>
            <p className="text-surface-800/65 font-semibold text-sm md:text-base">
              Real stock. Bold designs. Fast UK delivery.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-4 mb-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative p-5 rounded-2xl bg-gradient-to-br from-white to-brand-50 border border-brand-100 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${step.bar}`} />
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.wrap} flex items-center justify-center mb-3 shadow-md`}
                >
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[10px] text-brand-600 font-extrabold uppercase tracking-widest mb-1">
                  Step {i + 1}
                </p>
                <p className="font-extrabold text-base text-surface-950 mb-1">{step.title}</p>
                <p className="text-sm font-medium text-surface-800/60 leading-snug">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-extrabold rounded-xl hover:bg-brand-500 transition-colors shadow-lg shadow-brand-200"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/custom-orders"
              className="btn-shine-white inline-flex items-center gap-2 px-6 py-3 font-extrabold rounded-xl text-black"
            >
              Get a Quote
            </Link>
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-extrabold rounded-xl hover:bg-surface-800 transition-colors"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
