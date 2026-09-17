-- 체험 예약 문의(experience_requests) — 손님이 /visit 폼으로 남기는 접수.
-- 배경: 체험 문의가 전화 한 길뿐이라 영업시간 밖·수업 중 인솔자는 연락을 못 남겼다.
-- 설계: 접수 1테이블. 손님(anon)은 넣기만, 직원(로그인)만 읽고 처리·삭제한다. 공개 읽기는 없다 — 이름·전화가 든 행이다.
-- 적용: 2026-09-12 대시보드 SQL Editor 로 실행(리더). 원장에는 2026-09-17 정리 때 20260912100000 으로 기록.
-- 롤백: drop table public.experience_requests;

create table public.experience_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 40),
  phone       text not null check (phone ~ '^[0-9-]{9,15}$'),
  wanted_on   date,
  people      smallint check (people is null or people between 1 and 200),
  message     text not null default '' check (char_length(message) <= 1000),
  status      text not null default 'new' check (status in ('new', 'done')),
  created_at  timestamptz not null default now()
);

create index experience_requests_status_idx on public.experience_requests (status, created_at desc);

alter table public.experience_requests enable row level security;

-- 손님: 접수만. 읽기 정책이 없으므로 insert 뒤 select 도 막힌다(서버 액션은 .select() 없이 넣는다).
create policy "experience_requests_guest_insert" on public.experience_requests
  for insert to anon, authenticated with check (true);
-- 직원(로그인): 읽고 처리 상태를 바꾸고 지운다.
create policy "experience_requests_staff_read" on public.experience_requests
  for select to authenticated using (true);
create policy "experience_requests_staff_update" on public.experience_requests
  for update to authenticated using (true) with check (true);
create policy "experience_requests_staff_delete" on public.experience_requests
  for delete to authenticated using (true);
