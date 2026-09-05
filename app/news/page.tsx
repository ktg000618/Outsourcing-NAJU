import type { Metadata } from "next";
import { site } from "@/lib/site";
import { MoonMark } from "@/components/moon-mark";

export const metadata: Metadata = {
  title: "소식",
  description: `${site.name}의 휴무·신제품·행사 소식.`,
};

/**
 * TODO(개발): Supabase 에서 소식을 읽어온다. 어드민에서 사장님이 직접 쓰는 글이다.
 * 지금은 빈 상태만 만들어 두고, 스키마가 서면 이 목록을 채운다.
 */
const posts: { id: string; title: string; date: string; body: string }[] = [];

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16 lg:px-8 lg:pb-32 lg:pt-24">
      <h1 className="text-h1 lg:text-h1-lg">소식</h1>
      <p className="mt-5 text-ink-soft">
        휴무와 신제품, 행사 소식을 이곳에 올립니다.
      </p>

      {posts.length === 0 ? (
        /* 빈 상태도 디자인이다. 회색 상자 대신 빈 달 + 큰 활자. 소식은 인스타에 먼저 올라간다. */
        <div className="mt-14 border-y border-ink/10 py-16 lg:py-24">
          <MoonMark phase={0} size={40} className="text-ink" />
          <p className="mt-6 text-h2 lg:text-h2-lg">
            <span className="block font-thin tracking-tight">아직 올라온</span>
            <span className="block font-black tracking-tighter">소식이 없습니다</span>
          </p>
          <p className="mt-5 max-w-prose text-ink-soft">
            새 소식은 인스타그램에 먼저 올립니다. 급한 문의는 전화가 가장 빠릅니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                rel="noreferrer"
                target="_blank"
                className="btn-lift inline-block border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft"
              >
                인스타그램에서 보기<span className="sr-only"> (새 창)</span>
              </a>
            )}
            <a
              aria-label={`전화 걸기 ${site.tel}`}
              href={`tel:${site.tel.replace(/-/g, "")}`}
              className="pressable inline-block border border-ink/25 px-7 py-3 text-small transition-colors hover:border-mint-link hover:text-mint-link"
            >
              {site.tel}
            </a>
          </div>
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {posts.map((post) => (
            <li key={post.id} className="py-7">
              <p className="text-caption text-ink-faint">{post.date}</p>
              <h2 className="mt-1.5 text-xl">{post.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
