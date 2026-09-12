import Image from "next/image";
import { site } from "@/lib/site";

/**
 * 카카오맵 정적 지도 — 카카오맵 「내보내기 → HTML 태그 복사」가 주는 공식 퍼가기 이미지라 개발자 키가 필요 없다.
 * 좌표(MX·MY)는 카카오 WCONGNAMUL 좌표계로 매장 중심. 지도 가운데에 우리 표식을 얹고, 누르면 카카오맵 장소 페이지로 간다.
 * 키가 생기면 JS 지도로 바꿀 수 있지만, 위치를 보여 주는 목적엔 이걸로 충분하다.
 */
const MAP =
  "https://staticmap.kakao.com/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=435282&MY=426447&S=0&IW=1152&IH=520&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo";

export function KakaoMap({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.kakaoPlaceUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`카카오맵에서 ${site.name} 위치 보기 (새 창)`}
      className={`photo group relative block aspect-4/3 sm:aspect-[1152/520] ${className}`}
    >
      <Image
        src={MAP}
        alt={`${site.name} 위치 지도 — ${site.address}`}
        fill
        unoptimized
        sizes="(min-width: 1200px) 1152px, 100vw"
        className="object-cover"
      />
      {/* 표식: 달 노랑 점 + 이름. 지도 중심 = 매장. */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center"
      >
        <span className="bg-ink px-3 py-1.5 text-caption font-bold text-paper">
          {site.name}
        </span>
        <span className="mt-1 size-4 rounded-full border-[3px] border-ink bg-moon" />
      </span>
      <span className="text-link absolute bottom-4 right-4 bg-paper/95 px-3 py-1 text-caption">
        지도 크게 보기
      </span>
    </a>
  );
}
