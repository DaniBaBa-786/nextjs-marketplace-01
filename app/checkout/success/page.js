import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Stripe redirects here after payment
export default function Success({ searchParams }) {
  const order = db.orders.update(searchParams.order, { status: "paid" });
  return (
    <main>
      <h1>Thank you!</h1>
      <p>Order #{order.id ?? searchParams.order} is paid. A receipt is on its way.</p>
    </main>
  );
}
