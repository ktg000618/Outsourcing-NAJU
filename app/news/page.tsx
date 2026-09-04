import type { Metadata } from "next";
import { site } from "@/lib/site";

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
        <div className="mt-14 rounded-2xl bg-paper-2 px-7 py-14 text-center">
          <p className="text-xl">아직 올라온 소식이 없습니다</p>
          <p className="mt-3 text-small text-ink-soft">
            급한 문의는 전화로 주시면 가장 빠릅니다.
          </p>
          <a
            href={`tel:${site.tel.replace(/-/g, "")}`}
            className="mt-7 inline-block border border-ink bg-ink px-7 py-3 text-small text-paper pressable transition-colors hover:bg-ink-soft hover:border-ink-soft"
          >
            {site.tel}
          </a>
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
