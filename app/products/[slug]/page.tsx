import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
          className="text-[14px] text-ink-soft transition-colors hover:text-mint-deep"
        >
          제품 전체
        </Link>
      </div>

      <article className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
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
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper transition-opacity hover:opacity-90"
              >
                네이버 스마트스토어에서 구매
              </a>
            ) : (
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="inline-block border border-ink bg-ink px-8 py-3.5 text-paper transition-opacity hover:opacity-90"
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

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <h2 className="text-2xl">다른 제품</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
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
                  <p className="mt-4 text-center text-lg">
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
