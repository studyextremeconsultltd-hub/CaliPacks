"use client";

import { ShoppingBag, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "Place Your Order",
    desc: "Tell us what you need — packs, glass, scales or a mixed shop refill.",
    corner: "bg-brand-500",
  },
  {
    icon: CreditCard,
    title: "Make Payment",
    desc: "Pay online securely or confirm payment details after we quote your order.",
    corner: "bg-fuchsia-500",
  },
  {
    icon: Truck,
    title: "Get Delivery",
    desc: "We pack and ship across the UK — most orders arrive within 2–3 business days.",
    corner: "bg-rose-500",
  },
];

export default function CustomOrdersPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-site max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-surface-950 tracking-tight mb-4">
            Custom <span className="text-gradient-pink">Orders</span>
          </h1>
          <p className="text-surface-800/60 max-w-lg mx-auto">
            Need a bulk refill or a special mix? Order → pay → delivery. Simple.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative text-center p-6 rounded-2xl bg-white border border-surface-200 overflow-hidden shadow-sm"
            >
              <div className={`absolute top-0 left-0 w-10 h-10 ${step.corner} rounded-br-2xl opacity-90`} />
              <div className={`absolute bottom-0 right-0 w-8 h-8 ${step.corner} rounded-tl-2xl opacity-60`} />
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4 relative">
                <step.icon className="w-6 h-6 text-brand-700" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1">
                Step {i + 1}
              </p>
              <h3 className="font-semibold text-sm mb-1 relative">{step.title}</h3>
              <p className="text-xs text-surface-800/60 relative">{step.desc}</p>
            </div>
          ))}
        </div>

        <form
          className="relative bg-white rounded-2xl border border-surface-200 p-6 md:p-8 space-y-4 overflow-hidden shadow-xl shadow-brand-100/50"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="absolute top-0 left-0 w-24 h-24 bg-brand-500/20 rounded-br-[3rem]" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-fuchsia-500/20 rounded-bl-[2.5rem]" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-rose-400/20 rounded-tr-[2rem]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-600/15 rounded-tl-[3rem]" />

          <h2 className="font-semibold text-lg relative">Request a custom order</h2>

          <div className="grid sm:grid-cols-2 gap-4 relative">
            <div>
              <label htmlFor="co-name" className="block text-sm font-medium mb-1.5">
                Full Name
              </label>
              <input
                id="co-name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label htmlFor="co-email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="co-email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="co-type" className="block text-sm font-medium mb-1.5">
              Product type
            </label>
            <select
              id="co-type"
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm bg-white"
            >
              <option>Cali Packs</option>
              <option>Can & Jar Packs</option>
              <option>Glassware</option>
              <option>Digital Scales</option>
              <option>Cases & Accessories</option>
              <option>Mixed shop refill</option>
            </select>
          </div>
          <div className="relative">
            <label htmlFor="co-qty" className="block text-sm font-medium mb-1.5">
              Estimated quantity
            </label>
            <input
              id="co-qty"
              type="text"
              placeholder="e.g. 500 packs"
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
            />
          </div>
          <div className="relative">
            <label htmlFor="co-details" className="block text-sm font-medium mb-1.5">
              Order details
            </label>
            <textarea
              id="co-details"
              rows={5}
              required
              placeholder="List designs, SKUs, or describe what you need..."
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            className="relative w-full py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors"
          >
            Submit Custom Order Request
          </button>
        </form>
      </div>
    </div>
  );
}
