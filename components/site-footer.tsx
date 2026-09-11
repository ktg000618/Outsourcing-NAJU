import Image from "next/image";
import { site } from "@/lib/site";

const telHref = `tel:${site.tel.replace(/-/g, "")}`;

/**
 * 주소·전화·영업시간은 매장에 오려는 사람이 어느 페이지에서든 찾는 정보라
 * '오시는 길'을 따로 두지 않고 모든 페이지 하단에 고정한다.
 *
 * PC 는 락업 · 주소(찾아오시는 길 + 인스타그램) · 문의(대표번호·영업시간·휴대전화) 세 열.
 * 모바일은 주소 / 대표번호 / 영업시간 / 문의 / 인스타그램 / 사업자정보 순으로 짧게 —
 * 010 두 줄이 「찾아오시는 길」 밑에 있으면 길 안내 번호로 읽혔고, 전체가 600px 을 넘었다.
 * 그래서 인스타그램 링크는 두 자리에 렌더하고 한쪽만 보인다(PC 는 주소 열 마지막 줄).
 */
export function SiteFooter() {
  const instagram = site.instagramUrl && (
    <a
      className="link-draw inline-block text-small transition-colors hover:text-mint"
      href={site.instagramUrl}
      rel="noreferrer"
      target="_blank"
    >
      인스타그램<span className="sr-only"> (새 창)</span>
    </a>
  );

  return (
    <footer className="moonlit border-t border-paper/10 bg-ink text-paper/80">
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 sm:gap-12 sm:py-14 lg:grid-cols-[auto_1fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
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
            sizes="240px"
            className="h-36 w-auto lg:h-60"
          />
          <p className="mt-6 max-w-xs text-small leading-relaxed">
            {site.tagline} · {site.since}년부터 나주에서
          </p>
        </div>

        <div>
          <h2 className="text-body text-paper">찾아오시는 길</h2>
          <address className="mt-3 space-y-1 text-small not-italic leading-relaxed">
            <p>{site.address}</p>
            {site.closedDays && <p>휴무 {site.closedDays}</p>}
          </address>
          {instagram && <p className="mt-5 hidden lg:block">{instagram}</p>}
        </div>

        {/*
          둘러보기(헤더 메뉴 4개 복제)는 4페이지 사이트에서 템플릿 관성이었다. 그 자리에
          모바일 메뉴 하단과 같은 문의 블록 — 푸터에 닿은 손님이 다음에 할 일은 전화다.
        */}
        <div>
          <p className="text-caption text-paper/55">주문·체험 문의</p>
          <a
            aria-label={`전화 걸기 ${site.tel}`}
            href={telHref}
            className="mt-2 block font-black tracking-tighter tabular-nums text-paper text-h2 transition-colors hover:text-moon lg:text-h2-lg"
          >
            {site.tel}
          </a>
          {site.hours && (
            <p className="mt-2 text-small text-paper/70">{site.hours}</p>
          )}
          <p className="mt-2 text-small text-paper/60">
            <span className="text-paper/45">문의 </span>
            <span className="tabular-nums">
              {site.mobile} · {site.mobile2}
            </span>
          </p>
          {instagram && <p className="mt-5 lg:hidden">{instagram}</p>}
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        {/* 모바일은 세로로 쌓고 점 없이 — 줄바꿈된 줄 앞에 '·' 가 남으면 글머리 목록으로 읽힌다(375 실측). */}
        <div className="mx-auto flex max-w-6xl flex-col gap-y-1 px-5 py-6 text-caption text-paper/70 sm:flex-row sm:flex-wrap sm:[&>span+span]:before:mx-2 sm:[&>span+span]:before:text-paper/30 sm:[&>span+span]:before:content-['·'] lg:px-8">
          <span>{site.legalName}</span>
          <span>대표 {site.owner}</span>
          <span>사업자등록번호 {site.businessNumber}</span>
          <span>통신판매업 {site.mailOrderNumber}</span>
          {site.email && <span>{site.email}</span>}
          <span>
            ({site.postalCode}) {site.address}
          </span>
        </div>
      </div>
    </footer>
  );
}
