# CraftBay

A marketplace for handmade goods. Sellers list products, buyers check out with Stripe, and an admin page manages orders. Built with **Next.js 14** (App Router), with Supabase tables in `supabase/schema.sql`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Next reads `PORT` if it is set. Runs with no environment variables — data is kept in memory while the Supabase connection is being built.

## Environment (for production)

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin dashboard |

## Routes

| Method | Path | What it does |
|---|---|---|
| GET/POST/DELETE | `/api/orders` | List, place and cancel orders |
| GET | `/api/orders/:id` | One order's details |
| GET/POST/DELETE | `/api/products` | List, add and remove products |
| GET | `/api/search?q=` | Search products |
| POST | `/api/login` | Sign in |
| POST | `/api/webhooks/stripe` | Stripe payment events |

---

<sub>Test fixture for Skeamo QA. It contains deliberate problems — do not deploy it.</sub>
