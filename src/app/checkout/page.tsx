"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle, CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { whatsappOrderNumber } from "@/data/social";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= 150 ? 0 : 8.99;
  const total = subtotal + shipping;

  const whatsappHref = useMemo(() => {
    const lines = items.map(
      (i) => `• ${i.product.name} × ${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`
    );
    const text = [
      "Hi Cali Smoke — I'd like to place an order:",
      "",
      ...lines,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}`,
      `Total: ${formatPrice(total)}`,
    ].join("\n");
    return `https://wa.me/${whatsappOrderNumber}?text=${encodeURIComponent(text)}`;
  }, [items, subtotal, shipping, total]);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center container-site">
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <Link href="/shop" className="text-brand-600 font-semibold hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const order = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      postcode: String(form.get("postcode") || ""),
      notes: String(form.get("notes") || ""),
      items: items.map((i) => ({
        name: i.product.name,
        qty: i.quantity,
        price: i.product.price,
      })),
      total,
    };
    sessionStorage.setItem("calipacks-last-order", JSON.stringify(order));
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="py-10 md:py-14">
      <div className="container-site max-w-5xl">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-surface-800/60 hover:text-brand-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>

        <h1 className="font-display text-3xl font-bold text-surface-950 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-surface-200 p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-brand-500/20 rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-fuchsia-500/15 rounded-tl-full" />
              <h2 className="font-semibold text-lg relative">Delivery details</h2>
              <div className="grid sm:grid-cols-2 gap-4 relative">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium mb-1.5">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1.5">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium mb-1.5">
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
                    Order notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              {submitting ? "Placing order…" : "Place order online"}
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1ebe57] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </a>
          </form>

          <aside className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-surface-200 p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order summary</h2>
              <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0 ring-1 ring-brand-100">
                      <Image
                        src={item.product.image}
                        alt=""
                        fill
                        sizes="56px"
                        quality={90}
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-xs text-surface-800/50">
                        × {item.quantity} · {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-2 text-sm border-t border-surface-200 pt-4">
                <div className="flex justify-between">
                  <dt className="text-surface-800/60">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-surface-800/60">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between font-bold text-base pt-2">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <p className="text-xs text-surface-800/45 mt-4">
                Estimated delivery: 2–3 business days across the UK.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
