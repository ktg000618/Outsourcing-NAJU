import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoopingVideo } from "@/components/looping-video";
import { ReviewVideo } from "@/components/review-video";
import { SectionEyebrow } from "@/components/section-eyebrow";
import type { Metadata } from "next";
import { products, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    /* 카톡·검색 공유 카드에 그 제품 접시컷이 뜨게. 공통 카드(찻상)는 루트 레이아웃이 든다. */
    openGraph: {
      title: product.name,
      description: product.summary,
      images: [
        { url: product.image, width: 1600, height: 1600, alt: product.name },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  /* 달 자리(큰 원 우하단)는 영상이 먼저다. 영상이 있으면 갤러리 전부가 「더 보기」로, 없으면 첫 장이 달 자리. */
  const extras = product.gallery
    ? product.video
      ? product.gallery
      : product.gallery.slice(1)
    : [];

  /*
    제품 구조화 데이터. 가격이 없는 제품에는 offers 를 붙이지 않는다 —
    지어낸 가격이나 빈 offers 는 검색엔진이 오류로 잡고, 무엇보다 거짓이다.
    가격이 들어오면 여기가 저절로 채워진다.
  */
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.detail,
    image: `${site.url}${product.image}`,
    brand: { "@type": "Brand", name: site.name },
    ...(product.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
            url: product.storeUrl ?? `${site.url}/products/${product.slug}`,
            seller: { "@type": "Organization", name: site.legalName },
          },
        }
      : {}),
  };

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-5 pt-8 lg:px-8 lg:pt-12">
        <Link
          href="/products"
          className="link-draw text-small text-ink-soft transition-colors hover:text-mint-link"
        >
          제품 전체
        </Link>
      </div>

      <article className="section-y-tight mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/*
          질감 영상은 큰 원 오른쪽 아래에 걸친 작은 원 — 달이 걸린 모양. 원 밑에 정사각형으로
          두면 "붙여넣은 영상"이 됐다(리더 지적). 종이색 링으로 두 원을 떼어 놓는다.
          영상이 있는 제품은 이 자리가 차므로 아래 여백(pb)을 그만큼 둔다.
          lg 에서 self-start 가 필수 — grid 가 첫 열을 오른쪽 글 높이로 늘리면 bottom-0 이
          원 밑이 아니라 열 바닥이 된다(실측 402px 낙하).
        */}
        <div
          className={`relative lg:self-start ${product.video || product.gallery ? "pb-8 lg:pb-12" : ""}`}
        >
          <ViewTransition
            name={`product-${product.slug}`}
            share="morph"
            default="none"
          >
            <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-mint-deep group-hover:ring-offset-4 group-hover:ring-offset-paper">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                quality={88}
                className="object-cover"
              />
            </div>
          </ViewTransition>
          {product.video && (
            <div className="absolute bottom-0 right-0 w-[44%] rounded-full ring-[6px] ring-paper lg:-right-4 lg:w-[40%] lg:ring-8">
              <LoopingVideo {...product.video} round />
            </div>
          )}
          {!product.video && product.gallery?.[0] && (
            /* 보조 컷 첫 장은 영상과 같은 자리 — 큰 원 오른쪽 아래에 걸친 작은 원. 나머지는 아래 「더 보기」. */
            <div className="absolute bottom-0 right-0 w-[44%] overflow-hidden rounded-full bg-paper-2 ring-[6px] ring-paper lg:-right-4 lg:w-[40%] lg:ring-8">
              <div className="relative aspect-square">
                <Image
                  src={product.gallery[0].src}
                  alt={product.gallery[0].alt}
                  fill
                  sizes="(min-width: 1024px) 220px, 40vw"
                  quality={88}
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:pt-4">
          <ul className="flex flex-wrap gap-2">
            {product.occasions.map((o) => (
              <li
                key={o}
                className="border border-rose px-3 py-1 text-caption text-ink"
              >
                {o}
              </li>
            ))}
          </ul>

          <h1 className="mt-5 font-black tracking-tighter text-h1 lg:text-hero">
            {product.name}
          </h1>
          <p className="mt-3 text-lead text-ink-soft">{product.summary}</p>

          {product.price !== null && (
            /* 가격은 이 페이지에서 가장 중요한 숫자다. 홈 숫자 밴드와 같은 규격으로. */
            <p className="mt-8 font-black tracking-tighter tabular-nums text-h1-lg lg:text-num">
              {product.price.toLocaleString("ko-KR")}
              <span className="ml-1 text-lead font-light tracking-normal text-ink-soft">
                원{product.unit ? ` · ${product.unit}` : ""}
              </span>
            </p>
          )}

          <p className="mt-7 max-w-prose leading-relaxed text-ink-soft">
            {product.detail}
          </p>

          {product.spec && (
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10 text-small">
              {product.spec.map((row) => (
                <div key={row.label} className="flex gap-5 py-3">
                  <dt className="w-24 shrink-0 text-ink-faint">{row.label}</dt>
                  <dd className="text-ink-soft">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-9">
            {product.storeUrl ? (
              <a
                href={product.storeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-lift inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:border-ink-soft hover:bg-ink-soft"
              >
                네이버 스마트스토어에서 구매
              </a>
            ) : (
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="btn-lift inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:border-ink-soft hover:bg-ink-soft"
              >
                전화로 주문 {site.tel}
              </a>
            )}
            <p className="mt-3 text-caption text-ink-faint">
              매장에서도 바로 구매하실 수 있습니다.
            </p>
          </div>
        </div>
      </article>

      {/* 넣는 것·더 보기 — 흰 그릇의 재료는 원, 포장·소품은 사각. 값이 있을 때만 선다. */}
      {(product.ingredients || extras.length > 0) && (
        <section className="rise border-t border-ink/10">
          <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
            {product.ingredients && (
              <>
                <SectionEyebrow phase={0.5}>재료</SectionEyebrow>
                <h2 className="mt-3 text-h2 lg:text-h2-lg">
                  <span className="font-thin tracking-tight">넣는 것은 </span>
                  <span className="font-black tracking-tighter">이것뿐</span>
                </h2>
                <ul className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-[repeat(3,11rem)] lg:gap-10">
                  {product.ingredients.map((ing) => (
                    <li key={ing.src}>
                      <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8">
                        <Image
                          src={ing.src}
                          alt={ing.alt}
                          fill
                          sizes="(min-width: 1024px) 176px, 30vw"
                          quality={88}
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-center text-small font-bold">
                        {ing.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {extras.length > 0 && (
              <div className={product.ingredients ? "mt-14" : ""}>
                <SectionEyebrow phase={0.5}>더 보기</SectionEyebrow>
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-5">
                  {extras.map((g) => (
                    <li
                      key={g.src}
                      className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width: 1024px) 360px, 45vw"
                        quality={88}
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {product.reviewVideo && (
        /*
          후기는 어두운 달빛 면 위에. 종이색 밴드 안의 기본 <video> 는 사이트 밖 물건처럼
          보였다(리더 지적). 굵은 줄은 후기 본인의 말, 그 아래 "말한 대목" 목록은 누르면 그
          시점으로 간다. 모바일은 글·대목 먼저, 영상은 가운데 280px.
        */
        <section className="moonlit rise overflow-hidden bg-ink text-paper">
          <div className="section-y relative mx-auto max-w-6xl px-5 lg:px-8">
            <ReviewVideo {...product.reviewVideo}>
              <SectionEyebrow phase={0.75} tone="paper">
                후기 영상
              </SectionEyebrow>
              <p className="mt-5 text-h2 tracking-tight lg:text-h2-lg">
                <span className="block font-thin">직접 드셔 본 분의 말.</span>
                <span className="block font-black">
                  「{product.reviewVideo.caption}」
                </span>
              </p>
              <p className="mt-5 text-caption text-paper/55">
                {product.reviewVideo.source}
              </p>
            </ReviewVideo>
          </div>
        </section>
      )}

      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionEyebrow phase={1}>다른 제품</SectionEyebrow>
          <h2 className="mt-3 text-h2 lg:text-h2-lg">다른 제품</h2>
          {/* 제품 3개 − 현재 1 = 항상 2개. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:max-w-3xl lg:gap-x-10">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group pressable block"
                >
                  <ViewTransition
                    name={`product-${p.slug}`}
                    share="morph"
                    default="none"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-mint-deep group-hover:ring-offset-4 group-hover:ring-offset-paper">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 22vw, 30vw"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </ViewTransition>
                  <p className="mt-3 text-center text-small transition-colors group-hover:text-mint-link sm:mt-4 sm:text-lg">
                    {p.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ViewTransition>
  );
}
