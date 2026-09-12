import type { ReactNode } from "react";
import { SectionEyebrow } from "./section-eyebrow";

type Props = {
  /** 그 페이지 안에서의 위치 — SectionEyebrow 의 달 위상. */
  phase: number;
  eyebrow: ReactNode;
  /** 문자열이면 검은 줄 하나. {thin, black} 이면 얇은 줄(100) + 검은 줄(900) 쌍. */
  title: string | { thin: string; black: string };
  /** block = 두 줄로 쌓는다(기본). inline = 한 줄에 이어 쓴다("낱개로 싸서, 상자에 담아"). */
  split?: "block" | "inline";
  /** 제목 아래 한 문단. h1 은 오른쪽 열에, h2 는 제목 아래에 선다. */
  lead?: ReactNode;
  /** 어두운 면 위면 paper. */
  tone?: "ink" | "paper";
  /** h1 = 서브페이지 히어로(7:5 격자, 88px). h2 = 섹션 머리(기본). */
  as?: "h1" | "h2";
  /** 제목 오른쪽 끝에 붙는 링크 등. h2 전용. */
  aside?: ReactNode;
};

/**
 * 섹션 머리 — 달 눈썹 → 제목 → 리드. 사이트의 제목 문법은 이 하나다.
 *
 * 얇은 줄과 검은 줄의 자간이 자리마다 다르다: 88px 히어로와 한 줄로 잇는 inline 은
 * 붙여 읽히도록 tight/tighter 를, 두 줄로 쌓는 h2 는 기본 제목 자간(--tracking-heading)을 쓴다.
 */
export function SectionHead({
  phase,
  eyebrow,
  title,
  split = "block",
  lead,
  tone = "ink",
  as = "h2",
  aside,
}: Props) {
  const pair = typeof title === "string" ? null : title;
  const tightPair = as === "h1" || split === "inline";
  const thinClass = `${split === "block" ? "block " : ""}font-thin${tightPair ? " tracking-tight" : ""}`;
  const blackClass = `${split === "block" ? "block " : ""}font-black${tightPair ? " tracking-tighter" : ""}`;
  const body: ReactNode = pair ? (
    <>
      <span className={thinClass}>{pair.thin}</span>
      <span className={blackClass}>{pair.black}</span>
    </>
  ) : (
    String(title)
  );

  if (as === "h1") {
    return (
      <>
        <SectionEyebrow phase={phase} tone={tone}>
          {eyebrow}
        </SectionEyebrow>
        {/* 리드는 검은 줄 윗선에 맞춘다 — 얇은 줄 한 행(88px × 1.02)만큼 내려 시작하고, 글자 윗선 차이 13px 를 빼서 보정(실측). */}
        <div className="mt-4 lg:grid lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-16">
          <h1 className="max-w-[16ch] text-h1 lg:text-hero">{body}</h1>
          {lead && (
            <p className="mt-5 max-w-md text-ink-soft lg:mt-0 lg:pt-[calc(var(--text-hero)*var(--text-hero--line-height)-13px)]">
              {lead}
            </p>
          )}
        </div>
      </>
    );
  }

  const heading = (
    <h2
      className={`mt-3 text-h2 lg:text-h2-lg${pair ? "" : " font-black"}${
        pair && split === "block" ? " max-w-[16ch]" : ""
      }`}
    >
      {body}
    </h2>
  );

  if (aside) {
    return (
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionEyebrow phase={phase} tone={tone}>
            {eyebrow}
          </SectionEyebrow>
          {heading}
        </div>
        {aside}
      </div>
    );
  }

  return (
    <>
      <SectionEyebrow phase={phase} tone={tone}>
        {eyebrow}
      </SectionEyebrow>
      {heading}
      {lead && (
        <p
          className={`mt-6 max-w-md text-small lg:text-body ${
            tone === "paper" ? "text-paper-soft" : "text-ink-soft"
          }`}
        >
          {lead}
        </p>
      )}
    </>
  );
}
