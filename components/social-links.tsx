import { site } from "@/lib/site";
import { InstagramIcon, NaverBlogIcon } from "./icons";

/**
 * 공식 SNS 링크 한 벌 — 인스타그램 · 네이버 블로그. 아이콘 + 글자.
 * 아이콘만 두지 않는다: 손님 연령대가 높고 「블로그」는 통용되는 글리프가 없다(리더 2026-10-07).
 * 글리프는 `icons.tsx`(전화·핀과 같은 선 굵기) — 색은 currentColor 로 물려받는다.
 * 푸터(먹 바탕)와 메뉴(종이 바탕)가 같이 쓰므로 색은 물려받고, 호버색만 `linkClassName` 으로 받는다.
 */
export function SocialLinks({
  className = "",
  linkClassName = "",
}: {
  className?: string;
  linkClassName?: string;
}) {
  if (!site.instagramUrl && !site.blogUrl) return null;
  const link = `text-link inline-flex items-center gap-1.5 ${linkClassName}`;
  return (
    <span className={`inline-flex flex-wrap gap-x-5 gap-y-1 ${className}`}>
      {site.instagramUrl && (
        <a
          href={site.instagramUrl}
          rel="noreferrer"
          target="_blank"
          className={link}
        >
          <InstagramIcon />
          인스타그램<span className="sr-only"> (새 창)</span>
        </a>
      )}
      {site.blogUrl && (
        <a
          href={site.blogUrl}
          rel="noreferrer"
          target="_blank"
          className={link}
        >
          <NaverBlogIcon />
          네이버 블로그<span className="sr-only"> (새 창)</span>
        </a>
      )}
    </span>
  );
}
