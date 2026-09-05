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

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-10 lg:pt-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-caption text-ink-faint">{auth.user?.email}</p>
          <h1 className="mt-1 text-h2 font-black tracking-tighter">
            소식 관리
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/new"
            className="btn-lift inline-block border border-ink bg-ink px-5 py-2.5 text-small text-paper transition-colors hover:bg-ink-soft"
          >
            새 글
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="pressable inline-block border border-ink/30 px-5 py-2.5 text-small transition-colors hover:border-mint-link hover:text-mint-link"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 border-y border-ink/10 py-14 text-ink-soft">
          아직 글이 없습니다. 「새 글」로 첫 소식을 올려 주세요.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-start justify-between gap-3 py-4"
            >
              <div className="min-w-0">
                <p className="text-caption tabular-nums text-ink-faint">
                  {formatNewsDate(p.published_on)}
                  {!p.published && (
                    <span className="ml-2 bg-rose/25 px-2 py-0.5 text-caption text-ink">
                      숨김
                    </span>
                  )}
                </p>
                <Link
                  href={`/admin/${p.id}`}
                  className="mt-1 block truncate text-lead font-bold transition-colors hover:text-mint-link"
                >
                  {p.title}
                </Link>
                <p className="mt-0.5 line-clamp-1 text-small text-ink-soft">
                  {p.body}
                </p>
              </div>
              <PostRowActions id={p.id} published={p.published} />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-caption text-ink-faint">
        저장하면 사이트 「소식」에 바로 반영됩니다. 사진은 글당 3장, 5MB 까지.
      </p>
    </div>
  );
}
