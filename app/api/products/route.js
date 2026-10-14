import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
  return NextResponse.json(db.products.list());
}

// Sellers list a new product
export async function POST(request) {
  const session = getSession(request);
  if (!session || (session.role !== "seller" && session.role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (session.role === "seller" && body.seller !== session.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const product = db.products.insert({ seller: body.seller, name: body.name, price: body.price });
  return NextResponse.json(product, { status: 201 });
}

export async function DELETE(request) {
  const session = getSession(request);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  db.products.delete(request.nextUrl.searchParams.get("id"));
  return NextResponse.json({ ok: true });
}
