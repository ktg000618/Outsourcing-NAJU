import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ShareButton } from "@/components/share-button";
import { NewsPhoto } from "@/components/news-photo";
import {
  linkifyTel,
  newsExcerpt,
  newsParagraphs,
} from "@/components/news-text";
import { formatNewsDate, getPublishedPost } from "@/lib/news";
import { site } from "@/lib/site";

/** 관리 화면에서 저장하면 revalidatePath 로 바로 갱신되고, 그 밖엔 1시간 캐시. */
export const revalidate = 3600;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublishedPost(id);
  if (!post) return { title: "소식" };
  const description = newsExcerpt(post.body);
  return {
    title: post.title,
    description,
    alternates: { canonical: `/news/${post.id}` },
    /* 카톡 공유 카드에 그 글의 첫 사진이 뜨게. 사진이 없으면 루트 레이아웃의 공통 카드. */
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: `${post.published_on}T09:00:00+09:00`,
      ...(post.images[0] ? { images: [{ url: post.images[0] }] } : {}),
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPublishedPost(id);
  if (!post) notFound();
  const n = post.images.length;
  const host = post.link_url
    ? new URL(post.link_url).hostname.replace(/^www\./, "")
    : null;
  const internalPath = post.link_url?.startsWith(site.url)
    ? post.link_url.slice(site.url.length) || "/"
    : null;
  const actions = (
    <>
      {post.link_url &&
        (internalPath ? (
          <Link href={internalPath} className="btn-primary">
            자세히 보기
          </Link>
        ) : (
          <a
            href={post.link_url}
            rel="noreferrer"
            target="_blank"
            className="btn-primary"
          >
            {host} 에서 보기<span className="sr-only"> (새 창)</span>
          </a>
        ))}
      <ShareButton
        title={post.title}
        text={newsExcerpt(post.body)}
        label="이 소식 공유하기"
      />
    </>
  );
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: `${post.published_on}T09:00:00+09:00`,
    dateModified: post.updated_at,
    ...(post.images[0] ? { image: post.images } : {}),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/news/${post.id}`,
  };

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <script
        type="application/ld+json"
        // 우리가 만든 객체라 외부 입력이 섞이지 않는다.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* 목록의 장부 행 하나를 페이지로 편 것 — 같은 5:7 격자. 왼쪽은 날짜와 돌아가기, 오른쪽이 글. */}
      <article className="page-top page-bottom mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* 왼쪽 열: 날짜가 머리, 그 아래 목록·공유. PC 에서 빈 열로 남지 않게 행동을 여기로 모은다. 폰은 글 아래에 같은 것을 한 번 더 둔다. */}
          <div className="lg:pt-1">
            <Link href="/news" className="text-link">
              소식 목록
            </Link>
            <time
              dateTime={post.published_on}
              className="mt-6 block text-caption tabular-nums text-ink-faint lg:text-title lg:font-bold lg:tracking-normal lg:text-ink"
            >
              {formatNewsDate(post.published_on)}
            </time>
            <div className="mt-8 hidden flex-col items-start gap-4 lg:flex">
              {actions}
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="font-black tracking-tighter text-h1">
              {post.title}
            </h1>
            {post.body && (
              <div className="mt-6 max-w-prose space-y-4 whitespace-pre-line text-ink-soft">
                {newsParagraphs(post.body).map((para, i) => (
                  <p key={i}>{linkifyTel(para)}</p>
                ))}
              </div>
            )}
            {n === 1 && (
              <div className="photo mt-8 w-fit">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  width={1600}
                  height={1200}
                  priority
                  sizes="(min-width: 1024px) 635px, calc(100vw - 40px)"
                  quality={80}
                  className="h-auto max-h-[36rem] w-auto max-w-full"
                />
              </div>
            )}
            {n >= 2 && (
              <ul
                aria-label={`사진 ${n}장`}
                className={`mt-8 grid grid-cols-2 gap-3 lg:gap-5 ${n >= 3 ? "lg:[&>li:first-child]:col-span-2" : ""}`}
              >
                {post.images.map((src, i) => (
                  <li key={src} className="photo aspect-4/3">
                    <NewsPhoto
                      src={src}
                      alt={`${post.title} 사진 ${i + 1}`}
                      priority={i === 0}
                      sizes={
                        i === 0
                          ? `(min-width: 1024px) ${n >= 3 ? "635px" : "310px"}, 45vw`
                          : "(min-width: 1024px) 310px, 45vw"
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 lg:hidden">
              {actions}
            </div>
          </div>
        </div>
      </article>
    </ViewTransition>
  );
}
