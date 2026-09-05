import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { MobileActionBarGate } from "@/components/mobile-action-bar-gate";
import { site } from "@/lib/site";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  /* 없으면 opengraph-image 가 상대 경로로 나가서 카톡·검색이 못 읽는다. */
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    url: site.url,
  },
};

/**
 * 지역 업장 구조화 데이터.
 *
 * 네이버·구글이 "나주 떡집"을 이해하는 경로다. 화면에 안 보이지만 검색
 * 노출의 기본이고, 값은 전부 site 에서 온다 — 상호·시간이 바뀌면
 * 화면과 함께 자동으로 따라간다.
 *
 * Bakery 는 LocalBusiness 의 하위 타입이라 주소·영업시간을 그대로 받으면서
 * 업종까지 말해 준다.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.tel,
  image: `${site.url}/opengraph-image.jpg`,
  foundingDate: String(site.since),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    postalCode: site.postalCode,
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.mapLat,
    longitude: site.mapLng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.opensAt,
      closes: site.closesAt,
    },
  ],
  ...(site.instagramUrl ? { sameAs: [site.instagramUrl] } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // 우리가 만든 객체라 외부 입력이 섞이지 않는다.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-paper"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBarGate>
          <MobileActionBar />
        </MobileActionBarGate>
      </body>
    </html>
  );
}
