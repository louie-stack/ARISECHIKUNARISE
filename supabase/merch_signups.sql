-- Merch teaser email capture.
-- Paste into: Supabase Dashboard → SQL Editor → New query → Run.

create table if not exists public.merch_signups (
  id          bigserial primary key,
  email       text       not null unique,
  created_at  timestamptz not null default now()
);

create index if not exists merch_signups_created_idx
  on public.merch_signups (created_at desc);

alter table public.merch_signups enable row level security;

-- Anon visitors can insert their own email but cannot read the list back.
-- The format check stops obvious garbage before it reaches the table.
drop policy if exists "merch_signups insert" on public.merch_signups;
create policy "merch_signups insert"
  on public.merch_signups for insert
  to anon, authenticated
  with check (
    char_length(email) between 5 and 254
    and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- No select policy = anon/authenticated cannot read. Only the service role
-- (Supabase dashboard, server-side) can list signups.
