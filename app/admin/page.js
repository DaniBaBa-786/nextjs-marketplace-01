"use client";

import { useEffect, useState } from "react";

// Pretend session until sign-in is wired to the cookie
const user = { email: "nora@craftbay.test", role: "seller" };

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then(setOrders);
  }, []);

  async function remove(id) {
    await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
    setOrders(orders.filter((o) => o.id !== id));
  }

  return (
    <main>
      <h1>Orders</h1>
      <table>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.buyer}</td>
              <td>${o.total}</td>
              <td>{o.status}</td>
              <td>{user.role === "admin" && <button onClick={() => remove(o.id)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
