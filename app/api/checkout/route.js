import { NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing required environment variable: STRIPE_SECRET_KEY");
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Creates a Stripe Checkout Session server-side so the secret key never reaches the browser
export async function POST(request) {
  const { productId, amount } = await request.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      { price_data: { currency: "usd", unit_amount: Math.round(amount * 100), product_data: { name: `Product #${productId}` } }, quantity: 1 },
    ],
    metadata: { orderId: String(productId) },
    success_url: `${process.env.APP_ORIGIN}/checkout/success?order=${productId}`,
    cancel_url: `${process.env.APP_ORIGIN}/`,
  }).catch(() => null);

  return NextResponse.json(session ?? {}, { status: session ? 201 : 502 });
}