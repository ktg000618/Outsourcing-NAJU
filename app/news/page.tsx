import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ViewTransition } from "react";
import Image from "next/image";
import { MoonMark } from "@/components/moon-mark";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { formatNewsDate, getPublishedPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "소식",
  description: `${site.name}의 휴무·신제품·행사 소식.`,
};

/** 직원이 /admin 에서 쓴 글. 저장 시 revalidatePath 로 바로 갱신되고, 그 밖엔 1시간 캐시. */
export const revalidate = 3600;

export default async function NewsPage() {
  const posts = await getPublishedPosts();
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/* 형제 페이지와 같은 문법 — 1152 컨테이너, 달 위상, 88px Thin/Black. 이 페이지만 밖에 있었다. */}
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 lg:px-8 lg:pb-32 lg:pt-14">
        <SectionEyebrow phase={0.1}>소식</SectionEyebrow>
        <div className="mt-4 lg:grid lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch] text-h1 lg:text-hero">
            <span className="block font-thin tracking-tight">떡집의</span>
            <span className="block font-black tracking-tighter">소식</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft lg:mt-0 lg:pb-3">
            휴무와 신제품, 행사 소식을 이곳에 올립니다.
          </p>
        </div>

        {posts.length === 0 ? (
          /* 빈 상태도 디자인이다 — 목록과 같은 5/7 격자에 빈 달(삭)을 크게. 소식은 인스타에 먼저 올라간다. */
          <div className="mt-14 border-y border-ink/10 py-16 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
            <MoonMark phase={0} size={64} className="text-ink lg:mt-2" />
            <div>
              <p className="mt-6 text-h2 lg:mt-0 lg:text-h2-lg">
                <span className="block font-thin tracking-tight">
                  아직 올라온
                </span>
                <span className="block font-black tracking-tighter">
                  소식이 없습니다
                </span>
              </p>
              <p className="mt-5 max-w-prose text-ink-soft">
                새 소식은 인스타그램에 먼저 올립니다. 급한 문의는 전화가 가장
                빠릅니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {site.instagramUrl && (
                  <a
                    href={site.instagramUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="btn-lift inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
                  >
                    인스타그램에서 보기<span className="sr-only"> (새 창)</span>
                  </a>
                )}
                <a
                  aria-label={`전화 걸기 ${site.tel}`}
                  href={`tel:${site.tel.replace(/-/g, "")}`}
                  className="pressable inline-block border border-ink/25 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
                >
                  {site.tel}
                </a>
              </div>
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
              return (
                <li key={post.id}>
                  <article className="grid gap-3 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-14">
                    <time
                      dateTime={post.published_on}
                      className="text-caption tabular-nums tracking-[0.08em] text-ink-faint lg:pt-1 lg:text-h3 lg:font-bold lg:tracking-normal lg:text-ink"
                    >
                      {formatNewsDate(post.published_on)}
                    </time>
                    <div className="min-w-0">
                      <h2 className="text-h3 font-bold lg:text-h2">
                        {post.title}
                      </h2>
                      {post.body && (
                        <p className="mt-4 max-w-prose whitespace-pre-line leading-relaxed text-ink-soft">
                          {post.body}
                        </p>
                      )}
                      {n === 1 && (
                        <div className="mt-6 w-fit overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5">
                          <Image
                            src={post.images[0]}
                            alt=""
                            width={1600}
                            height={1200}
                            sizes="(min-width: 1024px) 635px, calc(100vw - 40px)"
                            quality={88}
                            className="h-auto max-h-[32rem] w-auto max-w-full"
                          />
                        </div>
                      )}
                      {n >= 2 && (
                        <ul
                          aria-label={`사진 ${n}장`}
                          className={`mt-6 ${
                            n === 2
                              ? "grid grid-cols-2 gap-3"
                              : "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-2 lg:[&>li:first-child]:col-span-2 [&::-webkit-scrollbar]:hidden"
                          }`}
                        >
                          {post.images.map((src) => (
                            <li
                              key={src}
                              className={`relative aspect-4/3 overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5 ${
                                n === 3
                                  ? "w-[72%] shrink-0 snap-start sm:w-auto"
                                  : ""
                              }`}
                            >
                              <Image
                                src={src}
                                alt=""
                                fill
                                sizes={
                                  n === 2
                                    ? "(min-width: 1024px) 310px, 45vw"
                                    : "(min-width: 1024px) 635px, (min-width: 640px) 30vw, 72vw"
                                }
                                quality={88}
                                className="object-cover"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      {post.link_url && (
                        <a
                          href={post.link_url}
                          rel="noreferrer"
                          target="_blank"
                          className="link-draw mt-5 inline-flex items-center gap-1.5 text-small font-medium text-ink transition-colors hover:text-mint-link"
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
                      )}
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
