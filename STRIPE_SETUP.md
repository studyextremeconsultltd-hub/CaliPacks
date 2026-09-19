# Stripe checkout — Smoke Cali

Same pattern as Rose Empire: **secret keys live only on a Cloudflare Worker**.  
Nothing `sk_live` / `whsec` is stored in the public website.

After the customer enters delivery details, **Pay Now** opens Stripe’s official hosted page (`checkout.stripe.com`). Card details are entered there, not on smokecali.co.uk. Money goes into whichever Stripe account’s **secret key** is on the worker.

---

## Local (`http://localhost:3000/checkout/`)

Keep the Next.js site running (`npm run dev`). In a **second** terminal:

```powershell
cd "E:\Cali Packs"
Copy-Item "cloudflare\checkout-worker\.dev.vars.example" "cloudflare\checkout-worker\.dev.vars"
```

Open `cloudflare/checkout-worker/.dev.vars` and set the **shop** Stripe secret (test or live):

```
STRIPE_SECRET_KEY=sk_test_...
```

or `sk_live_...` for the real shop account. Do **not** commit this file or paste the key into chat.

Then start the payment worker:

```powershell
npm run checkout
```

Leave that terminal open. Checkout talks to `http://127.0.0.1:8787`.

1. Add products to the cart  
2. Open `http://localhost:3000/checkout/`  
3. Fill delivery details → **Pay Now**  
4. Stripe’s official checkout page opens for the card payment  

---

## 1. Stripe Dashboard (once)

1. Log into the **Smoke Cali** Stripe account (live mode)
2. [API keys](https://dashboard.stripe.com/apikeys) → copy **Secret key** (`sk_live_…`)
3. [Customer emails](https://dashboard.stripe.com/settings/emails) → Successful payments ON
4. [Business details / branding](https://dashboard.stripe.com/settings/business) filled in

Do **not** commit keys or paste them into chat.

---

## 2. Deploy the checkout worker

```powershell
cd "cloudflare/checkout-worker"
npm install
npx wrangler login
npx wrangler deploy
```

Note the worker URL, for example:

`https://smoke-cali-checkout.<your-account>.workers.dev`

---

## 3. Put secrets on the worker

```powershell
cd "cloudflare/checkout-worker"
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

Optional alerts (email / WhatsApp via Zapier), same as Rose Empire:

```powershell
npx wrangler secret put ZAPIER_WEBHOOK_URL
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put OWNER_NOTIFY_EMAIL
```

---

## 4. Webhook on the same Stripe account

1. Stripe → [Webhooks](https://dashboard.stripe.com/webhooks) → Add endpoint
2. URL: `https://smoke-cali-checkout.<your-account>.workers.dev/api/stripe/webhook`
3. Event: `checkout.session.completed`
4. Copy signing secret (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`

---

## 5. Point the website at the worker

GitHub repo → **Settings → Secrets and variables → Actions**

| Secret | Value |
| --- | --- |
| `NEXT_PUBLIC_CHECKOUT_API_URL` | `https://smoke-cali-checkout.<your-account>.workers.dev` |

Then redeploy GitHub Pages (push or **Actions → Deploy GitHub Pages → Run workflow**).

---

## 6. Verify

```powershell
Invoke-RestMethod "https://smoke-cali-checkout.<your-account>.workers.dev/health"
Invoke-RestMethod "https://smoke-cali-checkout.<your-account>.workers.dev/api/checkout/config"
```

Both should show Stripe ready. Place a small live (or test-mode) order and confirm:

- Money lands in the Smoke Cali Stripe account
- Customer receipt email arrives
- The Stripe window closes / the main site shows Order received
