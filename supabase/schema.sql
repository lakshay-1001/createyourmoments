
-- Create Your Moments Phase 1 Supabase schema
-- Run this in Supabase SQL Editor after reviewing.
-- These tables match the current frontend integration.

create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  topic text not null,
  message text not null,
  source text default 'website_contact_form',
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.moment_drafts (
  id uuid primary key default gen_random_uuid(),
  template_slug text not null,
  template_title text not null,
  category text not null,
  occasion text,
  sender_name text,
  receiver_name text,
  moment_title text,
  event_date date,
  venue text,
  custom_slug text,
  slug text not null,
  share_url text,
  plan_id text,
  duration_days int,
  amount int,
  form_data jsonb default '{}'::jsonb,
  status text default 'draft',
  created_at timestamptz default now()
);

create unique index if not exists moment_drafts_slug_idx on public.moment_drafts(slug);

create table if not exists public.checkout_leads (
  id uuid primary key default gen_random_uuid(),
  template_slug text,
  category text,
  slug text,
  title text,
  plan_id text,
  amount int,
  duration_days int,
  sender_name text,
  receiver_name text,
  email text,
  phone text,
  whatsapp text,
  status text default 'checkout_started',
  created_at timestamptz default now()
);

-- Later, after Razorpay integration, create actual paid moments and payment rows.
create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  template_slug text not null,
  category text not null,
  slug text not null unique,
  public_code text,
  title text not null,
  sender_name text,
  receiver_name text,
  event_date date,
  venue text,
  duration_days int not null,
  amount int not null,
  status text default 'pending_payment',
  expiry_date timestamptz,
  form_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  moment_id uuid references public.moments(id) on delete set null,
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  amount int not null,
  currency text default 'INR',
  status text default 'pending',
  created_at timestamptz default now()
);

-- Keep RLS enabled. For MVP public form insert, allow anonymous inserts only.
alter table public.contact_messages enable row level security;
alter table public.moment_drafts enable row level security;
alter table public.checkout_leads enable row level security;
alter table public.moments enable row level security;
alter table public.payments enable row level security;

drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages"
on public.contact_messages for insert
to anon
with check (true);

drop policy if exists "Anyone can insert moment drafts" on public.moment_drafts;
create policy "Anyone can insert moment drafts"
on public.moment_drafts for insert
to anon
with check (true);

drop policy if exists "Anyone can insert checkout leads" on public.checkout_leads;
create policy "Anyone can insert checkout leads"
on public.checkout_leads for insert
to anon
with check (true);

-- Public moment read will be enabled after Razorpay activation flow is ready.
-- create policy "Anyone can read active public moments" on public.moments
-- for select to anon using (status = 'active' and (expiry_date is null or expiry_date > now()));
