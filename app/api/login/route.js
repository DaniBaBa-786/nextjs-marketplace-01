import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple in-memory rate limiter for the login endpoint, keyed by IP and by
// the attempted account email. Not shared across instances, but enough to
// slow down brute-force attempts against a single server.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000;
const attempts = new Map();

function isLimited(key) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request) {
  const { email, password } = await request.json();

  const ip = getClientIp(request);
  const ipKey = `ip:${ip}`;
  const accountKey = `account:${(email || "").toLowerCase()}`;

  if (isLimited(ipKey) || isLimited(accountKey)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  const user = db.users.findByEmail(email);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Wrong email or password" }, { status: 401 });
  }

  attempts.delete(ipKey);
  attempts.delete(accountKey);

  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set("user", JSON.stringify({ email: user.email, role: user.role }));
  return res;
}
