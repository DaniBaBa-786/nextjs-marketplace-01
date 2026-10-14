import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const rows = db.query(`SELECT * FROM products WHERE name LIKE '%${q}%'`);
  return NextResponse.json(rows);
}
