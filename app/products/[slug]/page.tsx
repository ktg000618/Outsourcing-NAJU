import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoopingVideo } from "@/components/looping-video";
import { ReviewVideo } from "@/components/review-video";
import { DetailReveal } from "@/components/detail-reveal";
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
    alternates: { canonical: `/products/${product.slug}` },
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
  const extras = product.gallery ?? [];
  /* 「더 보기」 타일 수 = 영상(있으면 1) + 갤러리. 4의 배수가 아니면 PC 를 3열로 — 4열에 하나만 남는 줄을 피한다. */
  const tileCount = extras.length + (product.video ? 1 : 0);
  const tileCols = tileCount % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  /* 가격은 큰 숫자가 아니라 사양 표의 첫 줄이다 — 이 페이지의 활자 위계는 제품명 하나로 끝난다. */
  const specRows = [
    ...(product.price !== null
      ? [
          {
            label: "가격",
            value: `${product.price.toLocaleString("ko-KR")}원${
              product.unit ? ` · ${product.unit}` : ""
            }`,
          },
        ]
      : []),
    ...(product.spec ?? []),
  ];

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

      {/*
        머리: 격자 셋 — 되돌아가는 링크 · 큰 원 · 글.
        PC 는 링크가 글 열 첫 줄(원 윗변과 같은 높이)에 서고 원은 글 열 위에 맞춘다(self-start).
        원 지름은 440 으로 막는다 — 열 폭(≈540)만큼 키우면 글 블록보다 한참 길어져 아래가 빈다.
        모바일은 링크 → 원 → 글 순으로 한 열이고 원 위 여백은 24px 뿐이다.
      */}
      <article className="mx-auto grid max-w-6xl gap-x-10 gap-y-4 px-5 pb-12 pt-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="lg:col-start-2 lg:row-start-1">
          <Link href="/products" className="text-link">
            ← 제품 전체
          </Link>
        </div>

        <ViewTransition
          name={`product-${product.slug}`}
          share="morph"
          default="none"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[440px] lg:self-start">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 440px, 90vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </ViewTransition>

        <div className="pt-4 lg:col-start-2 lg:row-start-2 lg:pt-2">
          <p className="text-caption text-ink-faint">
            {product.occasions.join(" · ")}
          </p>

          <h1 className="mt-3 font-black tracking-tighter text-h1 lg:text-hero">
            {product.name}
          </h1>
          <p className="mt-3 text-lead text-ink-soft">{product.summary}</p>

          <p className="mt-7 max-w-prose leading-relaxed text-ink-soft">
            {product.detail}
          </p>

          {specRows.length > 0 && (
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10 text-small">
              {specRows.map((row) => (
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
                className="btn-primary"
              >
                네이버 스마트스토어에서 구매
              </a>
            ) : (
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="btn-primary"
              >
                전화 주문 {site.tel}
              </a>
            )}
            <p className="mt-3 text-caption text-ink-faint">
              매장에서도 바로 구매하실 수 있습니다.
            </p>
          </div>
        </div>
      </article>

      {product.detailImages && (
        /*
          상세페이지 이미지(업체 제작 오란다 · 자체 제작 절굿대떡/선물세트). 접어 두면 손님이 열기 전엔
          상세가 없는 줄 안다(리더 지적) — 위 일부를 보여 주고 「상세 더보기」로 펼친다.
          rise 를 붙이지 않는다: 펼치면 만 픽셀이 넘는 블록이라 view() 타임라인이 끝까지 안 가 흐린 채 남는다(실측).
        */
        <section className="border-t border-ink/10">
          <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
            <SectionEyebrow phase={0.3}>상세 정보</SectionEyebrow>
            <h2 className="mt-3 text-h2 lg:text-h2-lg">
              <span className="font-thin tracking-tight">더 자세한 </span>
              <span className="font-black tracking-tighter">제품 이야기</span>
            </h2>
            <div className="mx-auto mt-8 max-w-[860px]">
              <DetailReveal collapsedClass={product.detailCollapsed}>
                <div className="overflow-hidden rounded-2xl ring-1 ring-inset ring-ink/5">
                  {product.detailImages.map((d, i) => (
                    <Image
                      key={d.src}
                      src={d.src}
                      alt={d.alt}
                      width={d.width}
                      height={d.height}
                      sizes="(min-width: 900px) 860px, 100vw"
                      quality={85}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="block h-auto w-full"
                    />
                  ))}
                </div>
              </DetailReveal>
            </div>
          </div>
        </section>
      )}

      {/* 넣는 것·더 보기 — 흰 그릇의 재료는 원, 포장·소품은 사각. 값이 있을 때만 선다. */}
      {(product.ingredients || tileCount > 0) && (
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
            {tileCount > 0 && (
              <div className={product.ingredients ? "mt-14" : ""}>
                <SectionEyebrow phase={0.6}>더 보기</SectionEyebrow>
                <h2 className="mt-3 text-h2 lg:text-h2-lg">
                  <span className="font-thin tracking-tight">가까이서 </span>
                  <span className="font-black tracking-tighter">본 모습</span>
                </h2>
                <ul
                  className={`mt-8 grid grid-cols-2 gap-3 lg:gap-5 ${tileCols}`}
                >
                  {product.video && (
                    /* 질감 영상은 첫 타일. 사진과 같은 정사각 — 원으로 걸치지 않는다. */
                    <li className="relative aspect-square">
                      <LoopingVideo {...product.video} />
                    </li>
                  )}
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
              <SectionEyebrow phase={0.8} tone="paper">
                후기 영상
              </SectionEyebrow>
              <p className="mt-5 text-h2 tracking-tight lg:text-h2-lg">
                <span className="block font-thin">직접 드셔 본 분의 말.</span>
                <span className="block font-black">
                  “{product.reviewVideo.caption}”
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
          <SectionEyebrow phase={1}>제품</SectionEyebrow>
          <h2 className="mt-3 text-h2 lg:text-h2-lg">
            <span className="font-thin tracking-tight">함께 보는 </span>
            <span className="font-black tracking-tighter">다른 제품</span>
          </h2>
          {/* 제품 3개 − 현재 1 = 항상 2개. 2열 등분. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:max-w-3xl lg:gap-x-12">
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
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 300px, 45vw"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </ViewTransition>
                  <p className="mt-3 text-small transition-colors group-hover:text-mint-link sm:mt-4 sm:text-lg">
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
