/**
 * 사이트 전체가 쓰는 업장 정보와 콘텐츠.
 *
 * 화면 곳곳에 흩어지면 상호·전화번호가 바뀔 때 빠뜨리는 곳이 생긴다.
 * 여기 한 곳만 고치면 헤더·푸터·구조화 데이터가 함께 따라간다.
 *
 * null 인 값은 아직 클라이언트에게 못 받은 것이다. 화면은 null 이면 그 줄을
 * 통째로 감추도록 만들어 두었으니, 값이 오면 여기만 채우면 된다.
 */

/* 전화 링크는 하이픈을 뺀 번호다. 화면마다 replace 를 되풀이하지 않도록 여기서 한 번 만든다. */
const tel = "061-336-6969";
const mobile = "010-6603-0848";
const mobile2 = "010-5141-0103";
const telHref = (n: string) => `tel:${n.replace(/-/g, "")}`;

export const site = {
  name: "절굿대달토끼",
  fullName: "나주시 여행자플랫폼 절굿대달토끼",
  tagline: "남도의 으뜸맛떡",
  description:
    "사라졌던 나주 절굿대떡을 되살려 인공첨가물 없이 재래방식으로 빚습니다. 나주 징고샅길의 떡카페에서 맛보고, 만들어 볼 수 있습니다.",
  /* 법적 표기의 대표자 — 사업자등록증·사회적기업 인증서·명함 모두 김은아. 복원자 김화수 대표는 이야기에 나온다. */
  owner: "김은아",
  since: 2016,

  /* 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 만 바꾼다 — sitemap·OG·구조화
     데이터가 전부 이 값을 쓴다. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://xn--mf0bs0dqvcjcs95kebm.kr",

  tel,
  mobile,
  mobile2,
  telHref: telHref(tel),
  mobileHref: telHref(mobile),
  mobile2Href: telHref(mobile2),
  address: "전라남도 나주시 징고샅길 7-1",
  addressRegion: "전라남도",
  addressLocality: "나주시",

  hours: "매일 09:00 – 18:00",
  /** 요일별로 시간이 같고 정기 휴무가 확인되지 않았다. 값이 null 이면 화면에서 줄이 사라진다. */
  closedDays: null as string | null,
  /** 오시는 길. 거리·시간은 2026-09-12 경로 실측(도로 2.4km 등)을 넉넉히 반올림한 값 — 교통 상황에 따라 다르다. */
  directions: [
    { from: "나주역 (KTX·SRT)", how: "택시 약 5분 · 도보 약 30분 (2.4km)" },
    { from: "나주시외버스터미널", how: "도보 약 10분 (600m)" },
    { from: "광주송정역 (KTX)", how: "자동차 약 20분 (15km)" },
  ],
  /** 구조화 데이터(LocalBusiness)용. 화면 표기는 hours 를 쓴다. */
  opensAt: "09:00",
  closesAt: "18:00",

  /**
   * 온라인 판매처. 2026-06-22 시민의소리 기사(업체 제공)로 확인한 카카오쇼핑 스토어.
   * 네이버 스마트스토어가 생기면 그쪽으로 바꾸거나 둘을 나란히 둔다 — 이름은 storeName 이 따라간다.
   */
  storeUrl: "https://store.kakao.com/sunriseea" as string | null,
  storeName: "카카오쇼핑 절굿대 스토어",

  /** 공식 SNS — 클라이언트(김은아) 확인 2026-10-07. 인스타 주소의 stkn 추적 토큰은 떼고 저장한다. */
  instagramUrl: "https://www.instagram.com/jeol_gutdae/" as string | null,
  blogUrl: "https://blog.naver.com/sunriseea" as string | null,
  /** 카카오맵 장소 페이지(장소 ID 302960832). 길찾기·리뷰·지도 퍼가기가 여기서 나온다. */
  kakaoPlaceUrl: "https://place.map.kakao.com/302960832",
  /** TODO(클라이언트): 문의 이메일. null 이면 푸터 사업자 표기 줄에서 빠진다. */
  email: "sunriseea@hanmail.net" as string | null,

  /** 법인명. 화면에 보이는 이름은 site.name(절굿대달토끼), 법적 표기는 이쪽이다. */
  legalName: "농업회사법인주식회사절굿대",
  businessNumber: "794-88-01567",
  corporateNumber: "205511-0063933",
  mailOrderNumber: "제2020-전남나주-0086호",
  postalCode: "58257",
  /* 징고샅길 좌표(OSM Nominatim 조회, 우편번호 58257 일치 확인).
     건물 단위가 아니라 길 기준이라 지도는 위치 감만 준다 —
     정확한 안내는 카카오·네이버 길찾기 버튼이 주소로 검색해 처리한다. */
  mapLat: 35.0311676,
  mapLng: 126.7158922,
} as const;

/** 헤더·푸터가 함께 쓰는 메뉴. 순서가 곧 정보 구조다. */
export const nav = [
  { href: "/story", label: "이야기" },
  { href: "/products", label: "제품" },
  { href: "/visit", label: "체험·매장" },
  { href: "/news", label: "소식" },
] as const;

/** 자주 묻는 질문 — 전화로 가장 많이 오는 것. 방문 페이지에 접이식으로 싣고, 같은 내용을 FAQPage 구조화 데이터로 검색에 낸다. 확정 사실만. */
export const faq = [
  {
    q: "주문은 어떻게 하나요?",
    a: "전화(061-336-6969)로 수량과 구성을 상의해 주문합니다. 이바지·답례처럼 구성이 정해지지 않은 주문은 전화가 빠릅니다. 매장(나주시 징고샅길 7-1)에서도 바로 사실 수 있습니다. 나주배 촉촉오란다는 카카오쇼핑 스토어에서도 살 수 있습니다.",
  },
  {
    q: "떡은 어떻게 보관하나요?",
    a: "받으신 날 드시는 것이 가장 좋습니다. 남으면 굳기 전에 낱개 포장 그대로 냉동하고, 드실 때 실온에 1~2시간 두거나 찜기·전자레인지로 말랑하게 데웁니다.",
  },
  {
    q: "오란다는 어떻게 보관하나요?",
    a: "냉장·냉동을 권합니다. 상온 보관도 됩니다. 유통기한은 낱개 포장에 적혀 있습니다. 냉동했다면 30분 전에 상온에 두거나 전자레인지에 15초 데우면 속이 다시 촉촉해집니다.",
  },
  {
    q: "택배로 받을 수 있나요?",
    a: "됩니다. 떡은 보냉 상자에 담아 택배로 보냅니다. 배송비는 3,500원이고, 걸리는 날수는 주문할 때 안내해 드립니다.",
  },
  {
    q: "체험은 누가 참여할 수 있나요?",
    a: "학교·단체·가족 모두 가능하고 개인도 참여할 수 있습니다. 인원과 날짜에 따라 준비가 필요해 예약해 주셔야 합니다. 인원·시간·참가비는 전화로 문의해 주세요.",
  },
  {
    q: "선물세트는 어떻게 구성되나요?",
    a: "절굿대떡과 나주배 촉촉오란다를 한 개씩 싸서 달토끼 상자에 담습니다. 원하시면 보자기로 한 번 더 싸고 종이 가방을 드립니다. 수량과 구성은 주문할 때 상의해 정합니다.",
  },
  {
    q: "영업시간과 가는 길은요?",
    a: "매일 09:00–18:00 엽니다. 나주역에서 택시로 약 5분, 나주시외버스터미널에서 걸어서 약 10분입니다.",
  },
];

