import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing required environment variable: STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe calls this when a checkout completes
export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const orderId = event.data.object.metadata?.orderId;
    db.orders.update(orderId, { status: "paid" });
  }
  return NextResponse.json({ received: true });
}
