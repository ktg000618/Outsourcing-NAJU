import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/news";
import { NEWS_PER_PAGE, NewsListPage } from "@/components/news-list-page";

/**
 * 2쪽부터. 1쪽은 /news 다 — 같은 내용이 두 주소에 있지 않게 1은 404.
 * 빌드 때 있던 쪽만 미리 만들고, 그 뒤 글이 늘어 생긴 쪽(21번째 글의 3쪽)은 첫 요청 때 만든다 —
 * dynamicParams=false 면 관리 화면에서 글을 올려도 재배포 전까지 그 쪽이 404 였다.
 */
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const pageCount = Math.ceil(posts.length / NEWS_PER_PAGE);
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({
    n: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `소식 ${n}쪽`,
    description: `${site.name}의 휴무·신제품·행사 소식.`,
    alternates: { canonical: `/news/page/${n}` },
  };
}

export default async function NewsPageN({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2) notFound();
  const posts = await getPublishedPosts();
  if (page > Math.ceil(posts.length / NEWS_PER_PAGE)) notFound();
  return <NewsListPage page={page} />;
}
