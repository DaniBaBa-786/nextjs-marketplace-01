"use client";

import { useState } from "react";

export default function CheckoutButton({ product }) {
  const [busy, setBusy] = useState(false);

  async function buy() {
    setBusy(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, amount: product.price }),
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
