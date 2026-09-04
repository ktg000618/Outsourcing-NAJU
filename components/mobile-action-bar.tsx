import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(`${site.address} ${site.name}`);

/**
 * 모바일 하단 고정 바.
 *
 * 이 사업의 전환은 전화와 방문 둘뿐인데, 여태 둘 다 페이지를 끝까지
 * 내려야 나왔다. 스크롤 어디에서든 닿게 한다.
 *
 * 화면을 가리지 않도록 body 아래쪽에 같은 높이의 여백을 준다
 * (app/globals.css 의 .has-action-bar). 고정 요소는 자리를 차지하지
 * 않으므로 여백을 따로 만들지 않으면 푸터 마지막 줄이 가려진다.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2">
        <a
          aria-label={`전화 걸기 ${site.tel}`}
          className="pressable flex min-h-14 items-center justify-center gap-2 border-r border-ink/10 text-small font-medium transition-colors hover:text-mint-link"
          href={`tel:${site.tel.replace(/-/g, "")}`}
        >
          <svg
            aria-hidden
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.5 5.5c0-.6.4-1 1-1h2.6c.4 0 .8.3.9.7l1 3c.1.4 0 .8-.3 1l-1.4 1.2a12 12 0 0 0 5.3 5.3l1.2-1.4c.2-.3.6-.4 1-.3l3 1c.4.1.7.5.7.9v2.6c0 .6-.4 1-1 1A15.5 15.5 0 0 1 4.5 5.5Z"
              strokeLinejoin="round"
            />
          </svg>
          전화 주문
        </a>
        <a
          className="pressable flex min-h-14 items-center justify-center gap-2 text-small font-medium transition-colors hover:text-mint-link"
          href={`https://map.kakao.com/?q=${mapQuery}`}
          rel="noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10.5" r="2.4" />
          </svg>
          길찾기
          <span className="sr-only"> (새 창)</span>
        </a>
      </div>
    </div>
  );
}
