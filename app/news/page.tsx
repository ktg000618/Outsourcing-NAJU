import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ViewTransition } from "react";
import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import Link from "next/link";
import { NewsPhoto } from "@/components/news-photo";
import { linkifyTel } from "@/components/news-text";
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

export default async function NewsPage() {
  const posts = await getPublishedPosts();
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
            이야기 페이지 연표와 같은 장부 행: 왼쪽 5fr 은 "언제", 오른쪽 7fr 은 글.
            사진은 1장이면 원본 비율 그대로(폰 세로 사진을 자르지 않는다), 2장은 2열,
            3장은 PC 대표 1 + 2 / 모바일은 옆으로 넘기는 스트립(2+1 고아 배치 방지).
          */
          <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10 lg:mt-20">
            {posts.map((post) => {
              const n = post.images.length;
              const host = post.link_url
                ? new URL(post.link_url).hostname.replace(/^www\./, "")
                : null;
              /* 우리 사이트 안의 글(제품·체험 안내)은 밖으로 나가는 링크처럼 보이면 어색하다 — 안쪽 링크로. */
              const internalPath = post.link_url?.startsWith(site.url)
                ? post.link_url.slice(site.url.length) || "/"
                : null;
              return (
                <li key={post.id}>
                  <article className="grid gap-3 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-14">
                    <time
                      dateTime={post.published_on}
                      className="text-caption tabular-nums text-ink-faint lg:pt-1 lg:text-title lg:font-bold lg:tracking-normal lg:text-ink"
                    >
                      {formatNewsDate(post.published_on)}
                    </time>
                    <div className="min-w-0">
                      {/* 제목이 글 주소다 — 카톡으로 이 글만 보낼 수 있게. */}
                      <h2 className="text-title font-bold lg:text-h2">
                        <Link
                          href={`/news/${post.id}`}
                          className="transition-colors hover:text-mint-link"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.body && (
                        <p className="mt-4 max-w-prose whitespace-pre-line text-ink-soft">
                          {linkifyTel(post.body)}
                        </p>
                      )}
                      {n === 1 && (
                        <div className="photo mt-6 w-fit">
                          <Image
                            src={post.images[0]}
                            alt={post.title}
                            width={1600}
                            height={1200}
                            sizes="(min-width: 1024px) 635px, calc(100vw - 40px)"
                            quality={80}
                            className="h-auto max-h-[32rem] w-auto max-w-full"
                          />
                        </div>
                      )}
                      {n >= 2 && (
                        <ul
                          aria-label={`사진 ${n}장`}
                          className={`mt-6 ${
                            n === 2
                              ? "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
                              : "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-2 lg:[&>li:first-child]:col-span-2 [&::-webkit-scrollbar]:hidden"
                          }`}
                        >
                          {post.images.map((src, i) => (
                            <li
                              key={src}
                              className={`photo aspect-4/3 ${
                                n >= 2
                                  ? "w-[72%] shrink-0 snap-start sm:w-auto"
                                  : ""
                              }`}
                            >
                              <NewsPhoto
                                src={src}
                                alt={`${post.title} 사진 ${i + 1}`}
                                sizes={
                                  n === 2
                                    ? "(min-width: 1024px) 310px, 45vw"
                                    : i === 0
                                      ? "(min-width: 1024px) 635px, (min-width: 640px) 30vw, 72vw"
                                      : "(min-width: 1024px) 310px, (min-width: 640px) 30vw, 72vw"
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      {post.link_url &&
                        (internalPath ? (
                          <Link href={internalPath} className="text-link mt-3">
                            자세히 보기
                          </Link>
                        ) : (
                          <a
                            href={post.link_url}
                            rel="noreferrer"
                            target="_blank"
                            className="text-link mt-3"
                          >
                            자세히 보기
                            <span aria-hidden>↗</span>
                            {host && (
                              <span className="font-normal text-ink-faint">
                                {host}
                              </span>
                            )}
                            <span className="sr-only"> (새 창)</span>
                          </a>
                        ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </ViewTransition>
  );
}
