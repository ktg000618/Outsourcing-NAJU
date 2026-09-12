import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ViewTransition } from "react";
import { SectionHead } from "@/components/section-head";
import Link from "next/link";
import { NewsPhoto } from "@/components/news-photo";
import { newsExcerpt } from "@/components/news-text";
import { formatNewsDate, getPublishedPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "소식",
  description: `${site.name}의 휴무·신제품·행사 소식.`,
  alternates: {
    canonical: "/news",
    types: { "application/rss+xml": "/news/feed.xml" },
  },
};

/** 직원이 /admin 에서 쓴 글. 저장 시 revalidatePath 로 바로 갱신되고, 그 밖엔 1시간 캐시. */
export const revalidate = 3600;

const PER_PAGE = 10;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = await getPublishedPosts();
  const { page: pageParam } = await searchParams;
  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const page = Math.min(pageCount, Math.max(1, Number(pageParam) || 1));
  const pagePosts = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/* 형제 페이지와 같은 문법 — 1152 컨테이너, 달 위상, 88px Thin/Black. 이 페이지만 밖에 있었다. */}
      <div className="page-top page-bottom mx-auto max-w-6xl px-5 lg:px-8">
        {/* 이 페이지의 유일한 눈썹이라 보름(1). */}
        <SectionHead
          as="h1"
          phase={1}
          eyebrow="소식"
          title={{ thin: "떡집의", black: "소식" }}
          lead="휴무와 신제품, 행사 소식을 이곳에 올립니다."
        />

        {posts.length === 0 ? (
          /* 빈 상태는 본문 한 줄 — 페이지 제목 아래 두 번째 제목을 세우지 않는다. 소식은 인스타에 먼저 올라간다. */
          <div className="mt-14 border-t border-ink/10 pt-10 lg:mt-20 lg:pt-14">
            <p className="max-w-prose text-body text-ink-soft">
              아직 올라온 소식이 없습니다. 새 소식은 인스타그램에 먼저 올리고,
              급한 문의는 전화가 가장 빠릅니다.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="btn-primary"
                >
                  인스타그램에서 보기<span className="sr-only"> (새 창)</span>
                </a>
              )}
              <a
                aria-label={`전화 걸기 ${site.tel}`}
                href={site.telHref}
                className="text-link"
              >
                전화 {site.tel}
              </a>
            </div>
          </div>
        ) : (
          /*
            목록은 요약만 — 날짜·제목·첫 사진·두 줄. 본문과 사진 전부는 글 페이지에 있다.
            20건이 넘어가며 한 페이지에 사진 60장을 펼치던 것을 접었다. 10건씩 넘긴다.
          */
          <>
            <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10 lg:mt-20">
              {pagePosts.map((post) => (
                <li key={post.id}>
                  <article className="grid gap-4 py-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-10">
                    <time
                      dateTime={post.published_on}
                      className="text-caption tabular-nums text-ink-faint lg:pt-1 lg:text-title lg:font-bold lg:tracking-normal lg:text-ink"
                    >
                      {formatNewsDate(post.published_on)}
                    </time>
                    <Link
                      href={`/news/${post.id}`}
                      className="group grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start"
                    >
                      <div className="min-w-0">
                        <h2 className="text-title font-bold transition-colors group-hover:text-mint-link lg:text-h2">
                          {post.title}
                        </h2>
                        {post.body && (
                          <p className="mt-3 line-clamp-2 max-w-prose text-ink-soft">
                            {newsExcerpt(post.body, 160)}
                          </p>
                        )}
                        <span className="text-link mt-4 inline-flex">
                          자세히 보기
                        </span>
                      </div>
                      {post.images[0] && (
                        <div className="photo order-first aspect-4/3 sm:order-none">
                          <NewsPhoto
                            src={post.images[0]}
                            alt=""
                            sizes="(min-width: 640px) 176px, calc(100vw - 40px)"
                          />
                        </div>
                      )}
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
            {pageCount > 1 && (
              <nav
                aria-label="소식 페이지"
                className="mt-10 flex items-center justify-between text-small"
              >
                {page > 1 ? (
                  <Link
                    href={page === 2 ? "/news" : `/news?page=${page - 1}`}
                    className="text-link"
                  >
                    최근 소식
                  </Link>
                ) : (
                  <span />
                )}
                <span className="tabular-nums text-ink-faint">
                  {page} / {pageCount}
                </span>
                {page < pageCount ? (
                  <Link href={`/news?page=${page + 1}`} className="text-link">
                    지난 소식
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </ViewTransition>
  );
}
