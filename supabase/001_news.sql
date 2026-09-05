-- 소식(news) — 직원이 관리 화면에서 쓰는 글.
-- 배경: 사이트는 정적이라 저장소·로그인이 없었다. 직원이 휴무·신제품·행사를 직접 올리기로 함.
-- 설계: 글 1테이블 + 이미지 버킷. 읽기는 게시된 글만 누구나, 쓰기는 로그인한 직원만.
-- 롤백: drop table public.news_posts; delete from storage.buckets where id = 'news';

create table public.news_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 80),
  body        text not null default '' check (char_length(body) <= 4000),
  published_on date not null default (now() at time zone 'Asia/Seoul')::date,
  published   boolean not null default true,
  images      text[] not null default '{}' check (array_length(images, 1) is null or array_length(images, 1) <= 3),
  link_url    text check (link_url is null or link_url ~ '^https?://'),
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index news_posts_public_idx on public.news_posts (published, published_on desc, created_at desc);

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger news_posts_updated_at before update on public.news_posts
  for each row execute function public.set_updated_at();

alter table public.news_posts enable row level security;

-- 누구나: 게시된 글만
create policy "news_public_read" on public.news_posts
  for select to anon, authenticated using (published);
-- 직원(로그인): 전부 읽고 쓰고 지운다. 계정은 대시보드에서만 만든다(회원가입 없음).
create policy "news_staff_all" on public.news_posts
  for all to authenticated using (true) with check (true);

-- 이미지 버킷: 공개 읽기, 직원만 업로드·삭제. 5MB · 이미지 타입만.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news', 'news', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "news_images_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'news');
create policy "news_images_staff_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'news');
create policy "news_images_staff_update" on storage.objects
  for update to authenticated using (bucket_id = 'news');
create policy "news_images_staff_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'news');
