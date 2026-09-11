import Image from "next/image";
import { ViewTransition } from "react";

import Link from "next/link";
import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { MoonMark } from "@/components/moon-mark";
import { credentials, site, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "이야기",
  description:
    "목사골 양반들이 이바지로 쓰던 나주 절굿대떡. 사라졌던 떡이 어떻게 돌아왔고, 왜 맛의방주에 올랐는지.",
  alternates: { canonical: "/story" },
  openGraph: {
    images: [
      {
        url: "/og/story-2026-09.jpg",
        width: 1200,
        height: 630,
        alt: "밭에서 꽃봉오리를 맺은 절굿대",
      },
    ],
  },
};

/*
  연표 한 벌. 이전에는 같은 연대기가 세 번 있었다(상단 연표·「씨앗을 나누고」의 협약 목록·
  하단 「Since 2016」 표). 여기 한 곳에 모은다. 아래 추가 행의 문구는 lib/site.ts history 와
  같은 것이다. "한때" 행은 숫자가 아니라서 연표에서 빼고 첫 문단으로 옮겼다.
*/
type Row = { when: string; title: string; body?: string };
const rows: Row[] = [
  ...timeline
    .filter((t) => /^\d{4}년$/.test(t.when))
    .map((t) => ({ when: t.when, title: t.title, body: t.body })),
  {
    when: "2020년",
    title: "장애인복지관·나주시다문화가족센터 등 사회복지시설 업무협약",
  },
  { when: "2021년", title: "전라남도지사 표창 (사회복지부문)" },
  {
    when: "2023년",
    title: "사회적기업 인증 제2023-247 (고용노동부)",
    body: "나주시 여성새로일하기센터·국립나주숲체원 등 업무협약을 맺었습니다.",
  },
  {
    when: "2024년",
    title: "나주시 고향사랑 답례품 선정 (절굿대떡, 나주배촉촉오란다)",
  },
].sort((a, b) => a.when.localeCompare(b.when));

