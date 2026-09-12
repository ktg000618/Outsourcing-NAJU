"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";

// 달력(라이브러리 + 스타일시트)은 처음 여는 순간에만 받는다 — 폼을 보기만 하는 방문에는 싣지 않는다.
const DatePickerPopover = dynamic(() => import("./date-picker-popover"), {
  ssr: false,
  loading: () => <div aria-hidden className="h-[21rem] w-[19rem]" />,
});

type Props = {
  id: string;
  /** 폼으로 넘어가는 값의 이름. 값은 YYYY-MM-DD 한 가지 꼴이다. */
  name: string;
  placeholder?: string;
};

function todayKst() {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  return new Date(y, m - 1, d);
}

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dateFmt = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const weekdayFmt = new Intl.DateTimeFormat("ko-KR", { weekday: "short" });
/** 「2026년 9월 15일 (화)」 */
const labelOf = (d: Date) => `${dateFmt.format(d)} (${weekdayFmt.format(d)})`;

/**
 * 희망 날짜 입력. 브라우저마다 다르게 생긴 기본 날짜 입력 대신, 사이트와 같은 얼굴의 달력을 연다.
 * 지난 날은 고를 수 없고, 고르면 바로 닫힌다. 바깥을 누르거나 Esc 로도 닫힌다.
 */
export function DateField({
  id,
  name,
  placeholder = "날짜를 고르세요",
}: Props) {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const today = todayKst();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const text = date ? labelOf(date) : placeholder;

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen((v) => !v)}
        className={`field-input flex items-center justify-between gap-3 text-left tabular-nums ${date ? "" : "text-ink-faint"}`}
      >
        <span>{text}</span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="size-4 shrink-0 text-ink-faint"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="3" y="4.5" width="14" height="12" />
          <path d="M3 8.5h14M7 2.5v4M13 2.5v4" />
        </svg>
      </button>
      <input type="hidden" name={name} value={date ? toIso(date) : ""} />
      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-label="희망 날짜 고르기"
          className="absolute left-0 top-full z-20 mt-2 border border-ink/20 bg-paper p-3 shadow-[0_12px_32px_-12px_rgba(22,22,22,0.25)]"
        >
          <DatePickerPopover
            selected={date}
            today={today}
            onSelect={(d) => {
              setDate(d);
              if (d) setOpen(false);
            }}
          />
          {date && (
            <div className="mt-1 flex justify-end border-t border-ink/10 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDate(undefined);
                  setOpen(false);
                }}
                className="text-link text-caption"
              >
                날짜 지우기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
