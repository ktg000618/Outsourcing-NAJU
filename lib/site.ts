/**
 * 사이트 전체가 쓰는 업장 정보와 콘텐츠.
 *
 * 화면 곳곳에 흩어지면 상호·전화번호가 바뀔 때 빠뜨리는 곳이 생긴다.
 * 여기 한 곳만 고치면 헤더·푸터·구조화 데이터가 함께 따라간다.
 *
 * null 인 값은 아직 클라이언트에게 못 받은 것이다. 화면은 null 이면 그 줄을
 * 통째로 감추도록 만들어 두었으니, 값이 오면 여기만 채우면 된다.
 */

export const site = {
  name: "절굿대달토끼",
  fullName: "나주시 여행자플랫폼 절굿대달토끼",
  tagline: "남도의 으뜸맛떡",
  description:
    "사라졌던 나주 절굿대떡을 되살려 인공첨가물 없이 재래방식으로 빚습니다. 나주 징고샅길의 떡카페에서 맛보고, 만들어 볼 수 있습니다.",
  owner: "김은아",
  since: 2016,

  tel: "061-336-6969",
  mobile: "010-6603-0848",
  address: "전라남도 나주시 징고샅길 7-3",
  addressRegion: "전라남도",
  addressLocality: "나주시",

  /** TODO(클라이언트): 영업시간·휴무일 확인 후 채울 것 */
  hours: null as string | null,
  closedDays: null as string | null,

  /** TODO(클라이언트): 스마트스토어 주소 */
  storeUrl: null as string | null,

  /** TODO(클라이언트): 인스타그램 등 */
  instagramUrl: null as string | null,

  /** 법인명. 화면에 보이는 이름은 site.name(절굿대달토끼), 법적 표기는 이쪽이다. */
  legalName: "농업회사법인주식회사절굿대",
  businessNumber: "794-88-01567",
  corporateNumber: "205511-0063933",
  mailOrderNumber: "제2020-전남나주-0086호",
  /** 사업자등록증상 소재지. ⚠️ 관광두레 책자의 매장 주소(징고샅길 7-3)와 번지가 다르다 — 확인 필요. */
  businessAddress: "전라남도 나주시 징고샅길 7-1",
  postalCode: "58257",
} as const;

/** 헤더·푸터가 함께 쓰는 메뉴. 순서가 곧 정보 구조다. */
export const nav = [
  { href: "/story", label: "이야기" },
  { href: "/products", label: "제품" },
  { href: "/visit", label: "체험·매장" },
  { href: "/news", label: "소식" },
] as const;

export type Product = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  image: string;
  /** TODO(클라이언트): 가격·구성. null 이면 화면에서 가격 줄을 감춘다. */
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
  accent: "signage" | "bojagi" | "gift";
};

export const products: Product[] = [
  {
    slug: "jeolgutdae",
    name: "절굿대떡",
    summary: "콩고물을 입힌 나주의 이바지 떡",
    detail:
      "무농약으로 기른 절굿대를 말려 삶아 찹쌀과 함께 쳐냅니다. 첫맛은 달지 않고 담백하지만, 씹을수록 나주배 농축액의 은은한 단맛이 올라옵니다.",
    image: "/images/product-tray.jpg",
    price: null,
    unit: null,
    occasions: ["이바지", "명절", "선물"],
    storeUrl: null,
    accent: "signage",
  },
  {
    slug: "jebissuk",
    name: "제비쑥떡",
    summary: "봄 쑥을 그대로 넣은 초록 떡",
    detail:
      "절굿대떡과 함께 매장을 지켜 온 또 하나의 주력입니다. 쑥 향이 진하고 뒷맛이 깔끔합니다.",
    image: "/images/product-jeolgutdae.jpg",
    price: null,
    unit: null,
    occasions: ["선물", "답례"],
    storeUrl: null,
    accent: "signage",
  },
  {
    slug: "oranda",
    name: "나주배 촉촉오란다",
    summary: "겉은 바삭, 속은 촉촉한 수제 오란다",
    detail:
      "나주배청으로 반죽해 겉은 바삭하고 속은 촉촉합니다. 절굿대 분말을 함께 넣고, 참깨·땅콩·해바라기씨·호박씨를 비롯한 여섯 가지 견과를 더해 고소합니다. 합성첨가물과 색소, 방부제를 넣지 않습니다. 낱개로 포장해 바삭함이 오래갑니다.",
    image: "/images/product-oranda.jpg",
    price: 30000,
    unit: "1박스",
    occasions: ["답례", "선물"],
    storeUrl: null,
    // 상세페이지 이미지에서 읽어낸 값. 원재료 전체 표기는 판독이 불완전해
    // 클라이언트 확인 전까지 싣지 않는다(식품 표기는 틀리면 법적 문제가 된다).
    spec: [
      { label: "소비기한", value: "제조일로부터 6개월" },
      { label: "보관", value: "냉장·냉동 보관 권장 (상온 보관 가능)" },
      { label: "먹는 법", value: "냉동 보관 시 30분 전 상온 해동, 또는 전자레인지 15초" },
      { label: "포장", value: "낱개 포장" },
    ],
    accent: "bojagi",
  },
  {
    slug: "gift",
    name: "선물세트",
    summary: "보자기에 싸는 이바지 구성",
    detail:
      "절굿대떡을 이바지에 쓴 것은 맛도 맛이지만 건강을 생각한 떡이라는 믿음 때문이었습니다. 명절과 예단, 회사 접대에 두루 나갑니다.",
    image: "/images/product-gift.jpg",
    price: null,
    unit: null,
    occasions: ["이바지", "명절", "예단", "회사 선물"],
    storeUrl: null,
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
    when: "한동안",
    title: "이름만 남다",
    body: "절굿대떡은 나주 어르신들 사이에서 전설처럼 회자되던 떡이었습니다. 산에서 절굿대를 얻기 어려워지면서 만드는 사람이 끊겼습니다.",
  },
  {
    phase: 0.35,
    when: "복원",
    title: "맛을 좇아 전국을 돌다",
    body: "김은아 대표가 유년 시절 먹던 그 맛을 잊지 못해 복원에 매달렸습니다. 절굿대를 직접 무농약으로 길렀고, 지금은 마을 어르신들께 위탁해 재배합니다.",
  },
  {
    phase: 0.7,
    when: "2021년",
    title: "맛의방주에 오르다",
    body: "국제슬로푸드생물다양성재단의 심사를 거쳐 나주 절굿대떡이 맛의방주 품목으로 등재되었습니다. 사라질 위기의 먹거리를 기록하는 목록입니다.",
  },
  {
    phase: 1,
    when: "지금",
    title: "징고샅길에서",
    body: "나주 징고샅길의 떡카페에서 직접 빚고, 오신 분들이 만들어 볼 수 있는 체험장을 함께 운영합니다.",
  },
] as const;

/** 신뢰 근거. 사진이 아니라 사실로 말하는 자리다. */
export const credentials = [
  { label: "맛의방주 등재", detail: "2021년 · 국제슬로푸드생물다양성재단" },
  { label: "나주시 사회적기업", detail: "지역 어르신 위탁 재배" },
  { label: "상표등록", detail: "제40-2515456호" },
  { label: "인공첨가물 무사용", detail: "유화제·인공감미료를 넣지 않습니다" },
] as const;
