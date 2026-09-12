import type { Metadata } from "next";
import { site } from "@/lib/site";
import { NewsListPage } from "@/components/news-list-page";

export const metadata: Metadata = {
  title: "소식",
  description: `${site.name}의 휴무·신제품·행사 소식.`,
  alternates: {
    canonical: "/news",
    types: { "application/rss+xml": "/news/feed.xml" },
  },
};

/** 직원이 /admin 에서 쓴 글. 저장 시 revalidatePath 로 바로 갱신되고, 그 밖엔 1시간 캐시. */
export const revalidate = 3600;

export default function NewsPage() {
  return <NewsListPage page={1} />;
}
