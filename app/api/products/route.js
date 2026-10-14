import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json(db.products.list());
}

// Sellers list a new product
export async function POST(request) {
  const body = await request.json();
  const product = db.products.insert({ seller: body.seller, name: body.name, price: body.price });
  return NextResponse.json(product, { status: 201 });
}

export async function DELETE(request) {
  db.products.delete(request.nextUrl.searchParams.get("id"));
  return NextResponse.json({ ok: true });
}
