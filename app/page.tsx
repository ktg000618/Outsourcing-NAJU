import Image from "next/image";
import Link from "next/link";
import { MoonMark } from "@/components/moon-mark";
import { credentials, products, site, timeline } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* 히어로 — 이 브랜드에서 가장 특징적인 장면은 복원한 사람이 떡판을 든 순간이다. */}
      <section className="relative isolate min-h-[78svh] overflow-hidden bg-moss-900 lg:min-h-[86svh]">
        <Image
          src="/images/hero-maker.jpg"
          alt="절굿대달토끼 대표가 갓 쳐낸 떡판을 들고 있다"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-moss-900/55"
        />
        <div className="relative mx-auto flex min-h-[78svh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center lg:min-h-[86svh] lg:px-8">
          <p className="font-display text-sm text-signage lg:text-base">
            나주 징고샅길 · {site.since}년부터
          </p>
          <h1 className="mt-4 font-display text-4xl text-paper sm:text-5xl lg:text-6xl">
            사라졌던 떡을
            <br />
            다시 빚습니다
          </h1>
          <p className="mt-6 max-w-prose text-paper/85">
            나주 절굿대떡은 목사골 양반들이 이바지로 쓰던 귀한 떡이었습니다.
            무농약 절굿대와 나주배 농축액만으로, 재래방식 그대로 만듭니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-signage px-6 py-3 text-[15px] font-medium text-moss-900 transition-opacity hover:opacity-90"
            >
              제품 보기
            </Link>
            <Link
              href="/story"
              className="rounded-full border border-paper/40 px-6 py-3 text-[15px] text-paper transition-colors hover:border-signage hover:text-signage"
            >
              복원 이야기
            </Link>
          </div>
        </div>
      </section>

      {/* 신뢰 근거 — 사진이 아니라 사실로 말하는 자리 */}
      <section className="bg-moss text-paper">
        <ul className="mx-auto grid max-w-6xl gap-x-8 gap-y-7 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8 lg:py-14">
          {credentials.map((c) => (
            <li key={c.label}>
              <p className="font-display text-lg text-signage">{c.label}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-paper/70">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 제품 — 사각 카드 대신 원. 로고도 라탄 매트도 매장 벽 장식도 전부 원이다. */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl lg:text-4xl">빚는 것들</h2>
          <Link
            href="/products"
            className="border-b border-moss/30 pb-0.5 text-[15px] transition-colors hover:border-signage hover:text-signage"
          >
            제품 전체 보기
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {products.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={`/products#${p.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-full bg-paper-dim">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 44vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl">{p.name}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-moss-600">
                  {p.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 이야기 요약 */}
      <section className="bg-moss text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full lg:aspect-3/4">
            <Image
              src="/images/field-thistle.jpg"
              alt="마을 어르신들이 위탁 재배하는 절굿대밭"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl lg:text-4xl">
              천금의 가치가 있다던 떡
            </h2>
            <p className="mt-6 max-w-prose text-paper/80">
              절굿대의 뿌리는 한방에서 누로(漏蘆)라 부르는 약재입니다. 이를 달인
              탕약을 천금누로탕이라 했으니, 천금과 같다 하여 붙은 이름입니다.
              절굿대떡이 이바지에 오른 것은 맛 때문만이 아니었습니다.
            </p>
            <ol className="mt-10 space-y-7">
              {timeline.map((t) => (
                <li key={t.title} className="flex gap-5">
                  <MoonMark
                    phase={t.phase}
                    className="mt-1.5 shrink-0 text-bojagi"
                  />
                  <div>
                    <p className="font-display text-lg text-paper">
                      {t.when} · {t.title}
                    </p>
                    <p className="mt-1 max-w-prose text-[15px] leading-relaxed text-paper/70">
                      {t.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/story"
              className="mt-10 inline-block border-b border-paper/30 pb-0.5 text-[15px] transition-colors hover:border-signage hover:text-signage"
            >
              이야기 전체 읽기
            </Link>
          </div>
        </div>
      </section>

      {/* 체험 */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl lg:text-4xl">
              직접 빚어 보는 자리
            </h2>
            <p className="mt-6 max-w-prose text-moss-600">
              떡을 파는 데 그치지 않고 만들어 보는 체험장을 함께 운영합니다.
              학교와 단체가 자주 찾고, 여행길에 들르는 분들도 참여할 수 있습니다.
            </p>
            <Link
              href="/visit"
              className="mt-8 inline-block rounded-full bg-moss px-6 py-3 text-[15px] text-paper transition-opacity hover:opacity-90"
            >
              체험·매장 안내
            </Link>
          </div>
          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/experience-class.jpg"
                alt="체험장에서 절굿대떡을 빚는 참가자들"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/experience-school.jpg"
                alt="학교 체험에서 만든 떡을 들어 보이는 아이들"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-24">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/images/store-exterior.jpg"
              alt="초록 간판이 걸린 절굿대달토끼 매장 외관"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl lg:text-4xl">오시는 길</h2>
            <address className="mt-6 space-y-2 not-italic text-moss-600">
              <p className="text-moss">{site.address}</p>
              <p>
                <a
                  href={`tel:${site.tel.replace(/-/g, "")}`}
                  className="border-b border-moss/25 pb-0.5 hover:border-signage hover:text-signage"
                >
                  {site.tel}
                </a>
              </p>
              {site.hours && <p>{site.hours}</p>}
              {site.closedDays && <p>휴무 {site.closedDays}</p>}
            </address>
            <Link
              href="/visit"
              className="mt-8 inline-block border-b border-moss/30 pb-0.5 text-[15px] transition-colors hover:border-signage hover:text-signage"
            >
              지도와 상세 안내
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
