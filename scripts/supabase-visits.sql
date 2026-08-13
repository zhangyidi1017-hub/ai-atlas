-- 在 Supabase Dashboard → SQL Editor 中执行此脚本
-- 用途：匿名访客写入访问记录，仅登录账号可读

create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  view text not null default '',
  path text not null default '',
  referrer text not null default '',
  user_agent text not null default '',
  screen text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists visits_created_at_idx on public.visits (created_at desc);
create index if not exists visits_session_id_idx on public.visits (session_id);
create index if not exists visits_view_idx on public.visits (view);

alter table public.visits enable row level security;

drop policy if exists "anon insert visits" on public.visits;
create policy "anon insert visits"
  on public.visits for insert
  to anon
  with check (true);

drop policy if exists "auth read visits" on public.visits;
create policy "auth read visits"
  on public.visits for select
  to authenticated
  using (true);
