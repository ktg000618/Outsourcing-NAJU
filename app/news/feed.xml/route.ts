import { getPublishedPosts } from "@/lib/news";
import { site } from "@/lib/site";

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c]!,
  );

/** 소식 RSS — 구독기·검색엔진이 새 글을 바로 안다. 사진은 첫 장만 enclosure 로. */
export async function GET() {
  const posts = await getPublishedPosts(30);
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${site.url}/news#${p.id}</link>
  <guid isPermaLink="false">${p.id}</guid>
  <pubDate>${new Date(`${p.published_on}T09:00:00+09:00`).toUTCString()}</pubDate>
  <description>${esc(p.body)}</description>${p.images[0] ? `\n  <enclosure url="${esc(p.images[0])}" type="image/jpeg" />` : ""}
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${esc(site.name)} 소식</title>
  <link>${site.url}/news</link>
  <description>${esc(site.name)}의 휴무·신제품·행사 소식</description>
  <language>ko</language>
${items}
</channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
