import Link from "next/link";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { STRIPE_PAYMENT_LINK } from "@/lib/payments";

interface PayNowButtonProps {
  href?: string;
  className?: string;
  compact?: boolean;
}

export function PayNowButton({
  href,
  className,
  compact = false,
}: PayNowButtonProps) {
  const target = href || STRIPE_PAYMENT_LINK || "/checkout";
  const external = target.startsWith("http");

  return (
    <Link
      href={target}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "pay-now-btn inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#635BFF] via-[#7A73FF] to-brand-600 font-black text-white shadow-[0_10px_28px_rgba(99,91,255,0.4)] transition hover:brightness-110 hover:-translate-y-0.5",
        compact ? "px-3 py-2.5 text-xs sm:px-3.5 sm:text-sm" : "w-full px-6 py-4 text-base",
        className
      )}
      aria-label="Pay now with Stripe"
    >
      <CreditCard className={compact ? "h-4 w-4 shrink-0" : "h-5 w-5 shrink-0"} />
      <span>Pay Now</span>
      <span
        className={cn(
          "rounded-md bg-white/15 px-1.5 font-black tracking-wide text-white/95",
          compact ? "py-0.5 text-[9px]" : "py-0.5 text-[10px]"
        )}
      >
        Stripe
      </span>
    </Link>
  );
}
