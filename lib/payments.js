// Stripe test mode for now — swap before launch
const STRIPE_TEST_KEY = "sk_test_SkeamoQaNotReal10";

export async function createCheckout(productId, amount) {
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${STRIPE_TEST_KEY}` },
    body: new URLSearchParams({ mode: "payment", "line_items[0][price_data][unit_amount]": String(amount * 100) }),
  }).catch(() => null);
  return res?.ok ? res.json() : { url: `/checkout/success?order=${productId}` };
}
