import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NEWS_SELECT, formatNewsDate, type NewsPost } from "@/lib/news";
import { PostRowActions } from "@/components/admin/post-row-actions";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "소식 관리",
  robots: { index: false, follow: false },
};

/** 직원용 목록. 게시·숨김 모두 보인다(RLS: authenticated 는 전부). */
export default async function AdminPage() {
  const supabase = await createClient();
  const [{ data }, { data: auth }] = await Promise.all([
    supabase
      .from("news_posts")
      .select(NEWS_SELECT)
      .order("published_on", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const posts = (data ?? []) as NewsPost[];
  const publishedCount = posts.filter((p) => p.published).length;
  const hiddenCount = posts.length - publishedCount;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-10 lg:pt-14">
      {/* 머리: 누가 들어왔고, 무엇을 할 수 있나 */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-caption text-ink-faint">
            소식 관리 · {auth.user?.email}
          </p>
          <h1 className="mt-1 text-h2 font-black tracking-tighter">소식</h1>
          <p className="mt-1 text-small text-ink-soft">
            게시 {publishedCount}
            {hiddenCount > 0 && ` · 숨김 ${hiddenCount}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/new"
            className="btn-lift inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-small text-paper transition-colors hover:bg-ink-soft"
          >
            <span aria-hidden className="text-lead font-thin leading-none">
              +
            </span>
            새 글
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="pressable inline-block border border-ink/25 px-4 py-2.5 text-small text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink/30 px-6 py-14 text-center">
          <p className="text-lead font-bold">아직 글이 없습니다</p>
          <p className="mt-2 text-small text-ink-soft">
            휴무·신제품·행사 소식을 올리면 사이트 「소식」에 바로 보입니다.
          </p>
          <Link
            href="/admin/new"
            className="btn-lift mt-6 inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
          >
            첫 소식 쓰기
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
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
                    src={p.images[0]}
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
                <PostRowActions id={p.id} published={p.published} />
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
