import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Order details for the buyer's receipt page
export async function GET(_request, { params }) {
  const order = db.orders.find(params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
