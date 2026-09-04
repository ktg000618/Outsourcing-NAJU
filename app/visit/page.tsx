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
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src="/images/owners-counter.jpg"
          alt="떡카페 카운터에 선 절굿대달토끼 부부"
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-center opacity-55"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-sm text-mint-deep lg:text-base">
            {site.addressLocality} 징고샅길
          </p>
          <h1 className="mt-4 text-[2.25rem] leading-[1.2] text-paper lg:text-[3.25rem]">
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
            <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">
              절굿대떡 만들기 체험
            </h2>
            <p className="mt-6 max-w-prose text-ink-soft">
              반죽을 치고 모양을 빚어 콩고물을 입히기까지, 손으로 해 봅니다.
              어린이 단체부터 어른 모임까지 참여할 수 있습니다.
            </p>
            <dl className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-ink-faint">대상</dt>
                <dd className="text-[15px]">
                  학교·단체·가족 (개인 참여도 가능)
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-ink-faint">예약</dt>
                <dd className="text-[15px]">
                  전화로 미리 문의해 주세요. 인원과 날짜에 따라 준비가 필요합니다.
                </dd>
              </div>
              <div className="flex gap-6 py-4">
                <dt className="w-24 shrink-0 text-[15px] text-ink-faint">문의</dt>
                <dd className="text-[15px]">
                  <a
                    href={`tel:${site.tel.replace(/-/g, "")}`}
                    className="border-b border-ink/25 pb-0.5 hover:border-mint-deep hover:text-mint-deep"
                  >
                    {site.tel}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/*
            체험 사진은 얼굴이 들어오지 않는 두 컷만 쓴다. 나머지 자료 사진은
            참가자 얼굴이 정면으로 크게 나와 초상권 동의 없이는 못 올린다.
          */}
          <div className="grid gap-4 self-start sm:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-square">
              <Image
                src="/images/experience-stamp.jpg"
                alt="장갑 낀 손으로 나무 떡살을 눌러 떡에 문양을 찍고 있다"
                fill
                sizes="(min-width: 1024px) 22vw, 90vw"
                quality={88}
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:mt-10 sm:aspect-square">
              <Image
                src="/images/experience-hands.jpg"
                alt="체험 테이블에 늘어놓은 갓 빚은 절굿대떡과 나뭇잎 모양 떡"
                fill
                sizes="(min-width: 1024px) 22vw, 90vw"
                quality={88}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <h2 className="text-[2rem] leading-[1.25] lg:text-[2.875rem]">오시는 길</h2>
            <address className="mt-8 space-y-5 not-italic">
              <div>
                <p className="text-[14px] text-paper/50">주소</p>
                <p className="mt-1 text-lg">{site.address}</p>
              </div>
              <div>
                <p className="text-[14px] text-paper/50">전화</p>
                <p className="mt-1 text-lg">
                  <a
                    className="hover:text-mint-deep"
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
                className="border border-ink px-7 py-3 text-[15px] text-ink transition-opacity hover:opacity-90"
              >
                카카오맵으로 길찾기
              </a>
              <a
                href={`https://map.naver.com/p/search/${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="border border-paper/50 px-7 py-3 text-[15px] transition-colors hover:border-mint-deep hover:text-mint-deep"
              >
                네이버 지도
              </a>
            </div>
          </div>

          {/* TODO(개발): 카카오맵 SDK 임베드. 지금은 지도 앱으로 넘긴다. */}
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-80">
            <Image
              src="/images/hero-maker.jpg"
              alt="김화수 대표가 갓 쳐낸 떡판을 들고 있다"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={88}
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
