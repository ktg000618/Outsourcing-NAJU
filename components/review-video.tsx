"use client";

import { useRef, useState, type ReactNode } from "react";

type Moment = { t: number; text: string };

type Props = {
  src: string;
  poster: string;
  /** 화면에 안 보이는 설명. 자막이 화면에 박힌 영상이라 소리 없이도 내용이 전달된다. */
  label: string;
  moments: Moment[];
  /** 제목·출처 — 서버에서 넘어오는 정적 부분. 대목 목록 위에 놓인다. */
  children: ReactNode;
};

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

/**
 * 후기 영상 — 영상 속 "말한 대목" 목록 + 포스터/원형 재생 버튼.
 *
 * 후기 섹션의 글이 제품 설명을 되풀이할 뿐 후기 본인의 말이 한 마디도 없었다(리더 지적).
 * 자막을 옮긴 대목을 목록으로 두고, 누르면 그 시점으로 영상이 간다. 재생 중엔 현재
 * 대목이 밝아진다. 기본 컨트롤은 누른 뒤에만 — 처음부터 회색 재생 바가 있으면
 * 사이트 밖 물건처럼 보인다.
 * 상태는 이벤트 콜백 안에서만 바꾼다(effect 에서 setState 하지 않는다).
 */
export function ReviewVideo({ src, poster, label, moments, children }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  const activeIndex = started
    ? moments.reduce((acc, m, i) => (time >= m.t ? i : acc), -1)
    : -1;

  const seek = (t: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
    void v.play();
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
      <div>
        {children}
        <ol className="mt-8 border-t border-paper/15">
          {moments.map((m, i) => {
            const active = i === activeIndex;
            return (
              <li key={m.t} className="border-b border-paper/15">
                <button
                  type="button"
                  aria-current={active ? "true" : undefined}
                  onClick={() => seek(m.t)}
                  className={`flex w-full items-baseline gap-4 py-3.5 text-left transition-colors hover:text-paper ${
                    active ? "text-paper" : "text-paper/65"
                  }`}
                >
                  <span
                    className={`w-10 shrink-0 font-mono text-caption tabular-nums ${
                      active ? "text-moon" : "text-paper/45"
                    }`}
                  >
                    {mmss(m.t)}
                  </span>
                  <span className={`text-body ${active ? "font-semibold" : ""}`}>{m.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none">
        <div className="relative overflow-hidden rounded-2xl bg-ink ring-1 ring-inset ring-paper/15">
          <video
            ref={ref}
            aria-label={label}
            className="block w-full"
            controls={started}
            onPlay={() => setStarted(true)}
            onTimeUpdate={() => setTime(ref.current?.currentTime ?? 0)}
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
      </div>
    </div>
  );
}
