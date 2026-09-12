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
  owner: "김화수",
  since: 2016,

  /* 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 만 바꾼다 — sitemap·OG·구조화
     데이터가 전부 이 값을 쓴다. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://naju-daltokki.vercel.app",

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

  /** TODO(클라이언트): 스마트스토어 주소 */
  storeUrl: null as string | null,

  /** TODO(클라이언트): 인스타그램 등 */
  instagramUrl: "https://www.instagram.com/jeol_gutdae/" as string | null,
  /** 카카오맵 장소 페이지(장소 ID 302960832). 길찾기·리뷰·지도 퍼가기가 여기서 나온다. */
  kakaoPlaceUrl: "https://place.map.kakao.com/302960832",
  /** TODO(클라이언트): 문의 이메일. null 이면 푸터 사업자 표기 줄에서 빠진다. */
  email: null as string | null,

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
    a: "전화(061-336-6969)로 수량과 구성을 상의해 주문합니다. 이바지·답례처럼 구성이 정해지지 않은 주문은 전화가 빠릅니다. 매장(나주시 징고샅길 7-1)에서도 바로 사실 수 있습니다.",
  },
  {
    q: "떡은 어떻게 보관하나요?",
    a: "받으신 날 드시는 것이 가장 좋습니다. 남으면 굳기 전에 낱개 포장 그대로 냉동하고, 드실 때 실온에 1~2시간 두거나 찜기·전자레인지로 말랑하게 데웁니다.",
  },
  {
    q: "오란다는 어떻게 보관하나요?",
    a: "냉장·냉동을 권합니다. 상온 보관도 됩니다. 소비기한은 제조일로부터 6개월이고, 냉동했다면 30분 전에 상온에 두거나 전자레인지에 15초 데우면 속이 다시 촉촉해집니다.",
  },
  {
    q: "택배로 받을 수 있나요?",
    a: "됩니다. 떡은 보냉 상자에 담아 택배로 보냅니다. 배송비와 걸리는 날수는 주문할 때 안내해 드립니다.",
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

/** 제품 한눈에 비교 — 열 순서는 products 와 같다(절굿대떡 · 오란다 · 선물세트). 가격은 확정된 것만 적는 규칙이라 여기에도 없다. */
export const productCompare = [
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
  { label: "배송", values: ["보냉 상자 택배", "택배", "보냉 상자 택배"] },
  {
    label: "주문",
    values: ["전화 · 매장", "전화 · 매장", "전화 (수량·구성 상의)"],
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
  detailImages?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** 12px 폭 흐림 미리보기 — 느린 회선에서 흰 칸 대신 잔상이 먼저 보인다(tools/detail-pages/slice.py 가 만든다) */
    blur: string;
  }[];
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
    name: "절굿대떡",
    summary: "콩고물을 입힌 나주의 이바지 떡",
    detail:
      "유화제나 인공감미료를 전혀 넣지 않고 재래 방식 그대로 빚습니다. 첫맛은 달지 않고 담백하지만, 씹을수록 담백함 속에 감추어진 은은한 달콤함이 느껴집니다. 콩고물 그대로도, 조청에 찍어 드셔도 별미입니다. 아침 식사 대용이나 간식, 회사 접대용으로도 나갑니다.",
    image: "/images/product-jeolgutdae-plate.jpg",
    imageAlt: "접시에 담은 절굿대떡",
    detailImages: [
      {
        src: "/images/detail/jeolgutdae-01.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (1/6)",
        width: 1720,
        height: 3958,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMTyYYVeCRty4yG7/SrscsPlIJGJYD+FRVZ7XUWh8v+zZBwAWERz+dQf2dqf8Az5XH/fFRZBY7pBtY/nzUtP8AKUdqXYPes+Uu5//Z",
      },
      {
        src: "/images/detail/jeolgutdae-02.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (2/6)",
        width: 1720,
        height: 3859,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDprqS4UqLeJXyeSx6VOm7YN2N3fFMwWOWI69ielPQkL85GfakBUle2tZlEkxRn5Gc4qyMYBDbgRkH1omjSWIiRAwx3FIiqkaKgAUAYAoA//9k=",
      },
      {
        src: "/images/detail/jeolgutdae-03.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (3/6)",
        width: 1720,
        height: 3919,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC8l5pKXLTJqEKvzg7uhP4Vah1jTI4wp1KNz6s+T/KuEIZwNy8AcY+lROpVsYpWA6CDUYkhhX7cw2oAB5h+U8e/SqmqXkU86MLgSYjAJ3E9zXcIkZkIMceOf4BUvkxf88o/++BSsB//2Q==",
      },
      {
        src: "/images/detail/jeolgutdae-04.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (4/6)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqtpQ/IqgFueSOO5+tOiLlT5ihTuIGDniubOvyZJLoMHghetPHiAsB+9CkdQQOtRfqMjTQLOciLzrlSNxwNmeDjnipx4StCP8Aj5uPx2/4VqWcIWWdtzsWY8k9B6CroGBiqEf/2Q==",
      },
      {
        src: "/images/detail/jeolgutdae-05.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (5/6)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDdt4St/K/74gqRggAdexrRXJHII+tVlLhyGYkduMVJWXOVYq380kOFt4cswHz9cfhViPf5aeaFD4+bHTNMgnd7lo2I2jPb3q3T5Quf/9k=",
      },
      {
        src: "/images/detail/jeolgutdae-06.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (6/6)",
        width: 1720,
        height: 3900,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDfSK8+1szOvk845B+nFXI9wU7yCc8Y44pmQrY6U8HIyKkZU+32ec/a7c+/mr/jTv7Qsv8An8t/+/q/415u8zyL85BwABwOg4FRYHpTsI//2Q==",
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
    price: null,
    unit: null,
    occasions: ["이바지", "명절", "선물"],
    storeUrl: null,
    spec: [
      { label: "보관", value: "남은 떡은 굳기 전에 냉동 보관해 주세요" },
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
    ],
    accent: "signage",
  },
  {
    slug: "oranda",
    name: "나주배 촉촉오란다",
    summary: "겉은 바삭, 속은 촉촉한 수제 오란다",
    detail:
      "나주배청으로 반죽해 겉은 바삭하고 속은 촉촉합니다. 절굿대 분말을 함께 넣고, 호박씨·해바라기씨·크랜베리 등 여섯 가지 견과를 더해 고소합니다. 합성첨가물과 색소, 방부제를 넣지 않습니다. 낱개로 포장해 바삭함이 오래갑니다.",
    image: "/images/product-oranda-plate.jpg",
    imageAlt: "접시에 담은 나주배 촉촉오란다",
    detailImages: [
      {
        src: "/images/detail/oranda-01.jpg",
        alt: "나주배 촉촉오란다 상세 — 나주배청 반죽·여섯 가지 견과·재료·보관·제품정보 (1/5)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDc1C6ube4QrgRdB6MfQnsfSrcDieMSAOu7nDcEVyc+tas1sGlSB43GSPJJ49x6VVHivUgMDyAP+uf/ANepS1KbTRYHhi+YbVuoMDjq3+FN/wCEQvf+fi3/APHv8K6xT85+lSA8Vnzsdkf/2Q==",
      },
      {
        src: "/images/detail/oranda-02.jpg",
        alt: "나주배 촉촉오란다 상세 — 나주배청 반죽·여섯 가지 견과·재료·보관·제품정보 (2/5)",
        width: 1720,
        height: 3772,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAaAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqRDg5zTth9RUN7CJ1UCZomU5BVsVYT7g53cdfWo5UVcjSZGbaCcjPWpA3FMwPQUtUI//Z",
      },
      {
        src: "/images/detail/oranda-03.jpg",
        alt: "나주배 촉촉오란다 상세 — 나주배청 반죽·여섯 가지 견과·재료·보관·제품정보 (3/5)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDY1S3uLiWP7P8AMApDKGwau2iuluiSZ3KMHNc8fEtgjs/2GZWccnK8g/jSw+LLCCMJHaTqv1X/ABqUrO5TldWM+HT7ZoYi8Eu4oC2JfpyPl96p6jZW8M6iJXClAfmfJ7+wrRFoyhQLqcBenK8fpTZdPExBkuZ2IGASV6flRqSf/9k=",
      },
      {
        src: "/images/detail/oranda-04.jpg",
        alt: "나주배 촉촉오란다 상세 — 나주배청 반죽·여섯 가지 견과·재료·보관·제품정보 (4/5)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpDcLE5UmRz5gT7ucE0+yu1vYmkRJECuUIddpyKUTRs+A+T/dFSBwPWouu47EOxg5IWn4PpSAmNjgk5Pc9KmByAaXIO5//2Q==",
      },
      {
        src: "/images/detail/oranda-05.jpg",
        alt: "나주배 촉촉오란다 상세 — 나주배청 반죽·여섯 가지 견과·재료·보관·제품정보 (5/5)",
        width: 1720,
        height: 3934,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpLi3FzFIgmdd/oTxSWdqbWIx+eWBYkZHSpT97rjj1p46dc1NrjuVPt9pnP2q3Pv5q/wCNP/tCz/5+7f8A7+r/AI15s8ryL85BwABwOg4FRYHpTsI//9k=",
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
    price: 30000,
    unit: "1박스",
    occasions: ["답례", "선물"],
    storeUrl: null,
    // 상세페이지 이미지에서 읽어낸 값. 원재료 전체 표기는 판독이 불완전해
    // 클라이언트 확인 전까지 싣지 않는다(식품 표기는 틀리면 법적 문제가 된다).
    spec: [
      { label: "보관", value: "냉장·냉동 보관 권장 (상온 보관 가능)" },
      { label: "소비기한", value: "제조일로부터 6개월" },
      {
        label: "드시는 법",
        value: "냉동 보관 시 30분 전 상온 해동, 또는 전자레인지 15초",
      },
      { label: "포장", value: "낱개 포장" },
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
    detailCollapsed: "max-h-[700px] lg:max-h-[1420px]",
    name: "선물세트",
    summary: "보자기에 싸는 이바지 구성",
    detail:
      "절굿대떡을 이바지에 쓴 것은 맛도 맛이지만 건강을 생각한 떡이라는 믿음 때문이었습니다. 명절과 예단, 회사 접대에 두루 나갑니다.",
    image: "/images/product-gift-set.jpg",
    imageAlt: "달토끼 상자와 함께 차린 절굿대떡 선물세트",
    detailImages: [
      {
        src: "/images/detail/gift-01.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (1/5)",
        width: 1720,
        height: 3964,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDcvb6a3uDGEBHbI6jFSWrmeBZJVKueoGa5qTxHqawCXdZnIB2hct+WarHxZqWeRB/37P8AjStqM3V8PaaWIaCRcdD5xp//AAjOlnrC/wD39atTaA2afWN2VY//2Q==",
      },
      {
        src: "/images/detail/gift-02.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (2/5)",
        width: 1720,
        height: 3968,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpZJYklZPLcsoySF4/OpISssYcKQD2IwaWRAzZAB/E0RxpGm1cgfXNTZDKgcLcS4hf5OQwPWrMEhljDMjRn+63WpPLX3/Ol2igD//Z",
      },
      {
        src: "/images/detail/gift-03.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (3/5)",
        width: 1720,
        height: 3667,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAaAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDbtdRSW+kgVJBtLAsWyvHtWkjB1yK5P/hIrSOUTnT7jPJBLjAz1qVPGVsi4FnN/wB9rUq/Up26HNrZ3JVB9nlJcArheueneqjqVbBBz7jmn/aJgUImkyoGPmPFRkk8kkmn1Ef/2Q==",
      },
      {
        src: "/images/detail/gift-04.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (4/5)",
        width: 1720,
        height: 3970,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCrNqkZOJVYZGRUQ1NMcdK7D+zbEyYNnb4x/wA8h/hT/wCy7D/nyt/+/YqbDuxyysZCGQA/3uKk3tTMfNmnVldlWP/Z",
      },
      {
        src: "/images/detail/gift-05.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (5/5)",
        width: 1720,
        height: 3573,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAZAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo5oBMjqHZS3r/AIfhTLay8iMp5pbnOcYqds7hxUg6dMVFrjuYUniazixuiuVyAcbR0PIPWm/8Jfp//PO4/wC+B/jXEj7poqrCP//Z",
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
      { label: "배송", value: "보냉 상자 택배" },
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
    items: ["50년 만에 사라졌던 남도의 으뜸맛떡 '절굿대떡' 부활"],
  },
  {
    year: "2019",
    items: [
      "농업회사법인 주식회사 절굿대 설립",
      "나주읍성 '절굿대달토끼' 떡카페 오픈",
      "관광두레 선정 (문화체육관광부·한국문화관광연구원·한국관광공사)",
    ],
  },
  {
    year: "2020",
    items: [
      "떡제조기능사 국가자격 취득",
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
      "나주시 여성새로일하기센터·국립나주숲체원 등 업무협약",
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
  name: "'절굿대떡' 만들기 체험",
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
  steps: [
    { title: "반죽 치기", detail: "쌀 반죽을 손으로 칩니다." },
    { title: "모양 빚기", detail: "빚은 떡에 나무 떡살로 문양을 찍습니다." },
    { title: "콩고물 입히기", detail: "고물을 입혀 마무리합니다." },
  ],
} as const;

/** 신뢰 근거. 사진이 아니라 사실로 말하는 자리다. */
export const credentials = [
  { label: "맛의방주 등재", detail: "2022년 국제슬로푸드생물다양성재단" },
  { label: "사회적기업 인증", detail: "제2023-247호 · 고용노동부" },
  { label: "고향사랑 답례품", detail: "2024년 나주시 선정" },
  { label: "상표등록", detail: "제40-2515456호 · 2026년 지식재산처" },
] as const;
