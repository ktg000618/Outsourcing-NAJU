import Image from "next/image";
import Link from "next/link";
import { credentials, products, site } from "@/lib/site";

/**
 * 홈 흐름은 참고 사이트(압구정공주떡) 구조를 따른다.
 * 히어로 → 대표 제품 → 브랜드 문구 밴드 → ABOUT → 전체 제품 → 방문 안내.
 * 다만 그 사이트에 없는 두 가지, 복원 서사와 체험은 이 브랜드의 무기라 자리를 크게 준다.
 */
export default function HomePage() {
  const best = products.slice(0, 3);

  return (
    <>
      {/*
        1. 히어로 — 밭에서 절굿대를 수확하는 장면.
        원본은 홍보 문구가 얹힌 SNS 카드였는데 사진 영역만 잘라내 4500px 원본을 살렸다.
        (매장 외관과 대표 인물 컷은 간판·현수막 글자가 헤드라인과 겹쳐 히어로에 못 쓴다.)
      */}
      {/*
          헤더와 같은 폭(max-w-6xl·px-8)에 맞춰 가운데로 놓는다 — 전폭으로 흘리면
          로고·내비와 왼쪽 끝이 어긋난다.
          틀 비율(lg 1.79)은 사진 원본 비율 그대로라 cover 가 잘라 낼 여분이 0 이다.
          글자는 아래가 아니라 왼쪽 그늘 위에 앉는다.
        */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 lg:px-8 lg:pt-8">
        <div className="relative isolate flex aspect-4/5 items-end overflow-hidden rounded-2xl bg-ink sm:aspect-16/10 lg:aspect-[1.79/1]">
          <Image
            src="/images/hero-maker-wide.jpg"
            alt="김화수 대표가 갓 쳐낸 절굿대떡 판을 들어 보이고 있다"
            fill
            priority
            quality={92}
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="object-cover object-[58%_50%] lg:object-center"
          />
          {/* 왼쪽 그늘은 뺐다. 대신 글자를 아래로 내려 떡판 위에 앉힌다 —
              그쪽은 평평한 초록이라 얇은 그늘만으로 읽힌다. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(22,22,22,0.92)_0%,rgba(22,22,22,0.58)_46%,rgba(22,22,22,0)_78%)]"
          />
          <div className="relative w-full px-6 pb-10 lg:px-10 lg:pb-12">
            {/* 굵기 대비로 읽는다 — 얇은 줄(300)이 위, 굵은 줄(700)이 아래.
                문구는 클라이언트가 쓰는 표현을 그대로 가져왔다.
                크기·투명도·폭은 다른 페이지 히어로와 같은 값으로 맞췄다 —
                네 번 복사하는 사이 여기만 32px/90%/max-w-sm 로 갈라져 있었다. */}
            <h1 className="text-h1 text-paper lg:text-h1-lg">
              <span className="block font-light tracking-tight">50년 만에 돌아온</span>
              <span className="block font-bold tracking-tight">나주의 절굿대떡</span>
            </h1>
            <p className="mt-5 max-w-md text-small leading-relaxed text-paper/85 lg:text-body">
              목사골 양반들이 이바지로 쓰던 귀한 떡. 깊은 산속에서만 자생하던
              절굿대를 육묘에 성공해 되살렸습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 대표 제품 */}
      <section className="rise mx-auto max-w-6xl px-5 pb-20 pt-12 lg:px-8 lg:pb-24 lg:pt-16">
        <h2 className="text-center text-h3 font-bold lg:text-h1">대표 제품</h2>
        <ul className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-12 lg:gap-x-8">
          {best.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="group pressable block">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-paper-2">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 640px) 30vw, 90vw"
                    quality={88}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-lg transition-colors group-hover:text-mint-link">
                  {p.name}
                </h3>
                <p className="mt-1 text-small leading-relaxed text-ink-soft">
                  {p.summary}
                </p>
                <p className="mt-2 font-medium">
                  {p.price !== null ? (
                    `${p.price.toLocaleString("ko-KR")}원`
                  ) : (
                    /* 번호를 카드에 적으면 전화처럼 보이는데 카드 전체가
                       제품 링크라 눌러도 전화가 안 걸린다. 실제 tel: 는
                       제품 상세 CTA 에서만 노출한다. */
                    <span className="text-small font-normal text-ink-soft">
                      가격 전화 문의
                    </span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 브랜드 문구 밴드 — 넣지 않는 것 */}
      <section className="rise grid lg:grid-cols-2">
        <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[30rem]">
          <Image
            src="/images/ingredients-board.jpg"
            alt="나무 도마에 올린 절굿대떡과 콩고물"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-bark px-5 py-16 text-paper lg:px-14 lg:py-24 xl:px-20">
          <h2 className="text-h2 lg:text-h2-lg">
            넣지 않는 것으로
            <br />
            말합니다
          </h2>
          <p className="mt-6 max-w-md text-small leading-[1.85] text-paper/85 lg:text-body">
            유화제나 인공감미료를 전혀 넣지 않고 전통 방식 그대로 빚습니다. 나주
            특산 배즙으로 자연스러운 단맛을 더했고, 찹쌀의 쫄깃한 식감은 소화에도
            부담이 없습니다.
          </p>
          <Link
            href="/story"
            className="mt-8 self-start border-b border-paper/35 pb-1 text-small transition-colors hover:border-moon hover:text-moon"
          >
            복원 이야기 보러가기
          </Link>
        </div>
      </section>

      {/* 4. 브랜드 문구 밴드 — 체험 */}
      <section className="rise grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-paper-2 px-5 py-16 lg:order-1 lg:px-14 lg:py-24 xl:px-20">
          <h2 className="text-h2 lg:text-h2-lg">
            직접 빚어 보는
            <br />
            자리가 있습니다
          </h2>
          <p className="mt-6 max-w-md text-small leading-[1.85] text-ink-soft lg:text-body">
            반죽을 치고 모양을 빚어 콩고물을 입히기까지 손으로 해 봅니다. 학교와
            단체가 자주 찾고, 여행길에 들르는 분들도 참여할 수 있습니다.
          </p>
          <Link
            href="/visit"
            className="mt-8 self-start border-b border-ink/30 pb-1 text-small transition-colors hover:border-mint-link hover:text-mint-link"
          >
            체험·매장 보러가기
          </Link>
        </div>
        <div className="relative aspect-4/3 lg:order-2 lg:aspect-auto lg:min-h-[30rem]">
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

      {/* 5. 브랜드 소개 */}
      <section className="rise mx-auto max-w-3xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="text-caption text-mint-link">ABOUT</p>
        <h2 className="mt-4 text-h2 font-light lg:text-h2-lg">
          천금의 가치가 있다던 떡
        </h2>
        <div className="mt-7 space-y-5 text-ink-soft">
          <p>
            지역에서 으뜸가는 떡이라 하여 목사골 나주 양반들이 이바지에 썼습니다.
            한동안은 어르신들 사이에 이름만 전설처럼 남아 있던 떡입니다.
          </p>
          <p>
            대표가 유년 시절의 맛을 좇아 복원에 매달렸고, 2021년 국제슬로푸드
            생물다양성재단의 맛의방주에 나주 절굿대떡이 등재되었습니다.
          </p>
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-8 border-t border-ink/10 pt-12 text-left sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <li key={c.label}>
              <p className="font-semibold">{c.label}</p>
              <p className="mt-1 text-small leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. 전체 제품 */}
      <section className="rise bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="text-center text-h3 font-bold lg:text-h1">
            빚는 것들
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group pressable block">
                  <div className="relative aspect-square overflow-hidden rounded-full bg-paper">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 18vw, 44vw"
                      quality={88}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 text-center text-body transition-colors group-hover:text-mint-link">{p.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. 방문·문의 */}
      <section className="rise mx-auto grid max-w-6xl gap-4 px-5 py-20 sm:grid-cols-2 lg:px-8 lg:py-24">
        <Link
          href="/visit"
          className="group pressable relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8"
        >
          <Image
            src="/images/store-exterior.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 45vw, 90vw"
            quality={88}
            className="object-cover opacity-30 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="relative">
            <p className="text-caption text-paper/70">방문구매를 원하시면</p>
            <p className="mt-1 text-2xl text-paper">오시는 길</p>
          </div>
        </Link>
        <a
          href={`tel:${site.tel.replace(/-/g, "")}`}
          className="pressable flex min-h-56 flex-col justify-end rounded-2xl bg-ink p-8 text-paper transition-colors hover:bg-ink-soft"
        >
          <p className="text-caption text-paper/70">주문·체험 문의는 전화로</p>
          <p className="mt-1 text-2xl">{site.tel}</p>
        </a>
      </section>
    </>
  );
}
