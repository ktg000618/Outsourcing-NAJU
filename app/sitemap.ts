import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

/** 제품이 늘면 여기도 따라 늘도록 목록에서 뽑는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  /* 요청마다 바뀌는 new Date() 는 신호가 없다 — 내용이 바뀐 배포일을 손으로 올린다. */
  const now = new Date("2026-09-12");
  const pages = ["", "/story", "/jeolgutdae", "/products", "/visit", "/news"];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
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
  ];
}
