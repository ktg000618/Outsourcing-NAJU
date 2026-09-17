-- 원장 정리 — 대시보드 SQL Editor 로 실행했던 두 파일(소식·예약 문의)을 원장에 기록한다.
-- 배경: 001·002 는 CLI 없이 대시보드에서 실행해 supabase_migrations.schema_migrations 에 없었다.
--       그대로 두면 `supabase db push` 가 이미 있는 표를 다시 만들려다 실패한다.
-- 설계: 파일명의 버전과 같은 값을 넣는다. 스키마는 건드리지 않는다.
-- 적용: 2026-09-17 Supabase MCP apply_migration — 원장 버전 20260917051334.
-- 롤백: delete from supabase_migrations.schema_migrations where version in ('20260905101500','20260912100000');
insert into supabase_migrations.schema_migrations (version, name, statements)
values
  ('20260905101500', 'news', array['-- applied via dashboard SQL editor on 2026-09-05; ledger entry added 2026-09-17']),
  ('20260912100000', 'experience_requests', array['-- applied via dashboard SQL editor on 2026-09-12; ledger entry added 2026-09-17'])
on conflict (version) do nothing;
