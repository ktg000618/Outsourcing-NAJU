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

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-8 lg:px-8 lg:pt-12">
        <Link
          href="/products"
          className="text-[14px] text-ink-soft transition-colors hover:text-mint-link"
        >
          제품 전체
        </Link>
      </div>

      <article className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2">
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
            /* 한 장뿐일 때 썸네일 줄로 깔면 왼쪽에 홀로 남아 빠진 자리처럼 보인다. */
            <ul
              className={
                product.gallery.length === 1
                  ? "mt-4"
                  : "mt-4 grid grid-cols-3 gap-4"
              }
            >
              {product.gallery.map((g) => (
                <li
                  key={g.src}
                  className={`relative overflow-hidden rounded-xl bg-paper-2 ${
                    product.gallery!.length === 1
                      ? "aspect-4/3"
                      : "aspect-square"
                  }`}
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
                className="rounded-full bg-paper-2 px-3 py-1 text-[13px] text-ink-soft"
              >
                {o}
              </li>
            ))}
          </ul>

          <h1 className="mt-5 text-[2.25rem] leading-[1.2] lg:text-[3rem]">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{product.summary}</p>

          {product.price !== null && (
            <p className="mt-7 text-2xl">
              {product.price.toLocaleString("ko-KR")}원
              {product.unit && (
                <span className="ml-2 text-base text-ink-soft">
                  {product.unit}
                </span>
              )}
            </p>
          )}

          <p className="mt-7 max-w-prose leading-relaxed text-ink-soft">
            {product.detail}
          </p>

          {product.spec && (
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10 text-[15px]">
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
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper pressable transition-colors hover:bg-ink-soft hover:border-ink-soft"
              >
                네이버 스마트스토어에서 구매
              </a>
            ) : (
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper pressable transition-colors hover:bg-ink-soft hover:border-ink-soft"
              >
                전화로 주문 {site.tel}
              </a>
            )}
            <p className="mt-3 text-[14px] text-ink-faint">
              매장에서도 바로 구매하실 수 있습니다.
            </p>
          </div>
        </div>
      </article>

      {product.reviewVideo && (
        <section className="rise border-t border-ink/10 bg-paper-2">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-14 lg:px-8 lg:py-20">
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
              <p className="text-sm text-mint-link">후기</p>
              <p className="mt-3 text-[1.75rem] leading-tight lg:text-[2.25rem]">
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
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="text-2xl">다른 제품</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 44vw"
                      quality={88}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
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
