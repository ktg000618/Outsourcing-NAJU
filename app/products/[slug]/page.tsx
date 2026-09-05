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
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

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
          className="text-caption text-ink-soft transition-colors hover:text-mint-link"
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
        <div className={`relative lg:self-start ${product.video ? "pb-8 lg:pb-12" : ""}`}>
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint">
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
          {product.gallery && (
            /* 보조 컷도 원. 한 장이면 3열 중 첫 칸에 작게 — 전폭 원은 메인과 겹쳐 보인다. */
            <ul className="mt-4 grid grid-cols-3 gap-4">
              {product.gallery.map((g) => (
                <li
                  key={g.src}
                  className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    quality={88}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:pt-4">
          <ul className="flex flex-wrap gap-2">
            {product.occasions.map((o) => (
              <li
                key={o}
                className="bg-rose/25 px-3 py-1 text-caption text-ink"
              >
                {o}
              </li>
            ))}
          </ul>

          <h1 className="mt-5 font-black tracking-tighter text-h1 lg:text-hero">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{product.summary}</p>

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
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper btn-lift transition-colors hover:bg-ink-soft hover:border-ink-soft"
              >
                네이버 스마트스토어에서 구매
              </a>
            ) : (
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper btn-lift transition-colors hover:bg-ink-soft hover:border-ink-soft"
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

      {product.reviewVideo && (
        /*
          후기는 어두운 달빛 면 위에. 종이색 밴드 안의 기본 <video> 는 사이트 밖 물건처럼
          보였다(리더 지적). 인용은 얇은 줄/굵은 줄 문법, 영상은 포스터 + 원형 ▶ 로.
          모바일은 글 먼저, 영상은 가운데 280px — 세로 영상이 전폭이면 한 화면을 다 먹는다.
        */
        <section className="moonlit rise overflow-hidden bg-ink text-paper">
          <div className="section-y relative mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:px-8">
            <div>
              <SectionEyebrow phase={0.75} tone="paper">
                후기 영상
              </SectionEyebrow>
              <p className="mt-5 text-h2 tracking-tight lg:text-h2-lg">
                <span className="block font-thin">영상으로 보는 후기.</span>
                <span className="block font-black">{product.reviewVideo.caption}</span>
              </p>
              <p className="mt-6 max-w-prose text-paper/75">
                합성첨가물과 색소, 방부제를 넣지 않고 낱개로 포장합니다.
                아이 간식이나 어른 답례로 두루 나갑니다.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:w-[320px] lg:max-w-none">
              <ReviewVideo {...product.reviewVideo} />
            </div>
          </div>
        </section>
      )}

      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-2xl">다른 제품</h2>
          <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-8">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
                    <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint">
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
