import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

/** 제품이 늘면 여기도 따라 늘도록 목록에서 뽑는다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/story", "/products", "/visit", "/news"];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: path === "/news" ? ("weekly" as const) : ("monthly" as const),
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
