import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/news";
import { products, site } from "@/lib/site";

/** 제품이 늘면 여기도 따라 늘도록 목록에서 뽑는다. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* 요청마다 바뀌는 new Date() 는 신호가 없다 — 내용이 바뀐 배포일을 손으로 올린다. */
  const now = new Date("2026-09-17");
  const posts = await getPublishedPosts();
  const pages = [
    "",
    "/story",
    "/jeolgutdae",
    "/products",
    "/visit",
    "/news",
    "/privacy",
  ];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      /* 소식 목록은 글이 올라올 때마다 바뀐다 — 최신 글의 갱신일이 곧 목록의 갱신일. */
      lastModified:
        path === "/news" && posts[0] ? new Date(posts[0].updated_at) : now,
      changeFrequency:
        path === "/news" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/news/${p.id}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
