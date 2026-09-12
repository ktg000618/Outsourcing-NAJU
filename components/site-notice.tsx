import { linkifyTel } from "@/components/news-text";

/**
 * 공지 띠 — 머리 바로 아래 한 줄. 휴무·명절 배송 마감처럼 며칠만 켜 두는 안내라
 * 색을 크게 쓰지 않는다: 종이-2 바탕에 달노랑 점 하나. 전화번호는 눌러서 걸린다.
 */
export function SiteNotice({ text }: { text: string }) {
  return (
    <aside aria-label="공지" className="border-b border-ink/10 bg-paper-2">
      <p className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-2.5 text-small lg:px-8">
        <span
          aria-hidden
          className="mt-[0.55em] size-2 shrink-0 rounded-full bg-moon"
        />
        <span className="min-w-0">{linkifyTel(text)}</span>
      </p>
    </aside>
  );
}
