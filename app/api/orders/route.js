import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendReceipt } from "@/lib/mailer";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};

export async function GET() {
  return NextResponse.json(db.orders.list(), { headers: CORS });
}

export async function POST(request) {
  const body = await request.json();
  const order = db.orders.insert({ buyer: body.email, productId: body.productId, total: body.total });
  await sendReceipt(body.email, order.id);
  return NextResponse.json(order, { status: 201, headers: CORS });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  db.orders.delete(id);
  return NextResponse.json({ ok: true }, { headers: CORS });
}
