import { PhoneIcon, PinIcon } from "./icons";
import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(`${site.address} ${site.name}`);

/**
 * 모바일 하단 고정 바.
 *
 * 이 사업의 전환은 전화와 방문 둘뿐인데, 여태 둘 다 페이지를 끝까지
 * 내려야 나왔다. 스크롤 어디에서든 닿게 한다.
 *
 * 화면을 가리지 않도록 body 아래쪽에 같은 높이(3.5rem)의 여백을 준다
 * (app/globals.css 의 body padding-bottom). 고정 요소는 자리를 차지하지
 * 않으므로 여백을 따로 만들지 않으면 푸터 마지막 줄이 가려진다.
 * 안쪽 높이는 그 3.5rem(56px)에 고정하고, 홈 인디케이터 영역(safe-area)은
 * 같은 바탕색으로 그 아래에 덧붙는다 — body 여백과 어긋나지 않는다.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid h-14 grid-cols-2">
        <a
          className="pressable flex h-full items-center justify-center gap-2 bg-ink text-small text-paper transition-colors hover:bg-ink/90"
          href={site.telHref}
        >
          <PhoneIcon />
          전화 주문<span className="sr-only"> {site.tel}</span>
        </a>
        <a
          className="pressable flex h-full items-center justify-center gap-2 text-small transition-colors hover:text-mint-link"
          href={`https://map.kakao.com/?q=${mapQuery}`}
          rel="noreferrer"
          target="_blank"
        >
          <PinIcon />
          길찾기
          <span className="sr-only"> (새 창)</span>
        </a>
      </div>
    </div>
  );
}
