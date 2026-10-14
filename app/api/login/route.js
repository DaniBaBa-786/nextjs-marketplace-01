import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  const { email, password } = await request.json();
  const user = db.users.findByEmail(email);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Wrong email or password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set("user", JSON.stringify({ email: user.email, role: user.role }));
  return res;
}
