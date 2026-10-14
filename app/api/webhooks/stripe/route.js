import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Stripe calls this when a checkout completes
export async function POST(request) {
  const event = await request.json();
  if (event.type === "checkout.session.completed") {
    const orderId = event.data.object.metadata?.orderId;
    db.orders.update(orderId, { status: "paid" });
  }
  return NextResponse.json({ received: true });
}
