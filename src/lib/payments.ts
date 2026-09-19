import { SITE_URL } from "@/lib/site";

/** Cloudflare Worker that creates Stripe Checkout Sessions. No secret keys in the browser. */
export const CHECKOUT_API_URL = (
  process.env.NEXT_PUBLIC_CHECKOUT_API_URL || ""
).replace(/\/$/, "");

export const stripeCheckoutReady = Boolean(CHECKOUT_API_URL);

export function checkoutCreateUrl() {
  if (!CHECKOUT_API_URL) return "";
  return `${CHECKOUT_API_URL}/api/checkout/create`;
}

export const stripeSuccessPath = `${SITE_URL}/checkout/success/`;
