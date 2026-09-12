import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/section-head";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "절굿대 — 산에서 자라던 풀",
  description:
    "절굿대는 국화과 여러해살이풀입니다. 7~8월 둥근 남보라색 꽃이 피고, 뿌리는 옛 의서에서 누로(漏蘆)라 불렀습니다. 절굿대달토끼는 잎을 갈아 떡에 넣습니다.",
  alternates: { canonical: "/jeolgutdae" },
  openGraph: {
    images: [
      {
        url: "/og/jeolgutdae-2026-09.jpg",
        width: 1200,
        height: 630,
        alt: "꽃봉오리가 맺힌 절굿대 밭",
      },
    ],
  },
};

/* 공개 자료(위키백과 한국어·영어 「절굿대 / Echinops setifer」)에 적힌 것만 옮겼다. 자생지·이름 유래처럼 출처가 갈리는 항목은 단정하지 않는다. */
const facts = [
  { label: "학명", value: "Echinops setifer" },
  { label: "분류", value: "국화과 여러해살이풀" },
  { label: "키", value: "약 1m. 줄기가 굵고 곧게 섭니다" },
  {
    label: "잎",
    value:
      "깃꼴로 깊게 갈라지고 가장자리에 톱니가 있습니다. 엉겅퀴를 닮았습니다",
  },
  {
    label: "꽃",
    value: "7~8월, 남보라색 작은 꽃이 공처럼 둥글게 모여 핍니다",
  },
  { label: "자라는 곳", value: "한국 · 일본 · 중국 동부의 산지" },
  { label: "다른 이름", value: "둥둥방망이 · 개수리취" },
  { label: "한약명", value: "누로(漏蘆) — 말린 뿌리" },
];

export default function JeolgutdaePage() {
  return (
    <>
      <section className="page-top mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHead
          as="h1"
          phase={0.1}
          eyebrow="절굿대"
          title={{ thin: "산에서 자라던 풀,", black: "절굿대" }}
          lead="떡 이름의 절굿대는 국화과 여러해살이풀입니다. 여름에 공처럼 둥근 남보라색 꽃이 피고, 절굿대달토끼는 그 잎을 갈아 떡에 넣습니다."
        />
      </section>

      {/* 꽃 — 이 풀을 처음 보는 사람이 대부분이라 사진이 먼저다. */}
      <div className="mx-auto max-w-6xl px-5 pt-12 lg:px-8 lg:pt-16">
        <div className="photo aspect-3/2">
          <Image
            src="/images/jeolgutdae-bloom.jpg"
            alt="둥근 꽃봉오리가 맺힌 절굿대 밭"
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={80}
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-caption text-ink-faint">
          꽃봉오리가 맺힌 절굿대. 여름이면 이 공이 남보라색으로 핍니다.
        </p>
      </div>

      {/* 무엇인가 — 표 하나로 끝낸다. 설명문으로 늘이면 백과사전 흉내가 된다. */}
      <section className="section-y-tight rise mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHead
              phase={0.3}
              eyebrow="무엇인가"
              title={{ thin: "엉겅퀴를 닮은", black: "국화과 풀" }}
            />
            <p className="mt-6 max-w-prose text-ink-soft">
              둥근 꽃송이가 절구 공이를 닮았다고 절굿대라 부릅니다. 같은 뜻의
              다른 이름이 둥둥방망이입니다. 뿌리를 말린 것은 옛 의서에서
              누로(漏蘆)라 했고,{" "}
              <Link href="/story" className="text-link-inline">
                천금누로탕 이야기
              </Link>
              는 이야기 페이지에 있습니다.
            </p>
          </div>
          <dl className="divide-y divide-ink/10 border-y border-ink/10 text-small">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-5 py-3">
                <dt className="w-24 shrink-0 text-ink-faint">{f.label}</dt>
                <dd className="text-ink-soft">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 왜 떡에 넣나 — 재배 사진 셋. 사람 얼굴이 정면으로 크게 나오지 않는 컷만. */}
      <section className="rise bg-paper-2">
        <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHead
            phase={0.6}
            eyebrow="떡에 넣는 이유"
            title={{ thin: "잎을 갈아", black: "반죽에 넣습니다" }}
            lead="절굿대떡의 초록은 물감이 아니라 잎의 색입니다. 산에서만 자라던 풀을 2016년 육묘에 성공해 나주에서 직접 기르고, 지금은 씨앗을 나누어 마을 어르신들께 재배를 맡깁니다."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-3 lg:gap-5">
            {[
              {
                src: "/images/field-rows.jpg",
                alt: "줄지어 심은 절굿대 밭",
                caption: "나주의 절굿대 밭",
              },
              {
                src: "/images/growers-harvest.jpg",
                alt: "절굿대 잎을 거두는 사람들",
                caption: "잎을 거둡니다",
              },
              {
                src: "/images/ing-jeolgutdae-paste.jpg",
                alt: "흰 그릇에 담긴 절굿대 잎 반죽",
                caption: "갈아서 반죽에 넣습니다",
              },
            ].map((p) => (
              <li key={p.src}>
                <div className="photo aspect-4/3">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 30vw, 90vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-caption text-ink-faint">{p.caption}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link href="/products/jeolgutdae" className="btn-primary">
              절굿대떡 보기
            </Link>
            <Link href="/story" className="text-link self-start">
              50년 만에 돌아온 이야기
            </Link>
          </div>
        </div>
      </section>

      {/* 맺음 — 홈 마지막 「주문·체험 문의」와 같은 실선 행. 풀을 보러 오는 사람도 매장으로 안내한다. */}
      <section className="rise mx-auto max-w-6xl px-5 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          <li className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:py-6">
            <div>
              <p className="text-lead font-bold">떡카페에서 맛보기</p>
              <p className="mt-1 text-small text-ink-soft">
                {site.address} · {site.hours}
              </p>
            </div>
            <Link href="/visit" className="btn-primary">
              오시는 길
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
