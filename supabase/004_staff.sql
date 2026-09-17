-- 직원 허용 목록(staff) — 「로그인했나」가 아니라 「직원인가」로 관리 권한을 판정한다.
-- 배경: Supabase 회원가입이 켜져 있으면 아무 이메일로 가입한 사람이 authenticated 가 되어
--       소식·문의(이름·전화)·공지·사진 버킷을 전부 만질 수 있었다. 설정 토글 하나에 안전이 걸려 있었다.
-- 설계: staff(email) 한 표 + is_staff() 함수. 모든 직원 정책의 using/with check 를 is_staff() 로 바꾼다.
--       staff 에 넣고 빼는 것은 대시보드·SQL 로만(정책 없음). 로그인 사용자는 자기 행만 읽는다.
-- 보존: 체험 문의(이름·전화)는 접수일부터 90일 뒤 pg_cron 이 지운다(app/privacy 의 보관 기간과 같은 값).
-- 적용: 2026-09-17 Supabase MCP apply_migration 으로 프로덕션에 적용됨(이 파일은 기록용).
-- 롤백: drop function public.is_staff(); drop table public.staff; 정책은 001~003 의 정의로 되돌린다;
--       select cron.unschedule('purge_experience_requests');

create table public.staff (
  email     text primary key check (email = lower(email)),
  added_at  timestamptz not null default now()
);
alter table public.staff enable row level security;
create policy "staff_self_read" on public.staff
  for select to authenticated using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

-- 지금 있는 유일한 계정(테스트용). 대표님 계정이 생기면 그 이메일을 넣고 이 행은 지운다.
insert into public.staff (email) values ('admin@daltokki.test');

-- 소식
drop policy "news_staff_all" on public.news_posts;
create policy "news_staff_all" on public.news_posts
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- 체험 문의
drop policy "experience_requests_staff_read" on public.experience_requests;
drop policy "experience_requests_staff_update" on public.experience_requests;
drop policy "experience_requests_staff_delete" on public.experience_requests;
create policy "experience_requests_staff_read" on public.experience_requests
  for select to authenticated using (public.is_staff());
create policy "experience_requests_staff_update" on public.experience_requests
  for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "experience_requests_staff_delete" on public.experience_requests
  for delete to authenticated using (public.is_staff());

-- 공지 띠
drop policy "site_notice_staff_read" on public.site_notice;
drop policy "site_notice_staff_update" on public.site_notice;
create policy "site_notice_staff_read" on public.site_notice
  for select to authenticated using (public.is_staff());
create policy "site_notice_staff_update" on public.site_notice
  for update to authenticated using (public.is_staff()) with check (public.is_staff());

-- 소식 사진 버킷
drop policy "news_images_staff_write" on storage.objects;
drop policy "news_images_staff_update" on storage.objects;
drop policy "news_images_staff_delete" on storage.objects;
create policy "news_images_staff_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'news' and public.is_staff());
create policy "news_images_staff_update" on storage.objects
  for update to authenticated using (bucket_id = 'news' and public.is_staff());
create policy "news_images_staff_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'news' and public.is_staff());

-- 문의 90일 보존 — 매일 03:20 KST(18:20 UTC)
create extension if not exists pg_cron;
select cron.schedule(
  'purge_experience_requests',
  '20 18 * * *',
  $$ delete from public.experience_requests where created_at < now() - interval '90 days' $$
);
