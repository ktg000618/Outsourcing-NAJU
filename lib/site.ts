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
  mobile2: "010-5141-0103",
  address: "전라남도 나주시 징고샅길 7-1",
  addressRegion: "전라남도",
  addressLocality: "나주시",

  hours: "매일 09:00 – 21:00",
  /** 요일별로 시간이 같고 정기 휴무가 확인되지 않았다. 값이 null 이면 화면에서 줄이 사라진다. */
  closedDays: null as string | null,
  /** 구조화 데이터(LocalBusiness)용. 화면 표기는 hours 를 쓴다. */
  opensAt: "09:00",
  closesAt: "21:00",

  /** TODO(클라이언트): 스마트스토어 주소 */
  storeUrl: null as string | null,

  /** TODO(클라이언트): 인스타그램 등 */
  instagramUrl: "https://www.instagram.com/jeol_gutdae/" as string | null,

  /** 법인명. 화면에 보이는 이름은 site.name(절굿대달토끼), 법적 표기는 이쪽이다. */
  legalName: "농업회사법인주식회사절굿대",
  businessNumber: "794-88-01567",
  corporateNumber: "205511-0063933",
  mailOrderNumber: "제2020-전남나주-0086호",
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
  /** 대표 이미지 말고 더 보여줄 컷. 상세 페이지에서만 쓴다. */
  gallery?: { src: string; alt: string }[];
  /** 소리 없는 짧은 루프. 사진으로는 안 보이는 질감을 보여주는 자리다. */
  video?: { src: string; poster: string; label: string };
  /**
   * 후기 영상. 루프가 아니라 눌러서 보는 것이라 네이티브 controls 를 쓴다
   * — 사람이 말하는 27초짜리를 자동 반복하면 산만하다.
   */
  reviewVideo?: { src: string; poster: string; label: string; caption: string };
  accent: "signage" | "bojagi" | "gift";
};

export const products: Product[] = [
  {
    slug: "jeolgutdae",
    name: "절굿대떡",
    summary: "콩고물을 입힌 나주의 이바지 떡",
    detail:
      "유화제나 인공감미료를 전혀 넣지 않고 전통 방식 그대로 빚습니다. 나주 특산 배즙으로 자연스러운 단맛을 더했고, 찹쌀의 쫄깃한 식감은 소화에도 부담이 없습니다. 아침 식사 대용은 물론 아이들 영양 간식으로도 안심하고 드실 수 있습니다.",
    image: "/images/product-tray.jpg",
    price: null,
    unit: null,
    occasions: ["이바지", "명절", "선물"],
    storeUrl: null,
    spec: [
      { label: "보관", value: "남은 떡은 굳기 전에 냉동 보관해 주세요" },
      { label: "해동", value: "실온에서 1~2시간, 또는 찜기·전자레인지로 말랑하게" },
      { label: "드시는 법", value: "인절미 그대로가 가장 좋지만, 기호에 따라 청이나 콩가루를 곁들이셔도 됩니다" },
    ],
    gallery: [
      {
        src: "/images/product-jeolgutdae-pack.jpg",
        alt: "낱개 포장한 절굿대떡과 콩고물을 입힌 떡, 곁에 놓인 쑥",
      },
    ],
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
      caption: "영양간식으로 드시는 분이 많습니다",
    },
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
    when: "한때",
    title: "목사골 양반들의 이바지 떡",
    body: "지역에서 으뜸가는 떡이라 하여 이바지에 올랐습니다. 세월이 흐르며 자취를 감추고, 어르신들의 기억 속 전설로만 남았습니다.",
  },
  {
    phase: 0.3,
    when: "2016년",
    title: "절굿대 육묘에 국내 최초로 성공",
    body: "어린 시절 맛보았던 그 떡을 잊지 못한 김화수 대표가 전국을 돌며 복원에 매달렸습니다. 깊은 산속에서만 자생하던 절굿대의 육묘 재배에 마침내 성공했습니다. 같은 해 나주목사고을시장 안에 절굿대떡屋을 열었습니다.",
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
  { year: "2016", items: ["절굿대떡屋 설립 (나주목사고을시장 內)", "국내 최초 절굿대 육묘재배 성공"] },
  { year: "2017", items: ["50년 만에 사라졌던 남도의 으뜸맛떡 '절굿대떡' 부활"] },
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
      "장애인복지관·나주시다문화가족센터 등 사회복지시설 업무협약",
    ],
  },
  { year: "2021", items: ["전라남도지사 표창 (사회복지부문)"] },
  {
    year: "2022",
    items: ["'절굿대떡' 슬로푸드 맛의방주 등재", "KBS 6시내고향 「나주 전통떡 절굿대떡」 방영"],
  },
  {
    year: "2023",
    items: [
      "나주시 여성새로일하기센터·국립나주숲체원 등 업무협약",
      "사회적기업 인증 제2023-247 (고용노동부)",
    ],
  },
  { year: "2024", items: ["나주시 고향사랑 답례품 선정 (절굿대떡, 나주배촉촉오란다)"] },
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
  { label: "사회적기업 인증", detail: "제2023-247호 고용노동부" },
  { label: "고향사랑 답례품", detail: "2024년 나주시 선정" },
  { label: "인공첨가물 무사용", detail: "유화제·인공감미료를 넣지 않습니다" },
] as const;
