import type { ReactNode } from "react";

/* 본문 속 전화번호는 눌러 걸 수 있게, 하이픈에서 줄이 찢어지지 않게. 직원이 소식에 번호를 자주 적는다. */
export function linkifyTel(text: string): ReactNode[] {
  const parts = text.split(/(0\d{1,2}-\d{3,4}-\d{4})/g);
  return parts.map((part, i) =>
    /^0\d{1,2}-\d{3,4}-\d{4}$/.test(part) ? (
      <a
        key={i}
        href={`tel:${part.replace(/-/g, "")}`}
        className="text-link-inline whitespace-nowrap"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/** 공유 카드·검색 설명용 한 문단. 줄바꿈을 공백으로, 120자에서 자른다. */
export function newsExcerpt(body: string, max = 120) {
  const flat = body.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/** 빈 줄(연속 줄바꿈)로 문단을 나눈다. 문단 안의 한 줄 바꿈은 그대로 둔다(전화번호를 따로 두는 줄). */
export function newsParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}
