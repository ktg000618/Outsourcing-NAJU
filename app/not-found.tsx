import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { MoonMark } from "@/components/moon-mark";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

/**
 * 404. Next 기본 화면은 영문에 system-ui 라 이 사이트 안에서 이질적이었다.
 * 빈 달(삭)을 두고, 갈 곳 셋만 놓는다 — 길 잃은 손님에게 메뉴를
 * 다 보여줄 필요는 없다.
 */
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-28 pt-20 text-center lg:px-8 lg:pb-36 lg:pt-28">
      {/* 삭(빈 달) = 여기엔 떡이 없다. 엠블럼은 헤더로 갔으니 겹치지 않는다. */}
      <MoonMark phase={0} size={96} className="text-ink" />
      <p className="mt-10 text-caption tracking-widest text-ink-faint">
        404
      </p>
      <h1 className="mt-3 text-h1 lg:text-h1-lg">
        여기엔 떡이 없습니다
      </h1>
      <p className="mt-5 max-w-prose text-ink-soft">
        주소가 바뀌었거나 잘못 적혔을 수 있습니다. 아래에서 다시 찾아 주세요.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          className="btn-lift border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
          href="/"
        >
          홈으로
        </Link>
        <Link
          className="pressable border border-ink/25 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
          href="/products"
        >
          제품 보기
        </Link>
        <a
          aria-label={`전화 걸기 ${site.tel}`}
          className="pressable border border-ink/25 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
          href={`tel:${site.tel.replace(/-/g, "")}`}
        >
          전화 문의
        </a>
      </div>
    </section>
  );
}
