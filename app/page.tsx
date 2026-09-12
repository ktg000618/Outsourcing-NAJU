import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { HeroSlides } from "@/components/hero-slides";
import { ProductImagePrefetch } from "@/components/product-image-prefetch";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionHead } from "@/components/section-head";
import { formatNewsDate, getPublishedPosts } from "@/lib/news";
import { products, site, timeline } from "@/lib/site";

/**
 * 홈은 편집 디자인으로 짠다.
 *
 * 처음엔 참고 사이트(압구정공주떡)의 "제목 + 두 문장 + 사진" 리듬을 따랐는데,
 * 사진이 넷뿐인 조건에서는 그 리듬이 여백을 고급이 아니라 빈 공간으로 읽히게 했다.
 * 그래서 사진 대신 활자로 밀도를 만든다 — 굵기 100↔900 대비, 88px 헤드라인,
 * 숫자 밴드, 인용문, 실선 목록. 서체는 프리텐다드 한 벌(확정 사항).
 */
/** 최근 소식 셋은 Supabase 에서 온다 — 관리 화면 저장 시 revalidatePath("/") 로 바로, 그 밖엔 1시간. */
export const revalidate = 3600;

export default async function HomePage() {
  const latest = (await getPublishedPosts(3)).slice(0, 3);
  const best = products.slice(0, 3);
  // 연표 다섯 중 홈에는 셋만 — 사라짐·복원·등재. 나머지는 이야기 페이지에서.
  // 숫자 밴드(2016·2022)와 겹치지 않는 셋 — 한때·2017 부활·2019 떡카페.
  const teaser = [timeline[0], timeline[2], timeline[3]];

  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <ProductImagePrefetch products={products} />
      {/* 1. 히어로 — 사진 + 88px 헤드라인 */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        {/*
          375px 에서 1.79:1 사진을 4:5 세로 상자에 넣으면 폭의 55% 가 잘려 얼굴만 남았다(실측).
          모바일(<sm)은 구조를 바꾼다 — 사진은 4:3 으로 위에(잘림 26%), 글은 같은 먹색 카드
          안 아래에. sm 부터는 사진 위에 글을 얹는 원래 구성(16:10 이면 잘림 11%).
        */}
        <div className="relative isolate overflow-hidden rounded-2xl bg-ink ring-1 ring-inset ring-paper/15 sm:flex sm:aspect-16/10 sm:items-end lg:aspect-[1.79/1]">
          <div className="relative aspect-4/3 w-full sm:absolute sm:inset-0 sm:aspect-auto">
            {/*
              사진 넷이 이야기 순서로 돈다 — 찻상 위 떡 → 밭의 두 사람 → 손으로 펴는 반죽 → 절굿대 꽃.
              대표 단독 컷(hero-maker-wide)은 간판의 전화번호가 헤드라인과 겹쳐 뺐다.
              object-position 은 모바일 4:3(폭 26% 잘림)과 PC 1.79:1 에서 각각 실측해 잡았다.
            */}
            <HeroSlides
              slides={[
                {
                  src: "/images/product-gift-scene.jpg",
                  alt: "찻상에 올린 절굿대떡과 찻주전자",
                  position: "object-[50%_85%]",
                },
                {
                  src: "/images/owners-field.jpg",
                  alt: "절굿대 밭에서 잎을 거두는 두 사람",
                  position: "object-[50%_40%] lg:object-[50%_45%]",
                },
                {
                  src: "/images/making-hands.jpg",
                  alt: "장갑 낀 손으로 초록 반죽을 펴고 있다",
                  position: "object-center",
                },
                {
                  src: "/images/jeolgutdae-bloom.jpg",
                  alt: "밭에서 꽃봉오리를 맺은 절굿대",
                  position: "object-[50%_38%]",
                },
              ]}
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-linear-to-t from-ink/92 via-ink/58 via-46% to-transparent to-78% sm:block"
            />
          </div>
          <div className="relative w-full px-6 pb-9 pt-7 sm:pb-10 sm:pt-0 lg:px-12 lg:pb-14">
            {/*
              굵기로 읽는다 — 얇은 줄(100)이 위, 검은 줄(900)이 아래. 88px 부터
              이 대비가 표정이 된다. 문구는 클라이언트가 쓰는 표현 그대로.
            */}
            <h1 className="text-h1 text-paper lg:text-hero">
              <span className="enter-1 block font-thin tracking-tight">
                50년 만에 돌아온
              </span>
              <span className="enter-2 block font-black tracking-tighter">
                나주의 절굿대떡
              </span>
            </h1>
            <p className="enter-3 mt-6 max-w-md text-small text-paper-soft lg:text-body">
              목사골 양반들이 이바지로 쓰던 귀한 떡. 깊은 산속에서만 자생하던
              절굿대를 육묘에 성공해 되살렸습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 숫자 밴드 — 전부 연표에 있는 사실이다. 숫자는 헤드라인보다 크지 않다.
          <sm 은 장부 행(숫자·설명 한 줄), sm 부터 균등 3열·왼쪽 정렬. */}
      {/* 숫자 밴드는 히어로의 꼬리 — 아래 여백은 다음 섹션이 갖는다. */}
      <section className="rise mx-auto max-w-6xl px-5 pt-10 lg:px-8 lg:pt-14">
        <ul className="border-y border-ink/10 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:py-10 lg:py-12">
          {[
            { n: "2016", unit: "년", label: "절굿대 육묘 국내 최초 성공" },
            { n: "50", unit: "년 만", label: "사라졌던 떡의 부활" },
            { n: "2022", unit: "년", label: "슬로푸드 맛의방주 등재" },
          ].map((s) => (
            <li
              key={s.label}
              className="flex items-baseline gap-4 border-t border-ink/10 py-4 first:border-t-0 sm:block sm:border-t-0 sm:py-0"
            >
              <p className="shrink-0 font-black tracking-tighter tabular-nums text-h2 lg:text-h2-lg">
                {s.n}
                <span className="ml-1 align-baseline text-small font-light tracking-normal text-ink-soft lg:text-lead">
                  {s.unit}
                </span>
              </p>
              <p className="text-small text-ink-soft sm:mt-2">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 빚는 것들 — 원 = 제품. 제품이 셋이라 이 한 섹션이 전체다. */}
      <section className="section-y-tight rise mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHead
          phase={0.15}
          eyebrow="제품"
          title={{ thin: "나주에서", black: "빚는 것들" }}
          aside={
            <Link href="/products" className="text-link">
              제품 보러 가기
            </Link>
          }
        />
        {/* 모바일은 원 셋을 세로로 쌓으면 1,300px 을 먹는다. 옆으로 넘기는 구조로 — 72vw 원 하나씩.
            스크롤바는 숨기고 스냅으로 한 장씩 멈춘다. sm 부터는 3열 그리드, 원 셋 윗선 동일. */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 scroll-pl-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:gap-x-10 [&::-webkit-scrollbar]:hidden">
          {best.map((p) => (
            <li key={p.slug} className="w-[62vw] shrink-0 snap-start sm:w-auto">
              <Link
                href={`/products/${p.slug}`}
                className="group pressable block"
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
                      sizes="(min-width: 1200px) 352px, (min-width: 640px) 30vw, 62vw"
                      quality={80}
                      className="object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
                    />
                  </div>
                </ViewTransition>
                {/* 원 아래 캡션은 가운데 — 왼쪽에 붙이면 원의 접점에 걸려 어긋나 보인다. 가격은 이름 옆 작은 글자, 없으면 자리표도 없다. */}
                <div className="mt-5 text-center">
                  <p className="flex flex-wrap items-baseline justify-center gap-x-3">
                    <span className="text-lead font-bold transition-colors group-hover:text-mint-link">
                      {p.name}
                    </span>
                    {p.price !== null && (
                      <span className="text-small tabular-nums text-ink-soft">
                        {p.price.toLocaleString("ko-KR")}원
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-small text-ink-soft">{p.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3-b. 최근 소식 셋 — 자주 올리는 곳이라 첫 화면에 보여야 한다. 실선 행, 사진은 작게. */}
      {latest.length > 0 && (
        <section className="rise border-t border-ink/10">
          <div className="section-y-tight mx-auto max-w-6xl px-5 lg:px-8">
            <SectionHead
              phase={0.3}
              eyebrow="소식"
              title={{ thin: "떡집의 ", black: "요즘" }}
              split="inline"
              aside={
                <Link href="/news" className="text-link">
                  소식 전체
                </Link>
              }
            />
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10 lg:mt-10">
              {latest.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/news/${post.id}`}
                    className="group pressable grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-5 py-4 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-x-8 lg:py-5"
                  >
                    <div className="photo aspect-4/3">
                      {post.images[0] && (
                        <Image
                          src={post.images[0]}
                          alt=""
                          fill
                          sizes="112px"
                          quality={75}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-caption tabular-nums text-ink-faint">
                        {formatNewsDate(post.published_on)}
                      </p>
                      <p className="mt-1 truncate text-lead font-bold transition-colors group-hover:text-mint-link">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4. 인용 + 연표 예고 — 5:7 비대칭. 가운데 정렬 ABOUT 문단을 대신한다 */}
      <section className="rise border-t border-ink/10">
        <div className="section-y mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20 lg:px-8">
          <div>
            <SectionEyebrow phase={0.45}>이야기</SectionEyebrow>
            {/* 큰 인용은 얇게. 굵으면 구호가 되고, 얇으면 인용이 된다. */}
            <blockquote className="mt-6 font-thin tracking-tight text-h2 lg:text-quote">
              천금과 같은 값어치가
              <br />
              있다 하여 붙은 이름,
              <br />
              <span className="font-black">천금누로탕</span>
            </blockquote>
            <p className="mt-6 max-w-prose text-ink-soft">
              절굿대의 뿌리는 한방에서 누로(漏蘆)라 부르는 약재입니다.
              절굿대떡을 이바지에 쓴 것은 맛 때문만이 아니라 건강을 생각한
              떡이라는 믿음 때문이었습니다.
            </p>
            <Link href="/story" className="text-link mt-6">
              복원 이야기 보러 가기
            </Link>
          </div>

          {/* self-start — 그리드가 늘려 놓으면 마지막 실선이 내용 아래 멀리 떨어져 빈 행처럼 보인다.
              표식은 먹색 점 하나. 달은 아이브로 전용이다. */}
          <ol className="self-start divide-y divide-ink/10 border-y border-ink/10 lg:mt-2">
            {teaser.map((t) => (
              <li
                key={t.title}
                className="flex items-baseline gap-5 py-6 lg:gap-6"
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-ink"
                />
                <div>
                  <p className="text-caption tabular-nums text-ink-faint">
                    {t.when}
                  </p>
                  <p className="mt-1 text-lead font-bold">{t.title}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. 브랜드 문구 밴드 — 넣지 않는 것 */}
      <section className="rise grid lg:grid-cols-2">
        {/*
          사진 비율은 원본(2400×1646) 그대로 — 16:9 로 자르면 매트 아랫단이 잘렸다.
          PC 는 오른쪽 패널 높이를 따르되 아래를 기준으로 채운다(위쪽은 빈 흰 여백이라 잘려도 된다).
        */}
        <div className="relative aspect-[2400/1646] lg:aspect-auto">
          <Image
            src="/images/ingredients-mat.jpg"
            alt="라탄 매트 위 절굿대떡과 콩고물, 절굿대 잎"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={80}
            className="object-cover object-[50%_100%]"
          />
        </div>
        <div className="moonlit relative section-y-tight flex flex-col justify-center bg-ink px-5 text-paper lg:pl-14 lg:pr-[max(3.5rem,calc((100vw-72rem)/2+2rem))]">
          <SectionHead
            phase={0.7}
            eyebrow="재료"
            tone="paper"
            title={{ thin: "넣지 않는 것으로", black: "말합니다" }}
            lead="유화제나 인공감미료를 전혀 넣지 않고 전통 방식 그대로 빚습니다. 나주 특산 배즙으로 자연스러운 단맛을 더했고, 손으로 친 찹쌀이라 쫄깃하고 부드럽습니다."
          />
        </div>
      </section>

      {/* 6. 브랜드 문구 밴드 — 체험 */}
      <section className="rise grid lg:grid-cols-2">
        <div className="section-y-tight flex flex-col justify-center bg-paper-2 px-5 lg:order-1 lg:pl-[max(3.5rem,calc((100vw-72rem)/2+2rem))] lg:pr-14">
          <SectionHead
            phase={1}
            eyebrow="체험"
            title={{ thin: "직접 빚어 보는", black: "자리가 있습니다" }}
            lead="떡 반죽을 밀고 앙금을 넣어 바람떡을 찍고, 예쁘게 꾸며 상자에 담아 갑니다. 학교와 단체가 자주 찾고, 여행길에 들르는 분들도 참여할 수 있습니다."
          />
          <Link href="/visit" className="text-link mt-6 self-start">
            체험·매장 보러 가기
          </Link>
        </div>
        <div className="relative aspect-4/3 lg:order-2 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/images/making-cut.jpg"
            alt="쳐낸 절굿대떡을 칼로 반듯하게 자르는 김화수 대표"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={80}
            className="object-cover object-[50%_30%]"
          />
        </div>
      </section>

      {/* 7. 문의 — 실선 한 줄. 홈 본문의 전화 버튼은 이 하나뿐이다(헤더·푸터에 번호가 있다). 매장 링크는 바로 위 체험 블록에. */}
      <section className="rise mx-auto max-w-6xl px-5 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-16">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          <li className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:py-6">
            <div>
              <p className="text-lead font-bold">주문·체험 문의</p>
              <p className="mt-1 text-small text-ink-soft">
                {site.hours} · 매장에서도 바로 구매하실 수 있습니다.
              </p>
            </div>
            <a href={site.telHref} className="btn-primary">
              전화 주문 {site.tel}
            </a>
          </li>
        </ul>
      </section>
    </ViewTransition>
  );
}
