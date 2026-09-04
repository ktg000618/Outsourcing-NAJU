import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "체험·매장",
  description: `${site.address}. 절굿대떡 만들기 체험과 떡카페를 함께 운영합니다.`,
};

const mapQuery = encodeURIComponent(`${site.address} ${site.name}`);

export default function VisitPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-moss-900">
        <Image
          src="/images/store-exterior.jpg"
          alt="초록 간판이 걸린 절굿대달토끼 매장 외관"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center lg:px-8 lg:py-32">
          <p className="font-display text-sm text-signage lg:text-base">
            {site.addressLocality} 징고샅길
          </p>
          <h1 className="mt-4 font-display text-4xl text-paper lg:text-6xl">
            빚어 보러 오세요
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-paper/80">
            떡을 파는 데 그치지 않고, 직접 만들고 맛보는 체험장을 함께
            운영합니다. 학교와 단체가 자주 찾습니다.
          </p>
        </div>
      </section>

      {/* 체험 */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl">
              절굿대떡 만들기 체험
            </h2>
            <p className="mt-6 max-w-prose text-moss-600">
              반죽을 치고 모양을 빚어 콩고물을 입히기까지, 손으로 해 봅니다.
              어린이 단체부터 어른 모임까지 참여할 수 있습니다.
            </p>
            <dl className="mt-9 divide-y divide-moss/10 border-y border-moss/10">
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-moss-300">대상</dt>
                <dd className="text-[15px]">
                  학교·단체·가족 (개인 참여도 가능)
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-moss-300">예약</dt>
                <dd className="text-[15px]">
                  전화로 미리 문의해 주세요. 인원과 날짜에 따라 준비가 필요합니다.
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-moss-300">문의</dt>
                <dd className="text-[15px]">
                  <a
                    href={`tel:${site.tel.replace(/-/g, "")}`}
                    className="border-b border-moss/25 pb-0.5 hover:border-signage hover:text-signage"
                  >
                    {site.tel}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/experience-class.jpg"
                alt="체험장에서 절굿대떡을 빚는 참가자들"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-10 aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/experience-kids.jpg"
                alt="아이들이 떡 모양을 빚는 모습"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative -mt-6 aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/experience-school.jpg"
                alt="학교 체험에서 만든 떡을 들어 보이는 아이들"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/store-interior.jpg"
                alt="원형 장식이 걸린 매장 내부"
                fill
                sizes="(min-width: 1024px) 22vw, 44vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="bg-moss text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl">오시는 길</h2>
            <address className="mt-8 space-y-5 not-italic">
              <div>
                <p className="text-[14px] text-paper/50">주소</p>
                <p className="mt-1 text-lg">{site.address}</p>
              </div>
              <div>
                <p className="text-[14px] text-paper/50">전화</p>
                <p className="mt-1 text-lg">
                  <a
                    className="hover:text-signage"
                    href={`tel:${site.tel.replace(/-/g, "")}`}
                  >
                    {site.tel}
                  </a>
                </p>
              </div>
              {site.hours && (
                <div>
                  <p className="text-[14px] text-paper/50">영업시간</p>
                  <p className="mt-1 text-lg">{site.hours}</p>
                </div>
              )}
              {site.closedDays && (
                <div>
                  <p className="text-[14px] text-paper/50">휴무</p>
                  <p className="mt-1 text-lg">{site.closedDays}</p>
                </div>
              )}
            </address>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`https://map.kakao.com/?q=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-signage px-6 py-3 text-[15px] font-medium text-moss-900 transition-opacity hover:opacity-90"
              >
                카카오맵으로 길찾기
              </a>
              <a
                href={`https://map.naver.com/p/search/${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-paper/35 px-6 py-3 text-[15px] transition-colors hover:border-signage hover:text-signage"
              >
                네이버 지도
              </a>
            </div>
          </div>

          {/* TODO(개발): 카카오맵 SDK 임베드. 지금은 지도 앱으로 넘긴다. */}
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-80">
            <Image
              src="/images/store-exterior.jpg"
              alt="매장 외관"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
