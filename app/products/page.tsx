import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
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
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.92)_0%,rgba(22,22,22,0.58)_46%,rgba(22,22,22,0)_78%)]"
          />
          <div className="relative w-full px-6 pb-10 lg:px-10 lg:pb-12">
            <h1 className="text-h1 text-paper lg:text-h1-lg">
              빚는 것들
            </h1>
            <p className="mt-5 max-w-md text-small leading-relaxed text-paper/85 lg:text-body">
              이바지·명절·답례에 두루 나갑니다. 낱개 포장이라 나눠 드리기 좋습니다.
            </p>
          </div>
        </div>
      </section>

      <header className="rise mx-auto max-w-6xl px-5 pb-12 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
        <p className="max-w-prose text-ink-soft">
          유화제나 인공감미료를 넣지 않습니다. 무농약으로 기른 절굿대와
          나주배 농축액으로만 단맛을 냅니다.
        </p>
      </header>

      {/* 쓰임새 → 제품. 떡은 "무엇인가"보다 "언제 쓰는가"로 찾는 손님이 많다. */}
      <section className="rise mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-20">
        <h2 className="text-h3 lg:text-h2-lg">
          쓰임새로 고르기
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          <Link
            href={`/products/${lead.slug}`}
            className="group pressable relative block aspect-square overflow-hidden rounded-2xl bg-paper-2 lg:aspect-auto"
          >
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
              <p className="text-2xl text-paper lg:text-3xl">
                {lead.name}
              </p>
              <p className="mt-1.5 text-small text-paper/80">{lead.summary}</p>
            </div>
          </Link>

          <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:gap-x-6">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-paper-2">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 45vw"
                      quality={88}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h2 className="mt-4 text-lg transition-colors group-hover:text-mint-link">{p.name}</h2>
                  <p className="mt-0.5 text-caption leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>
                  {p.price !== null ? (
                    <p className="mt-2 font-medium">
                      {p.price.toLocaleString("ko-KR")}원
                    </p>
                  ) : (
                    <p className="mt-2 text-caption text-ink-soft">
                      가격 전화 문의
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
          <h2 className="text-h3 lg:text-h2-lg">
            주문하는 방법
          </h2>
          <ul className="mt-9 grid gap-8 lg:grid-cols-3">
            <li className="border-t-2 border-moon pt-5">
              <h3 className="text-lg">전화 주문</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">
                수량과 구성을 상의해 정합니다. 이바지·예단처럼 구성이 정해지지
                않은 주문은 이쪽이 빠릅니다.
              </p>
              <a
                aria-label={`전화 걸기 ${site.tel}`}
                className="btn-lift mt-4 inline-block border border-ink bg-ink px-6 py-2.5 text-small text-paper transition-colors hover:bg-ink-soft"
                href={`tel:${site.tel.replace(/-/g, "")}`}
              >
                {site.tel}
              </a>
            </li>
            <li className="border-t-2 border-mint pt-5">
              <h3 className="text-lg">네이버 스마트스토어</h3>
              <p className="mt-2 text-small leading-relaxed text-ink-soft">
                구성이 정해진 제품은 스토어에서 바로 결제하실 수 있습니다.
              </p>
              {/* TODO(클라이언트): 스토어 주소 수령 후 링크로 교체. */}
              <p className="mt-4 text-small text-ink-faint">준비 중입니다</p>
            </li>
            <li className="border-t-2 border-rose pt-5">
              <h3 className="text-lg">매장 방문</h3>
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
        <h2 className="text-h3 lg:text-h2-lg">
          보관과 해동
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg">떡 — 절굿대떡·제비쑥떡</h3>
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
            <h3 className="text-lg">오란다 — 나주배 촉촉오란다</h3>
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
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
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

    </>
  );
}
