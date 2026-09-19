"use client";

import { Lock, ShieldCheck, X } from "lucide-react";

interface StripePayOverlayProps {
  open: boolean;
  status: "preparing" | "waiting" | "blocked" | "error";
  message?: string;
  onClose: () => void;
}

export function StripePayOverlay({
  open,
  status,
  message,
  onClose,
}: StripePayOverlayProps) {
  if (!open) return null;

  const title =
    status === "preparing"
      ? "Opening secure checkout…"
      : status === "waiting"
        ? "Complete payment in the Stripe window"
        : status === "blocked"
          ? "Allow the checkout window"
          : "Checkout could not start";

  const body =
    message ||
    (status === "waiting"
      ? "A secure Stripe window is open. Keep this tab here — we’ll confirm as soon as the card payment succeeds."
      : status === "preparing"
        ? "Connecting to Stripe over an encrypted session. Your card details never touch this website."
        : status === "blocked"
          ? "Your browser blocked the payment window. We’ll send you to Stripe in this tab instead."
          : "Please try again, or order on WhatsApp if the problem continues.");

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-brand-300 bg-gradient-to-b from-white via-brand-50 to-white p-7 shadow-[0_24px_80px_rgba(236,72,153,0.35)]">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-300/40 blur-2xl" />
        <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#635BFF]/20 blur-2xl" />
        {status !== "preparing" && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-surface-800/40 hover:bg-brand-50 hover:text-brand-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <div className="relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#635BFF] to-brand-600 shadow-lg shadow-brand-300/50">
            {status === "error" ? (
              <ShieldCheck className="h-8 w-8 text-white" />
            ) : (
              <Lock className="h-8 w-8 text-white" />
            )}
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-600">
            Stripe · encrypted
          </p>
          <h2 className="mt-2 font-display text-2xl font-black text-surface-950">{title}</h2>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-surface-800/70">{body}</p>
          {(status === "preparing" || status === "waiting") && (
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-brand-100">
              <div className="pay-now-bar h-full w-1/2 rounded-full bg-gradient-to-r from-[#635BFF] to-brand-500" />
            </div>
          )}
          {status === "waiting" && (
            <p className="mt-4 text-xs font-bold text-surface-800/45">
              Don’t close this page until the Stripe window finishes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
