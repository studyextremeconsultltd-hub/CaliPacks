/**
 * Stripe Payment Link from Dashboard → Payment links → New.
 * Add the URL as GitHub secret NEXT_PUBLIC_STRIPE_PAYMENT_LINK
 * (Settings → Secrets and variables → Actions). Redeploy after saving.
 */
export const STRIPE_PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK?.trim() || "";

export const stripeEnabled = Boolean(STRIPE_PAYMENT_LINK);
