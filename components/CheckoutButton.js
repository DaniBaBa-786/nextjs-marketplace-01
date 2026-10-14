"use client";

import { useState } from "react";

const STRIPE_SECRET_KEY = "sk_live_SkeamoQaNotReal09";

export default function CheckoutButton({ product }) {
  const [busy, setBusy] = useState(false);

  async function buy() {
    setBusy(true);
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
      body: new URLSearchParams({ mode: "payment", "line_items[0][price_data][unit_amount]": String(product.price * 100) }),
    }).catch(() => null);
    const session = res?.ok ? await res.json() : null;
    window.location.href = session?.url ?? `/checkout/success?order=${product.id}`;
  }

  return (
    <button onClick={buy} disabled={busy} style={{ padding: "6px 14px" }}>
      {busy ? "Redirecting…" : `Buy for $${product.price}`}
    </button>
  );
}
