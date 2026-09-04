import Link from "next/link";
import { nav, site } from "@/lib/site";

/**
 * 주소·전화·영업시간은 매장에 오려는 사람이 어느 페이지에서든 찾는 정보라
 * '오시는 길'을 따로 두지 않고 모든 페이지 하단에 고정한다.
 */
export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-2xl text-paper">{site.name}</p>
          <p className="mt-3 max-w-xs text-[15px] leading-relaxed">
            {site.tagline} · {site.since}년부터 나주에서
          </p>
        </div>

        <div>
          <h2 className="text-base text-paper">찾아오시는 길</h2>
          <address className="mt-3 space-y-1 text-[15px] not-italic leading-relaxed">
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
          <h2 className="text-base text-paper">둘러보기</h2>
          <ul className="mt-2 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="block py-1.5 transition-colors hover:text-mint" href={item.href}>
                  {item.label}
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

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-1 px-5 py-6 text-[13px] text-paper/70 lg:px-8">
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
