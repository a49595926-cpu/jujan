/*
# Create order_inquiries table

Persian Treasures is a single-tenant e-commerce storefront with no sign-in.
Visitors submit checkout/inquiry forms that are stored for the store owner to
review and fulfill via USDT (cryptocurrency) payment.

1. New Tables
- `order_inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the customer
  - `email` (text, not null) — contact email
  - `telegram` (text) — optional Telegram handle
  - `items` (jsonb, not null) — array of cart items {productId, name, qty, price}
  - `total_usd` (numeric, not null) — total order value in USD
  - `message` (text) — optional note from the customer
  - `status` (text, default 'pending') — pending / confirmed / shipped / cancelled
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `order_inquiries`.
- The storefront has no login, so the anon-key client must be able to INSERT
  new inquiries. Reads/updates/deletes are owner-only operations done via the
  Supabase dashboard (service role), so only INSERT is opened to anon here.
- Allow anon + authenticated INSERT (anyone can submit an inquiry).
- No SELECT / UPDATE / DELETE policies for anon — inquiries are private to the
  store owner, who accesses them through the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS order_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  telegram text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_usd numeric(10, 2) NOT NULL DEFAULT 0,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE order_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON order_inquiries;
CREATE POLICY "anon_insert_inquiries"
ON order_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);