export default function StoryPage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/*
          서브페이지 히어로. 홈은 사진 위에 글자(+달)이고, 여기는 글자를 사진 밖으로 꺼낸다 —
          4개 페이지가 똑같은 "사진 위 흰 글씨"면 홈의 한 방이 희석된다. 그라디언트를 걷어
          사진이 그대로 보이고, 글자는 먹색으로 흰 종이 위에 앉는다.
        */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-10 lg:px-8 lg:pt-14">
        <SectionEyebrow phase={0.1}>이야기</SectionEyebrow>
        <div className="mt-4 lg:grid lg:grid-cols-[7fr_5fr] lg:items-end lg:gap-16">
          <h1 className="max-w-[16ch] text-h1 lg:text-hero">
            <span className="block font-thin tracking-tight">
              천금의 가치가
            </span>
            <span className="block font-black tracking-tighter">있다던 떡</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft lg:mt-0 lg:pb-3">
            한때 지역에서 으뜸가는 떡이라 하여 목사골 양반들의 이바지에 올랐고,
            세월이 흐르며 자취를 감춰 어르신들의 기억 속 전설로만 남았던
            떡입니다.
          </p>
        </div>
        <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-2xl bg-paper-2 sm:aspect-16/9 lg:aspect-[2.6/1] lg:mt-12 ring-1 ring-inset ring-ink/5">
          <Image
            src="/images/jeolgutdae-bloom.jpg"
            alt="밭에서 꽃봉오리를 맺은 절굿대"
            fill
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            quality={88}
            className="enter-photo object-cover object-[50%_35%]"
          />
        </div>
      </section>

      {/* 연표 — 달이 차오른다. 연도는 페이지 제목보다 크지 않게(PC h2·모바일 h3). */}
      <section className="rise border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-16">
          <SectionEyebrow phase={0.2}>연표</SectionEyebrow>
          <ol className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
            {rows.map((t, i) => (
              <li
                key={t.when}
                className="grid gap-3 py-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-9"
              >
                <div className="flex items-center gap-4">
                  <MoonMark
                    phase={(i + 1) / rows.length}
                    size={24}
                    className="shrink-0 text-ink"
                  />
                  <p className="font-black tracking-tighter tabular-nums text-h3 lg:text-h2">
                    {t.when.replace(/년$/, "")}
                    <span className="ml-1 text-lead font-light tracking-normal text-ink-soft">
                      년
                    </span>
                  </p>
                </div>
                <div className="lg:pt-1">
                  <h2 className="text-lead font-bold lg:text-h3">{t.title}</h2>
                  {t.body && (
                    <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">
                      {t.body}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {/* 글만 서 있던 연표에 증거 한 장 — 국내 최초 육묘를 밭 이랑이 말한다. 행 안에 두면 그 행만 세 배로 길어져 밖으로 뺐다. */}
          <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5 lg:mt-14 lg:aspect-[2.6/1]">
            <Image
              src="/images/field-rows.jpg"
              alt="이랑을 따라 자란 절굿대 밭과 마을"
              fill
              sizes="(min-width: 1200px) 1152px, 100vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 약재로서의 절굿대 */}
      <section className="moonlit rise bg-ink text-paper">
        <div className="section-y relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div>
            <SectionEyebrow phase={0.4} tone="paper">
              이름의 뿌리
            </SectionEyebrow>
            <h2 className="mt-3 text-h2 lg:text-h2-lg">
              <span className="block font-thin">누로(漏蘆),</span>
              <span className="block font-black">천금과 같다는 뿌리</span>
            </h2>
            <div className="mt-6 space-y-5 text-paper/80">
              {/* 효능·질환 서술은 식품표시광고법에 걸린다 — 이름의 유래만 적는다. */}
              <p className="max-w-prose">
                절굿대의 뿌리를 옛 의서에서는 누로(漏蘆)라 불렀습니다.
              </p>
              <p className="max-w-prose">
                이를 달인 탕약을 천금누로탕(千金漏蘆湯)이라 불렀습니다. 천금과
                같은 값어치가 있다 하여 붙은 이름입니다. 절굿대떡을 이바지에 쓴
                것은 맛 때문만이 아니라, 건강을 생각한 떡이라는 믿음
                때문이었습니다.
              </p>
              {/* 브랜드 이름을 설명하는 사실인데 사이트 어디에도 없었다. */}
              <p className="max-w-prose">
                이름은 꽃에서 왔습니다. 둥근 꽃송이가 곡식을 찧던 절굿공이를
                닮았다 하여 절굿대입니다.
              </p>
            </div>
          </div>
          {/* 장면 사진은 사각. 히어로가 이미 꽃이라 여기는 밭 — 같은 꽃이 두 번 나오지 않게. */}
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl ring-1 ring-inset ring-ink/5">
            <Image
              src="/images/growers-harvest.jpg"
              alt="절굿대 밭에서 잎을 거두어 바구니에 담고 있다"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover object-[55%_50%]"
            />
          </div>
        </div>
      </section>

      {/* 씨앗·재배. 협약 연도 목록은 위 연표로 합쳤다. */}
      <section className="rise bg-paper-2">
        <div className="section-y mx-auto max-w-6xl px-5 lg:px-8">
          <SectionEyebrow phase={0.65}>씨앗과 일자리</SectionEyebrow>
          <h2 className="mt-3 max-w-[16ch] text-h2 lg:text-h2-lg">
            <span className="block font-thin">씨앗을 나누고,</span>
            <span className="block font-black">일자리로 돌려드립니다</span>
          </h2>
          <div className="mt-10 space-y-5 text-ink-soft">
            <p className="max-w-prose">
              씨앗을 나누어 드리고, 소규모 농가에서 직접 재배할 수 있도록
              지원하여 지역 어르신들에게 새로운 일자리를 제공합니다. 이를 통해
              단순한 생산 활동을 넘어 안정적인 고용 기반을 마련하고, 어르신들이
              지속적으로 경제활동에 참여할 수 있는 환경을 만들어 가고 있습니다.
            </p>
            <p className="max-w-prose">
              또한 기업의 성장이 지역사회와 함께 이어질 수 있도록 매출의 일부를
              지역에 환원하며 선순환 구조를 만들어 가고자 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 만드는 방식 */}
      <section className="section-y rise mx-auto max-w-6xl px-5 lg:px-8">
        <SectionEyebrow phase={1}>만드는 방식</SectionEyebrow>
        <h2 className="mt-3 text-h2 lg:text-h2-lg">
          <span className="block font-thin">재료 그대로</span>
          <span className="block font-black">빚습니다</span>
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* 재료 무첨가 설명은 제품 페이지에 있다. 여기는 재배 이야기만. */}
          <div className="space-y-5 text-ink-soft">
            <p className="max-w-prose">
              떡에 들어가는 절굿대는 깊은 산속에서만 자생하던 것을 2016년 육묘에
              성공해 직접 기릅니다. 지금은 씨앗을 나누어 드리고 마을 어르신들께
              위탁해 재배합니다.
            </p>
            <p className="max-w-prose">
              그렇게 기른 절굿대를 넣은 반죽을 손으로 쳐서 빚습니다.
            </p>
          </div>
          <div className="relative aspect-[2/1] overflow-hidden rounded-2xl ring-1 ring-inset ring-ink/5 lg:aspect-4/3">
            <Image
              src="/images/tteok-mat.jpg"
              alt="라탄 매트 위 절굿대떡과 낱개 포장, 콩고물"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover object-right"
            />
          </div>
        </div>

        {/* 공정 세 장면 — "전통 방식 그대로" 를 말이 아니라 손으로 보여 준다. 순서가 곧 공정이라 번호 없이 왼→오.
            얼굴이 눈높이에서 잘리는 컷(반죽 늘리기)은 뺐다 — 세 장 모두 손만 나온다. */}
        <ul
          aria-label="만드는 과정 사진"
          className="-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {[
            {
              src: "/images/process-flour.jpg",
              alt: "체에 내린 쌀가루를 손으로 살핀다",
              /* 손이 오른쪽 가장자리에 있다 — 가운데로 자르면 손이 나간다. */
              position: "object-right",
            },
            {
              src: "/images/process-pour.jpg",
              alt: "절굿대를 넣은 초록 반죽을 틀에 붓는다",
              position: "object-center",
            },
            {
              src: "/images/making-hands.jpg",
              alt: "장갑 낀 손으로 초록 반죽을 틀에 고르게 편다",
              position: "object-center",
            },
          ].map((s) => (
            <li
              key={s.src}
              className="relative aspect-4/3 w-[72vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-inset ring-ink/5 sm:w-auto"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 360px, 30vw"
                quality={88}
                className={`object-cover ${s.position}`}
              />
            </li>
          ))}
        </ul>

        {/* 신뢰 근거. 사이트에서 인증·선정이 나오는 유일한 자리 — 카드가 아니라 실선 장부. */}
        <ul className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {credentials.map((c) => (
            <li
              key={c.label}
              className="grid gap-1 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6 sm:py-5"
            >
              <p className="font-semibold">{c.label}</p>
              <p className="text-small leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/products" className="btn-primary">
            제품 보기
          </Link>
          <Link href="/visit" className="text-link">
            {site.addressLocality} 매장 안내
          </Link>
        </div>
      </section>
    </ViewTransition>
  );
}
