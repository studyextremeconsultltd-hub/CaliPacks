/**
 * Smoke Cali — Stripe Checkout Cloudflare Worker
 * Pattern matched to Rose Empire: secret keys stay on the worker, never in public JS.
 *
 * Secrets (wrangler secret put):
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET
 * Optional:
 *   STRIPE_SECRET_KEY_TEST
 *   STRIPE_WEBHOOK_SECRET_TEST
 *   ZAPIER_WEBHOOK_URL
 *   RESEND_API_KEY
 *   OWNER_NOTIFY_EMAIL
 *   RESEND_FROM_EMAIL
 *   SITE_URL
 */

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_FEE = 8.99;
const DEFAULT_OWNER_EMAIL = "hello@calipacks.co.uk";

const ALLOWED_ORIGINS = new Set([
  "https://smokecali.co.uk",
  "https://www.smokecali.co.uk",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://127.0.0.1:8787",
  "http://localhost:8787",
  "http://192.168.1.17:3000",
]);

const ALLOWED_DOMAINS = new Set([
  "https://smokecali.co.uk",
  "https://www.smokecali.co.uk",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://192.168.1.17:3000",
]);

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith(".github.io"))) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function isPlaceholderKey(key) {
  return !key || !key.startsWith("sk_") || /your_|placeholder|example|xxx/i.test(key);
}

function secretKeyHint(key) {
  const k = String(key || "").trim();
  if (!k) return "empty";
  if (k.startsWith("sk_live_")) return "sk_live";
  if (k.startsWith("sk_test_")) return "sk_test";
  if (k.startsWith("rk_live_")) return "rk_live";
  if (k.startsWith("rk_test_")) return "rk_test";
  if (k.startsWith("pk_live_") || k.startsWith("pk_test_")) return "publishable_key_wrong_slot";
  if (k.startsWith("whsec_")) return "webhook_secret_wrong_slot";
  return "unexpected_format";
}

function stripeKeyMode(key) {
  const k = String(key || "").trim();
  if (k.startsWith("sk_live_") || k.startsWith("rk_live_")) return "live";
  if (k.startsWith("sk_test_") || k.startsWith("rk_test_")) return "test";
  return "unknown";
}

function clean(v, max = 200) {
  return String(v || "").trim().slice(0, max);
}

function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function bytesToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function webhookSecrets(env) {
  const secrets = [];
  const primary = String(env.STRIPE_WEBHOOK_SECRET || "").trim();
  const test = String(env.STRIPE_WEBHOOK_SECRET_TEST || "").trim();
  if (primary.startsWith("whsec_")) secrets.push(primary);
  if (test.startsWith("whsec_") && test !== primary) secrets.push(test);
  return secrets;
}

function stripeSecretForEvent(env, livemode) {
  const live = String(env.STRIPE_SECRET_KEY || "").trim();
  const test = String(env.STRIPE_SECRET_KEY_TEST || "").trim();
  if (livemode === false) {
    if (test && !isPlaceholderKey(test)) return test;
    if (live && stripeKeyMode(live) === "test") return live;
    return test || live;
  }
  if (live && stripeKeyMode(live) === "live") return live;
  return live || test;
}

