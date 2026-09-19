/** Flat UK courier fee shown at checkout and charged on Stripe. */
export const COURIER_FEE_GBP = 2.5;
export const COURIER_LABEL = "Courier service";
export const COURIER_NOTE = "UK courier service — the client pays £2.50 GBP";

export function orderTotal(subtotal: number) {
  return subtotal + COURIER_FEE_GBP;
}
