-- 숨긴 소식의 사진 — 비공개 버킷(news-hidden).
-- 배경: 글을 「숨기기」해도 사진은 공개 버킷(news)에 그대로라 URL 을 아는 사람은 계속 볼 수 있었다.
-- 설계: 같은 경로로 news ↔ news-hidden 사이를 옮긴다(숨기면 비공개로, 게시하면 공개로). 직원만 읽고 쓴다.
--       관리 화면은 서명 URL 로 미리보기를 낸다. 게시된 글의 사진은 계속 공개 버킷이라 손님 쪽은 바뀌지 않는다.
-- 적용: 2026-09-17 Supabase MCP apply_migration — 원장 버전 20260917051948.
-- 롤백: 정책 넷 drop 후 delete from storage.buckets where id = 'news-hidden' (안의 객체를 먼저 news 로 옮길 것).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-hidden', 'news-hidden', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "news_hidden_staff_read" on storage.objects
  for select to authenticated using (bucket_id = 'news-hidden' and public.is_staff());
create policy "news_hidden_staff_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'news-hidden' and public.is_staff());
create policy "news_hidden_staff_update" on storage.objects
  for update to authenticated using (bucket_id = 'news-hidden' and public.is_staff());
create policy "news_hidden_staff_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'news-hidden' and public.is_staff());
