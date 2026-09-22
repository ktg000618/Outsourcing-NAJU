import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 소식 사진의 두 집 — 게시 중이면 공개 버킷(news), 숨긴 글이면 비공개 버킷(news-hidden).
 * 경로(uuid.ext)는 같고 버킷만 오간다. 행에는 그때그때의 URL 을 저장한다:
 *   공개  …/storage/v1/object/public/news/<path>
 *   비공개 …/storage/v1/object/authenticated/news-hidden/<path>  (로그인 헤더가 있어야 열린다)
 * 화면은 접두로 어느 쪽인지 안다. 우리 버킷 URL 이 아니면 저장하지 않는다 — 다른 호스트가 들어오면
 * next/image 가 /news 렌더에서 throw 해 공개 페이지가 죽는다.
 */
const OBJECT_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object`;
export const NEWS_PUBLIC_PREFIX = `${OBJECT_BASE}/public/news/`;
export const NEWS_HIDDEN_PREFIX = `${OBJECT_BASE}/authenticated/news-hidden/`;

type Bucket = "news" | "news-hidden";

export function imageBucket(url: string): Bucket | null {
  if (url.startsWith(NEWS_PUBLIC_PREFIX)) return "news";
  if (url.startsWith(NEWS_HIDDEN_PREFIX)) return "news-hidden";
  return null;
}

export const isOurImage = (url: string) => imageBucket(url) !== null;

export function imagePath(url: string): string {
  const bucket = imageBucket(url);
  const prefix =
    bucket === "news-hidden" ? NEWS_HIDDEN_PREFIX : NEWS_PUBLIC_PREFIX;
  return decodeURIComponent(url.slice(prefix.length));
}

const urlFor = (bucket: Bucket, path: string) =>
  (bucket === "news" ? NEWS_PUBLIC_PREFIX : NEWS_HIDDEN_PREFIX) +
  encodeURIComponent(path);

/**
 * 사진을 글의 게시 상태에 맞는 버킷으로 옮기고, 새 URL 목록을 돌려준다.
 * 옮기기에 실패한 사진은 원래 URL 을 그대로 둔다 — 참조를 잃는 것보다 한쪽에 남는 편이 낫고, 콘솔에 남긴다.
 */
export async function syncImageVisibility(
  supabase: SupabaseClient,
  images: string[],
  published: boolean,
): Promise<string[]> {
  const to: Bucket = published ? "news" : "news-hidden";
  return Promise.all(
    images.map(async (url) => {
      const from = imageBucket(url);
      if (!from || from === to) return url;
      const path = imagePath(url);
      const { error } = await supabase.storage
        .from(from)
        .move(path, path, { destinationBucket: to });
      if (error) {
        console.error(
          "[admin] syncImageVisibility",
          from,
          "→",
          to,
          path,
          error.message,
        );
        return url;
      }
      return urlFor(to, path);
    }),
  );
}

/** 글에서 빠진 사진은 버킷에서도 지운다 — 어느 버킷에 있든. */
export async function removeImages(supabase: SupabaseClient, urls: string[]) {
  const byBucket: Record<Bucket, string[]> = { news: [], "news-hidden": [] };
  for (const url of urls) {
    const bucket = imageBucket(url);
    if (bucket) byBucket[bucket].push(imagePath(url));
  }
  for (const bucket of Object.keys(byBucket) as Bucket[]) {
    if (byBucket[bucket].length === 0) continue;
    const { error } = await supabase.storage
      .from(bucket)
      .remove(byBucket[bucket]);
    if (error) console.error("[admin] removeImages", bucket, error.message);
  }
}

/**
 * 관리 화면 미리보기 — 비공개 버킷의 사진은 <img src> 로 못 여니 한 시간짜리 서명 URL 로 바꿔 준다.
 * 공개 사진은 그대로. 돌려주는 맵은 { 저장된 URL: 보여줄 URL }.
 */
export async function previewUrls(
  supabase: SupabaseClient,
  urls: string[],
): Promise<Record<string, string>> {
  const hidden = [
    ...new Set(urls.filter((u) => imageBucket(u) === "news-hidden")),
  ];
  const out: Record<string, string> = {};
  if (hidden.length === 0) return out;
  const { data, error } = await supabase.storage
    .from("news-hidden")
    .createSignedUrls(hidden.map(imagePath), 3600);
  if (error || !data) {
    if (error) console.error("[admin] previewUrls", error.message);
    return out;
  }
  data.forEach((d, i) => {
    if (d.signedUrl) out[hidden[i]] = d.signedUrl;
  });
  return out;
}

/**
 * 고아 사진 정리 — 글쓰기 중에 올리고 저장하지 않은 사진은 어느 글에도 안 붙은 채 버킷에 남는다.
 * 저장할 때마다 두 버킷을 훑어, 어떤 글도 참조하지 않고 하루가 지난 파일을 지운다.
 * 하루의 여유는 다른 탭에서 지금 쓰는 중인 글의 사진을 지우지 않기 위해서다.
 * 저장 자체를 막지 않도록 실패는 콘솔에만 남긴다.
 */
const ORPHAN_MIN_AGE_MS = 24 * 60 * 60 * 1000;

export async function sweepOrphanImages(supabase: SupabaseClient) {
  const { data: rows, error } = await supabase
    .from("news_posts")
    .select("images");
  if (error) {
    console.error("[admin] sweepOrphanImages posts", error.message);
    return;
  }
  const referenced = new Set<string>();
  for (const row of rows ?? [])
    for (const url of (row.images as string[] | null) ?? [])
      if (isOurImage(url)) referenced.add(imagePath(url));

  const cutoff = Date.now() - ORPHAN_MIN_AGE_MS;
  for (const bucket of ["news", "news-hidden"] as Bucket[]) {
    const { data: objects, error: listError } = await supabase.storage
      .from(bucket)
      .list("", { limit: 1000 });
    if (listError) {
      console.error(
        "[admin] sweepOrphanImages list",
        bucket,
        listError.message,
      );
      continue;
    }
    const orphans = (objects ?? [])
      .filter(
        (o) =>
          o.id &&
          !referenced.has(o.name) &&
          o.created_at &&
          new Date(o.created_at).getTime() < cutoff,
      )
      .map((o) => o.name);
    if (orphans.length === 0) continue;
    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove(orphans);
    if (removeError)
      console.error(
        "[admin] sweepOrphanImages remove",
        bucket,
        removeError.message,
      );
  }
}
