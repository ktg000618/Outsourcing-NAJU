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
            <p className="text-caption text-moon lg:text-body">맛의방주 등재 품목</p>
            <h1 className="mt-3 text-h1 text-paper lg:text-h1-lg">
              천금의 가치가
              <br />
              있다던 떡
            </h1>
            <p className="mt-5 max-w-md text-small leading-relaxed text-paper/85 lg:text-body">
              한때 목사골 양반들의 이바지 떡으로 쓰일 만큼 귀한 대접을 받았고,
              세월이 흐르며 자취를 감췄던 떡입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 연표 — 달이 차오른다 */}
      <section className="section-y rise mx-auto max-w-3xl px-5 lg:px-8">
        <ol className="space-y-14">
          {timeline.map((t) => (
            <li key={t.title} className="flex gap-6">
              <MoonMark phase={t.phase} size={32} className="mt-1 shrink-0 text-ink" />
              <div>
                <p className="text-caption text-ink-faint">{t.when}</p>
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
      <section className="moonlit rise bg-ink text-paper">
        <div className="section-y relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <div>
            <h2 className="text-h2 lg:text-h2-lg">
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
              {/* 브랜드 이름을 설명하는 사실인데 사이트 어디에도 없었다. */}
              <p className="max-w-prose">
                이름은 꽃에서 왔습니다. 둥근 꽃송이가 곡식을 찧던 절굿공이를
                닮았다 하여 절굿대입니다.
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

      {/*
        사회적기업으로서 하는 일. 클라이언트가 상세페이지에 쓴 원문인데 사이트에는
        한 줄도 없었다. 인증 배지만 걸어 두는 것보다 무엇을 하는지가 강하다.

        사진은 절굿대 밭이다. 사람 컷은 원본이 2600px 뿐이라 전폭에서 뭉개서 못 쓴다.
        이 컷은 원본 4500px 이라 화질은 버티는데 검정 멀칭이 화면을 먹는 게 문제였다.
        그래서 잎 비율이 가장 높은 가로 구간을 계산으로 골라 잘랐고(0.056~0.676),
        위아래로 딸려 오던 카드 배경·다음 사진은 색·밝기 경계를 찾아 제거했다.
        재촬영 때는 밭에서 일하는 사람 컷으로 바꾸는 게 맞다.
      */}
      <section className="rise bg-paper-2">
        <div className="relative aspect-[2.11/1] w-full">
          <Image
            src="/images/thistle-field.jpg"
            alt="검정 멀칭 사이로 줄지어 자라는 절굿대"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        </div>
        <div className="section-y mx-auto max-w-6xl px-5 lg:px-8">
          <p className="text-caption text-mint-link lg:text-small">
            사회적기업 인증 제2023-247호
          </p>
          <h2 className="mt-3 max-w-[16ch] text-h2 lg:text-h2-lg">
            씨앗을 나누고, 일자리로 돌려드립니다
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
            <div className="space-y-5 text-ink-soft">
              <p className="max-w-prose">
                씨앗을 나누어 드리고, 소규모 농가에서 직접 재배할 수 있도록
                지원하여 지역 어르신들에게 새로운 일자리를 제공합니다. 이를 통해
                단순한 생산 활동을 넘어 안정적인 고용 기반을 마련하고, 어르신들이
                지속적으로 경제활동에 참여할 수 있는 환경을 만들어가고 있습니다.
              </p>
              <p className="max-w-prose">
                또한 기업의 성장이 지역사회와 함께 이어질 수 있도록 매출의 일부를
                지역에 환원하며 선순환 구조를 만들어가고자 합니다.
              </p>
            </div>
            {/* 연혁에 흩어져 있던 협약을 한자리에. 말이 아니라 이름으로 뒷받침한다. */}
            <ul className="space-y-6 border-t border-ink/15 pt-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-1">
              {[
                { year: "2020", body: "장애인복지관·나주시다문화가족센터 등 사회복지시설 업무협약" },
                { year: "2021", body: "전라남도지사 표창 (사회복지부문)" },
                { year: "2023", body: "나주시 여성새로일하기센터·국립나주숲체원 업무협약" },
              ].map((r) => (
                <li key={r.year}>
                  <span aria-hidden className="mb-2 block h-px w-8 bg-moon" />
                  <p className="font-mono text-caption text-ink-faint">{r.year}</p>
                  <p className="mt-1 text-small leading-relaxed">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 만드는 방식 */}
      <section className="section-y rise mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-h2 lg:text-h2-lg">
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
              <p className="mt-1 text-small leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>

        {/* 연혁 — 인증·표창·업무협약까지 사실로 뒷받침하는 자리 */}
        <div className="mt-20 border-t border-ink/10 pt-14">
          <h2 className="text-h3 font-bold lg:text-h1">
            Since 2016
          </h2>
          <ol className="mt-10 space-y-7">
            {history.map((h) => (
              <li key={h.year} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                <p className="w-16 shrink-0 font-semibold text-mocha">{h.year}</p>
                <ul className="space-y-1.5 text-small leading-relaxed text-ink-soft">
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
            className="border border-ink bg-ink px-7 py-3 text-small text-paper btn-lift transition-colors hover:bg-ink-soft hover:border-ink-soft"
          >
            제품 보기
          </Link>
          <Link
            href="/visit"
            className="border border-ink/30 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
          >
            {site.addressLocality} 매장 안내
          </Link>
        </div>
      </section>
    </>
  );
}
