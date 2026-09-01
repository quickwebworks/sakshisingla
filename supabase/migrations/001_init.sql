-- === LEADS ===
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  goal text not null,
  source text,
  ip inet,
  user_agent text,
  status text not null default 'new' check (status in ('new','contacted','converted','archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_leads_status on public.leads(status);
create index idx_leads_created_at on public.leads(created_at desc);

-- === CLIENTS ===
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  email text unique not null,
  phone text not null,
  goal text,
  plan text,
  started_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','completed','paused','churned')),
  notes text,
  created_at timestamptz not null default now()
);
create index idx_clients_email on public.clients(email);

-- === PAYMENTS ===
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  razorpay_order_id text not null,
  razorpay_payment_id text,
  razorpay_signature text,
  plan text not null,
  amount_paise integer not null,             -- store in paise (₹1 = 100)
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created','paid','failed','refunded')),
  metadata jsonb,
  created_at timestamptz not null default now(),
  verified_at timestamptz
);
create index idx_payments_status on public.payments(status);

-- === ROW LEVEL SECURITY ===
alter table public.leads   enable row level security;
alter table public.clients enable row level security;
alter table public.payments enable row level security;

-- Public can INSERT leads (anon role, validated server-side)
create policy "public_insert_leads" on public.leads
  for insert to anon, authenticated with check (true);

-- Everything else is service-role only.
-- (API routes use service role key, bypassing RLS safely server-side.)

-- === UPDATED_AT TRIGGER ===
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();