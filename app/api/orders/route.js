import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendReceipt } from "@/lib/mailer";

const APP_ORIGIN = process.env.APP_ORIGIN;
if (!APP_ORIGIN) {
  throw new Error("Missing required environment variable: APP_ORIGIN");
}

const CORS = {
  "Access-Control-Allow-Origin": APP_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};

function getSession(request) {
  const raw = request.cookies.get("user")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function GET() {
  return NextResponse.json(db.orders.list(), { headers: CORS });
}

export async function POST(request) {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });
  }
  const body = await request.json();
  const order = db.orders.insert({ buyer: body.email, productId: body.productId, total: body.total });
  await sendReceipt(body.email, order.id);
  return NextResponse.json(order, { status: 201, headers: CORS });
}

export async function DELETE(request) {
  const session = getSession(request);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS });
  }
  const id = request.nextUrl.searchParams.get("id");
  db.orders.delete(id);
  return NextResponse.json({ ok: true }, { headers: CORS });
}
