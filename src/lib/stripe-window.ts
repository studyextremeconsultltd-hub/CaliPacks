"use client";

export const STRIPE_MESSAGE = {
  success: "smoke-cali-stripe-success",
  cancel: "smoke-cali-stripe-cancel",
} as const;

export function openStripeCheckoutWindow(url: string): Window | null {
  const width = 520;
  const height = 780;
  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
  return window.open(
    url,
    "smoke-cali-stripe",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
}

export function notifyOpener(type: string, extra: Record<string, string> = {}) {
  if (!window.opener) return;
  try {
    window.opener.postMessage({ type, ...extra }, window.location.origin);
  } catch {
    // ignore
  }
}
