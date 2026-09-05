import type { ReactNode } from "react";
import { MoonMark } from "./moon-mark";

type Props = {
  /** 그 페이지 안에서의 위치. 첫 섹션은 삭에 가깝게, 마지막은 보름. */
  phase: number;
  children: ReactNode;
  /** 어두운 면 위면 paper. 흰 바탕의 달은 먹색이고 노랑은 어두운 면에서만. */
  tone?: "ink" | "paper";
};

/**
 * 섹션 제목 위 캡션 자리에 달 위상 + 라벨.
 *
 * 연표에서만 쓰던 MoonMark 를 전 페이지의 제목 문법으로 확장한다.
 * "연표에서 본 그 달"이 사이트 어디에나 있어야 반복이 서명이 된다.
 *
 * 방지선: 섹션당 하나, 16px 고정, 흰 바탕에서 노랑 금지. 작은 원이 많아지면
 * 불릿 클립아트가 된다.
 */
export function SectionEyebrow({ phase, children, tone = "ink" }: Props) {
  return (
    <p
      className={`flex items-center gap-2.5 text-caption ${
        tone === "paper" ? "text-paper/70" : "text-ink-faint"
      }`}
    >
      <MoonMark
        phase={phase}
        size={16}
        className={tone === "paper" ? "text-moon" : "text-ink"}
      />
      {children}
    </p>
  );
}
