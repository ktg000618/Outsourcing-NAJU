"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** 화면에 안 보이는 설명. 소리가 없는 영상이라 이것이 유일한 대체 텍스트다. */
  label: string;
};

/**
 * 소리 없는 짧은 루프 영상.
 *
 * 자동 재생 루프는 5초를 넘는 순간 WCAG 2.2.2(Pause, Stop, Hide, Level A)
 * 대상이 되어 멈출 수단이 있어야 한다. 그래서 이 컴포넌트가 존재한다 —
 * <video> 하나로는 규정을 못 맞춘다.
 *
 * 재생 상태를 effect 로 미러링하지 않고 video 자신의 play/pause 이벤트로
 * 받는다. effect 안에서 setState 하면 렌더가 한 번 더 돌고, 이 레포의
 * lint 가 그걸 error 로 막는다.
 */
export function LoopingVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // 처음은 "멈춤"으로 둔다. autoplay 가 실제로 시작되면 onPlay 가 true 로 올린다 —
  // 자동재생이 막힌 환경(절전 모드·데이터 절약)에서 ⏸ 를 보여 주던 거짓 상태를 막는다.
  const [playing, setPlaying] = useState(false);

  // 모션을 줄이도록 설정한 사용자에게는 처음부터 멈춰 둔다.
  // pause() 는 외부 시스템(비디오 요소) 조작이라 effect 가 맞는 자리이고,
  // 여기서 setState 는 하지 않는다 — onPause 가 알아서 상태를 맞춘다.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
    }
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-paper-2">
      <video
        ref={ref}
        aria-label={label}
        autoPlay
        className="block h-full w-full object-cover"
        loop
        muted
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        // autoplay 가 hydration 보다 먼저 시작되면 play 이벤트를 놓친다. 재생 중엔
        // timeupdate 가 계속 오므로 그걸로 따라잡는다(같은 값 setState 는 무시된다).
        onTimeUpdate={() => {
          if (ref.current && !ref.current.paused) setPlaying(true);
        }}
        playsInline
        poster={poster}
        preload="metadata"
        src={src}
      />
      <button
        className="pressable absolute bottom-3 right-3 bg-ink/60 px-3 py-1.5 text-caption text-paper transition-colors hover:bg-ink"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          if (v.paused) void v.play();
          else v.pause();
        }}
        type="button"
      >
        {playing ? "일시정지" : "재생"}
      </button>
    </div>
  );
}
