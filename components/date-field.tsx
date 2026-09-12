"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  /** 처음 값(YYYY-MM-DD). 관리 화면의 글 날짜처럼 기본값이 있는 곳. */
  defaultValue?: string;
  /** 지난 날도 고를 수 있게(글 날짜). 방문 예약은 오늘부터만. */
  allowPast?: boolean;
  /** 「날짜 지우기」 — 값이 필수인 곳(글 날짜)에서는 끈다. */
  clearable?: boolean;
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
function parseIso(v?: string) {
  if (!v) return undefined;
  const [y, m, d] = v.split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : undefined;
}

export function DateField({
  id,
  name,
  placeholder = "날짜를 고르세요",
  defaultValue,
  allowPast = false,
  clearable = true,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(() =>
    parseIso(defaultValue),
  );
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  /* 시트는 body 로 포털한다 — 섹션의 .rise transform 이 fixed 의 기준점이 되어 화면 밖에 그려지던 것. */
  const sheet = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const today = todayKst();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!root.current?.contains(t) && !sheet.current?.contains(t))
        setOpen(false);
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

  const [anchor, setAnchor] = useState<{ top: number; left: number } | null>(
    null,
  );
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const r = root.current?.getBoundingClientRect();
      if (!r) return;
      setAnchor(
        window.matchMedia("(min-width: 640px)").matches
          ? { top: r.bottom + 8, left: r.left }
          : null,
      );
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
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
      {open &&
        createPortal(
          <>
            {/* 폰: 어두운 막 + 아래에서 올라오는 시트. 누르면 닫힌다. sm 부터는 입력칸 아래 팝오버라 막이 없다. */}
            <button
              type="button"
              aria-label="달력 닫기"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/40 sm:hidden"
            />
            <div
              ref={sheet}
              id={dialogId}
              role="dialog"
              aria-label="희망 날짜 고르기"
              style={
                anchor ? { top: anchor.top, left: anchor.left } : undefined
              }
              className="fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center border-t border-ink/20 bg-paper px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:inset-x-auto sm:bottom-auto sm:items-stretch sm:border sm:p-3 sm:shadow-[0_12px_32px_-12px_rgba(22,22,22,0.25)]"
            >
              <DatePickerPopover
                selected={date}
                today={today}
                allowPast={allowPast}
                onSelect={(d) => {
                  setDate(d);
                  if (d) setOpen(false);
                }}
              />
              <div className="mt-1 flex w-full justify-between border-t border-ink/10 pt-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-link text-caption sm:hidden"
                >
                  닫기
                </button>
                {clearable && date && (
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
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