async function verifyStripeSignature(rawBody, signatureHeader, webhookSecret) {
  if (!signatureHeader || !webhookSecret) return false;
  const parts = {};
  for (const piece of signatureHeader.split(",")) {
    const [k, ...rest] = piece.trim().split("=");
    if (!k || !rest.length) continue;
    const v = rest.join("=");
    if (!parts[k]) parts[k] = [];
    parts[k].push(v);
  }
  const timestamp = parts.t && parts.t[0];
  const candidates = parts.v1 || [];
  if (!timestamp || !candidates.length) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${rawBody}`));
  const expected = bytesToHex(signed);
  return candidates.some((sig) => timingSafeEqual(sig, expected));
}

async function verifyStripeSignatureAny(rawBody, signatureHeader, secrets) {
  for (const secret of secrets) {
    if (await verifyStripeSignature(rawBody, signatureHeader, secret)) return true;
  }
  return false;
}

function moneyFromStripe(amount, currency) {
  const major = (Number(amount) || 0) / 100;
  const code = String(currency || "gbp").toUpperCase();
  if (code === "GBP") return `£${major.toFixed(2)}`;
  return `${major.toFixed(2)} ${code}`;
}

function normalizeAddress(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  return {
    name: clean(src.name, 120),
    phone: clean(src.phone, 40),
    line1: clean(src.line1 || src.address, 200),
    city: clean(src.city, 80),
    postcode: clean(src.postcode, 16).toUpperCase(),
  };
}

function validateAddress(addr) {
  if (!addr.name) return "Full name is required.";
  if (!addr.phone || addr.phone.length < 7) return "A valid phone number is required.";
  if (!addr.line1) return "Delivery address is required.";
  if (!addr.city) return "Town / city is required.";
  if (!addr.postcode || addr.postcode.length < 5) return "A valid UK postcode is required.";
  return "";
}

function buildTotals(items) {
  const cleaned = [];
  let subtotal = 0;
  for (const item of items || []) {
    const qty = Math.max(0, parseInt(item.quantity, 10) || 0);
    const unit = Number(item.unitPrice) || 0;
    if (qty < 1 || unit <= 0) continue;
    cleaned.push({
      title: clean(item.title || item.name, 140) || "Smoke Cali product",
      quantity: qty,
      unitPrice: unit,
      productId: clean(item.productId || item.id, 80),
    });
    subtotal += qty * unit;
  }
  if (!cleaned.length) throw new Error("Cart is empty.");
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { items: cleaned, subtotal, shipping, total: subtotal + shipping };
}

const createHits = new Map();
function rateLimited(ip) {
  const key = String(ip || "unknown").slice(0, 64);
  const now = Date.now();
  let bucket = createHits.get(key);
  if (!bucket || now - bucket.start > 60_000) {
    bucket = { start: now, count: 0 };
    createHits.set(key, bucket);
  }
  bucket.count += 1;
  if (createHits.size > 4000) {
    for (const [k, v] of createHits) {
      if (now - v.start > 60_000) createHits.delete(k);
    }
  }
  return bucket.count > 12;
}

function buildOrderAlert(session) {
  const meta = session.metadata || {};
  const email = session.customer_details?.email || session.customer_email || "";
  const name = session.customer_details?.name || meta.ship_name || "";
  const phone = meta.ship_phone || session.customer_details?.phone || "";
  const addressText =
    meta.ship_address_full ||
    [meta.ship_name, meta.ship_line1, meta.ship_city, meta.ship_postcode, phone]
      .filter(Boolean)
      .join(", ");
  const lineItems = (session.line_items?.data || []).map((li) => ({
    name: li.description || li.price?.product?.name || "Item",
    quantity: li.quantity || 0,
    amount: moneyFromStripe(li.amount_total, session.currency),
  }));
  const total = moneyFromStripe(session.amount_total, session.currency);
  const linesText = lineItems.length
    ? lineItems.map((li) => `• ${li.quantity}× ${li.name} — ${li.amount}`).join("\n")
    : "(See Stripe Dashboard)";

  return {
    event: "smoke_cali.order_paid",
    source: "smoke-cali-checkout-webhook",
    session_id: session.id,
    payment_intent: session.payment_intent || "",
    amount_formatted: total,
    customer_email: email,
    customer_name: name,
    whatsapp_message: [
      "🛒 *Smoke Cali — NEW ORDER*",
      `Total: ${total}`,
      `Email: ${email}`,
      `Name: ${name || "—"}`,
      `Phone: ${phone || "—"}`,
      "",
      "Items:",
      linesText,
      "",
      `Deliver to: ${addressText || "—"}`,
      `Stripe: ${session.id}`,
    ].join("\n"),
    email_subject: `New Smoke Cali order — ${total}`,
    email_body: [
      "A paid order was placed on smokecali.co.uk.",
      "",
      `Total: ${total}`,
      `Customer: ${name || "—"} <${email}>`,
      `Phone: ${phone || "—"}`,
      "",
      "Items:",
      linesText,
      "",
      "Delivery:",
      addressText || "—",
      meta.notes ? `\nNotes: ${meta.notes}` : "",
      "",
      `Checkout session: ${session.id}`,
    ].join("\n"),
  };
}

async function expandCheckoutSession(secret, sessionId) {
  const url =
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}` +
    "?expand[]=line_items";
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${secret}` } });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error((data.error && data.error.message) || "Could not load Checkout Session");
  }
  return data;
}

async function notifyZapier(env, payload) {
  const hook = String(env.ZAPIER_WEBHOOK_URL || "").trim();
  if (!hook || !/^https:\/\//i.test(hook)) {
    return { skipped: true, reason: "ZAPIER_WEBHOOK_URL not set" };
  }
  const resp = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await resp.text();
  if (!resp.ok) return { ok: false, status: resp.status, body: text.slice(0, 300) };
  return { ok: true, status: resp.status };
}

async function notifyOwnerEmail(env, payload) {
  const apiKey = String(env.RESEND_API_KEY || "").trim();
  if (!apiKey) return { skipped: true, reason: "RESEND_API_KEY not set" };
  const to = String(env.OWNER_NOTIFY_EMAIL || DEFAULT_OWNER_EMAIL).trim();
  const from = String(env.RESEND_FROM_EMAIL || "Smoke Cali <orders@smokecali.co.uk>").trim();
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: payload.email_subject,
      text: payload.email_body,
    }),
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) return { ok: false, status: resp.status, error: data };
  return { ok: true, id: data.id };
}

async function handleStripeWebhook(request, env) {
  const secrets = webhookSecrets(env);
  if (!secrets.length) {
    return json({ status: "error", message: "Set STRIPE_WEBHOOK_SECRET (whsec_…)." }, 503);
  }
  const rawBody = await request.text();
  const signature = request.headers.get("Stripe-Signature") || "";
  const valid = await verifyStripeSignatureAny(rawBody, signature, secrets);
  if (!valid) {
    return json({ status: "error", message: "Invalid Stripe signature." }, 400);
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ status: "error", message: "Invalid JSON." }, 400);
  }

  try {
    if (event.type !== "checkout.session.completed") {
      return json({ status: "ignored", type: event.type }, 200);
    }
    const sessionStub = event.data && event.data.object;
    if (!sessionStub?.id) return json({ status: "ignored", reason: "missing_session" }, 200);
    if (sessionStub.payment_status && sessionStub.payment_status !== "paid") {
      return json({ status: "ignored", reason: "not_paid" }, 200);
    }

    const apiSecret = stripeSecretForEvent(env, event.livemode);
    let session = sessionStub;
    if (!isPlaceholderKey(apiSecret)) {
      try {
        session = await expandCheckoutSession(apiSecret, sessionStub.id);
      } catch (err) {
        console.error("expand session failed", String(err && err.message ? err.message : err));
      }
    }

    const payload = buildOrderAlert(session);
    const [zapier, email] = await Promise.all([
      notifyZapier(env, payload),
      notifyOwnerEmail(env, payload),
    ]);
    return json({ status: "ok", notified: { zapier, email }, session_id: payload.session_id }, 200);
  } catch (err) {
    console.error("stripe webhook handler error", err);
    return json({ status: "ok", acknowledged: true, processing_error: true }, 200);
  }
}

async function createStripeSession(env, body) {
  const secret = (env.STRIPE_SECRET_KEY || "").trim();
  if (isPlaceholderKey(secret)) {
    return {
      status: 503,
      data: {
        status: "error",
        message: "Stripe is not configured yet. Set STRIPE_SECRET_KEY on the checkout worker.",
      },
    };
  }

  let totals;
  try {
    totals = buildTotals(body.items);
  } catch (err) {
    return { status: 400, data: { status: "error", message: err.message } };
  }

  const email = clean(body.customerEmail || body.email, 160);
  if (!email || !email.includes("@")) {
    return { status: 400, data: { status: "error", message: "Enter a valid email before checkout." } };
  }

  const shippingAddress = normalizeAddress(body.shippingAddress);
  const addressError = validateAddress(shippingAddress);
  if (addressError) {
    return { status: 400, data: { status: "error", message: addressError } };
  }

  const requestedDomain = String(body.domain || env.SITE_URL || "https://smokecali.co.uk").replace(/\/$/, "");
  const domain = ALLOWED_DOMAINS.has(requestedDomain) ? requestedDomain : "https://smokecali.co.uk";
  const notes = clean(body.notes, 400);
  const addressBlock = [
    shippingAddress.name,
    shippingAddress.line1,
    shippingAddress.city,
    shippingAddress.postcode,
    shippingAddress.phone ? `Tel: ${shippingAddress.phone}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("ui_mode", "hosted");
  params.set("success_url", `${domain}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`);
  params.set("cancel_url", `${domain}/checkout/?checkout=cancel`);
  params.set("customer_email", email);
  params.set("payment_intent_data[receipt_email]", email);
  params.set("allow_promotion_codes", "true");
  params.set("billing_address_collection", "required");
  params.set("phone_number_collection[enabled]", "true");
  params.set("metadata[source]", "smoke-cali-site");
  params.set("metadata[ship_name]", shippingAddress.name);
  params.set("metadata[ship_phone]", shippingAddress.phone);
  params.set("metadata[ship_line1]", shippingAddress.line1);
  params.set("metadata[ship_city]", shippingAddress.city);
  params.set("metadata[ship_postcode]", shippingAddress.postcode);
  params.set("metadata[ship_address_full]", addressBlock.slice(0, 450));
  if (notes) params.set("metadata[notes]", notes);

  let idx = 0;
  for (const item of totals.items) {
    const unitAmount = Math.round(item.unitPrice * 100);
    if (unitAmount < 1) continue;
    params.set(`line_items[${idx}][price_data][currency]`, "gbp");
    params.set(`line_items[${idx}][price_data][product_data][name]`, item.title);
    params.set(`line_items[${idx}][price_data][unit_amount]`, String(unitAmount));
    params.set(`line_items[${idx}][quantity]`, String(item.quantity));
    idx += 1;
  }

  const shippingPence = Math.round(totals.shipping * 100);
  if (shippingPence > 0) {
    params.set(`line_items[${idx}][price_data][currency]`, "gbp");
    params.set(`line_items[${idx}][price_data][product_data][name]`, "UK shipping");
    params.set(`line_items[${idx}][price_data][unit_amount]`, String(shippingPence));
    params.set(`line_items[${idx}][quantity]`, "1");
  }

  const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  const data = await resp.json();
  if (!resp.ok) {
    return {
      status: 500,
      data: { status: "error", message: (data.error && data.error.message) || "Stripe session failed." },
    };
  }
  return { status: 200, data: { status: "success", url: data.url, id: data.id } };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (path === "/health" && request.method === "GET") {
      const configured = !isPlaceholderKey((env.STRIPE_SECRET_KEY || "").trim());
      return json(
        {
          status: "ok",
          stripe_configured: configured,
          stripe_key_mode: stripeKeyMode(env.STRIPE_SECRET_KEY),
          stripe_secret_hint: secretKeyHint(env.STRIPE_SECRET_KEY),
          webhook_secret_set: Boolean(String(env.STRIPE_WEBHOOK_SECRET || "").trim()),
        },
        200,
        origin
      );
    }

    if (path === "/api/checkout/config" && request.method === "GET") {
      const configured = !isPlaceholderKey((env.STRIPE_SECRET_KEY || "").trim());
      return json(
        {
          status: "success",
          enabled: configured,
          currency: "GBP",
          shippingFee: SHIPPING_FEE,
          freeShippingOver: FREE_SHIPPING_THRESHOLD,
          message: configured
            ? "Stripe ready. Card checkout opens in a secure window."
            : "Set STRIPE_SECRET_KEY on the checkout worker.",
        },
        200,
        origin
      );
    }

    if (path === "/api/checkout/create" && request.method === "POST") {
      const ip =
        request.headers.get("CF-Connecting-IP") ||
        request.headers.get("X-Forwarded-For") ||
        "unknown";
      if (rateLimited(ip)) {
        return json({ status: "error", message: "Too many checkout attempts. Try again shortly." }, 429, origin);
      }
      let body = {};
      try {
        body = await request.json();
      } catch {
        return json({ status: "error", message: "Invalid JSON body." }, 400, origin);
      }
      const result = await createStripeSession(env, body);
      return json(result.data, result.status, origin);
    }

    if (path === "/api/stripe/webhook") {
      if (request.method === "GET" || request.method === "HEAD") {
        return json(
          {
            status: "ok",
            message: "Stripe webhook endpoint. Use POST from Stripe Dashboard → Webhooks.",
            listen_for: ["checkout.session.completed"],
            webhook_secret_set: Boolean(String(env.STRIPE_WEBHOOK_SECRET || "").trim()),
          },
          200,
          origin
        );
      }
      if (request.method === "POST") return handleStripeWebhook(request, env);
      return json({ status: "error", message: "Use POST from Stripe." }, 405, origin);
    }

    return json({ status: "error", message: "Not found" }, 404, origin);
  },
};
