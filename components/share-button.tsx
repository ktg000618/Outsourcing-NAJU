"use client";

import { useState } from "react";

/**
 * 제품 공유 — 폰에서는 공유 시트(카톡·문자), PC 에서는 주소 복사.
 * 카카오 SDK 없이도 되는 범위만. 키가 생기면 카카오 공유 카드로 바꿀 수 있다.
 */
export function ShareButton({ title, text }: { title: string; text: string }) {
  const [done, setDone] = useState<null | "shared" | "copied">(null);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setDone("shared");
      } else {
        await navigator.clipboard.writeText(url);
        setDone("copied");
      }
    } catch {
      /* 손님이 공유 시트를 닫은 경우 — 아무 것도 하지 않는다 */
    }
    window.setTimeout(() => setDone(null), 2500);
  };

  return (
    <button type="button" onClick={share} className="text-link">
      {done === "copied"
        ? "주소를 복사했습니다"
        : done === "shared"
          ? "공유했습니다"
          : "이 제품 공유하기"}
    </button>
  );
}
