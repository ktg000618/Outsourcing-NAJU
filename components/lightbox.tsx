"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type LightboxItem = { src: string; alt: string };

type Ctx = { open: (index: number) => void };
const LightboxContext = createContext<Ctx | null>(null);

/**
 * 사진 크게 보기. 타일을 `LightboxButton` 으로 감싸면 누를 때 전체 화면으로 열리고,
 * 좌우 화살표·스와이프로 넘기고, Esc·바깥·닫기 버튼으로 닫는다.
 * 사진 목록(items)의 순서가 곧 넘기는 순서다 — 타일의 index 와 맞춰 둘 것.
 */
export function Lightbox({
  items,
  children,
}: {
  items: LightboxItem[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count)),
    [count],
  );

  // 열림/닫힘을 <dialog> 에 반영하고, 열린 동안 뒤 화면이 스크롤되지 않게 한다.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
    document.documentElement.style.overflow = index !== null ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [index]);

  useEffect(() => {
    if (index === null || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, count, step]);

  const item = index === null ? null : items[index];

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => {
          // 사진·버튼이 아닌 바깥(backdrop 포함)을 누르면 닫는다.
          if ((e.target as HTMLElement).dataset.lightboxBackdrop) close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const x0 = touchX.current;
          const x1 = e.changedTouches[0]?.clientX;
          touchX.current = null;
          if (x0 === null || x1 === undefined || count < 2) return;
          if (x1 - x0 > 40) step(-1);
          else if (x0 - x1 > 40) step(1);
        }}
        aria-label="사진 크게 보기"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/90"
      >
        {item && (
          <div
            data-lightbox-backdrop
            className="relative flex h-full w-full flex-col"
          >
            <div
              data-lightbox-backdrop
              className="relative min-h-0 flex-1 sm:m-8"
            >
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={82}
                priority
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-caption text-paper-soft">
              <p className="min-w-0 truncate">{item.alt}</p>
              {count > 1 && (
                <p className="shrink-0 tabular-nums">
                  {(index ?? 0) + 1} / {count}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] flex size-11 items-center justify-center bg-ink/60 text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moon"
            >
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="이전 사진"
                  className="absolute left-2 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center bg-ink/60 text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moon sm:flex"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M12.5 4L6.5 10l6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="다음 사진"
                  className="absolute right-2 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center bg-ink/60 text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moon sm:flex"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M7.5 4l6 6-6 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}

/** 사진 타일을 감싸는 버튼. `fill` 이미지가 그대로 앉도록 자리를 꽉 채운다. */
export function LightboxButton({
  index,
  label,
  children,
}: {
  index: number;
  /** 스크린리더용. 대개 사진 alt. */
  label: string;
  children: ReactNode;
}) {
  const ctx = useContext(LightboxContext);
  return (
    <button
      type="button"
      onClick={() => ctx?.open(index)}
      aria-label={`${label} — 크게 보기`}
      className="group absolute inset-0 block cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
    </button>
  );
}
