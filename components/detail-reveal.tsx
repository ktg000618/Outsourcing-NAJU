"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * 긴 상세 이미지를 처음엔 일부만 보이고, 「더보기」로 전부 펼친다.
 * 접어 두면(details) 손님이 열기 전엔 아무것도 안 보여 상세가 없는 줄 안다 — 리더 지적.
 * 위 절반을 보여 주고 아래를 종이색으로 잦아들게 해 "더 있다"를 사진이 직접 말하게 한다.
 * 접을 때는 섹션 머리로 되돌린다 — 만 픽셀 아래에서 접히면 손님이 어디에 있는지 잃는다.
 */
export function DetailReveal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  return (
    <div ref={top} className="scroll-mt-28">
      {/*
        접힌 높이는 표지 다음 색면까지 — 표지 헤드라인 한가운데서 잦아들면 잘린 듯 보인다.
        860px 열 기준 표지가 1,040px 이라 PC 1,180 · 모바일(≈350px 열) 640.
      */}
      <div
        className={`relative overflow-hidden ${open ? "" : "max-h-[640px] lg:max-h-[1180px]"}`}
      >
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-paper via-paper/80 to-transparent"
          />
        )}
      </div>
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (!next) top.current?.scrollIntoView({ block: "start" });
          }}
          className="btn-lift inline-flex items-center gap-2 border border-ink bg-paper px-8 py-3 text-small text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          {open ? "접기" : "상세 더보기"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M2.5 5l4.5 4.5L11.5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
