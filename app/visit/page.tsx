import Image from "next/image";
import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { experience, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "체험·매장",
  description: `${site.address}. 절굿대떡 만들기 체험과 떡카페를 함께 운영합니다.`,
};

const mapQuery = encodeURIComponent(`${site.address} ${site.name}`);

export default function VisitPage() {
  const { minPeople, maxPeople, duration, pricePerPerson, availability, takeaway } =
    experience;
  const rows: { label: string; value: string | null }[] = [
    { label: "대상", value: experience.target },
    {
      label: "인원",
      value:
        minPeople && maxPeople ? `${minPeople}~${maxPeople}명` : null,
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
    { label: "가져가는 것", value: takeaway },
    { label: "예약", value: "인원과 날짜에 따라 준비가 필요합니다. 미리 문의해 주세요." },
  ];

  return (
    <>
      {/* 홈 히어로와 같은 규칙 — 헤더 안쪽 폭(max-w-6xl)에 맞춘 중앙 정렬,
          틀 비율은 사진 원본 비율(1.6) 그대로라 잘려 나가는 곳이 없다. */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        <div className="relative isolate flex aspect-4/5 items-end overflow-hidden rounded-2xl bg-ink sm:aspect-16/10 lg:aspect-[1.6/1]">
          <Image
            src="/images/owners-counter.jpg"
            alt="떡카페 카운터에 선 절굿대달토끼 부부"
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={92}
            className="object-cover object-[50%_25%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.92)_0%,rgba(22,22,22,0.58)_46%,rgba(22,22,22,0)_78%)]"
          />
          <div className="relative w-full px-6 pb-10 lg:px-10 lg:pb-12">
            <p className="text-caption text-paper/70 lg:text-body">
              {site.addressLocality} 징고샅길
            </p>
            <h1 className="mt-3 text-h1 text-paper lg:text-h1-lg">
              빚어 보러 오세요
            </h1>
            <p className="mt-5 max-w-md text-small leading-relaxed text-paper/85 lg:text-body">
              떡을 파는 데 그치지 않고, 직접 만들고 맛보는 체험장을 함께
              운영합니다. 학교와 단체가 자주 찾습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 체험 */}
      <section className="section-y rise mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionEyebrow phase={0.25}>체험</SectionEyebrow>
            <h2 className="mt-3 text-h2 lg:text-h2-lg">
              절굿대떡 만들기 체험
            </h2>
            <p className="mt-6 max-w-prose text-ink-soft">
              반죽을 치고 모양을 빚어 콩고물을 입히기까지, 손으로 해 봅니다.
              어린이 단체부터 어른 모임까지 참여할 수 있습니다.
            </p>
            {/*
              인솔자는 예산을 짜야 해서 인원·시간·참가비 없이는 전화를 못 건다.
              값이 아직 없으므로 자리를 만들어 두고 "전화 문의" 로 대체한다 —
              제품 가격과 같은 규칙이다. lib/site.ts 만 고치면 여기가 채워진다.
            */}
            <dl className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-6 py-4">
                  <dt className="w-24 shrink-0 text-small text-ink-faint">
                    {r.label}
                  </dt>
                  <dd className="text-small">
                    {r.value ?? (
                      <span className="text-ink-soft">전화로 문의해 주세요</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              aria-label={`전화 걸기 ${site.tel}`}
              className="btn-lift mt-8 inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
              href={`tel:${site.tel.replace(/-/g, "")}`}
            >
              체험 문의 {site.tel}
            </a>
          </div>

          {/*
            체험 사진은 얼굴이 들어오지 않는 두 컷만 쓴다. 나머지 자료 사진은
            참가자 얼굴이 정면으로 크게 나와 초상권 동의 없이는 못 올린다.
          */}
          <div className="grid gap-4 self-start sm:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-square">
              <Image
                src="/images/experience-stamp.jpg"
                alt="장갑 낀 손으로 나무 떡살을 눌러 떡에 문양을 찍고 있다"
                fill
                sizes="(min-width: 1024px) 22vw, 90vw"
                quality={88}
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:mt-10 sm:aspect-square">
              <Image
                src="/images/experience-hands.jpg"
                alt="체험 테이블에 늘어놓은 갓 빚은 절굿대떡과 나뭇잎 모양 떡"
                fill
                sizes="(min-width: 1024px) 22vw, 90vw"
                quality={88}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 진행 순서. 실제로 손이 무엇을 하는지가 인솔자에겐 프로그램 설명이다.
          문안과 체험 사진으로 확인된 세 단계만 적는다. */}
      <section className="rise bg-paper-2">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionEyebrow phase={0.55}>진행 순서</SectionEyebrow>
          <h2 className="mt-3 text-h3 lg:text-h2-lg">
            이렇게 진행합니다
          </h2>
          <ol className="mt-9 grid gap-8 lg:grid-cols-3">
            {experience.steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-moon pt-5">
                <p className="font-mono text-caption tracking-widest text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg">{step.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-soft">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="moonlit rise bg-ink text-paper">
        <div className="section-y relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionEyebrow phase={0.9} tone="paper">매장</SectionEyebrow>
            <h2 className="mt-3 text-h2 lg:text-h2-lg">오시는 길</h2>
            <address className="mt-8 space-y-5 not-italic">
              <div>
                <p className="text-caption text-paper/50">주소</p>
                <p className="mt-1 text-lg">{site.address}</p>
              </div>
              <div>
                <p className="text-caption text-paper/50">전화</p>
                <p className="mt-1 text-lg">
                  <a
                    aria-label={`전화 걸기 ${site.tel}`}
                    className="underline decoration-paper/50 underline-offset-4 transition-colors hover:decoration-paper"
                    href={`tel:${site.tel.replace(/-/g, "")}`}
                  >
                    {site.tel}
                  </a>
                </p>
              </div>
              {site.hours && (
                <div>
                  <p className="text-caption text-paper/50">영업시간</p>
                  <p className="mt-1 text-lg">{site.hours}</p>
                </div>
              )}
              {site.closedDays && (
                <div>
                  <p className="text-caption text-paper/50">휴무</p>
                  <p className="mt-1 text-lg">{site.closedDays}</p>
                </div>
              )}
            </address>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`https://map.kakao.com/?q=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="btn-lift border border-paper bg-paper px-7 py-3 text-small text-ink transition-colors hover:border-paper/80 hover:bg-paper/80"
              >
                카카오맵으로 길찾기
              </a>
              <a
                href={`https://map.naver.com/p/search/${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="border border-paper/50 px-7 py-3 text-small transition-colors hover:border-mint hover:text-mint"
              >
                네이버 지도
              </a>
            </div>
          </div>

          {/* TODO(개발): 카카오맵 SDK 임베드. 지금은 지도 앱으로 넘긴다. */}
          {/* 아치 = 장소. 브랜드 라벨(public/brand/label.png)의 아치형 문에서 온 형태다. 매장 사진 한 종류에만 쓴다. */}
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full lg:aspect-auto lg:min-h-96">
            {/*
              지도 임베드는 뺐다. 카카오·네이버는 키가 있어야 하고, 키 없이 되는
              구글은 나주 시골 지역 데이터가 거의 없어 검은 섹션에 빈 사각형만
              뚫렸다(배포본 확인). 길찾기는 아래 버튼이 카카오·네이버로 넘긴다.
              키를 받으면 이 자리에 카카오 지도를 넣는다.
            */}
            <Image
              src="/images/store-front.jpg"
              alt="초록 간판과 달토끼 엠블럼이 걸린 절굿대달토끼 매장 건물"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={90}
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
