import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품",
  description:
    "절굿대떡, 제비쑥떡, 호박고지떡, 나주배 촉촉오란다, 선물세트. 인공첨가물 없이 재래방식으로 빚습니다.",
};

/** 쓰임새로 먼저 훑고, 그다음 제품을 고르는 순서다. */
const occasions = ["이바지", "명절", "답례", "선물", "예단"];

export default function ProductsPage() {
  const [lead, ...rest] = products;

  return (
    <>
      {/* 홈 히어로와 같은 규칙 — 헤더 안쪽 폭에 맞춘 중앙 정렬,
          틀 비율은 사진 원본 비율(1.5) 그대로라 잘려 나가는 곳이 없다. */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        <div className="relative isolate flex aspect-4/5 items-end overflow-hidden rounded-2xl bg-ink sm:aspect-16/10 lg:aspect-[1.5/1]">
          <Image
            src="/images/product-gift-scene.jpg"
            alt="떡카페 테이블에 놓인 절굿대떡 선물세트"
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={92}
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
          />
          <div className="relative w-full px-6 pb-10 lg:px-10 lg:pb-12">
            <h1 className="text-[2.25rem] leading-[1.2] text-paper lg:text-[3rem]">
              빚는 것들
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/85 lg:text-base">
              이바지·명절·답례에 두루 나갑니다. 낱개 포장이라 나눠 드리기 좋습니다.
            </p>
          </div>
        </div>
      </section>

      <header className="mx-auto max-w-6xl px-5 pb-12 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
        <p className="max-w-prose text-ink-soft">
          유화제나 인공감미료를 넣지 않습니다. 무농약으로 기른 절굿대와
          나주배 농축액으로만 단맛을 냅니다.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {occasions.map((o) => (
            <li
              key={o}
              className="border border-ink/20 px-4 py-1.5 text-[14px] text-ink-soft"
            >
              {o}
            </li>
          ))}
        </ul>
      </header>

      {/* 왼쪽 대표 이미지 + 오른쪽 카드 그리드 */}
      <div className="mx-auto max-w-6xl px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          <Link
            href={`/products/${lead.slug}`}
            className="group relative block aspect-square overflow-hidden rounded-2xl bg-paper-2 lg:aspect-auto"
          >
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
              <p className="text-2xl text-paper lg:text-3xl">
                {lead.name}
              </p>
              <p className="mt-1.5 text-[15px] text-paper/80">{lead.summary}</p>
            </div>
          </Link>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:gap-x-6">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-paper-2">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      quality={88}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-4 text-lg">{p.name}</h2>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  {p.price !== null ? (
                    <p className="mt-2 font-medium">
                      {p.price.toLocaleString("ko-KR")}원
                    </p>
                  ) : (
                    <p className="mt-2 text-[14px] text-ink-faint">
                      가격 문의 {site.tel}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
