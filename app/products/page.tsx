import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductImagePrefetch } from "@/components/product-image-prefetch";
import { SectionHead } from "@/components/section-head";
import { products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품",
  description:
    "절굿대떡, 나주배 촉촉오란다, 선물세트. 인공첨가물 없이 재래방식으로 빚습니다.",
  alternates: { canonical: "/products" },
  openGraph: {
    images: [
      {
        url: "/og/products-2026-09.jpg",
        width: 1200,
        height: 630,
        alt: "찻상에 올린 절굿대떡",
      },
    ],
  },
};

/*
  보관·해동 표는 제품 spec 에서 뽑는다 — 손으로 옮겨 적으면 상세 페이지와 어긋난다.
  포장 같은 보관 무관 항목은 걸러 두 표의 행 수를 맞추고, 「먹는 법」은 「드시는 법」으로 통일한다.
  해동·드시는 법 줄이 있는 제품만 싣는다 — 선물세트처럼 「보관」 한 줄뿐인 제품은 구성 제품 표가
  이미 말하고 있고, 셋째 표가 생기면 2열에서 한 칸이 빈다.
*/
const CARE_LABELS = ["소비기한", "보관", "해동", "드시는 법", "먹는 법"];
const SERVE_LABELS = ["해동", "드시는 법", "먹는 법"];
const careLabel = (label: string) =>
  label === "먹는 법" ? "드시는 법" : label;

