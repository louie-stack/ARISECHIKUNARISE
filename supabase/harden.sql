-- Tightens leaderboard CHECK bounds so a bot can't squat #1 with score=99999999.
-- Paste into: Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to run on a live table; it only replaces the INSERT policy.

drop policy if exists "leaderboard insert" on public.leaderboard;
create policy "leaderboard insert"
  on public.leaderboard for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 12
    and name ~ '^[A-Z0-9 _.\-]+$'
    and score >= 0 and score <= 100000
    and coins >= 0 and coins <= 100000
    and towers >= 0 and towers <= 10000
    and zone between 1 and 99
  );
