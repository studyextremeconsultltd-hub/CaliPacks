"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle, CreditCard, ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { productImageClass } from "@/lib/product";
import { whatsappOrderNumber } from "@/data/social";
import { checkoutCreateUrl } from "@/lib/payments";
import { openStripeCheckoutWindow, STRIPE_MESSAGE } from "@/lib/stripe-window";
import { StripePayOverlay } from "@/components/payments/StripePayOverlay";
import { COURIER_FEE_GBP, COURIER_LABEL, COURIER_NOTE, orderTotal } from "@/lib/shipping";

type OverlayStatus = "preparing" | "waiting" | "blocked" | "error";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, ready } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState<OverlayStatus>("preparing");
  const [overlayMessage, setOverlayMessage] = useState("");
  const [cancelNote, setCancelNote] = useState(false);

  const shipping = COURIER_FEE_GBP;
  const total = orderTotal(subtotal);

  const whatsappHref = useMemo(() => {
    const lines = items.map(
      (i) => `• ${i.product.name} × ${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`
    );
    const text = [
      "Hi Smoke Cali — I'd like to place an order:",
      "",
      ...lines,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `${COURIER_LABEL}: ${formatPrice(shipping)}`,
      `Total: ${formatPrice(total)}`,
    ].join("\n");
    return `https://wa.me/${whatsappOrderNumber}?text=${encodeURIComponent(text)}`;
  }, [items, subtotal, shipping, total]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "cancel") {
      setCancelNote(true);
      if (window.opener) {
        window.opener.postMessage({ type: STRIPE_MESSAGE.cancel }, window.location.origin);
        window.close();
      }
    }
  }, []);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === STRIPE_MESSAGE.success) {
        clearCart();
        router.push("/checkout/success");
      }
      if (event.data?.type === STRIPE_MESSAGE.cancel) {
        setOverlayOpen(false);
        setSubmitting(false);
        setCancelNote(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [clearCart, router]);

  if (!ready) {
    return (
      <div className="py-20 text-center container-site">
        <p className="text-sm font-semibold text-surface-800/50">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center container-site">
        <h1 className="font-display text-3xl font-bold text-surface-950 mb-3">Checkout</h1>
        <p className="text-surface-800/60 mb-8 max-w-md mx-auto">
          Add products to your cart first. Then enter your details here and Stripe&apos;s official
          payment page will open so you can pay by card.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-black rounded-xl hover:bg-brand-500"
        >
          Shop now
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customer = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      postcode: String(form.get("postcode") || ""),
      notes: String(form.get("notes") || ""),
    };

    const endpoint = checkoutCreateUrl();
    if (!endpoint) {
      setOverlayOpen(true);
      setOverlayStatus("error");
      setOverlayMessage(
        "Card checkout is being connected. Add the shop Stripe secret on the checkout worker, then try again."
      );
      return;
    }

    setSubmitting(true);
    setOverlayOpen(true);
    setOverlayStatus("preparing");
    setOverlayMessage("");
    setCancelNote(false);

    const payload = {
      customerEmail: customer.email,
      notes: customer.notes,
      domain: window.location.origin,
      shippingAddress: {
        name: customer.name,
        phone: customer.phone,
        line1: customer.address,
        city: customer.city,
        postcode: customer.postcode,
      },
      items: items.map((i) => ({
        title: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
        productId: i.product.id,
        minOrder: i.product.minOrder || 1,
      })),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.status !== "success" || !data.url) {
        throw new Error(data.message || "Stripe checkout is unavailable right now.");
      }

      sessionStorage.setItem(
        "calipacks-last-order",
        JSON.stringify({
          name: customer.name,
          email: customer.email,
          total,
        })
      );

      const popup = openStripeCheckoutWindow(data.url);
      if (!popup) {
        setOverlayStatus("blocked");
        return;
      }
      setOverlayStatus("waiting");
    } catch (err) {
      const networkFail = err instanceof TypeError;
      setOverlayStatus("error");
      setOverlayMessage(
        networkFail
          ? "Payment server is not running. In a second terminal run npm run checkout, then add the shop Stripe secret key to cloudflare/checkout-worker/.dev.vars"
          : err instanceof Error
            ? err.message
            : "Could not start Stripe checkout."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="py-10 md:py-14">
      <StripePayOverlay
        open={overlayOpen}
        status={overlayStatus}
        message={overlayMessage}
        onClose={() => {
          setOverlayOpen(false);
          setSubmitting(false);
        }}
      />
      <div className="container-site max-w-5xl">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-surface-800/60 hover:text-brand-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>

        <h1 className="font-display text-3xl font-bold text-surface-950 mb-2">Secure checkout</h1>
        <p className="mb-8 text-sm font-semibold text-surface-800/55">
          Enter your delivery details, then Pay Now opens Stripe&apos;s official checkout so you can pay by card.
        </p>

        {cancelNote && (
          <p className="mb-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
            Payment was cancelled. Your cart is still here whenever you&apos;re ready.
          </p>
        )}

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
                    autoComplete="name"
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
                    autoComplete="email"
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
                    autoComplete="tel"
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
                    autoComplete="street-address"
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
                    autoComplete="address-level2"
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
                    autoComplete="postal-code"
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
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#635BFF] via-[#7A73FF] to-brand-600 text-white font-black shadow-[0_10px_28px_rgba(99,91,255,0.4)] hover:brightness-110 transition disabled:opacity-70"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CreditCard className="w-5 h-5" />
              )}
              {submitting ? "Opening Stripe…" : "Pay Now"}
              <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-black tracking-wide">
                Stripe
              </span>
            </button>
            <p className="text-center text-xs font-semibold text-surface-800/45">
              Card details are entered only on checkout.stripe.com — never on this website.
              Courier service is added on Stripe as <span className="text-brand-700">£2.50 GBP</span>.
            </p>

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
                        quality={75}
                        className={productImageClass(item.product)}
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
                  <dt className="text-surface-800/60">{COURIER_LABEL}</dt>
                  <dd>{formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between font-bold text-base pt-2">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <p className="text-xs font-bold text-brand-700 mt-3 rounded-lg bg-brand-50 px-3 py-2">
                {COURIER_NOTE}
              </p>
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
