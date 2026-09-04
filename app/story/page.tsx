import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MoonMark } from "@/components/moon-mark";
import { credentials, history, site, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "이야기",
  description:
    "목사골 양반들이 이바지로 쓰던 나주 절굿대떡. 사라졌던 떡이 어떻게 돌아왔고, 왜 맛의방주에 올랐는지.",
};

export default function StoryPage() {
  return (
    <>
      {/* 홈 히어로와 같은 규칙 — 헤더 안쪽 폭(max-w-6xl)에 맞춘 중앙 정렬,
          틀 비율은 잘라 낸 사진의 비율(2.18) 그대로다.
          사진은 상세 카드(4500px)에서 뽑은 절굿대 꽃 — 브랜드 이름의 유래이자
          이 세트에서 가장 큰 원본이다. 아웃포커스라 헤드라인이 그 위에서 잘 읽힌다. */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        <div className="relative isolate flex aspect-5/4 items-end overflow-hidden rounded-2xl bg-ink sm:aspect-16/9 lg:aspect-[2.18/1]">
          <Image
            src="/images/thistle-bloom.jpg"
            alt="보랏빛 구체로 피어난 절굿대 꽃"
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
            <p className="text-sm text-moon lg:text-base">맛의방주 등재 품목</p>
            <h1 className="mt-3 text-[2.25rem] leading-[1.2] text-paper lg:text-[3rem]">
              천금의 가치가
              <br />
              있다던 떡
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/85 lg:text-base">
              한때 목사골 양반들의 이바지 떡으로 쓰일 만큼 귀한 대접을 받았고,
              세월이 흐르며 자취를 감췄던 떡입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 연표 — 달이 차오른다 */}
      <section className="rise mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
        <ol className="space-y-14">
          {timeline.map((t) => (
            <li key={t.title} className="flex gap-6">
              <MoonMark phase={t.phase} size={32} className="mt-1 shrink-0 text-ink" />
              <div>
                <p className="text-[14px] text-ink-faint">{t.when}</p>
                <h2 className="mt-1 text-2xl">{t.title}</h2>
                <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">
                  {t.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 약재로서의 절굿대 */}
      <section className="rise bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">
              누로(漏蘆), 천금과 같다는 뿌리
            </h2>
            <div className="mt-6 space-y-5 text-paper/80">
              <p className="max-w-prose">
                절굿대는 예부터 간을 보호하고 피를 맑게 하는 것으로 알려져
                왔습니다. 한방에서 호흡계·순환계·운동계 질환을 다스릴 때 쓰는
                약재 누로가 바로 절굿대의 뿌리입니다.
              </p>
              <p className="max-w-prose">
                이를 달인 탕약을 천금누로탕(千金漏蘆湯)이라 불렀습니다. 천금과
                같은 값어치가 있다 하여 붙은 이름입니다. 절굿대떡을 이바지에 쓴
                것은 맛 때문만이 아니라, 건강을 생각한 떡이라는 믿음 때문이었습니다.
              </p>
            </div>
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full">
            <Image
              src="/images/styling-table.jpg"
              alt="보자기 위에 차와 함께 놓인 절굿대떡"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 만드는 방식 */}
      <section className="rise mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">
          정직한 천연 재료만 사용합니다
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-ink-soft">
            <p className="max-w-prose">
              절굿대떡은 유화제나 인공감미료를 전혀 넣지 않고, 전통 방식 그대로
              정성껏 빚어냅니다. 나주의 특산물 배즙으로 자연스러운 단맛을 더하고,
              찹쌀의 쫄깃한 식감은 소화에도 부담이 없습니다.
            </p>
            <p className="max-w-prose">
              아침 식사 대용은 물론 아이들 영양 간식으로도 안심하고 즐기실 수
              있습니다. 떡에 들어가는 절굿대는 깊은 산속에서만 자생하던 것을
              육묘에 성공해 직접 기르고, 지금은 마을 어르신들께 위탁해 재배합니다.
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/images/board-tteok.jpg"
              alt="나무 도마에 놓인 절굿대떡과 콩고물, 절굿대 잎"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-8 border-t border-ink/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <li key={c.label}>
              <p className="text-lg">{c.label}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>

        {/* 연혁 — 인증·표창·업무협약까지 사실로 뒷받침하는 자리 */}
        <div className="mt-20 border-t border-ink/10 pt-14">
          <h2 className="text-[1.75rem] font-bold leading-none lg:text-4xl">
            Since 2016
          </h2>
          <ol className="mt-10 space-y-7">
            {history.map((h) => (
              <li key={h.year} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                <p className="w-16 shrink-0 font-semibold text-mocha">{h.year}</p>
                <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
                  {h.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="border border-ink bg-ink px-7 py-3 text-[15px] text-paper pressable transition-colors hover:bg-ink-soft hover:border-ink-soft"
          >
            제품 보기
          </Link>
          <Link
            href="/visit"
            className="border border-ink/30 px-7 py-3 text-[15px] transition-colors hover:border-mint-link hover:text-mint-link"
          >
            {site.addressLocality} 매장 안내
          </Link>
        </div>
      </section>
    </>
  );
}
