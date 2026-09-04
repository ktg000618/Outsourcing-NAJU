import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MoonMark } from "@/components/moon-mark";
import { credentials, site, timeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "이야기",
  description:
    "목사골 양반들이 이바지로 쓰던 나주 절굿대떡. 사라졌던 떡이 어떻게 돌아왔고, 왜 맛의방주에 올랐는지.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src="/images/field-thistle.jpg"
          alt="마을 어르신들이 위탁 재배하는 절굿대밭"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-sm text-mint-deep lg:text-base">
            맛의방주 등재 품목
          </p>
          <h1 className="mt-4 text-4xl text-paper lg:text-6xl">
            천금의 가치가
            <br />
            있다던 떡
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-paper/80">
            지역에서 으뜸가는 떡이라 하여 목사골 나주 양반들이 이바지에 썼습니다.
            한동안은 어르신들 사이에 전설처럼 이름만 남아 있었습니다.
          </p>
        </div>
      </section>

      {/* 연표 — 달이 차오른다 */}
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8 lg:py-28">
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
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <h2 className="text-3xl lg:text-4xl">
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
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 만드는 방식 */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <h2 className="text-3xl lg:text-4xl">
          넣지 않는 것으로 말합니다
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-ink-soft">
            <p className="max-w-prose">
              절굿대떡에는 유화제나 인공감미료 같은 것을 전혀 쓰지 않습니다.
              재래방식 그대로 만들고, 단맛은 선별한 나주배 농축액으로만 냅니다.
              그래서 첫맛은 담백하고, 씹을수록 은은한 단맛이 뒤따릅니다.
            </p>
            <p className="max-w-prose">
              떡에 들어가는 절굿대는 대표가 직접 무농약으로 길렀습니다. 지금은
              마을 어르신들께 위탁해 재배하고 있습니다. 나주시 사회적기업으로
              지정된 것도 이 방식과 무관하지 않습니다.
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src="/images/store-counter.jpg"
              alt="매장 판매대에 진열된 떡"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
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

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="border border-ink bg-ink px-7 py-3 text-[15px] text-paper transition-opacity hover:opacity-90"
          >
            제품 보기
          </Link>
          <Link
            href="/visit"
            className="border border-ink/30 px-7 py-3 text-[15px] transition-colors hover:border-mint-deep hover:text-mint-deep"
          >
            {site.addressLocality} 매장 안내
          </Link>
        </div>
      </section>
    </>
  );
}
