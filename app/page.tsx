import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { MoonMark } from "@/components/moon-mark";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { credentials, products, site, timeline } from "@/lib/site";

/**
 * 홈은 편집 디자인으로 짠다.
 *
 * 처음엔 참고 사이트(압구정공주떡)의 "제목 + 두 문장 + 사진" 리듬을 따랐는데,
 * 사진이 넷뿐인 조건에서는 그 리듬이 여백을 고급이 아니라 빈 공간으로 읽히게 했다.
 * 그래서 사진 대신 활자로 밀도를 만든다 — 굵기 100↔900 대비, 88px 헤드라인,
 * 숫자 밴드, 인용문, 흐르는 낱말. 서체는 프리텐다드 한 벌(리더 결정).
 */
export default function HomePage() {
  const best = products.slice(0, 3);
  // 쓰임새 낱말. 제품 데이터에서 뽑아 중복 제거 — 손으로 적으면 제품과 어긋난다.
  const occasions = [...new Set(products.flatMap((p) => p.occasions))];
  // 연표 다섯 중 홈에는 셋만 — 사라짐·복원·등재. 나머지는 이야기 페이지에서.
  const teaser = [timeline[0], timeline[1], timeline[4]];

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {/* 1. 히어로 — 달 + 사진 + 88px 헤드라인 */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        <div className="relative">
          {/*
            달. 사진을 못 바꾸는 조건에서 홈을 서브페이지와 갈라 놓는 유일한 수단은 구성이다.
            단색 원 + 글로우만 — 테두리·얼굴을 얹는 순간 스티커가 된다. 프레임 밖으로 걸친다.
          */}
          <div
            aria-hidden
            className="enter-moon absolute -right-4 -top-5 z-10 size-20 rounded-full bg-moon shadow-[0_0_60px_12px_rgba(223,192,93,0.35)] lg:-right-10 lg:-top-10 lg:size-36"
          />
          {/* 세로 라벨. 편집 디자인의 여백은 비어 있지 않고 작은 글자가 지킨다. */}
          <p
            aria-hidden
            className="absolute -left-9 top-8 hidden font-mono text-caption tracking-[0.3em] text-ink-faint [writing-mode:vertical-rl] lg:block"
          >
            SINCE {site.since} — NAJU
          </p>
          <div className="relative isolate flex aspect-4/5 items-end overflow-hidden rounded-2xl bg-ink sm:aspect-16/10 lg:aspect-[1.79/1] ring-1 ring-inset ring-ink/5">
            <Image
              src="/images/hero-maker-wide.jpg"
              alt="김화수 대표가 갓 쳐낸 절굿대떡 판을 들어 보이고 있다"
              fill
              priority
              quality={92}
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="enter-photo object-cover object-[58%_50%] lg:object-center"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.92)_0%,rgba(22,22,22,0.58)_46%,rgba(22,22,22,0)_78%)]"
            />
            <div className="relative w-full px-6 pb-10 lg:px-12 lg:pb-14">
              {/*
                굵기로 읽는다 — 얇은 줄(100)이 위, 검은 줄(900)이 아래. 88px 부터
                이 대비가 표정이 된다. 문구는 클라이언트가 쓰는 표현 그대로.
              */}
              <h1 className="text-h1 text-paper lg:text-hero">
                <span className="enter-1 block font-thin tracking-tight">50년 만에 돌아온</span>
                <span className="enter-2 block font-black tracking-tighter">나주의 절굿대떡</span>
              </h1>
              <p className="enter-3 mt-6 max-w-md text-small leading-relaxed text-paper/85 lg:text-body">
                목사골 양반들이 이바지로 쓰던 귀한 떡. 깊은 산속에서만 자생하던
                절굿대를 육묘에 성공해 되살렸습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 숫자 밴드 — 활자로 만드는 밀도. 전부 연표·제품 데이터에 있는 사실이다.
          80px 는 375px 2열에서 '2016' 과 '50' 이 겹친다 → 모바일은 48px. */}
      <section className="rise mx-auto max-w-6xl px-5 pt-16 lg:px-8 lg:pt-20">
        <ul className="grid grid-cols-2 gap-y-10 border-y border-ink/10 py-10 lg:grid-cols-4 lg:py-12">
          {[
            { n: "2016", unit: "년", label: "절굿대 육묘 국내 최초 성공" },
            { n: "50", unit: "년 만", label: "사라졌던 떡의 부활" },
            { n: "2022", unit: "년", label: "슬로푸드 맛의방주 등재" },
            { n: String(products.length), unit: "가지", label: "지금 빚는 떡" },
          ].map((s) => (
            <li key={s.label} className="pr-6">
              <p className="font-black tracking-tighter tabular-nums text-h1-lg lg:text-num">
                {s.n}
                <span className="ml-1 align-baseline text-lead font-light tracking-normal text-ink-soft">
                  {s.unit}
                </span>
              </p>
              <p className="mt-2 text-small text-ink-soft">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 쓰임새 마퀴 — 떡은 "무엇인가"보다 "언제 쓰는가"로 찾는다 */}
      <div aria-hidden className="marquee mt-16 py-2 lg:mt-20 lg:py-3">
        <div className="marquee__track gap-10 px-5">
          {[...occasions, ...occasions].map((o, i) => (
            <span
              key={`${o}-${i}`}
              className="outline-text font-black tracking-normal text-h1-lg lg:text-hero"
            >
              {o}
              <span className="ml-10 text-moon [-webkit-text-stroke:0]">·</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">쓰임새: {occasions.join(", ")}</p>

      {/* 4. 대표 제품 — 원 = 제품 */}
      <section className="rise mx-auto max-w-6xl px-5 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow phase={0.15}>제품</SectionEyebrow>
            <h2 className="mt-3 font-black tracking-tight text-h2 lg:text-h2-lg">대표 제품</h2>
          </div>
          <Link
            href="/products"
            className="link-draw text-small text-ink-soft transition-colors hover:text-mint-link"
          >
            전체 제품 보기
          </Link>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3 lg:mt-14 lg:gap-x-10">
          {best.map((p, i) => (
            <li key={p.slug} className={i === 1 ? "sm:mt-14" : ""}>
              {/* 가운데 원만 내려서 비대칭 — 셋이 나란하면 스톡 템플릿이다 */}
              <Link href={`/products/${p.slug}`} className="group pressable block">
                <ViewTransition name={`product-${p.slug}`} share="morph" default="none">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 30vw, 90vw"
                    quality={88}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                  />
                  </div>
                </ViewTransition>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-lead font-bold transition-colors group-hover:text-mint-link">
                    {p.name}
                  </h3>
                  <p className="shrink-0 font-mono text-small tabular-nums text-ink-soft">
                    {p.price !== null
                      ? `${p.price.toLocaleString("ko-KR")}원`
                      : "전화 문의"}
                  </p>
                </div>
                <p className="mt-1 text-small leading-relaxed text-ink-soft">
                  {p.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. 인용 + 연표 예고 — 5:7 비대칭. 가운데 정렬 ABOUT 문단을 대신한다 */}
      <section className="rise border-t border-ink/10">
        <div className="section-y mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:px-8">
          <div>
            <SectionEyebrow phase={0.45}>이야기</SectionEyebrow>
            {/* 큰 인용은 얇게. 굵으면 구호가 되고, 얇으면 인용이 된다. */}
            <blockquote className="mt-6 font-extralight tracking-tight text-h2 lg:text-quote">
              천금과 같은 값어치가
              <br />
              있다 하여 붙은 이름,
              <br />
              <span className="font-black">천금누로탕.</span>
            </blockquote>
            <p className="mt-6 max-w-prose text-ink-soft">
              절굿대의 뿌리는 한방에서 누로(漏蘆)라 부르는 약재입니다. 절굿대떡을
              이바지에 쓴 것은 맛 때문만이 아니라 건강을 생각한 떡이라는 믿음
              때문이었습니다.
            </p>
            <Link
              href="/story"
              className="link-draw mt-8 inline-block text-small transition-colors hover:text-mint-link"
            >
              복원 이야기 전체 보기
            </Link>
          </div>

          <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:mt-2">
            {teaser.map((t) => (
              <li key={t.title} className="flex gap-6 py-6 lg:gap-8">
                <MoonMark phase={t.phase} size={28} className="mt-1 shrink-0 text-ink" />
                <div>
                  <p className="font-mono text-caption text-ink-faint">{t.when}</p>
                  <p className="mt-1 text-lead font-bold">{t.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. 브랜드 문구 밴드 — 넣지 않는 것 */}
      <section className="rise grid lg:grid-cols-2">
        <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/images/ingredients-board.jpg"
            alt="나무 도마에 올린 절굿대떡과 콩고물"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            className="object-cover"
          />
        </div>
        <div className="moonlit relative section-y-tight flex flex-col justify-center bg-bark px-5 text-paper lg:px-14 xl:px-20">
          <SectionEyebrow phase={0.6} tone="paper">
            재료
          </SectionEyebrow>
          <h2 className="mt-4 text-h2 lg:text-h2-lg">
            <span className="block font-thin">넣지 않는 것으로</span>
            <span className="block font-black">말합니다</span>
          </h2>
          <p className="mt-6 max-w-md text-small leading-[1.85] text-paper/85 lg:text-body">
            유화제나 인공감미료를 전혀 넣지 않고 전통 방식 그대로 빚습니다. 나주
            특산 배즙으로 자연스러운 단맛을 더했고, 찹쌀의 쫄깃한 식감은 소화에도
            부담이 없습니다.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-caption text-paper/70">
            {credentials.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-moon" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. 브랜드 문구 밴드 — 체험 */}
      <section className="rise grid lg:grid-cols-2">
        <div className="section-y-tight flex flex-col justify-center bg-paper-2 px-5 lg:order-1 lg:px-14 xl:px-20">
          <SectionEyebrow phase={0.7}>체험</SectionEyebrow>
          <h2 className="mt-4 text-h2 lg:text-h2-lg">
            <span className="block font-thin">직접 빚어 보는</span>
            <span className="block font-black">자리가 있습니다</span>
          </h2>
          <p className="mt-6 max-w-md text-small leading-[1.85] text-ink-soft lg:text-body">
            반죽을 치고 모양을 빚어 콩고물을 입히기까지 손으로 해 봅니다. 학교와
            단체가 자주 찾고, 여행길에 들르는 분들도 참여할 수 있습니다.
          </p>
          <Link
            href="/visit"
            className="link-draw mt-8 self-start text-small transition-colors hover:text-mint-link"
          >
            체험·매장 보러가기
          </Link>
        </div>
        <div className="relative aspect-4/3 lg:order-2 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/images/experience-hands.jpg"
            alt="체험 테이블에 늘어놓은 갓 빚은 절굿대떡과 나뭇잎 모양 떡"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            className="object-cover"
          />
        </div>
      </section>

      {/* 8. 전체 제품 */}
      <section className="rise">
        <div className="section-y mx-auto max-w-6xl px-5 lg:px-8">
          <SectionEyebrow phase={0.85}>전체 제품</SectionEyebrow>
          <h2 className="mt-3 font-black tracking-tight text-h2 lg:text-h2-lg">빚는 것들</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-paper-2 ring-1 ring-inset ring-ink/8 transition-[box-shadow] duration-300 group-hover:ring-mint">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 18vw, 44vw"
                      quality={88}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-5 text-center text-body transition-colors group-hover:text-mint-link">
                    {p.name}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. 방문·문의 */}
      <section className="rise mx-auto grid max-w-6xl gap-4 px-5 pb-20 sm:grid-cols-2 lg:px-8 lg:pb-28">
        <Link
          href="/visit"
          className="group pressable relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8"
        >
          <Image
            src="/images/store-front.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 45vw, 90vw"
            quality={88}
            className="object-cover opacity-30 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
          />
          <div className="relative">
            <p className="text-caption text-paper/70">방문구매를 원하시면</p>
            <p className="mt-1 text-2xl font-bold text-paper">오시는 길</p>
          </div>
        </Link>
        <a
          href={`tel:${site.tel.replace(/-/g, "")}`}
          className="btn-lift moonlit flex min-h-56 flex-col justify-end rounded-2xl bg-ink p-8 text-paper transition-colors hover:bg-ink-soft"
        >
          <p className="relative text-caption text-paper/70">주문·체험 문의는 전화로</p>
          <p className="relative mt-1 font-mono text-2xl font-bold tabular-nums">{site.tel}</p>
        </a>
      </section>
    </ViewTransition>
  );
}
