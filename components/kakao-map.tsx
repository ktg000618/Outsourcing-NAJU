import { site } from "@/lib/site";

/**
 * 카카오맵 정적 지도 — 카카오맵 「내보내기 → HTML 태그 복사」가 주는 공식 퍼가기 이미지라 개발자 키가 필요 없다.
 * 좌표(MX·MY)는 카카오 WCONGNAMUL 좌표계로 매장 중심. 지도 가운데에 우리 표식을 얹고, 누르면 카카오맵 장소 페이지로 간다.
 * 키가 생기면 JS 지도로 바꿀 수 있지만, 위치를 보여 주는 목적엔 이걸로 충분하다.
 */
const MAP_BASE =
  "https://staticmap.kakao.com/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=435282&MY=426447&S=0&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo";
/** PC·태블릿: 1152×520 을 띠 비율로 자른다. 폰: 4:3 700×525 만 받는다 — 큰 지도의 절반 크기. */
const MAP = `${MAP_BASE}&IW=1152&IH=520`;
const MAP_MOBILE = `${MAP_BASE}&IW=700&IH=525`;

export function KakaoMap({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.kakaoPlaceUrl}
      target="_blank"
      rel="noreferrer"
      className={`photo group relative block aspect-4/3 sm:aspect-2/1 lg:aspect-3/1 ${className}`}
    >
      {/* 정적 지도는 최적화 대상이 아니다(외부 PNG). 폰과 PC 가 다른 크기를 받도록 picture 로. */}
      <picture>
        <source media="(max-width: 639px)" srcSet={MAP_MOBILE} />
        <img
          src={MAP}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-center"
        />
      </picture>
      {/* 표식: 달 노랑 점 + 이름. 지도 중심 = 매장. 링크 이름은 보이는 글(이름 + 지도 크게 보기)로만 짓는다 — aria-label 로 덮으면 보이는 글과 어긋난다. */}
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="bg-ink px-3 py-1.5 text-caption font-bold text-paper">
          {site.name}
        </span>
        <span className="mt-1 size-4 rounded-full border-[3px] border-ink bg-moon" />
      </span>
      <span className="text-link absolute bottom-4 right-4 bg-paper/95 px-3 py-1 text-caption">
        지도 크게 보기
        <span className="sr-only"> (카카오맵, 새 창)</span>
      </span>
    </a>
  );
}
