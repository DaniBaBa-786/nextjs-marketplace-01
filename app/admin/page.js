import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AdminOrders from "@/components/AdminOrders";

function getSession() {
  const raw = cookies().get("user")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const dynamic = "force-dynamic";

// Server component: the admin role is verified here, on the server, before
// any admin data or controls are sent to the browser.
export default function Admin() {
  const session = getSession();
  if (!session || session.role !== "admin") {
    redirect("/");
  }

  const orders = db.orders.list();

  return (
    <main>
      <h1>Orders</h1>
      <AdminOrders initialOrders={orders} />
    </main>
  );
}