export default function ProductsPage() {
  const care = products.flatMap((p) => {
    const rows = (p.spec ?? []).filter((s) => CARE_LABELS.includes(s.label));
    const serves = rows.some((s) => SERVE_LABELS.includes(s.label));
    return serves ? [{ name: p.name, rows }] : [];
  });
  const careSpan = Math.max(...care.map((c) => c.rows.length)) + 1;
  const visitNo = site.storeUrl ? "03" : "02";

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <ProductImagePrefetch products={products} />
      {/*
          서브페이지 히어로. 홈은 사진 위에 글자이고, 여기는 글자를 사진 밖으로 꺼낸다 —
          4개 페이지가 똑같은 "사진 위 흰 글씨"면 홈의 한 방이 희석된다. 그라디언트를 걷어
          사진이 그대로 보이고, 글자는 먹색으로 흰 종이 위에 앉는다.
        */}
      <section className="page-top mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHead
          as="h1"
          phase={0.1}
          eyebrow="제품"
          title={{ thin: "나주에서", black: "빚는 것들" }}
          lead="이바지·명절·답례에 두루 나갑니다. 낱개 포장이라 나눠 드리기 좋습니다."
        />
      </section>

      {/* 제품 목록 — 같은 크기의 실선 행 셋. 원은 상세의 큰 원으로 이어진다(ViewTransition). */}
      <div className="page-bottom rise mx-auto max-w-6xl px-5 pt-14 lg:px-8 lg:pt-20">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group pressable grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-x-5 py-6 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-10 lg:py-8"
              >
                <ViewTransition
                  name={`product-${p.slug}`}
                  share="morph"
                  default="none"
                >
                  <div className="photo-circle photo-circle-hover aspect-square">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 160px, 96px"
                      quality={80}
                      className="object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
                    />
                  </div>
                </ViewTransition>
                <div>
                  <h2 className="text-title transition-colors group-hover:text-mint-link">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-small text-ink-soft">{p.summary}</p>
                  {/* 가격이 없으면 자리표('전화 문의')도 없다 — 가격은 나중에 들어온다(리더 지시). */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 주문 경로. 전화 주문 비중이 큰 곳이다. 열마다 번호·제목·한 줄·액션 하나, 구조 동일. */}
      <section className="rise bg-paper-2">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHead phase={0.4} eyebrow="주문" title="주문하는 방법" />
          {/* 스토어 주소가 없는 동안은 두 열 — "준비 중입니다" 자리표를 주문 섹션 한가운데 두지 않는다. */}
          <ul
            className={`mt-9 grid gap-8 ${site.storeUrl ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
          >
            <li className="flex flex-col items-start border-t border-ink/10 pt-5">
              <p className="text-caption tabular-nums text-ink-faint">01</p>
              <h3 className="mt-2 text-lead">전화 주문</h3>
              <p className="mt-2 text-small text-ink-soft">
                수량과 구성을 상의해 정합니다. 이바지·예단처럼 구성이 정해지지
                않은 주문은 이쪽이 빠릅니다.
              </p>
              <a className="btn-primary mt-5" href={site.telHref}>
                전화 주문 {site.tel}
              </a>
            </li>
            {site.storeUrl && (
              <li className="flex flex-col items-start border-t border-ink/10 pt-5">
                <p className="text-caption tabular-nums text-ink-faint">02</p>
                <h3 className="mt-2 text-lead">네이버 스마트스토어</h3>
                <p className="mt-2 text-small text-ink-soft">
                  구성이 정해진 제품은 스토어에서 바로 결제하실 수 있습니다.
                </p>
                <a
                  href={site.storeUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="text-link mt-3"
                >
                  스토어 보러 가기<span className="sr-only"> (새 창)</span>
                </a>
              </li>
            )}
            <li className="flex flex-col items-start border-t border-ink/10 pt-5">
              <p className="text-caption tabular-nums text-ink-faint">
                {visitNo}
              </p>
              <h3 className="mt-2 text-lead">매장 방문</h3>
              <p className="mt-2 text-small text-ink-soft">
                {site.address} · {site.hours}
              </p>
              <Link className="text-link mt-3" href="/visit">
                오시는 길 보기
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 제품별 spec 에만 흩어져 있던 보관·해동을 한자리에. 가장 많이 묻는 것이다.
          PC 는 subgrid 로 두 표의 행을 같은 높이에 맞춘다 — 값 길이가 달라도 아래 실선이 나란하다. */}
      <section className="section-y-tight rise mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHead phase={0.7} eyebrow="보관" title="보관과 해동" />
        <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-2">
          {care.map((c) => (
            <div
              key={c.name}
              className="lg:grid lg:grid-rows-subgrid"
              style={{ gridRow: `span ${careSpan}` }}
            >
              <h3 className="text-lead">{c.name}</h3>
              <dl className="mt-4 text-small lg:contents">
                {c.rows.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex gap-6 border-t border-ink/10 py-4 ${
                      i === 0 ? "lg:mt-4" : ""
                    } ${i === c.rows.length - 1 ? "border-b" : ""}`}
                  >
                    <dt className="w-20 shrink-0 text-ink-faint">
                      {careLabel(s.label)}
                    </dt>
                    <dd className="text-ink-soft">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* 포장·배송 — "낱개 포장이라 나눠 드리기 좋다"를 상자까지 보여 준다. 배송 조건(기간·비용)은 클라이언트 자료 뒤에.
          사진은 보냉 상자 한 장 — 종이 상자 컷은 같은 띠를 두른 같은 구도라 겹쳤다. */}
      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <SectionHead
                phase={1}
                eyebrow="포장·배송"
                split="inline"
                title={{ thin: "낱개로 싸서, ", black: "상자에 담아" }}
              />
              <p className="mt-5 max-w-prose text-ink-soft">
                떡과 오란다는 한 개씩 따로 포장합니다. 여럿이 나눠 드시거나
                답례로 돌리기 좋고, 냉동해 두었다가 하나씩 꺼내기도 편합니다.
                택배는 보냉 상자에 담아 보냅니다.
              </p>
            </div>
            <div className="photo aspect-4/3">
              <Image
                src="/images/product-jeolgutdae-pack.jpg"
                alt="낱개 포장한 절굿대떡을 나무 소반에 담았다"
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                quality={80}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </ViewTransition>
  );
}
