import type { Metadata } from "next";
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
import {
  formatNewsDate,
  getPublishedPost,
  getPublishedPosts,
} from "@/lib/news";
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
  /* 이전·다음 글 — 목록과 같은 순서(최신이 앞). 다 읽은 손님이 목록으로 돌아가지 않고 이어 읽는다. */
  const all = await getPublishedPosts();
  const at = all.findIndex((p) => p.id === post.id);
  const newer = at > 0 ? all[at - 1] : null;
  const older = at >= 0 && at < all.length - 1 ? all[at + 1] : null;
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
        {/* 첫 사진은 격자 위 통폭 히어로 — 소식은 사진 일기라 사진이 주인공인데 7칸 안에선 조연이었다(리더 2026-10-07). 비율이 안 맞는 세로 카드는 흐린 배경 위에 통째로. */}
        {n >= 1 && (
          <div className="photo mb-8 aspect-4/3 lg:mb-12 lg:aspect-3/2">
            <NewsPhoto
              src={post.images[0]}
              alt={n === 1 ? post.title : `${post.title} 사진 1`}
              priority
              fit="contain"
              sizes="(min-width: 1216px) 1152px, calc(100vw - 40px)"
            />
          </div>
        )}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* 왼쪽 열: 날짜가 머리, 그 아래 목록·공유. PC 에서 빈 열로 남지 않게 행동을 여기로 모은다. 폰은 글 아래에 같은 것을 한 번 더 둔다. */}
          <div className="lg:pt-1">
            <Link href="/news" className="text-link">
              소식 목록
            </Link>
            <time
              dateTime={post.published_on}
              className="mt-6 block text-caption tabular-nums text-ink-faint lg:text-body lg:font-bold lg:text-ink"
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
            {/* 나머지 사진은 본문 아래 2열 — 첫 장은 위 히어로로 갔다. */}
            {n >= 2 && (
              <ul
                aria-label={`사진 ${n - 1}장 더`}
                className="mt-8 grid grid-cols-2 gap-3 lg:gap-5"
              >
                {post.images.slice(1).map((src, i) => (
                  <li key={src} className="photo aspect-4/3">
                    <NewsPhoto
                      src={src}
                      alt={`${post.title} 사진 ${i + 2}`}
                      sizes="(min-width: 1024px) 310px, 45vw"
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 lg:hidden">
              {actions}
            </div>
            {(older || newer) && (
              <nav
                aria-label="이전·다음 소식"
                className="mt-12 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2 sm:gap-8"
              >
                {older ? (
                  <Link href={`/news/${older.id}`} className="group min-w-0">
                    <span className="block text-caption text-ink-faint">
                      이전 소식
                    </span>
                    <span className="mt-1 block truncate font-bold transition-colors group-hover:text-mint-link">
                      {older.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {newer && (
                  <Link
                    href={`/news/${newer.id}`}
                    className="group min-w-0 sm:text-right"
                  >
                    <span className="block text-caption text-ink-faint">
                      다음 소식
                    </span>
                    <span className="mt-1 block truncate font-bold transition-colors group-hover:text-mint-link">
                      {newer.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </div>
      </article>
    </ViewTransition>
  );
}