/** 제품 한눈에 비교 — 열 순서는 products 와 같다(절굿대떡 · 오란다 · 선물세트). 가격은 확정된 것만(2026-09-12 클라이언트). */
export const productCompare = [
  {
    label: "가격",
    values: [
      "35,000원 · 1박스 20개",
      "25,000원 · 1박스 20개",
      "구성에 따라 전화로 상의",
    ],
  },
  {
    label: "어울리는 자리",
    values: ["이바지 · 명절 · 선물", "답례 · 선물", "이바지 · 명절 · 선물"],
  },
  {
    label: "맛",
    values: [
      "콩고물 인절미. 담백하고 씹을수록 은은한 단맛",
      "겉은 바삭, 속은 촉촉. 여섯 가지 견과",
      "떡과 오란다를 함께",
    ],
  },
  {
    label: "포장",
    values: [
      "낱개 포장",
      "낱개 포장 · 상자",
      "낱개 포장 · 달토끼 상자 · 보자기(선택) · 종이 가방",
    ],
  },
  {
    label: "보관",
    values: [
      "냉동. 실온 1~2시간 해동",
      "냉장·냉동 권장 (상온 가능)",
      "떡은 냉동, 오란다는 냉장·냉동",
    ],
  },
  {
    label: "배송",
    values: [
      "보냉 상자 택배 · 3,500원",
      "택배 · 3,500원",
      "보냉 상자 택배 · 3,500원",
    ],
  },
  {
    label: "주문",
    values: [
      "전화 · 매장",
      "전화 · 매장 · 카카오쇼핑",
      "전화 (수량·구성 상의)",
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  image: string;
  /** 대표 이미지의 대체 텍스트. 제품명만 적으면 사진이 무엇을 보여 주는지 스크린검수자가 모른다. */
  imageAlt: string;
  /** TODO(클라이언트): 가격·구성. null 이면 가격 줄이 빠지고, 있으면 사양 표의 한 줄로 나간다. */
  price: number | null;
  unit: string | null;
  /** 쓰임새. 떡은 "무엇인가"보다 "언제 쓰는가"로 찾는 손님이 많다. */
  occasions: string[];
  /**
   * TODO(클라이언트): 이 제품의 스마트스토어 상품 주소.
   * 스토어 대문이 아니라 상품별 주소여야 한다 — 대문으로 보내면 손님이 다시 찾아야 한다.
   * null 이면 구매 버튼 대신 전화 안내가 나간다.
   */
  storeUrl: string | null;
  /** 제품 사양. 값이 있는 항목만 상세 페이지에 표로 나간다. */
  spec?: { label: string; value: string }[];
  /**
   * 대표 이미지 말고 더 보여줄 컷. 전부 「더 보기」 격자로 나간다.
   * 바탕이 흰색·회색 계열인 사진만 싣는다 — 색 바탕(베이지·민트 스튜디오컷)은 균일한 종이색 타일 안에서 튄다.
   */
  gallery?: { src: string; alt: string }[];
  /**
   * 업체가 이미 만들어 둔 상세페이지(스마트스토어·남도장터용 긴 이미지)를 조각내 쌓는다.
   * 사이트 문법 밖의 디자인이라 접힌 채로 두고 「상세 정보 펼치기」로 연다. 몰 전용 꼬리(고객센터·배송비)는 뺀다.
   */
  detailImages?: (
    | {
        kind?: "image";
        src: string;
        alt: string;
        width: number;
        height: number;
        /** 12px 폭 흐림 미리보기 — 느린 회선에서 흰 칸 대신 잔상이 먼저 보인다(tools/detail-pages/slice.py 가 만든다) */
        blur: string;
        /**
         * 상세페이지의 GIF 자리 — 애니메이션 WebP 로 넣는다(GIF 3~10MB → 0.5~1.6MB).
         * 영상(autoplay)은 아이폰 저전력 모드 등에서 멈춘 그림으로 보여서, 움직이는 그림이 어디서나 원본처럼 움직인다.
         * next/image 최적화를 거치면 첫 프레임만 남으므로 unoptimized 로 싣는다.
         */
        animated?: boolean;
      }
    /** 상세페이지의 GIF 자리 — 무음 루프 영상으로 바꿔 넣는다(GIF 3~10MB → mp4 0.1~0.6MB). width/height 는 그 자리의 조각 크기. */
    | {
        kind: "video";
        src: string;
        poster: string;
        label: string;
        width: number;
        height: number;
      }
  )[];
  /** 상세 이미지 접힌 높이 클래스. 표지 구성이 다른 제품만 준다(기본값은 DetailReveal). */
  detailCollapsed?: string;
  /** 넣는 것. "넣지 않는 것으로 말한다"의 반대편 — 흰 그릇에 담긴 재료 사진. */
  ingredients?: { src: string; alt: string; label: string }[];
  /** 소리 없는 짧은 루프. 사진으로는 안 보이는 질감을 보여주는 자리다. */
  video?: { src: string; poster: string; label: string };
  /**
   * 후기 영상. 루프가 아니라 눌러서 보는 것이라 네이티브 controls 를 쓴다
   * — 사람이 말하는 27초짜리를 자동 반복하면 산만하다.
   */
  reviewVideo?: {
    src: string;
    poster: string;
    label: string;
    /** 굵은 줄 — 후기 본인의 말을 그대로. */
    caption: string;
    /** 출처·길이 한 줄. */
    source: string;
    /** 영상 속 말한 대목. 누르면 그 시점으로 간다. t 는 초. */
    moments: { t: number; text: string }[];
  };
  accent: "signage" | "bojagi" | "gift";
};

export const products: Product[] = [
  {
    slug: "jeolgutdae",
    /* 접힌 높이 = 표지가 끝나는 지점 + 페이드. 렌더 원본(1720px 폭)에서 먹색 표지 끝을 재고 표시 폭(폰 350·PC 860)으로 환산한 뒤 페이드 몫 100~120px 을 더했다. */
    detailCollapsed: "max-h-[525px] lg:max-h-[1160px]",
    /* 2026-09-17 업체가 보낸 매장 영상(절굿대영상7)에서 8초. 목사고을시장 매장에서 떡을 담는 손 — 소리 없음, 포스터는 첫 프레임. */
    video: {
      src: "/video/shop-packing.mp4",
      poster: "/video/shop-packing-poster.jpg",
      label: "나주목사고을시장 매장에서 떡을 낱개로 담는 대표의 손",
    },
    name: "절굿대떡",
    summary: "콩고물을 입힌 나주의 이바지 떡",
    detail:
      "유화제나 인공감미료를 전혀 넣지 않고 재래 방식 그대로 빚습니다. 첫맛은 달지 않고 담백하지만, 씹을수록 담백함 속에 감추어진 은은한 달콤함이 느껴집니다. 콩고물 그대로도, 조청에 찍어 드셔도 별미입니다. 아침 식사 대용이나 간식, 회사 접대용으로도 나갑니다.",
    image: "/images/product-jeolgutdae-plate.jpg",
    imageAlt: "접시에 담은 절굿대떡",
    detailImages: [
      {
        src: "/images/detail/v2/jeolgutdae-01.jpg",
        alt: "표지 — 맛의 방주에 오른 나주의 전통, 절굿대떡 선물 상자와 접시",
        width: 860,
        height: 1901,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs5WYFQjKDnnJ7U8Kp5ABzVS509ZnDyKWcgA4kIH5VZhjWGJY0BCqMAZzigDnb55LaYIQUcNlWHLcnk5NZ1wL8ykxJesvrCCR+neu3ZEJyUUn1IpAoXO0AZOeBWbp33LjPl2P/2Q==",
      },
      {
        src: "/images/detail/v2/jeolgutdae-02.jpg",
        alt: "국제슬로푸드 맛의 방주 인증서 — 2022년 등재 품목",
        width: 860,
        height: 881,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAMAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo7M2Atl8/y/M5zuzVK68r7Q/kf6vPy1AyBuopw4FcbldWOpKzuf/Z",
      },
      {
        src: "/images/detail/v2/jeolgutdae-03.jpg",
        alt: "전통은 지키고 오늘에 맞게 빚었습니다 — 분추떡 이야기, 절굿대 육묘, 대표 부부",
        width: 860,
        height: 1810,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAZAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqEuYZJdi7885JHFT9ejD/AL6pHLQxyysrbVBOM9fpXKiFbz9+soZW6Hrmud6FN2Nq8ub6W4+yxRsig/fGefxrStYfKhCvFEhz0jXAqz2ptMo//9k=",
      },
      {
        src: "/images/detail/v2/jeolgutdae-04.jpg",
        alt: "쫀득 쫀득! 은은하게, 한입은 편안하게 — 구매 후기 4건",
        width: 860,
        height: 3014,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAqAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDfEsykg+SFB4LNT4neRSxVev8ACciqZuLGecrJlW6ZbgGr6RrEoRBhRXJdo6VZiy2CXHzTRKf9odf061N9nAACscY7riqYu7m4haFLYxSPuG45UDHQ596etteqqq0m8gAbvMPNaOKsZqTuPfU4jbS+SxmdQMoQcdcVAt7d45ER+in/ABqWFFRG2KFyecDGafUymy1BXP/Z",
      },
      {
        src: "/images/detail/v2/jeolgutdae-05.jpg",
        alt: "우리 가족이 먹는다는 마음으로 좋은 재료만 사용합니다 — 나주배·찹쌀·절굿대, 한 번 더 살피고 정성으로 빚습니다",
        width: 860,
        height: 3063,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAArAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDbv7x7YtGsR3jA3E8A+9T2P2me2V5oCHP93ofep79WeXIhif8A66AdPz5q5F5jRgt8p9MD+lY+xVzX2rsR/wCkFmLRR4DYXBySPxptg1/5T/bkhEgc7fKPG3t+NEouvNba5C9sLwKnhEqx4kYM3ritUQzGu9UuEvjEpZMjGOOD24P86uadczNajzM3LAkGU4Xd+FaJVXwWVWPuKa5KnA4FJK2oPU//2Q==",
      },
      {
        src: "/images/detail/v2/jeolgutdae-06.jpg",
        alt: "Check Point 01 나주에서 이어온 전통의 맛 — 찻상 위 절굿대떡",
        width: 860,
        height: 1410,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDoJzMGHlFcd8g08LkAt97vjis25123s5XhkXleNxJ/wq1p98moW/nRI6ruK4brXE4tK50ppuxBeQItvcvy3zMwU9ASOcU2ykfyN+45kJc/U0UVXQOp/9k=",
      },
      {
        src: "/images/detail/v2/jeolgutdae-07.jpg",
        alt: "Check Point 02 귀한 재료, 절굿대를 담아 — 접시 위 절굿대떡과 재료",
        width: 860,
        height: 1561,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAWAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCWCCaPUUuJiYlYAMXcYZvRfard3q0NrOYXgunIA+aOIsD+NP1Kxacp5WNowD1yBU9sEEIAIIHHBrhSSR1XbbJFtdspcOeeozwaYmm26DCqQPQGiipGj//Z",
      },
      {
        src: "/images/detail/v2/jeolgutdae-08.jpg",
        alt: "Check Point 03 배즙으로 더한 은은한 단맛 — 나주배와 배즙 잔",
        width: 860,
        height: 1375,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAATAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsLt7lHXyY1ZSOcnBzVhSdo3dcc4rmZvE11HI0i22+Hpx61ae5u5z5sM4VGGQCelY+2VrpGvsn1Nr7PCqkLEgHoFFUpIkVyFUKPReBRRVyRCP/2Q==",
      },
      {
        src: "/images/detail/v2/jeolgutdae-stretch.webp",
        alt: "절굿대떡을 양손으로 당기면 쫀득하게 늘어난다 (움직이는 그림)",
        width: 860,
        height: 483,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAHAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC+11dRvsQLjPBPpUpkdgC/DH396KKOVBzPc//Z",
        animated: true,
      },
      {
        src: "/images/detail/v2/jeolgutdae-10.jpg",
        alt: "받는 순간까지 정갈하게 — 선물 상자, 1BOX 20EA 개별포장",
        width: 860,
        height: 2118,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAeAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrJZrkTyKqxBF+7nJJ+tOtZhLFumaMPkj5Tx+tOvXkjK+WIDuHPmVOsMYUfIue+BRqGhkahqLNfGKHy9kXDMyBst3H0FXrG8F1b+YylGBKkDkZ9qrXejrIzSQSeXvOXBGQT7elXrO3W3txGOcdTjrUq99Snax//9k=",
      },
      {
        src: "/images/detail/v2/jeolgutdae-11.jpg",
        alt: "우리의 하루에 잘 어울리는 떡 — 차·커피, 온 가족, 사무실 간식, 여행",
        width: 860,
        height: 1636,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAXAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqNXW+wk9jKF8v76Y6jPJ/CryzxlR+8VvUg1DcW6zv8zsMDoDgYpsVhaquVhA3ckjIyfWseZmiS6lgg7j0xilUEKM9aKKQz//Z",
      },
      {
        src: "/images/detail/v2/jeolgutdae-12.jpg",
        alt: "맛있게 드시는 가장 쉬운 방법 — 냉동 보관, 해동, 곁들임",
        width: 860,
        height: 1663,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAXAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsLkyswMFwqAAgjAPNWUzsXJDHHJHeqxBjU+YQuWJ5ZemfpUsE8ckQZJFYeoYUIGY+tWU7zGZXJDDC4wCv59azk06dUAZkY9yWOf5UUVLirgf/2Q==",
      },
      {
        src: "/images/detail/v2/jeolgutdae-13.jpg",
        alt: "믿고 구매하세요 — KB 생산물배상책임보험, 사회적기업·여성기업, 착한 소비가 지역사회를 살립니다",
        width: 860,
        height: 2332,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAhAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs7qUwBCZIkDkKN6k5P4GpipAAbG7HOOlDosgXcAduCMnvSt2+nrWb2KRSuQzyD94y4/uttqxGSUGTk0y44KEKTk44HSpgMDFQUAooooGf/9k=",
      },
      {
        src: "/images/detail/v2/jeolgutdae-14.jpg",
        alt: "제품정보 — 제품명·구성·제품의 유형·생산자·소비기한·원재료명 및 함량",
        width: 860,
        height: 698,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAKAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDt+GC5YjB7MRT2Az8rHHsaQ8gZ5+tIx5pWA//Z",
      },
    ],
    ingredients: [
      {
        src: "/images/ing-rice.jpg",
        alt: "흰 그릇에 담긴 찹쌀",
        label: "찹쌀",
      },
      {
        src: "/images/ing-jeolgutdae-paste.jpg",
        alt: "흰 그릇에 담긴 절굿대 잎 반죽",
        label: "절굿대",
      },
      { src: "/images/ing-pear.jpg", alt: "나주배", label: "나주배즙" },
    ],
    price: 35000,
    unit: "1박스 · 20개",
    occasions: ["이바지", "명절", "선물"],
    storeUrl: null,
    spec: [
      { label: "내용량", value: "80g × 20개 · 약 1,600g" },
      { label: "식품유형", value: "떡류" },
      {
        label: "원재료",
        value:
          "국내산 100% — 나주찹쌀 70%, 절굿대 6.6%, 쑥 13%, 나주배즙 8.8%, 소금(신안천일염) 0.9% · 콩고물을 입힙니다",
      },
      { label: "보관", value: "냉동 보관 · 남은 떡은 굳기 전에 냉동해 주세요" },
      {
        label: "해동",
        value: "실온에서 1~2시간, 또는 찜기·전자레인지로 말랑하게",
      },
      {
        label: "드시는 법",
        value:
          "인절미 그대로가 가장 좋지만, 기호에 따라 청이나 콩가루를 곁들이셔도 됩니다",
      },
      { label: "포장", value: "낱개 포장" },
      {
        label: "제조·판매",
        value: "절굿대떡屋 · 나주시 청동길 14 (나주목사고을시장 안)",
      },
    ],
    gallery: [
      {
        src: "/images/product-jeolgutdae-box.jpg",
        alt: "「나주의 맛과 멋, 남도 산야초 절굿대떡」 절굿대떡 선물 상자",
      },
      {
        src: "/images/gal-jeolgutdae-packs.jpg",
        alt: "바구니에 담은 낱개 포장 절굿대떡",
      },
      {
        src: "/images/gal-jeolgutdae-tea.jpg",
        alt: "나주배와 차를 곁들인 절굿대떡",
      },
      {
        src: "/images/gal-jeolgutdae-flowers.jpg",
        alt: "마른 절굿대 꽃과 차, 접시에 담은 절굿대떡",
      },
      {
        src: "/images/gal-jeolgutdae-stack.jpg",
        alt: "긴 접시에 세워 담은 절굿대떡",
      },
      {
        src: "/images/gal-jeolgutdae-mat.jpg",
        alt: "라탄 매트 위 절굿대떡과 낱개 포장",
      },
      {
        /* 영상 타일과 합쳐 8칸을 채운다 — 7칸이면 마지막 줄에 영상만 홀로 남는다. */
        src: "/images/packs-tray.jpg",
        alt: "쟁반에 나란히 담은 낱개 포장 절굿대떡",
      },
    ],
    accent: "signage",
  },
  {
    slug: "oranda",
    /* 표지가 사진 + 먹색 글 판 구조(선물세트와 같음)라 접힌 높이도 같이 — 기본값이면 PC 에서 제목 글자 중간이 잘린다. */
    name: "나주배 촉촉오란다",
    summary: "겉은 바삭, 속은 촉촉한 수제 오란다",
    detail:
      "나주배즙으로 반죽해 겉은 바삭하고 속은 촉촉합니다. 절굿대 분말을 함께 넣고, 호박씨·해바라기씨·크랜베리 등 여섯 가지 견과를 더해 고소합니다. 합성첨가물과 색소, 방부제를 넣지 않습니다. 낱개로 포장해 바삭함이 오래갑니다.",
    image: "/images/product-oranda-plate.jpg",
    imageAlt: "접시에 담은 나주배 촉촉오란다",
    detailImages: [
      {
        src: "/images/detail/v2/oranda-01.jpg",
        alt: "표지 — 건강하고 촉촉한 절굿대달토끼 나주배촉촉 오란다, 배 바구니·선물 상자·접시",
        width: 860,
        height: 2205,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAfAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo2OMYxRgVTubPzZN3mSrnrtbA/lVi3VYIggZm75Y5NcZ0WMtbm8S6EdxlImBBcuv4EVLPdpHJtNwFPoxUfzqxcQLNGyOS69Qp7Gq0cTCNRIuGAxhWyKhSsaNJn//Z",
      },
      {
        src: "/images/detail/v2/oranda-hands.webp",
        alt: "장갑 낀 손으로 오란다 반죽을 늘리면 속이 촉촉하게 늘어난다 (움직이는 그림)",
        width: 860,
        height: 483,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAHAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCS+llVtkLFdhxnPJPWlikEsauSVbHI96KK5rK7R1dD/9k=",
        animated: true,
      },
      {
        src: "/images/detail/v2/oranda-03.jpg",
        alt: "손으로 빚은 촉촉 오란다 — 당일 생산 원칙, 촉촉 오란다",
        width: 860,
        height: 2314,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAgAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDspppPPdEniXYuSNwyPc8fSrELmWJWV0fI6g8Zqiz2DyzSGeIhwVPz8A1Na3VlFCFW5i6nPz96zUtdbGriraXOcgtZkuebWRTuyQyttPt7U6S2mmkJGnNEAcYXIB96u6hf6jb3gSIRuh/gGAV+v+NPsor42y+bctnJxnrj34rJU09DV1WtT//Z",
      },
      {
        src: "/images/detail/v2/oranda-04.jpg",
        alt: "너무 딱딱하지 않냐구요? — 눈으로도 보이는 촉촉함, 장갑 낀 손으로 늘린 오란다",
        width: 860,
        height: 1505,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAVAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDr7iQQyAPe+WW6KQP8KniI2ZM4fPfIrnNauIkujIqCVicDLcGtXQmiubDzRGvLngjke1ZKd5WRq4WjdkVzof2i6eQ3G1GJOzy84J685rRsrSKxtlggGEHP1PrRRVqKTuQ5NqzP/9k=",
      },
      {
        src: "/images/detail/v2/oranda-05.jpg",
        alt: "Point 01 달콤함의 시작은 나주배입니다 — 나주배와 배청 잔",
        width: 860,
        height: 1449,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs5zdZPkqhA6Z7/rUkXnGJfNKiTHzBRxWNqmqSxM6KoBBwQRU+kaiZbIE5YhiMmsoTUm0ayg1G5qGNCBlQT6kc00W8KjCxqB7DFFFamR//2Q==",
      },
      {
        src: "/images/detail/v2/oranda-06.jpg",
        alt: "Point 02 엄격하게 관리되는 속 재료들 — 퍼핑콩·크랜베리·호박씨·잣",
        width: 860,
        height: 2270,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAgAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDZn1GaO4CMoaNujxHP+fpVuwuWurVZHjKtkgg4/pTnjt0wWjC7echcfrTbe4tthEJVVViMKMDNcNzrZnanqlzbiYRwLJtzgbW/XFT6Dcvf2BmmgELbyu0AjI455p4jvxeyNvzESdvzdBV2EOExIcmnfQW5/9k=",
      },
      {
        src: "/images/detail/v2/oranda-roll.webp",
        alt: "밀대로 오란다 반죽을 고르게 펴는 작업 (움직이는 그림)",
        width: 860,
        height: 519,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAHAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB7sUuHZiEQ5O1RxjvWPLFAJW8iFwpOThgBn8aKKypLnu5GlR8qSR//2Q==",
        animated: true,
      },
      {
        src: "/images/detail/v2/oranda-08.jpg",
        alt: "Point 03 선물·답례품으로도 좋은 패키지 — 1BOX 20EA 개별포장",
        width: 860,
        height: 1569,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAWAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDq7q4u4pMRW6uvUHdjj396tQmRowZlVXPZTnFZ9xqNvNM0KRRyTRvtKyDoPUcU4X7tnEKnBxw//wBakpJ7MbTW6IZ9AidGEMzRsWLbioY5PvxVyysFtbcRyO00mSWkbuaKKaikF2z/2Q==",
      },
      {
        src: "/images/detail/v2/oranda-09.jpg",
        alt: "나주배촉촉 오란다, 언제 먹으면 좋을까요? — 아침 커피·아이 간식·회의 다과·가벼운 선물",
        width: 860,
        height: 1403,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAUAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpmu51Y7beUgd+OafHPJIuXikU+hx/jU4zgU1utcLbOrQM0UUUhn//2Q==",
      },
      {
        src: "/images/detail/v2/oranda-10.jpg",
        alt: "오란다 사이즈 — 개당 30g, 가로세로 7cm",
        width: 860,
        height: 1382,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAATAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDsJnlEgEbxAEYAYZOfzqdd20byC2OSBgVi67b3byI9mjklSGKnH+TWrZ+Z9lj83O/HO7rUxk22mi5RSSaZNRRRVkH/2Q==",
      },
      {
        src: "/images/detail/v2/oranda-11.jpg",
        alt: "겉은 바삭! 속은 촉촉 — 구매 후기 4건과 개별 포장",
        width: 860,
        height: 3582,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAyAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrM3JDBTHnPy8Hp71A2o26MUknG4HB2gkVDrMl4tqEtFJDt+8ZTyFrCtbS8uIRJDbl0ORkqM/qK43fodkUup1Ed/DI7Qhizf3Tx+tWMRgAL8vHTNU5LOxmSVDHCrv/ABLyetIulRAZDjDc/d/xreXoc8fUY1kYS80LkyjJAwOSaWGS82nzMk59AMVFrEksFzErE+Uf7nX64pNPS9lty7SLgsduMnj8en0rP3noaWitTaeONyGdFYqTgkZxT41CxqFAAx0FFFbrcxex/9k=",
      },
      {
        src: "/images/detail/v2/oranda-12.jpg",
        alt: "맛있게 먹는 방법과 보관방법 — 냉장·냉동 보관, 전자레인지 15초",
        width: 860,
        height: 1483,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAVAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtHVmuGAuJVwA20YwP0qS35gU7zJx95up/lUc8vktk+a24dEXOKnQYUclvc0gI2t43bcc5/CpQABgUUUwP/9k=",
      },
      {
        src: "/images/detail/v2/oranda-13.jpg",
        alt: "믿고 구매하세요 — KB 생산물배상책임보험, 사회적기업·여성기업, 착한 소비가 지역사회를 살립니다",
        width: 860,
        height: 3531,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAxAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC6bKOG+ikubgbgMBiuC3uxqxNdxwyFJMgj3HP61LPE00LxTgOqncjj71VotjxqVDRgcbWQZFcGh16s37krAiMWhQPgDeCcn8DTpbdQV3Absc7emal/dyIm4qduCMnoaSVgWGCDx65rpklYxje5nXILuMuwx6MRViNvkGTk02bqvBOTjjtTjGp61kaj6KKKQH//2Q==",
      },
      {
        src: "/images/detail/v2/oranda-14.jpg",
        alt: "제품정보 — 제품명·구성·원재료명 및 함량·포장용기·소비기한·보관방법",
        width: 860,
        height: 775,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAALAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtnUlUwCTns1PI9QV9s0uBjGBgUvXrSsB//9k=",
      },
    ],
    gallery: [
      {
        src: "/images/product-oranda-box.jpg",
        alt: "「건강하고 촉촉한, 나주배촉촉 오란다」 오란다 선물 상자",
      },
      {
        src: "/images/gal-oranda-bars.jpg",
        alt: "접시에 놓은 오란다 두 개",
      },
      {
        src: "/images/gal-oranda-seeds.jpg",
        alt: "접시에 담은 오란다와 곁들인 견과·씨앗",
      },
      {
        src: "/images/gal-oranda-piece.jpg",
        alt: "호박씨·크랜베리가 박힌 오란다 한 조각",
      },
      { src: "/images/gal-oranda-tea.jpg", alt: "차와 함께 낸 오란다" },
    ],
    ingredients: [
      { src: "/images/ing-pumpkin-seed.jpg", alt: "호박씨", label: "호박씨" },
      {
        src: "/images/ing-sunflower-seed.jpg",
        alt: "해바라기씨",
        label: "해바라기씨",
      },
      {
        src: "/images/ing-cranberry.jpg",
        alt: "흰 그릇에 담긴 크랜베리",
        label: "크랜베리",
      },
    ],
    price: 25000,
    unit: "1박스 · 20개",
    occasions: ["답례", "선물"],
    /* 카카오쇼핑 상품 주소(기사 본문의 구매처). 스토어 가격은 행사에 따라 달라 사이트 가격과 다를 수 있다. */
    storeUrl: "https://store.kakao.com/sunriseea/products/754973247",
    // 2026-09-12 클라이언트가 보낸 표시사항 그대로. 유통기한은 상시 제조라 고정값을 줄 수 없다고 해 포장 표시로 안내.
    spec: [
      { label: "내용량", value: "20개입 · 약 1,700g" },
      { label: "식품유형", value: "과자(유탕처리식품)" },
      {
        label: "원재료",
        value:
          "퍼핑콩(소맥분: 미국·호주·캐나다 등), 미강유(콩 100%: 미국·브라질), 설탕, 버터(국산), 조청(국산), 물엿(옥수수 100%: 러시아·헝가리), 호박씨(중국산), 해바라기씨(중국산), 크랜베리·건포도(미국산), 볶은깨(인도산), 땅콩(국내산), 수제 배즙(국내산)",
      },
      { label: "보관", value: "냉장·냉동 보관 권장 (상온 보관 가능)" },
      { label: "제조일·유통기한", value: "상시 제조 · 낱개 포장에 표시" },
      {
        label: "드시는 법",
        value: "냉동 보관 시 30분 전 상온 해동, 또는 전자레인지 15초",
      },
      { label: "포장", value: "낱개 포장" },
      {
        label: "주의",
        value:
          "특정 원재료에 알레르기가 있는 경우 원재료를 확인한 후 드세요. 알레르기 유발 성분을 사용한 제품과 같은 제조시설에서 만듭니다.",
      },
    ],
    video: {
      src: "/video/oranda-texture.mp4",
      poster: "/video/oranda-poster.jpg",
      label: "장갑 낀 손으로 오란다를 쪼개면 견과가 붙은 단면이 드러난다",
    },
    /* 남도장터 판매 당시 업체가 전달받은 소재(사용 권리 확인 완료).
       소리가 없고 자막이 화면에 박혀 있어 음소거 상태로도 내용이 전달된다. */
    reviewVideo: {
      src: "/video/review.mp4",
      poster: "/video/review-poster.jpg",
      label: "나주배 촉촉오란다를 손에 들고 소개하는 후기 영상",
      caption: "겉바속촉 쫀득한 식감",
      source: "남도장터 구매 고객이 올린 영상 · 27초 · 자막 있음",
      /* 영상에 박힌 자막을 그대로 옮겼다(1초 간격 프레임 OCR). 시점은 그 말이 시작되는 초. */
      moments: [
        { t: 9, text: "딱딱하지 않고, 겉바속촉 쫀득한 식감에" },
        { t: 12, text: "6가지 견과류까지 들어가 있어서" },
        { t: 15, text: "개별 포장이라 가방에 하나씩 넣고 다니기 딱 좋음" },
        { t: 18, text: "쫀득하고 부드럽고, 치아 사이에 끼지 않아서" },
        { t: 21, text: "요즘 아침 식사 대용으로 하나씩 챙겨 먹는 중" },
      ],
    },
    accent: "bojagi",
  },
  {
    slug: "gift",
    /* 회색 표지(엠블럼·제목·대표 사진)가 끝나는 지점 + 페이드. 렌더 원본 1720px 기준 3514px 를 폰 350·PC 860 으로 환산. */
    detailCollapsed: "max-h-[815px] lg:max-h-[1880px]",
    name: "선물세트",
    summary: "보자기에 싸는 이바지 구성",
    detail:
      "절굿대떡을 이바지에 쓴 것은 맛도 맛이지만 건강을 생각한 떡이라는 믿음 때문이었습니다. 명절과 예단, 회사 접대에 두루 나갑니다.",
    image: "/images/product-gift-set.jpg",
    imageAlt: "달토끼 상자와 함께 차린 절굿대떡 선물세트",
    detailImages: [
      {
        src: "/images/detail/gift2-01.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (1/7)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDu7y/ggkEb3SRMpBYN3BqzHIk0ayRtuRhkH1qC8soLvabiJXCggZXOM1YRgVwM8cUrAY2qWWoS3he0kxGw5+faRxjFX9MinhsY4rp/MlXgtuJz+NUtRvJbVUMeDuzndV3J9TWHtVe9jb2Tta5//9k=",
      },
      {
        src: "/images/detail/gift2-02.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (2/7)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrpGeW4lD6W7xRqcSMfvEDoKmtmlMK+ZamEj+HsBV6UwwYWa5RM9mAGaeYN4BEhIxxgDGKwcNNEbKdnqzHvtUuBPIkdvDJ5ZP3iemcetXNK1Ga7tWeWJUZXK4GfQev1qtqHhjT725eaR7lHcgny5iufar+maVa6fZJb2/mbBz8zknpWqTM7o//2Q==",
      },
      {
        src: "/images/detail/gift2-03.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (3/7)",
        width: 1720,
        height: 3945,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDt5byeNsKrOPUOBUqTysoJYgkcjOcVnanqTwXkdrAIVyoLO65I9auW8wuIFlCld3bB9feuSz7nTddi1cfZrYr507IW4Ge9TfZVPJdjVLVJJUnQRyFRtzjap59eQa0YCTBGSckqCT610ckTDmZ//9k=",
      },
      {
        src: "/images/detail/gift2-04.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (4/7)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtjJay308X2qQMu7cCSB2zg57VesxGIm8qXepY85ziox9gEry7I1kkGHJXkinRyWsS7YYgFPPyjg1mpx7l8j7FR7S3lbdLErE4ySOtOCLGqqi7VA+76VKDgKfpTH6gZzgYzXM1obp6n//Z",
      },
      {
        src: "/images/detail/gift2-05.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (5/7)",
        width: 1720,
        height: 3334,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAXAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvrt5IpNsNmjgDJZmxVqKOOSNXMQUkZx6VVlvY1f5opSTz8oJFSreAqD5bc888GsuaBpyzKvz8/dx2pA2P9YRu9qKK5ToP/9k=",
      },
      {
        src: "/images/detail/gift2-06.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (6/7)",
        width: 1720,
        height: 3754,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAaAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvb1mjjhKfaWLlV2wsBt9zUkyKCgyXwoG5jkmmtd26IgncIcYG7HX2zSyyq5BXOAMc1hKS5dzaMXfYzrmMNJlkJ+oB/nUyOsaBWyMdjUpVW+8oP1FJgegrA2P/2Q==",
      },
      {
        src: "/images/detail/gift2-07.jpg",
        alt: "선물세트 상세 — 구성·두 가지 맛·포장·쓰임새·주문 안내·보관·제품정보 (7/7)",
        width: 1720,
        height: 2873,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAUAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDu57fOzfIFw/GATk1KLdz0K/nVh8gDHPzHpUi528jBrL2SNPaMCint3zTgABRRWpmf/9k=",
      },
    ],
    gallery: [
      {
        src: "/images/product-jeolgutdae-box.jpg",
        alt: "달토끼가 그려진 절굿대달토끼 선물 상자",
      },
      {
        src: "/images/gal-gift-tteok.jpg",
        alt: "절굿대떡과 차를 곁들인 선물 상자",
      },
      {
        src: "/images/gal-jeolgutdae-packs.jpg",
        alt: "바구니에 담은 낱개 포장 절굿대떡",
      },
      {
        src: "/images/gal-gift-plate.jpg",
        alt: "접시에 담은 절굿대떡과 낱개 포장, 마른 절굿대 꽃",
      },
    ],
    price: null,
    unit: null,
    occasions: ["이바지", "명절", "선물"],
    storeUrl: null,
    /* 제품 페이지·이 파일의 두 제품 사양에 이미 있는 사실만 옮겼다. 수량·가격은 클라이언트 확인 대기. */
    spec: [
      {
        label: "구성",
        value: "절굿대떡 · 나주배 촉촉오란다 (수량은 주문 시 상의)",
      },
      { label: "포장", value: "낱개 포장 · 달토끼 상자 · 보자기(선택)" },
      { label: "보관", value: "떡은 냉동, 오란다는 냉장·냉동" },
      { label: "배송", value: "보냉 상자 택배 · 배송비 3,500원" },
    ],
    accent: "gift",
  },
];

/**
 * 이야기 연표. 사라졌다가 돌아온 과정이라 순서가 실제로 의미를 갖는다.
 * phase 는 달의 위상(0=삭, 1=보름)이며 화면에서 원의 채워짐으로 표현한다.
 */
export const timeline = [
  {
    phase: 0,
    when: "한때",
    title: "목사골 양반들의 이바지 떡",
    body: "지역에서 으뜸가는 떡이라 하여 이바지에 올랐습니다. 세월이 흐르며 자취를 감추고, 어르신들의 기억 속 전설로만 남았습니다.",
  },
  {
    phase: 0.3,
    when: "2016년",
    title: "절굿대 육묘에 국내 최초로 성공",
    image: "/images/field-rows.jpg",
    imageAlt: "이랑을 따라 자란 절굿대 밭과 마을",
    body: "어린 시절 맛보았던 그 떡을 잊지 못한 김화수 대표가 전국을 돌며 복원에 매달렸습니다. 깊은 산속에서만 자생하던 절굿대의 육묘 재배에 마침내 성공했습니다. 같은 해 나주목사고을시장 안에 「절굿대떡屋」을 열었습니다.",
  },
  {
    phase: 0.55,
    when: "2017년",
    title: "50년 만의 부활",
    body: "사라졌던 남도의 으뜸맛떡이 돌아왔습니다. 천지일보와 MBC, KBS, tvN 등 여러 매체가 이 복원을 다뤘습니다.",
  },
  {
    phase: 0.8,
    when: "2019년",
    title: "나주읍성에 떡카페를 열다",
    body: "농업회사법인 주식회사 절굿대를 세우고 절굿대달토끼 떡카페를 열었습니다. 같은 해 문화체육관광부·한국관광공사의 관광두레에 선정되었습니다.",
  },
  {
    phase: 1,
    when: "2022년",
    title: "맛의방주에 오르다",
    body: "국제슬로푸드생물다양성재단의 맛의방주에 나주 절굿대떡이 등재되었습니다. 사라질 위기의 먹거리를 기록하는 목록입니다.",
  },
] as const;

/** 연혁 전체. 이야기 페이지 하단에 접어 둔다. */
export const history = [
  {
    year: "2016",
    items: [
      "「절굿대떡屋」 설립 (나주목사고을시장 안)",
      "국내 최초 절굿대 육묘재배 성공",
    ],
  },
  {
    year: "2017",
    items: [
      "50년 만에 사라졌던 남도의 으뜸맛떡 '절굿대떡' 부활",
      "천지일보·MBC 빛날·KBS 생생3도·tvN 놀라운 TV·전남도정방송 등 보도",
    ],
  },
  {
    year: "2019",
    items: [
      "농업회사법인 주식회사 절굿대 설립",
      "나주읍성 '절굿대달토끼' 떡카페 오픈",
      "관광두레 주민사업체 선정 (문화체육관광부·한국문화관광연구원·한국관광공사)",
      "나주시 여행자플랫폼 선정",
    ],
  },
  {
    year: "2020",
    items: [
      "떡제조기능사 국가자격 취득 (김화수)",
      "여성기업 확인",
      "전남형 예비사회적기업 지정",
      "사회복지시설 업무협약 (장애인복지관·다문화가족센터)",
    ],
  },
  { year: "2021", items: ["전라남도지사 표창 (사회복지부문)"] },
  {
    year: "2022",
    items: [
      "'절굿대떡' 슬로푸드 맛의방주 등재",
      "KBS 6시내고향 「나주 전통떡 절굿대떡」 방영",
    ],
  },
  {
    year: "2023",
    items: [
      "나주시 여성새로일하기센터·국립나주숲체원·사회적기업 내일드림·전남지역문제해결플랫폼 업무협약",
      "사회적기업 인증 제2023-247호 · 고용노동부",
    ],
  },
  {
    year: "2024",
    items: ["나주시 고향사랑 답례품 선정"],
  },
] as const;

/**
 * 체험 프로그램.
 *
 * 인원·시간·가격은 클라이언트 확인 대기다. 제품 가격과 같은 규칙으로,
 * null 이면 화면이 그 줄을 "전화 문의" 로 대체한다 — 값이 들어오면
 * 이 파일만 고치면 되고 화면은 안 건드린다.
 *
 * 학교·단체 인솔자는 예산을 짜야 해서 이 세 값이 없으면 전화를 못 건다.
 * 그래서 이 항목들이 이 사업에서 가장 급한 미수령 자료다.
 */
export const experience = {
  name: "바람떡 만들기 체험",
  target: "학교·단체·가족 (개인 참여도 가능)",
  /** TODO(클라이언트): 최소·최대 인원 */
  minPeople: null as number | null,
  maxPeople: null as number | null,
  /** TODO(클라이언트): 소요 시간. 예) "약 90분" */
  duration: null as string | null,
  /** TODO(클라이언트): 1인 참가비 (원) */
  pricePerPerson: null as number | null,
  /** TODO(클라이언트): 가능한 요일·시간대. 예) "평일 10:00 / 14:00" */
  availability: null as string | null,
  /** TODO(클라이언트): 체험 후 가져가는 것 */
  takeaway: null as string | null,
  /** 진행 순서. 클라이언트 문안과 체험 사진에서 확인된 것만 적는다. */
  /* 클라이언트 체험 자료(바람떡 만들기) 순서 그대로. */
  steps: [
    { title: "앙금 나누기", detail: "속에 넣을 앙금을 한 개 분량씩 나눕니다." },
    { title: "밀대로 떡 밀기", detail: "떡 반죽을 밀대로 둥글게 밉니다." },
    {
      title: "앙금 올려 모양 찍기",
      detail: "앙금을 올려 반달로 접고 바람떡 틀로 찍습니다.",
    },
    {
      title: "꾸며서 상자에 담기",
      detail: "예쁘게 꾸민 떡을 상자에 담아 가져갑니다.",
    },
  ],
} as const;

/** 신뢰 근거. 사진이 아니라 사실로 말하는 자리다. */
/** 인증·선정. 증서가 있는 항목은 이미지를 같이 — 이야기 페이지 목록 옆에 작게, 누르면 크게. */
export const credentials: {
  label: string;
  detail: string;
  image?: { src: string; alt: string; width: number; height: number };
}[] = [
  {
    label: "관광두레 선정",
    detail: "2019년 문화체육관광부·한국관광공사 · 나주시 여행자플랫폼",
    image: {
      src: "/images/plaque-tourdure.jpg",
      alt: "2020 관광두레 현판",
      width: 847,
      height: 485,
    },
  },
  {
    label: "떡제조기능사",
    detail: "2020년 국가기술자격 · 김화수",
    /* 자격번호·생년월일·관리번호는 흐려서 올린다 — 개인정보. 리더 지시로 게시(2026-09-12). */
    image: {
      src: "/images/cert-license.jpg",
      alt: "떡제조기능사 국가기술자격증 — 김화수, 2020년 · 한국산업인력공단",
      width: 1075,
      height: 1521,
    },
  },
  {
    label: "전라남도지사 표창",
    detail: "2021년 사회복지 부문",
    image: {
      src: "/images/award-2021.jpg",
      alt: "전라남도지사 표창장 — 농업회사법인 주식회사 절굿대, 2021년",
      width: 664,
      height: 963,
    },
  },
  {
    label: "맛의방주 등재",
    detail: "2022년 국제슬로푸드생물다양성재단",
    image: {
      src: "/images/cert-ark.jpg",
      alt: "나주 절굿대떡 맛의방주 인증서 — 국제슬로푸드생물다양성재단",
      width: 1625,
      height: 1125,
    },
  },
  {
    label: "사회적기업 인증",
    detail: "제2023-247호 · 고용노동부 (2023년 10월 25일)",
    image: {
      src: "/images/cert-social.jpg",
      alt: "농업회사법인 주식회사 절굿대 사회적기업 인증서 — 고용노동부, 제2023-247호",
      width: 989,
      height: 1400,
    },
  },
  { label: "고향사랑 답례품", detail: "2024년 나주시 선정" },
  {
    label: "상표등록",
    detail: "제40-2515456호 · 2026년 지식재산처",
    image: {
      src: "/images/cert-trademark.jpg",
      alt: "절굿대달토끼 상표등록증 — 제40-2515456호, 지식재산처",
      width: 910,
      height: 1285,
    },
  },
];

/**
 * 언론 보도 — 업체가 보내 준 기사 세 편(2026-09-17). 이야기 페이지 인증 목록 아래.
 * 제목을 그대로 옮기지 않고 우리 말로 한 줄 요약한다: 기사 제목에 사이트에서 쓰지 않는 표기가 섞여 있고,
 * 본문의 효능 서술은 식품표시광고법상 사이트에 옮길 수 없다. 링크는 원문으로.
 */
export const press: {
  outlet: string;
  /** YYYY-MM-DD */
  date: string;
  kind: "기사" | "칼럼";
  summary: string;
  url: string;
  /**
   * 행 왼쪽 썸네일 — 원문 사진이 아니라 우리 사진이다. 원문 사진은 신문사 저작물(워터마크)이거나
   * 필자 얼굴, 옛 행사가가 박힌 판촉 이미지라 그대로 쓸 수 없다(2026-09-17 확인). 기사가 다룬 것을 우리 사진으로.
   */
  image: { src: string; alt: string };
}[] = [
  {
    outlet: "시민의소리",
    date: "2026-06-22",
    kind: "기사",
    summary:
      "사회적기업 절굿대가 나주배 촉촉오란다를 카카오쇼핑에서 선보였습니다. 지역 농산물의 판로를 넓히려는 자리라는 김은아 대표의 말이 실렸습니다.",
    url: "http://www.civilreporter.co.kr/news/articleView.html?idxno=538796",
    image: {
      src: "/images/product-oranda-plate.jpg",
      alt: "접시에 담은 나주배 촉촉오란다",
    },
  },
  {
    outlet: "전남인터넷신문",
    date: "2025-10-16",
    kind: "칼럼",
    summary:
      "절굿대 잎을 따서 말리고 찧는 느린 과정을 바흐의 샤콘에 빗댄 허북구 농학박사의 칼럼. 「기다림이 풍미를 만든다」고 적었습니다.",
    url: "http://jnnews.co.kr/m/view.php?idx=414956",
    image: {
      src: "/images/jeolgutdae-closeup.jpg",
      alt: "절굿대 잎과 꽃봉오리",
    },
  },
  {
    outlet: "천지일보",
    date: "2019-01-28",
    kind: "기사",
    summary:
      "사라졌던 나주의 떡이 40~50년 만에 돌아온 이야기. 나주산 쌀과 배즙으로 옛 맛을 되살린 과정과 김화수·김은아 대표의 말이 실렸습니다.",
    url: "https://www.newscj.com/news/articleView.html?idxno=596278",
    image: {
      src: "/images/product-jeolgutdae-plate.jpg",
      alt: "접시에 담은 절굿대떡",
    },
  },
];
