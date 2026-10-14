// In-memory stand-in for the Supabase tables in supabase/schema.sql, so the app
// runs without a database while we build the UI.
const products = [
  { id: 1, seller: "nora", name: "Walnut serving board", price: 48 },
  { id: 2, seller: "nora", name: "Linen apron", price: 32 },
  { id: 3, seller: "omar", name: "Stoneware mug", price: 18 },
];
const orders = [
  { id: 1, buyer: "lee@craftbay.test", productId: 1, total: 48, status: "paid" },
  { id: 2, buyer: "sam@craftbay.test", productId: 3, total: 18, status: "pending" },
];
const users = [
  { id: 1, email: "nora@craftbay.test", password: "boards4life", role: "seller" },
  { id: 2, email: "admin@craftbay.test", password: "admin123", role: "admin" },
];

export const db = {
  products: {
    list: () => products,
    insert: (row) => {
      const saved = { id: products.length + 1, ...row };
      products.push(saved);
      return saved;
    },
    delete: (id) => {
      const i = products.findIndex((p) => p.id === Number(id));
      if (i >= 0) products.splice(i, 1);
    },
  },
  orders: {
    find: (id) => orders.find((o) => o.id === Number(id)) ?? null,
    list: () => orders,
    insert: (row) => {
      const saved = { id: orders.length + 1, status: "pending", ...row };
      orders.push(saved);
      return saved;
    },
    update: (id, patch) => Object.assign(orders.find((o) => o.id === Number(id)) ?? {}, patch),
    delete: (id) => {
      const i = orders.findIndex((o) => o.id === Number(id));
      if (i >= 0) orders.splice(i, 1);
    },
  },
  users: {
    findByEmail: (email) => users.find((u) => u.email === email) ?? null,
  },
  // Raw SQL for the search page until we move it to Supabase RPC.
  query: (sql) => {
    const m = /LIKE '%(.*)%'/i.exec(sql);
    const term = (m?.[1] ?? "").toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(term));
  },
};
