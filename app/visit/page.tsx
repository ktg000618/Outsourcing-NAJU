import Image from "next/image";
import { ViewTransition } from "react";

import type { Metadata } from "next";
import { KakaoMap } from "@/components/kakao-map";
import { Lightbox, LightboxButton } from "@/components/lightbox";
import { faq } from "@/lib/site";
import { SectionHead } from "@/components/section-head";
import { ExperienceRequestForm } from "@/components/experience-request-form";
import { experience, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "체험·매장",
  description: `${site.address}. 바람떡 만들기 체험과 떡카페를 함께 운영합니다.`,
  alternates: { canonical: "/visit" },
  openGraph: {
    images: [
      {
        url: "/og/visit-2026-09.jpg",
        width: 1200,
        height: 630,
        alt: "절굿대 밭에서 잎을 거두는 절굿대달토끼 부부",
      },
    ],
  },
};

const mapQuery = encodeURIComponent(`${site.address} ${site.name}`);

/* 체험 사진은 얼굴이 들어오지 않는 두 컷만. 나머지 자료 사진은 참가자 얼굴이 정면으로 크게 나와 초상권 동의 없이는 못 올린다. */
/* 체험 사진은 클라이언트 체험 자료(바람떡 만들기)에서. 얼굴이 나오는 교육 사진은 초상권 동의 없이 못 올린다. */
const experiencePhotos = [
  {
    src: "/images/making-hands.jpg",
    alt: "장갑 낀 손으로 초록 절굿대 반죽을 틀에 펴고 있다",
  },
  {
    src: "/images/baramtteok-box.jpg",
    alt: "상자에 담은 색색의 바람떡",
  },
];
/* 매장 사진은 장면이라 사각. 간판 「절굿대 달토끼」가 통째로 들어오는 위치로 자른다. */
const storePhotos = [
  {
    /* 2026-09-12 클라이언트가 보낸 낮 사진 — 파란 하늘 아래 「떡 Cafe」 간판까지 한 장에 들어온다. */
    src: "/images/store-front-day.jpg",
    alt: "파란 하늘 아래 초록 간판과 달토끼 엠블럼이 걸린 절굿대달토끼 떡카페 건물",
  },
  {
    src: "/images/shop-cutting.jpg",
    alt: "매장 안에서 김화수 대표가 절굿대떡을 반듯하게 자르고 있다",
  },
];
/* 검색 결과에 질문이 그대로 뜨게. 화면의 FAQ 와 같은 배열에서 만든다. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function VisitPage() {
  const {
    minPeople,
    maxPeople,
    duration,
    pricePerPerson,
    availability,
    takeaway,
  } = experience;
  const rows: { label: string; value: string | null }[] = [
    { label: "대상", value: experience.target },
    {
      label: "인원",
      value: minPeople && maxPeople ? `${minPeople}~${maxPeople}명` : null,
    },
    { label: "소요 시간", value: duration },
    {
      label: "참가비",
      value:
        pricePerPerson !== null
          ? `1인 ${pricePerPerson.toLocaleString("ko-KR")}원`
          : null,
    },
    { label: "운영", value: availability },
    { label: "결제", value: "문화누리카드 사용 가능" },
    { label: "단체", value: "학교·공공기관 단체 주문 환영" },
    { label: "가져가는 것", value: takeaway },
    {
      label: "예약",
      value: "인원과 날짜에 따라 준비가 필요합니다.",
    },
  ];

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/*
          서브페이지 히어로. 홈은 사진 위에 글자(+달)이고, 여기는 글자를 사진 밖으로 꺼낸다 —
          4개 페이지가 똑같은 "사진 위 흰 글씨"면 홈의 한 방이 희석된다. 그라디언트를 걷어
          사진이 그대로 보이고, 글자는 먹색으로 흰 종이 위에 앉는다.
        */}
      <section className="page-top mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHead
          as="h1"
          phase={0.1}
          eyebrow="체험·매장"
          title={{ thin: "빚어 보러", black: "오세요" }}
          lead="떡을 파는 데 그치지 않고, 직접 만들고 맛보는 체험장을 함께 운영합니다. 학교와 단체가 자주 찾습니다."
        />
        <div className="photo mt-10 aspect-4/3 sm:aspect-16/9 lg:mt-12 lg:aspect-[2.6/1]">
          <Image
            src="/images/owners-field.jpg"
            alt="절굿대 밭에서 잎을 거두는 절굿대달토끼 부부"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={80}
            className="object-cover object-[50%_40%]"
          />
        </div>
      </section>

      {/* 체험 */}
      {/* 세 덩이: 머리글 · 사진+조건 · 폼. 폰은 그 순서대로 쌓여 조건을 읽고 폼을 채우고, PC 는 사진+조건이 오른쪽 열에 서서 폼 옆을 따라 내려온다. */}
      <section className="section-y rise mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
          <div>
            <SectionHead
              phase={0.25}
              eyebrow="체험"
              title={{ thin: "바람떡 ", black: "만들기 체험" }}
              split="inline"
            />
            <p className="mt-6 max-w-prose text-ink-soft">
              떡 반죽을 밀고 앙금을 넣어 바람떡을 찍고, 예쁘게 꾸며 상자에 담아
              갑니다. 어린이 단체부터 어른 모임까지 참여할 수 있습니다.
            </p>
            {/*
              인솔자는 예산을 짜야 해서 인원·시간·참가비 없이는 전화를 못 건다.
              값이 아직 없으므로 자리를 만들어 두고 "전화 문의" 로 대체한다 —
              제품 가격과 같은 규칙이다. lib/site.ts 만 고치면 여기가 채워진다.
            */}
          </div>

          {/* 홈 히어로의 대표 사진(칼로 자르는 컷)은 같은 사람이 두 번 나와 손·반죽 컷으로 바꿨다. */}
          {/* 오른쪽 열: 사진 + 대상·예약. 폼이 길어 PC 에서 열이 비지 않게 따라 내려온다(sticky). */}
          <div className="self-start lg:sticky lg:top-24 lg:row-span-2">
            <Lightbox items={experiencePhotos}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {experiencePhotos.map((ph, i) => (
                  <div key={ph.src} className="photo aspect-4/3">
                    <LightboxButton index={i} label={ph.alt}>
                      <Image
                        src={ph.src}
                        alt={ph.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        quality={80}
                        className="object-cover"
                      />
                    </LightboxButton>
                  </div>
                ))}
              </div>
            </Lightbox>
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {rows
                .filter((r) => r.value !== null)
                .map((r) => (
                  <div key={r.label} className="flex gap-6 py-4">
                    <dt className="w-24 shrink-0 text-small text-ink-faint">
                      {r.label}
                    </dt>
                    <dd className="text-small">{r.value}</dd>
                  </div>
                ))}
            </dl>
            {/* 값이 없는 항목은 줄마다 '전화로 문의' 를 반복하지 않고 한 문장으로 —
                  같은 문구 다섯 줄은 벽이었다(모바일 전수 확인). 값이 채워지면 줄이 위 표로 올라간다. */}
            {rows.some((r) => r.value === null) && (
              <p className="mt-4 text-small text-ink-soft">
                인원·시간·참가비는 전화로 문의해 주세요.
              </p>
            )}
          </div>
          <div className="lg:col-start-1">
            {/* 전화 대신 남기는 길. 폼 아래 전화 링크가 남아 있어 실패해도 막다른 길이 아니다. */}
            <ExperienceRequestForm
              tel={site.tel}
              telHref={site.telHref}
              smsNumber={site.mobile}
            />
          </div>
        </div>
      </section>

      {/* 진행 순서. 실제로 손이 무엇을 하는지가 인솔자에겐 프로그램 설명이다.
          문안과 체험 사진으로 확인된 세 단계만 적는다. */}
      <section className="rise border-t border-ink/10">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHead
            phase={0.55}
            eyebrow="진행 순서"
            title={{ thin: "이렇게 ", black: "진행합니다" }}
            split="inline"
          />
          {/* 실선 장부 세 줄. 번호는 제목 옆 작은 캡션 — 큰 숫자는 위 연표·페이지 제목과 겨뤘다. */}
          <ol
            className={`mt-9 divide-y divide-ink/10 border-y border-ink/10 lg:grid lg:divide-x lg:divide-y-0 ${experience.steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
          >
            {experience.steps.map((step, i) => (
              <li
                key={step.title}
                className="py-5 lg:px-8 lg:py-6 lg:first:pl-0 lg:last:pr-0"
              >
                <h3 className="flex items-baseline gap-3 text-lead font-bold">
                  <span className="text-small font-normal tabular-nums tracking-normal text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-small text-ink-soft lg:pl-[calc(2ch+0.75rem)]">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 자주 묻는 질문 — 전화로 가장 많이 오는 것들. 접이식이라 목록은 짧고, 검색에는 FAQPage 로 전부 나간다. */}
      <section className="rise border-t border-ink/10">
        <script
          type="application/ld+json"
          // 우리가 만든 객체라 외부 입력이 섞이지 않는다.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHead
            phase={0.85}
            eyebrow="자주 묻는 질문"
            title={{ thin: "전화로 자주 ", black: "묻는 것들" }}
            split="inline"
          />
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10 lg:max-w-3xl">
            {faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-lead font-bold [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="shrink-0 font-light text-ink-faint transition-transform duration-base ease-brand group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길. 바로 아래 푸터가 먹색이라 여기까지 먹색이면 한 덩어리가 된다 — 종이색 위에 먹 글자. */}
      <section className="rise bg-paper-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-8 pt-16 sm:pb-10 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-14 lg:pt-28">
          <div>
            <SectionHead
              phase={1}
              eyebrow="매장"
              title={{ thin: "나주읍성 안,", black: "오시는 길" }}
            />
            <address className="mt-8 space-y-5 not-italic">
              <div>
                <p className="text-caption text-ink-faint">주소</p>
                {/* 마지막 어절(번지)만 앞 어절에 붙여 "7-1" 이 홀로 남지 않게 한다. PC 는 한 줄. */}
                <p className="mt-2 font-light tracking-tight text-title lg:whitespace-nowrap lg:text-h2">
                  {site.address.replace(/ (\S+)$/, "\u00A0$1")}
                </p>
              </div>
              {site.hours && (
                <div>
                  <p className="text-caption text-ink-faint">영업시간</p>
                  <p className="mt-2 font-light tracking-tight text-title lg:text-h2">
                    {site.hours}
                  </p>
                </div>
              )}
              {site.closedDays && (
                <div>
                  <p className="text-caption text-ink-faint">휴무</p>
                  <p className="mt-1 text-lead">{site.closedDays}</p>
                </div>
              )}
              {/* 오시는 길 — 역·터미널에서 얼마나 걸리는지. 관광객이 주소 다음으로 찾는 정보다. */}
              <div>
                <p className="text-caption text-ink-faint">오시는 길</p>
                <ul className="mt-2 divide-y divide-ink/10 border-y border-ink/10">
                  {site.directions.map((d) => (
                    <li
                      key={d.from}
                      className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="text-small text-ink-soft sm:w-44 sm:shrink-0">
                        {d.from}
                      </span>
                      <span className="text-body">{d.how}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </address>

            {/* 전화 버튼은 위 체험 섹션에 하나뿐이다 — 번호는 바로 아래 푸터에 크게 있다. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a
                href={site.kakaoPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                카카오맵 길찾기<span className="sr-only"> (새 창)</span>
              </a>
              <a
                href={`https://map.naver.com/p/search/${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="text-link self-start"
              >
                네이버 지도<span className="sr-only"> (새 창)</span>
              </a>
            </div>
          </div>

          {/* 매장 앞과 안. 둘 다 세로 컷이라 나란히 — 간판과 떡 자르는 손이 같은 높이에 선다. */}
          <Lightbox items={storePhotos}>
            <div className="grid grid-cols-2 gap-3 self-start sm:gap-4 lg:grid-cols-1">
              {storePhotos.map((ph, i) => (
                <div
                  key={ph.src}
                  className="photo aspect-[3/4] lg:aspect-[4/3]"
                >
                  <LightboxButton index={i} label={ph.alt}>
                    {/* 첫 칸: 폰(세로 칸)은 세로 사진, PC(가로 칸)는 낮 전경 — 가로 사진을 세로 칸에 넣으면 간판이 잘린다. */}
                    {i === 0 && (
                      <Image
                        src="/images/store-front.jpg"
                        alt={ph.alt}
                        fill
                        sizes="45vw"
                        quality={80}
                        className="object-cover object-[50%_45%] lg:hidden"
                      />
                    )}
                    <Image
                      src={ph.src}
                      alt={ph.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 45vw"
                      quality={80}
                      className={`object-cover ${i === 0 ? "hidden object-[50%_55%] lg:block" : "object-[50%_40%]"}`}
                    />
                  </LightboxButton>
                </div>
              ))}
            </div>
          </Lightbox>
        </div>
        {/* 지도는 본문 폭 안에 낮은 띠로 — 풀폭으로 깔면 화면을 다 먹는다. 가운데 표식 = 매장. */}
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20 lg:px-8 lg:pb-24">
          <KakaoMap className="mt-6 lg:mt-10" />
        </div>
      </section>
    </ViewTransition>
  );
}
