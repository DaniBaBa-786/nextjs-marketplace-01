"use client";

import { useState } from "react";

// Access control already happened server-side in app/admin/page.js before
// this component (and its data) were ever sent to the browser.
export default function AdminOrders({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  async function remove(id) {
    await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
    setOrders(orders.filter((o) => o.id !== id));
  }

  return (
    <table>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>#{o.id}</td>
            <td>{o.buyer}</td>
            <td>${o.total}</td>
            <td>{o.status}</td>
            <td><button onClick={() => remove(o.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}