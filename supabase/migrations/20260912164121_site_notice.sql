-- 공지 띠(site_notice) — 휴무·명절 배송 마감처럼 며칠만 보일 한 줄. 모든 페이지 머리 아래에 뜬다.
-- 배경: 소식 글은 목록에 묻히고, 휴무 안내는 들어온 그 자리에서 보여야 한다.
-- 설계: 행 하나짜리 설정 테이블(id = 1 고정). 손님(anon)은 켜진 것만 읽고, 직원(로그인)만 고친다.
-- 적용: 2026-09-13 Supabase MCP apply_migration 으로 프로덕션에 적용됨 — 원장(supabase_migrations.schema_migrations) 버전 20260912164121.
-- 롤백: drop table public.site_notice;

create table public.site_notice (
  id          smallint primary key default 1 check (id = 1),
  text        text not null default '' check (char_length(text) <= 120),
  enabled     boolean not null default false,
  updated_at  timestamptz not null default now()
);

insert into public.site_notice (id) values (1);

alter table public.site_notice enable row level security;

-- 손님: 켜진 공지만 읽는다(꺼 둔 초안은 안 보인다).
create policy "site_notice_public_read" on public.site_notice
  for select to anon using (enabled);
-- 직원(로그인): 읽고 고친다. 행은 하나뿐이라 insert·delete 정책은 없다.
create policy "site_notice_staff_read" on public.site_notice
  for select to authenticated using (true);
create policy "site_notice_staff_update" on public.site_notice
  for update to authenticated using (true) with check (true);
