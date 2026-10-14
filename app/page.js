import { db } from "@/lib/db";
import CheckoutButton from "@/components/CheckoutButton";

export const dynamic = "force-dynamic";

export default function Home() {
  const products = db.products.list();
  return (
    <main>
      <h1>CraftBay</h1>
      <p>Handmade goods from independent makers.</p>
      <form action="/api/search" method="get" style={{ margin: "16px 0" }}>
        <input name="q" placeholder="Search products" /> <button>Search</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ background: "#fff", padding: 12, margin: "8px 0", borderRadius: 8 }}>
            <strong>{p.name}</strong> by {p.seller} — ${p.price} <CheckoutButton product={p} />
          </li>
        ))}
      </ul>
    </main>
  );
}
