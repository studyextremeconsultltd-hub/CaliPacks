"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface LastOrder {
  name: string;
  email: string;
  total: number;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("calipacks-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="py-20">
      <div className="container-site max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 text-brand-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-surface-950 mb-3">
          Order received
        </h1>
        <p className="text-surface-800/60 mb-2">
          Thanks{order?.name ? `, ${order.name}` : ""}! We&apos;ve got your Cali Smoke order.
        </p>
        {order && (
          <p className="text-sm text-surface-800/50 mb-6">
            Confirmation will go to <strong>{order.email}</strong>. Total{" "}
            <strong>{formatPrice(order.total)}</strong>. Delivery in 2–3 days.
          </p>
        )}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors"
        >
          Continue shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
