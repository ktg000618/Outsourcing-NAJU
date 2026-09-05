import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

/**
 * 주소·전화·영업시간은 매장에 오려는 사람이 어느 페이지에서든 찾는 정보라
 * '오시는 길'을 따로 두지 않고 모든 페이지 하단에 고정한다.
 */
export function SiteFooter() {
  return (
    <footer className="moonlit mt-24 bg-ink text-paper/80">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[auto_1fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        {/*
          세로 락업은 원래 헤더용이 아니라 이 비율(1:1.14)로 크게 놓는 자리가 맞다.
          흰 글자에 민트 외곽선이라 먹 바탕 위에서 오히려 산다. 브랜드 에셋이
          사이트 안에서 제 크기로 보이는 유일한 자리다.
        */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src="/brand/wordmark.png"
            alt={site.name}
            width={640}
            height={735}
            className="h-28 w-auto lg:h-44"
          />
          <p className="mt-6 max-w-xs text-small leading-relaxed">
            {site.tagline} · {site.since}년부터 나주에서
          </p>
        </div>

        <div>
          <h2 className="text-body text-paper">찾아오시는 길</h2>
          <address className="mt-3 space-y-1 text-small not-italic leading-relaxed">
            <p>{site.address}</p>
            <p>
              {/* 상시 밑줄이 필요하다. hover 만으로는 터치 기기에서 링크인 줄 모른다. */}
              <a
                aria-label={`전화 걸기 ${site.tel}`}
                className="underline decoration-paper/50 underline-offset-4 transition-colors hover:decoration-paper"
                href={`tel:${site.tel.replace(/-/g, "")}`}
              >
                {site.tel}
              </a>
            </p>
            <p className="text-paper/60">
              {site.mobile} · {site.mobile2}
            </p>
            {site.hours && <p>{site.hours}</p>}
            {site.closedDays && <p>휴무 {site.closedDays}</p>}
          </address>
        </div>

        <div>
          <h2 className="text-body text-paper">둘러보기</h2>
          <ul className="mt-2 text-small">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="inline-block py-1.5 transition-colors hover:text-mint" href={item.href}>
                  <span className="link-draw">{item.label}</span>
                </Link>
              </li>
            ))}
            {site.instagramUrl && (
              <li>
                <a
                  className="block py-1.5 transition-colors hover:text-mint"
                  href={site.instagramUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  인스타그램<span className="sr-only"> (새 창)</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-y-1 px-5 py-6 text-caption text-paper/70 lg:px-8 [&>span+span]:before:mx-2 [&>span+span]:before:text-paper/30 [&>span+span]:before:content-['·']">
          <span>{site.legalName}</span>
          <span>대표 {site.owner}</span>
          <span>사업자등록번호 {site.businessNumber}</span>
          <span>통신판매업 {site.mailOrderNumber}</span>
          <span>
            ({site.postalCode}) {site.address}
          </span>
        </div>
      </div>
    </footer>
  );
}
