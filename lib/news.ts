import { createPublicClient } from "@/lib/supabase/server";

/** 소식 한 건. DB 행과 같은 모양 — 관리 화면·공개 화면이 같은 계약을 쓴다. */
export type NewsPost = {
  id: string;
  title: string;
  body: string;
  /** YYYY-MM-DD (KST 기준 날짜) */
  published_on: string;
  published: boolean;
  images: string[];
  link_url: string | null;
  created_at: string;
  updated_at: string;
};

export const NEWS_SELECT =
  "id, title, body, published_on, published, images, link_url, created_at, updated_at";

/** 환경변수가 없으면(키를 아직 안 넣은 배포) 빈 목록 — 빌드가 죽지 않게. */
export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** 게시된 글, 최신순. 공개 화면 전용(anon). */
export async function getPublishedPosts(limit = 50): Promise<NewsPost[]> {
  if (!hasSupabaseEnv()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select(NEWS_SELECT)
    .eq("published", true)
    .order("published_on", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[news] getPublishedPosts", error.message);
    return [];
  }
  return (data ?? []) as NewsPost[];
}

/** "2026. 9. 5. (토)" — 직원·손님 모두 읽는 한국식 날짜. */
export function formatNewsDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getUTCDay()];
  return `${y}. ${m}. ${d}. (${weekday})`;
}
