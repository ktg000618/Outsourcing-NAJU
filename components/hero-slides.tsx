"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = {
  src: string;
  alt: string;
  /** object-position 클래스. 모바일(4:3)과 sm 이상(16:10·1.79:1)에서 잘리는 방향이 달라 따로 준다. */
  position: string;
};

/**
 * 홈 히어로 — 사진 여러 장이 6초마다 천천히 겹쳐 바뀐다.
 * 사이트에서 유일한 앰비언트 모션. 사진이 이야기(떡 → 사람 → 손 → 밭)를 대신 말하게 하는 자리라 허용한다.
 * 첫 장만 priority 로 싣고 LCP 를 맡긴다. prefers-reduced-motion 이면 첫 장에 멈춘다.
 * 탭이 숨겨지면 멈춘다 — 돌아왔을 때 페이드 중간에 걸린 채로 보이지 않게.
 */
export function HeroSlides({
  slides,
  interval = 6000,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  /* 2~4장은 첫 장이 그려진 뒤에 붙인다 — 넷이 한꺼번에 내려오면 LCP 가 밀린다(모바일 5.5s 실측). */
  const [rest, setRest] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let timer: number | undefined;
    const start = () => {
      stop();
      timer = window.setInterval(
        () => setIndex((i) => (i + 1) % slides.length),
        interval,
      );
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const onVisibility = () =>
      document.visibilityState === "visible" ? start() : stop();
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length, interval]);

  return (
    <>
      {slides.map(
        (s, i) =>
          (i === 0 || rest) && (
            <Image
              key={s.src}
              src={s.src}
              alt={i === index ? s.alt : ""}
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              onLoad={i === 0 ? () => setRest(true) : undefined}
              quality={i === 0 ? 88 : 84}
              sizes="(min-width: 1200px) 1152px, 100vw"
              className={`object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${s.position} ${
                i === index ? "opacity-100" : "opacity-0"
              } ${i === 0 ? "enter-photo" : ""}`}
            />
          ),
      )}
      {slides.length > 1 && (
        /* 진행 표시 — 짧은 선 넷. 아이콘·점 대신 괘선 문법. 누르면 그 장으로. */
        <div className="absolute right-5 top-5 z-10 flex gap-1.5 sm:right-7 sm:top-7">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`${i + 1}번째 사진: ${s.alt}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="group -m-1 p-1"
            >
              <span
                className={`block h-[3px] w-6 transition-colors sm:w-8 ${
                  i === index
                    ? "bg-moon"
                    : "bg-paper/45 group-hover:bg-paper/80"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
