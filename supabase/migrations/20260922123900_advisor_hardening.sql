-- 어드바이저 경고 둘 정리 — 동작은 바뀌지 않는다.
-- 배경: 2026-09-22 Supabase 보안·성능 어드바이저 한 번 돌린 결과.
--   ① public.rls_auto_enable() — Supabase 가 새 표에 RLS 를 자동으로 켜 주려고 둔 이벤트 트리거 함수(SECURITY DEFINER)인데
--      anon·authenticated 가 EXECUTE 권한을 갖고 있었다. 이벤트 트리거 함수라 REST 로 부를 수는 없지만 권한은 걷어 둔다.
--   ② staff_self_read 정책이 auth.jwt() 를 행마다 다시 계산했다 — (select …) 로 감싸 한 번만 계산한다.
-- 남긴 것(의도된 경고): is_staff() 가 authenticated 에게 EXECUTE 허용 — 로그인 폼·proxy 가 rpc 로 부른다.
--   news_posts 의 authenticated SELECT 정책 둘(공개 읽기 + 직원 전체) — 설계다.
-- 적용: 2026-09-22 Supabase MCP apply_migration — 원장 버전 20260922123900. 적용 뒤 어드바이저 재확인: 두 경고 사라짐.
-- 롤백: grant execute on function public.rls_auto_enable() to public; 정책은 20260917031522 의 정의로 되돌린다.

revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

drop policy "staff_self_read" on public.staff;
create policy "staff_self_read" on public.staff
  for select to authenticated
  using (email = lower(coalesce((select auth.jwt()) ->> 'email', '')));
