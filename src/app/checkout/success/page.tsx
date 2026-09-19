"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { notifyOpener, STRIPE_MESSAGE } from "@/lib/stripe-window";

interface LastOrder {
  name: string;
  email: string;
  total: number;
}

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [inPopup, setInPopup] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id") || "";
    let last: LastOrder | null = null;
    try {
      const raw = sessionStorage.getItem("calipacks-last-order");
      if (raw) last = JSON.parse(raw) as LastOrder;
    } catch {
      // ignore
    }

    const confirmed = Boolean(sessionId || last);
    setPaid(confirmed);
    setOrder(last);
    setInPopup(Boolean(window.opener));

    if (!confirmed) return;

    clearCart();
    notifyOpener(STRIPE_MESSAGE.success);
    if (window.opener) {
      const timer = window.setTimeout(() => window.close(), 2200);
      return () => window.clearTimeout(timer);
    }
  }, [clearCart]);

  return (
    <div className="py-20">
      <div className="container-site max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#635BFF] to-brand-600 shadow-lg shadow-brand-300/50">
          <CheckCircle2 className="h-9 w-9 text-white" />
        </div>
        {paid ? (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-600">
              Stripe payment confirmed
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-surface-950 mb-3">
              Order received
            </h1>
            <p className="text-surface-800/60 mb-2">
              Thanks{order?.name ? `, ${order.name}` : ""}! Your Smoke Cali order is paid.
            </p>
            {order && (
              <p className="text-sm text-surface-800/50 mb-6">
                Confirmation will go to <strong>{order.email}</strong>. Total{" "}
                <strong>{formatPrice(order.total)}</strong>. Delivery in 2–3 days.
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="mt-2 font-display text-3xl font-bold text-surface-950 mb-3">
              Checkout
            </h1>
            <p className="text-surface-800/60 mb-6">
              If you just paid, give it a moment and return from Stripe. Your cart is still here if
              payment was not finished.
            </p>
          </>
        )}
        {inPopup && paid ? (
          <p className="text-sm font-semibold text-brand-700">This window will close automatically.</p>
        ) : (
          <Link
            href={paid ? "/shop/" : "/checkout/"}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors"
          >
            {paid ? "Continue shopping" : "Return to checkout"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
