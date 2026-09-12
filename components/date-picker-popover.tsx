"use client";

import type { CSSProperties } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/dist/style.css";

/**
 * 달력 색은 클래스가 아니라 변수로 준다 — v9 는 `--rdp-*` 변수에서 선택·오늘 색을 전부 파생한다.
 * 먹색 선택 + 흰 글자, 오늘은 먹색 글자.
 */
const BRAND_VARS = {
  "--rdp-accent-color": "#161616",
  "--rdp-accent-background-color": "#f6f4f0",
  "--rdp-day-width": "2.5rem",
  "--rdp-day-height": "2.5rem",
  "--rdp-day_button-width": "2.5rem",
  "--rdp-day_button-height": "2.5rem",
} as CSSProperties;

type Props = {
  selected?: Date;
  today: Date;
  onSelect: (d?: Date) => void;
};

/**
 * 달력 본체. 달력 라이브러리와 그 스타일시트는 이 파일에만 있어, 열기 전에는 페이지에 실리지 않는다.
 */
export default function DatePickerPopover({
  selected,
  today,
  onSelect,
}: Props) {
  return (
    <DayPicker
      mode="single"
      locale={ko}
      selected={selected}
      defaultMonth={selected ?? today}
      disabled={{ before: today }}
      onSelect={onSelect}
      style={BRAND_VARS}
    />
  );
}
