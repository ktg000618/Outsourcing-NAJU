import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoopingVideo } from "@/components/looping-video";
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
    <>
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
        <div>
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
          {product.video && (
            <div className="mt-4 aspect-square">
              <LoopingVideo {...product.video} />
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
        <section className="rise border-t border-ink/10 bg-paper-2">
          <div className="section-y-tight mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-14 lg:px-8">
            {/* 세로 영상이라 폭을 묶어 둔다. 안 묶으면 데스크톱에서 혼자 커진다. */}
            <video
              aria-label={product.reviewVideo.label}
              className="w-full max-w-[300px] rounded-2xl bg-ink lg:max-w-[340px]"
              controls
              playsInline
              poster={product.reviewVideo.poster}
              preload="metadata"
              src={product.reviewVideo.src}
            />
            <div>
              <p className="text-caption text-mint-link">후기</p>
              <p className="mt-3 text-h3 lg:text-h1">
                {product.reviewVideo.caption}
              </p>
              <p className="mt-5 max-w-prose text-ink-soft">
                합성첨가물과 색소, 방부제를 넣지 않고 낱개로 포장합니다.
                아이 간식이나 어른 답례로 두루 나갑니다.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <h2 className="text-2xl">다른 제품</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 44vw"
                      quality={88}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-center text-lg transition-colors group-hover:text-mint-link">
                    {p.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
