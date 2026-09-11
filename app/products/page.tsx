import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { credentials, products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품",
  description:
    "절굿대떡, 나주배 촉촉오란다, 선물세트. 인공첨가물 없이 재래방식으로 빚습니다.",
  openGraph: {
    images: [
      {
        url: "/images/product-gift-scene.jpg",
        width: 3000,
        height: 2000,
        alt: "찻상에 올린 절굿대떡",
      },
    ],
  },
};

/**
 * 쓰임새로 먼저 훑고, 그다음 제품을 고르는 순서다.
 * 목록을 손으로 적지 않고 제품 데이터에서 뽑는다 — 손으로 적으면 제품을
 * 추가할 때 한쪽만 고쳐져서 "그 쓰임새엔 아무것도 없음"이 된다.
 */
const byOccasion = products
  .flatMap((p) => p.occasions.map((o) => [o, p] as const))
  .reduce<Map<string, typeof products>>((m, [o, p]) => {
    m.set(o, [...(m.get(o) ?? []), p]);
    return m;
  }, new Map());

export default function ProductsPage() {
  const [lead, ...rest] = products;

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/*
          서브페이지 히어로. 홈은 사진 위에 글자(+달)이고, 여기는 글자를 사진 밖으로 꺼낸다 —
          4개 페이지가 똑같은 "사진 위 흰 글씨"면 홈의 한 방이 희석된다. 그라디언트를 걷어
          사진이 그대로 보이고, 글자는 먹색으로 흰 종이 위에 앉는다.
        */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-10 lg:px-8 lg:pt-14">
        <SectionEyebrow phase={0.1}>제품</SectionEyebrow>
        <div className="mt-4 lg:grid lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch] text-h1 lg:text-hero">
            <span className="block font-thin tracking-tight">나주에서</span>
            <span className="block font-black tracking-tighter">빚는 것들</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft lg:mt-0 lg:pb-3">
            이바지·명절·답례에 두루 나갑니다. 낱개 포장이라 나눠 드리기
            좋습니다. 유화제나 인공감미료 없이 무농약 절굿대와 나주배
            농축액으로만 단맛을 냅니다.
          </p>
        </div>
        <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-2xl bg-paper-2 sm:aspect-16/9 lg:aspect-[2.6/1] lg:mt-12 ring-1 ring-inset ring-ink/5">
          <Image
            src="/images/product-gift-scene.jpg"
            alt="찻상에 올린 절굿대떡과 찻주전자"
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={88}
            className="enter-photo object-cover object-center"
          />
        </div>
      </section>

      {/* 쓰임새 → 제품. 떡은 "무엇인가"보다 "언제 쓰는가"로 찾는 손님이 많다. */}
      <section className="rise mx-auto max-w-6xl px-5 pb-16 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <SectionEyebrow phase={0.25}>쓰임새</SectionEyebrow>
        <h2 className="mt-3 text-h3 lg:text-h2-lg">쓰임새로 고르기</h2>
        {/*
          쓰임새는 큰 글자, 제품은 원형 썸네일 — 사이트의 "원=제품" 문법 그대로.
          칩 + 밑줄 링크 여섯 칸은 PC 에서 텅 비어 보였다(리더 지적). 괘선 행이라 칸 수가 달라도 빈자리가 없다.
        */}
        <ul className="mt-8 border-t border-ink/15 lg:grid lg:grid-cols-2 lg:gap-x-14">
          {[...byOccasion.entries()].map(([occasion, list]) => (
            <li
              key={occasion}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-4 border-b border-ink/10 py-5 sm:grid-cols-[8rem_1fr] lg:py-6"
            >
              <h3 className="text-h3 font-black tracking-tighter lg:text-h2">
                {occasion}
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 transition-[box-shadow] group-hover:ring-2 group-hover:ring-mint-deep lg:size-12">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-small text-ink-soft transition-colors group-hover:text-mint-link">
                        {p.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* 왼쪽 대표 이미지 + 오른쪽 카드 그리드 */}
      <div className="rise mx-auto max-w-6xl px-5 pb-24 lg:px-8 lg:pb-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-14">
          {/* 이 원이 제품 페이지에서 가장 큰 브랜드 형태다. 글자는 사진 위가 아니라 아래. */}
          <Link
            href={`/products/${lead.slug}`}
            className="group pressable block"
          >
            <ViewTransition
              name={`product-${lead.slug}`}
              share="morph"
              default="none"
            >
              <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-mint-deep group-hover:ring-offset-4 group-hover:ring-offset-paper">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  quality={88}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                />
              </div>
            </ViewTransition>
            <h2 className="mt-6 text-h3 transition-colors group-hover:text-mint-link lg:text-h2">
              {lead.name}
            </h2>
            <p className="mt-1.5 text-small text-ink-soft">{lead.summary}</p>
            <p className="mt-6 max-w-[22ch] font-extralight leading-snug tracking-tight text-h3">
              {lead.detail.split(". ")[0]}.
            </p>
          </Link>

          {/*
            PC 에서는 세로 장부. 작은 원 셋을 위에만 얹으면 큰 원 옆 아래 절반이 비고
            크기 차이(500 vs 110px)가 극단적이었다. 한 줄에 원·이름·가격을 놓아
            오른쪽 기둥이 큰 원과 같은 높이로 선다. 제품이 셋(장부 2행)이 된 뒤로는 세로 가운데 정렬.
            모바일(<sm)도 장부 행 — 원형 2열은 셋이라 한 칸이 비었다(리더 지적). sm 만 원형 3열.
          */}
          <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 sm:divide-y-0 sm:border-y-0 lg:flex lg:flex-col lg:gap-0 lg:divide-y lg:border-y">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group pressable grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-5 py-5 sm:block sm:py-0 lg:grid lg:grid-cols-[7rem_minmax(0,1fr)_auto] lg:gap-8 lg:py-7"
                >
                  <ViewTransition
                    name={`product-${p.slug}`}
                    share="morph"
                    default="none"
                  >
                    <div className="relative row-span-2 aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-mint-deep group-hover:ring-offset-4 group-hover:ring-offset-paper sm:row-auto">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 112px, (min-width: 640px) 30vw, 80px"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </ViewTransition>
                  <div className="self-end sm:mt-4 sm:self-auto lg:mt-0">
                    <h2 className="text-lead font-bold transition-colors group-hover:text-mint-link">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-small leading-relaxed text-ink-soft">
                      {p.summary}
                    </p>
                  </div>
                  {/* 가격이 없으면 자리표('전화 문의')도 없다 — 가격은 나중에 들어온다(리더 지시). */}
                  {p.price !== null && (
                    <p className="mt-1.5 self-start text-small tabular-nums text-ink-soft sm:mt-2 sm:self-auto lg:mt-0 lg:text-right">
                      {`${p.price.toLocaleString("ko-KR")}원`}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 주문 경로가 셋인데 어디에도 안 적혀 있었다. 전화 주문 비중이 큰 곳이다. */}
      <section className="rise bg-paper-2">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionEyebrow phase={0.6}>주문</SectionEyebrow>
          <h2 className="mt-3 text-h3 lg:text-h2-lg">주문하는 방법</h2>
          {/* 스토어 주소가 없는 동안은 두 열 — "준비 중입니다" 자리표를 주문 섹션 한가운데 두지 않는다. */}
          <ul
            className={`mt-9 grid gap-8 ${site.storeUrl ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
          >
            <li className="border-t-2 border-moon pt-5">
              <h3 className="text-lead">전화 주문</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">
                수량과 구성을 상의해 정합니다. 이바지·예단처럼 구성이 정해지지
                않은 주문은 이쪽이 빠릅니다.
              </p>
              <a
                aria-label={`전화 걸기 ${site.tel}`}
                className="btn-lift mt-4 inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
                href={`tel:${site.tel.replace(/-/g, "")}`}
              >
                {site.tel}
              </a>
            </li>
            {site.storeUrl && (
              <li className="border-t-2 border-mint pt-5">
                <h3 className="text-lead">네이버 스마트스토어</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-soft">
                  구성이 정해진 제품은 스토어에서 바로 결제하실 수 있습니다.
                </p>
                <a
                  href={site.storeUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="link-draw mt-4 inline-block text-small"
                >
                  스토어로 가기<span className="sr-only"> (새 창)</span>
                </a>
              </li>
            )}
            <li className="border-t-2 border-rose pt-5">
              <h3 className="text-lead">매장 방문</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">
                {site.address}
                <br />
                {site.hours}
              </p>
              <Link
                className="mt-4 inline-block text-small underline decoration-ink/25 underline-offset-4 transition-colors hover:text-mint-link"
                href="/visit"
              >
                오시는 길
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 제품별 spec 에만 흩어져 있던 보관·해동을 한자리에. 가장 많이 묻는 것이다. */}
      <section className="section-y-tight rise mx-auto max-w-6xl px-5 lg:px-8">
        <SectionEyebrow phase={1}>보관</SectionEyebrow>
        <h2 className="mt-3 text-h3 lg:text-h2-lg">보관과 해동</h2>
        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lead">떡 — 절굿대떡</h3>
            <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10 text-small">
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">보관</dt>
                <dd className="text-ink-soft">
                  남은 떡은 굳기 전에 냉동해 주세요
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">해동</dt>
                <dd className="text-ink-soft">
                  실온에서 1~2시간, 또는 찜기·전자레인지로 말랑하게
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">드시는 법</dt>
                <dd className="text-ink-soft">
                  인절미 그대로가 가장 좋지만, 기호에 따라 청이나 콩가루를
                  곁들이셔도 됩니다
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lead">오란다 — 나주배 촉촉오란다</h3>
            <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10 text-small">
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">소비기한</dt>
                <dd className="text-ink-soft">제조일로부터 6개월</dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">보관</dt>
                <dd className="text-ink-soft">
                  상온 보관 가능. 오래 두실 경우 냉장·냉동을 권합니다
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">먹는 법</dt>
                <dd className="text-ink-soft">
                  냉동 보관 시 30분 전 상온 해동, 또는 전자레인지 15초
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 신뢰 근거. 홈에만 있고 정작 물건을 고르는 자리엔 없었다. */}
      {/* 포장·배송 — "낱개 포장이라 나눠 드리기 좋다"를 상자까지 보여 준다. 배송 조건(기간·비용)은 클라이언트 자료 뒤에. */}
      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <SectionEyebrow phase={0.9}>포장·배송</SectionEyebrow>
              <h2 className="mt-3 text-h2 lg:text-h2-lg">
                <span className="font-thin tracking-tight">낱개로 싸서, </span>
                <span className="font-black tracking-tighter">상자에 담아</span>
              </h2>
              <p className="mt-5 max-w-prose text-ink-soft">
                떡과 오란다는 한 개씩 따로 포장합니다. 여럿이 나눠 드시거나
                답례로 돌리기 좋고, 냉동해 두었다가 하나씩 꺼내기도 편합니다.
                택배는 보냉 상자에 담아 보냅니다.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 lg:gap-5">
              {[
                {
                  src: "/images/ship-cool-box.jpg",
                  alt: "신선식품 당일배송 띠를 두른 보냉 상자",
                },
                {
                  src: "/images/ship-carton.jpg",
                  alt: "테이프를 두른 택배 상자",
                },
              ].map((g) => (
                <li
                  key={g.src}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 330px, 45vw"
                    quality={88}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8 lg:grid-cols-4">
            {credentials.map((c) => (
              <li key={c.label}>
                <span aria-hidden className="mb-3 block h-px w-8 bg-moon" />
                <p className="font-semibold">{c.label}</p>
                <p className="mt-1 text-small leading-relaxed text-ink-soft">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ViewTransition>
  );
}
