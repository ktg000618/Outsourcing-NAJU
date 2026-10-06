import { linkifyTel } from "@/components/news-text";

const TEL = /0\d{1,2}-\d{3,4}-\d{4}/;

/**
 * 공지 띠 — 머리 바로 아래 한 줄. 휴무·명절 주문 마감처럼 며칠만 켜 두는 안내.
 *
 * 세 덩이로 읽힌다: 「공지」 표식 · 문장 · 전화 버튼.
 * 문장 끝에 전화번호가 있으면 문장에서 떼어 버튼으로 세운다 — 띠의 용건은 대개 "전화 주세요"라서
 * 밑줄 친 숫자보다 누를 버튼이 맞다. 문장 가운데 섞인 번호는 그대로 두고 밑줄 링크로만 건다.
 * 색은 크게 쓰지 않는다: 종이-2 바탕, 달노랑은 표식의 점 하나와 버튼 밑줄에만.
 */
export function SiteNotice({ text }: { text: string }) {
  const trailing = text.match(new RegExp(`\\s*(${TEL.source})\\s*$`));
  const phone = trailing?.[1] ?? null;
  const body = phone ? text.slice(0, trailing!.index).trim() : text;

  return (
    <aside aria-label="공지" className="border-b border-ink/10 bg-paper-2">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 lg:px-8">
        <span className="inline-flex shrink-0 items-center gap-2 text-caption font-bold tracking-wide text-ink">
          <span aria-hidden className="size-2 rounded-full bg-moon" />
          공지
        </span>
        <p className="min-w-0 flex-1 basis-[16rem] text-small text-ink">
          {linkifyTel(body)}
        </p>
        {phone && (
          <a
            href={`tel:${phone.replace(/-/g, "")}`}
            className="pressable inline-flex shrink-0 items-center gap-2 border border-ink bg-ink px-3.5 py-1.5 text-caption font-bold text-paper transition-colors hover:bg-ink-soft"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.7a2 2 0 0 1 1.7 2z" />
            </svg>
            <span className="tabular-nums">{phone}</span>
            <span className="sr-only">로 전화 걸기</span>
          </a>
        )}
      </div>
    </aside>
  );
}
