"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** 화면에 안 보이는 설명. 자막이 화면에 박힌 영상이라 소리 없이도 내용이 전달된다. */
  label: string;
};

/**
 * 후기 영상 — 포스터 + 원형 재생 버튼. 누르기 전엔 OS 기본 컨트롤을 안 보인다.
 *
 * 기본 컨트롤이 박힌 <video> 는 사이트 밖 물건처럼 보였다(리더 지적). 누르면 그때
 * 재생하고 controls 를 켠다 — 되감기·소리는 사용자가 원할 때만 필요하다.
 * 상태는 이벤트 콜백 안에서만 바꾼다(effect 에서 setState 하지 않는다).
 */
export function ReviewVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink ring-1 ring-inset ring-paper/15">
      <video
        ref={ref}
        aria-label={label}
        className="block w-full"
        controls={started}
        onPlay={() => setStarted(true)}
        playsInline
        poster={poster}
        preload="metadata"
        src={src}
      />
      {!started && (
        <button
          type="button"
          aria-label="후기 영상 재생"
          onClick={() => void ref.current?.play()}
          className="group absolute inset-0 grid place-items-center"
        >
          <span className="grid size-16 place-items-center rounded-full border border-paper/70 bg-ink/55 text-paper backdrop-blur transition-transform duration-300 group-hover:scale-105">
            <svg aria-hidden viewBox="0 0 16 16" className="ml-0.5 size-5 fill-current">
              <path d="M4 2l10 6-10 6z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
