import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import { NEWS_SELECT, formatNewsDate, type NewsPost } from "@/lib/news";
import { previewUrls } from "@/lib/news-images";
import { PostRowActions } from "@/components/admin/post-row-actions";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "소식 관리",
  robots: { index: false, follow: false },
};

/** 직원용 목록. 게시·숨김 모두 보인다(RLS: authenticated 는 전부). */
export default async function AdminPage() {
  const supabase = await createClient();
  const [{ data }, { count: newRequests }, { data: auth }, { data: notice }] =
    await Promise.all([
      supabase
        .from("news_posts")
        .select(NEWS_SELECT)
        .order("published_on", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("experience_requests")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.auth.getUser(),
      supabase.from("site_notice").select("enabled").eq("id", 1).maybeSingle(),
    ]);
  const posts = (data ?? []) as NewsPost[];
  /* 숨긴 글의 사진은 비공개 버킷이라 서명 URL 로 바꿔야 보인다. 첫 장만 쓴다. */
  const previews = await previewUrls(
    supabase,
    posts.map((p) => p.images[0]).filter(Boolean),
  );
  const publishedCount = posts.filter((p) => p.published).length;
  const hiddenCount = posts.length - publishedCount;

  return (
    <div className="page-top page-bottom mx-auto max-w-4xl px-5 lg:px-8">
      {/* 머리: 누가 들어왔고, 무엇을 할 수 있나 */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionEyebrow phase={0.1}>
            소식 관리 · {auth.user?.email}
          </SectionEyebrow>
          <h1 className="mt-3 text-h1 lg:text-h2-lg">
            <span className="font-thin tracking-tight">올린 </span>
            <span className="font-black tracking-tighter">소식</span>
          </h1>
          <p className="mt-1 text-small text-ink-soft">
            게시 {publishedCount}
            {hiddenCount > 0 && ` · 숨김 ${hiddenCount}`}
          </p>
        </div>
        {/* 폰에서는 제목 아래로 내려와 한 줄에 못 들어가면 항목 단위로만 접는다 — 단어 중간에서 끊기지 않게. */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/admin/new"
            className="btn-primary btn-primary-sm whitespace-nowrap"
          >
            <span aria-hidden className="text-lead font-thin leading-none">
              +
            </span>
            새 글
          </Link>
          <Link href="/admin/requests" className="text-link whitespace-nowrap">
            예약 문의 {newRequests ?? 0}건
          </Link>
          <Link href="/admin/notice" className="text-link whitespace-nowrap">
            공지 띠 {notice?.enabled ? "켜짐" : "꺼짐"}
          </Link>
          <Link href="/news" className="text-link whitespace-nowrap">
            사이트에서 보기
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-link whitespace-nowrap">
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 max-w-3xl border border-dashed border-ink/20 px-6 py-14 text-center lg:mt-12">
          <p className="text-lead font-bold">아직 글이 없습니다</p>
          <p className="mt-2 text-small text-ink-soft">
            휴무·신제품·행사 소식을 올리면 사이트 「소식」에 바로 보입니다.
          </p>
          <Link href="/admin/new" className="btn-primary mt-6">
            첫 소식 쓰기
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10 lg:mt-12">
          {posts.map((p) => (
            <li
              key={p.id}
              className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center ${
                p.published ? "" : "opacity-70"
              }`}
            >
              {/* 썸네일 — 사진이 없으면 같은 크기의 빈 칸으로 열을 맞춘다 */}
              <Link
                href={`/admin/${p.id}`}
                aria-hidden
                tabIndex={-1}
                className="relative block size-16 shrink-0 overflow-hidden bg-paper-2"
              >
                {p.images[0] && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={previews[p.images[0]] ?? p.images[0]}
                    alt=""
                    className="size-full object-cover"
                  />
                )}
              </Link>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-caption tabular-nums text-ink-faint">
                  {formatNewsDate(p.published_on)}
                  {!p.published && (
                    <span className="bg-ink/8 px-1.5 py-0.5 text-caption text-ink-soft">
                      숨김
                    </span>
                  )}
                  {p.images.length > 1 && <span>· 사진 {p.images.length}</span>}
                </p>
                <Link
                  href={`/admin/${p.id}`}
                  className="mt-1 block truncate text-lead font-bold transition-colors hover:text-mint-link"
                >
                  {p.title}
                </Link>
                {p.body && (
                  <p className="mt-0.5 truncate text-small text-ink-soft">
                    {p.body}
                  </p>
                )}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <PostRowActions
                  id={p.id}
                  published={p.published}
                  url={`${site.url}/news/${p.id}`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-caption text-ink-faint">
        제목을 누르면 수정. 저장하면 사이트 「소식」에 바로 반영됩니다. 사진은
        글당 3장, 5MB 까지.
      </p>
    </div>
  );
}
