import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { credentials, products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품",
  description:
    "절굿대떡, 제비쑥떡, 호박고지떡, 나주배 촉촉오란다, 선물세트. 인공첨가물 없이 재래방식으로 빚습니다.",
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
            이바지·명절·답례에 두루 나갑니다. 낱개 포장이라 나눠 드리기 좋습니다.
            유화제나 인공감미료 없이 무농약 절굿대와 나주배 농축액으로만 단맛을 냅니다.
          </p>
          </div>
          <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-2xl bg-paper-2 sm:aspect-16/9 lg:aspect-[2/1] lg:mt-12 ring-1 ring-inset ring-ink/5">
            <Image
              src="/images/product-gift-scene.jpg"
              alt="떡카페 테이블에 놓인 절굿대떡 선물세트"
              fill
              priority
              sizes="(min-width: 1200px) 1152px, 100vw"
              quality={88}
              className="object-cover object-center"
            />
          </div>
      </section>

      {/* 쓰임새 → 제품. 떡은 "무엇인가"보다 "언제 쓰는가"로 찾는 손님이 많다. */}
      <section className="rise mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-20">
        <SectionEyebrow phase={0.25}>쓰임새</SectionEyebrow>
        <h2 className="mt-3 text-h3 lg:text-h2-lg">
          쓰임새로 고르기
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:gap-x-8 lg:grid-cols-3">
          {[...byOccasion.entries()].map(([occasion, list]) => (
            <li key={occasion} className="border-t border-ink/15 pt-4">
              <p className="inline-block bg-rose/25 px-3 py-1 text-caption text-ink">
                {occasion}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link
                      className="text-small text-ink-soft underline decoration-ink/20 underline-offset-4 transition-colors hover:text-mint-link hover:decoration-mint-link"
                      href={`/products/${p.slug}`}
                    >
                      {p.name}
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start lg:gap-14">
          {/* 이 원이 제품 페이지에서 가장 큰 브랜드 형태다. 글자는 사진 위가 아니라 아래. */}
          <Link href={`/products/${lead.slug}`} className="group pressable block">
            <ViewTransition name={`product-${lead.slug}`} share="morph" default="none">
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
            오른쪽 기둥이 큰 원과 같은 높이로 선다.
            모바일(<sm)도 장부 행 — 원형 2열은 셋이라 한 칸이 비었다(리더 지적). sm 만 원형 3열.
          */}
          <ul className="flex flex-col divide-y divide-ink/10 border-y border-ink/10 sm:grid sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 sm:divide-y-0 sm:border-y-0 lg:flex lg:flex-col lg:gap-0 lg:divide-y lg:border-y">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group pressable grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-5 py-5 sm:block sm:py-0 lg:grid lg:grid-cols-[7rem_minmax(0,1fr)_auto] lg:gap-8 lg:py-7"
                >
                  <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
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
                    <p className="mt-1 text-small leading-relaxed text-ink-soft">{p.summary}</p>
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
          <h2 className="mt-3 text-h3 lg:text-h2-lg">
            주문하는 방법
          </h2>
          {/* 스토어 주소가 없는 동안은 두 열 — "준비 중입니다" 자리표를 주문 섹션 한가운데 두지 않는다. */}
          <ul className={`mt-9 grid gap-8 ${site.storeUrl ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
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
        <h2 className="mt-3 text-h3 lg:text-h2-lg">
          보관과 해동
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lead">떡 — 절굿대떡·제비쑥떡</h3>
            <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10 text-small">
              <div className="flex gap-6 py-4">
                <dt className="w-20 shrink-0 text-ink-faint">보관</dt>
                <dd className="text-ink-soft">남은 떡은 굳기 전에 냉동해 주세요</dd>
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
