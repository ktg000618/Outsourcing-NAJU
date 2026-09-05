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
          /* 빈 상태도 디자인이다. 회색 상자 대신 빈 달 + 큰 활자. 소식은 인스타에 먼저 올라간다. */
          <div className="mt-14 max-w-3xl border-y border-ink/10 py-16 lg:py-24">
            <MoonMark phase={0} size={40} className="text-ink" />
            <p className="mt-6 text-h2 lg:text-h2-lg">
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
        ) : (
          <ul className="mt-12 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
            {posts.map((post) => (
              <li key={post.id} className="py-8 lg:py-10">
                <p className="text-caption tabular-nums tracking-[0.08em] text-ink-faint">
                  {formatNewsDate(post.published_on)}
                </p>
                <h2 className="mt-1.5 text-h3 font-bold">{post.title}</h2>
                {post.body && (
                  <p className="mt-3 max-w-prose whitespace-pre-line leading-relaxed text-ink-soft">
                    {post.body}
                  </p>
                )}
                {post.images.length > 0 && (
                  <ul
                    className={`mt-5 grid gap-3 ${post.images.length === 1 ? "grid-cols-1 max-w-md" : "grid-cols-2 sm:grid-cols-3"}`}
                  >
                    {post.images.map((src) => (
                      <li
                        key={src}
                        className="relative aspect-4/3 overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 240px, 45vw"
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
                    className="link-draw mt-4 inline-block text-small text-ink-soft transition-colors hover:text-mint-link"
                  >
                    자세히 보기<span className="sr-only"> (새 창)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ViewTransition>
  );
}
