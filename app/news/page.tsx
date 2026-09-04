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
      <h1 className="font-display text-4xl lg:text-5xl">소식</h1>
      <p className="mt-5 text-moss-600">
        휴무와 신제품, 행사 소식을 이곳에 올립니다.
      </p>

      {posts.length === 0 ? (
        <div className="mt-14 rounded-2xl bg-paper-dim px-7 py-14 text-center">
          <p className="font-display text-xl">아직 올라온 소식이 없습니다</p>
          <p className="mt-3 text-[15px] text-moss-600">
            급한 문의는 전화로 주시면 가장 빠릅니다.
          </p>
          <a
            href={`tel:${site.tel.replace(/-/g, "")}`}
            className="mt-7 inline-block rounded-full bg-moss px-6 py-3 text-[15px] text-paper transition-opacity hover:opacity-90"
          >
            {site.tel}
          </a>
        </div>
      ) : (
        <ul className="mt-12 divide-y divide-moss/10 border-y border-moss/10">
          {posts.map((post) => (
            <li key={post.id} className="py-7">
              <p className="text-[14px] text-moss-300">{post.date}</p>
              <h2 className="mt-1.5 font-display text-xl">{post.title}</h2>
              <p className="mt-2 leading-relaxed text-moss-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
