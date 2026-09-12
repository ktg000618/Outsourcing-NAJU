"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * 손님이 무엇을 눌렀는지 센다 — 전화, 지도, 인스타그램, 스토어, 「상세 더보기」.
 * 링크마다 코드를 붙이지 않고 문서 전체 클릭을 한 곳에서 듣는다. 개인정보는 보내지 않는다(경로만).
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el) return;
      const page = window.location.pathname;
      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") ?? "";
        if (href.startsWith("tel:")) track("tel_click", { page });
        else if (href.includes("map.kakao.com")) track("map_kakao", { page });
        else if (href.includes("map.naver.com")) track("map_naver", { page });
        else if (href.includes("instagram.com")) track("instagram", { page });
        else if (href.includes("smartstore.naver.com"))
          track("store_click", { page });
      } else if (el instanceof HTMLButtonElement) {
        const label = el.textContent?.trim() ?? "";
        if (label.startsWith("상세 더보기")) track("detail_open", { page });
        else if (label.startsWith("예약 문의"))
          track("request_submit", { page });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
