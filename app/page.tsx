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
      <section className="relative isolate">
        {/*
            비율(aspect)로 잡으면 넓은 화면일수록 히어로가 세로로 커져서 아래가 안 보인다.
            뷰포트 높이 기준으로 잡아 헤더+히어로가 첫 화면의 3분의 2를 넘지 않게 한다 —
            대표 제품이 살짝 걸쳐 보여야 스크롤을 내린다.
          */}
          <div className="relative h-[54svh] min-h-[360px] w-full sm:h-[58svh] lg:h-[62svh] lg:max-h-[620px]">
          <Image
            src="/images/field-harvest.jpg"
            alt="밭에서 갓 수확한 절굿대를 담은 소쿠리를 들고 있다"
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-[55%_38%]"
          />
          {/* 위쪽까지 덮으면 사진이 탁해진다. 글자가 앉는 아래 절반만 어둡게. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-11 lg:px-8 lg:pb-16">
            {/*
              굵기 대비로 읽는다 — 얇은 줄(300)이 위, 굵은 줄(700)이 아래.
              200 은 밝은 밭 사진 위에서 획이 사라져 못 쓴다.
              문구는 클라이언트가 쓰는 표현을 그대로 가져왔다.
            */}
            <h1 className="text-[2rem] leading-[1.22] text-paper sm:text-[2.75rem] lg:text-[3.5rem]">
              <span className="block font-light tracking-tight">50년 만에 돌아온</span>
              <span className="block font-bold tracking-tight">나주의 절굿대떡</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-paper/90 lg:text-[1.0625rem]">
              목사골 양반들이 이바지로 쓰던 귀한 떡. 깊은 산속에서만 자생하던
              절굿대를 육묘에 성공해 되살렸습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. 대표 제품 */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-12 lg:px-8 lg:pb-24 lg:pt-16">
        <h2 className="text-center text-[1.75rem] font-bold leading-none lg:text-4xl">대표 제품</h2>
        <ul className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-3 lg:mt-12 lg:gap-x-8">
          {best.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="group block">
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
                <h3 className="mt-5 text-lg">{p.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                  {p.summary}
                </p>
                <p className="mt-2 font-medium">
                  {p.price !== null ? (
                    `${p.price.toLocaleString("ko-KR")}원`
                  ) : (
                    <span className="text-[15px] font-normal text-ink-faint">
                      가격 문의 {site.tel}
                    </span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 브랜드 문구 밴드 — 넣지 않는 것 */}
      <section className="grid lg:grid-cols-2">
        <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[30rem]">
          <Image
            src="/images/thistle-flower.jpg"
            alt="보랏빛 구체로 피는 절굿대 꽃"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-ink px-5 py-16 text-paper lg:px-16 lg:py-20">
          <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">
            넣지 않는 것으로
            <br />
            말합니다
          </h2>
          <p className="mt-6 max-w-prose text-paper/80">
            유화제도 인공감미료도 쓰지 않습니다. 단맛은 선별한 나주배 농축액으로만
            냅니다. 떡에 들어가는 절굿대는 마을 어르신들이 무농약으로 기릅니다.
          </p>
          <Link
            href="/story"
            className="mt-8 self-start border-b border-paper/35 pb-1 text-[15px] transition-colors hover:border-mint-deep hover:text-mint-deep"
          >
            복원 이야기 보러가기
          </Link>
        </div>
      </section>

      {/* 4. 브랜드 문구 밴드 — 체험 */}
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-paper-2 px-5 py-16 lg:order-1 lg:px-16 lg:py-20">
          <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">
            직접 빚어 보는
            <br />
            자리가 있습니다
          </h2>
          <p className="mt-6 max-w-prose text-ink-soft">
            반죽을 치고 모양을 빚어 콩고물을 입히기까지 손으로 해 봅니다.
            학교와 단체가 자주 찾고, 여행길에 들르는 분들도 참여할 수 있습니다.
          </p>
          <Link
            href="/visit"
            className="mt-8 self-start border-b border-ink/30 pb-1 text-[15px] transition-colors hover:border-mint-deep hover:text-mint-deep"
          >
            체험·매장 보러가기
          </Link>
        </div>
        <div className="relative aspect-4/3 lg:order-2 lg:aspect-auto lg:min-h-[30rem]">
          <Image
            src="/images/experience-class.jpg"
            alt="체험장에서 절굿대떡을 빚는 참가자들"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={88}
            className="object-cover"
          />
        </div>
      </section>

      {/* 5. 브랜드 소개 */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="text-sm text-mint-deep">ABOUT</p>
        <h2 className="mt-4 text-[2rem] font-light leading-[1.3] lg:text-[2.875rem]">
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
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. 전체 제품 */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <h2 className="text-center text-[1.75rem] font-bold leading-none lg:text-4xl">
            빚는 것들
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5 lg:gap-x-8">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
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
                  <h3 className="mt-5 text-center text-base">{p.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. 방문·문의 */}
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-20 sm:grid-cols-2 lg:px-8 lg:py-24">
        <Link
          href="/visit"
          className="group relative isolate flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8"
        >
          <Image
            src="/images/store-exterior.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 45vw, 90vw"
            quality={88}
            className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="relative">
            <p className="text-[14px] text-paper/70">방문구매를 원하시면</p>
            <p className="mt-1 text-2xl text-paper">오시는 길</p>
          </div>
        </Link>
        <a
          href={`tel:${site.tel.replace(/-/g, "")}`}
          className="flex min-h-56 flex-col justify-end rounded-2xl bg-ink p-8 text-paper transition-opacity hover:opacity-90"
        >
          <p className="text-[14px] text-paper/70">주문·체험 문의는 전화로</p>
          <p className="mt-1 text-2xl">{site.tel}</p>
        </a>
      </section>
    </>
  );
}
