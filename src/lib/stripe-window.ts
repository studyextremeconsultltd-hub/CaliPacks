"use client";

export const STRIPE_MESSAGE = {
  success: "smoke-cali-stripe-success",
  cancel: "smoke-cali-stripe-cancel",
} as const;

/**
 * Opens Stripe's official hosted Checkout (checkout.stripe.com).
 * Same-tab is used if the browser blocks a new window, so payment always starts.
 */
export function openStripeCheckoutWindow(url: string): Window | null {
  const popup = window.open(url, "_blank");
  if (popup && !popup.closed) {
    try {
      popup.focus();
    } catch {
      // ignore
    }
    return popup;
  }
  window.location.assign(url);
  return null;
}

export function notifyOpener(type: string, extra: Record<string, string> = {}) {
  if (!window.opener) return;
  try {
    window.opener.postMessage({ type, ...extra }, window.location.origin);
  } catch {
    // ignore
  }
}
