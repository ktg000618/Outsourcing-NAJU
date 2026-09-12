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

export type Product = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  image: string;
  /** 대표 이미지의 대체 텍스트. 제품명만 적으면 사진이 무엇을 보여 주는지 스크린리더가 모른다. */
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
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDMTyYYVeCRty4yG7/SrscsPlIJGJYD+FRVZ7XUWh2f2bIOACwiOfzqD+ztT/58rj/viosgsd0g2sfz5qWn+Uo7Uuwe9Z8pdz//2Q==",
      },
      {
        src: "/images/detail/jeolgutdae-02.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (2/6)",
        width: 1720,
        height: 3859,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDprqS4UqLeJXyeSx6VOm7YN2N3fFMwWOWI69ielPQkL85GfakBUma2tZF82VkZ+R1xVkYwCG3AjIPrSyIskZV1DDHQigKFUKoAAHAFAH//2Q==",
      },
      {
        src: "/images/detail/jeolgutdae-03.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (3/6)",
        width: 1720,
        height: 3919,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC/HeaTHdGdb+ENzg7umfwq1FrOmRoFOoxOR3Z8n+VcGQzgbl4A4x9KidSrYxSsB0MGoxJDCv25htQADzD8p49+lU9UvIp50YXAkxGATuJ7mu4RIzIQY48c/wAAqXyYv+eUf/fApWA//9k=",
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
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDdt4St/K/74gqRggAdexrRXJHII+tVlLhyGYkduMVJWXOVYrXzzRhRbRBmYD5+uPwqwgbYvmbd+Pmx0zUcE7vctG2Coz296t1XKFz/2Q==",
      },
      {
        src: "/images/detail/jeolgutdae-06.jpg",
        alt: "절굿대떡 상세 — 50년 만에 돌아온 나주의 이바지 떡, 재료·만드는 방식·보관·제품정보 (6/6)",
        width: 1720,
        height: 4082,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqMSebJlU2Y+XHXPvT4zIV+ddpz0zmm5IOM06kMYRzyuaeBjoK8we4Z16BcAD5cj8ai3v/AH2/76NAj//Z",
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
    ],
    gallery: [
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
        alt: "나주배청이 들어간 나주배 촉촉오란다",
        width: 860,
        height: 1455,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDFtoF2Oz7G3KQAc/KfX61Xki8tyuQ2O4rXTS4GeMLcmTgk7F4IH40/+wHdV2z7Sow37ovk/UfhUKvHqzXkfY1rjCWkhQbcHt9elLZDMJ+Zhhuxoorz1qjVH//Z",
      },
      {
        src: "/images/detail/oranda-02.jpg",
        alt: "겉바속촉의 쫀득한 식감",
        width: 860,
        height: 1687,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAYAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDYlEhb5SyqPQVNHlkBPeqbmUQYJ85gSrL1BB9fWhZ47GNIVAjULlVCk4FeZY7AlgupL/esxFoU2tGF+9/n1qza28VvFsUMRnPz9aKKq9xWP//Z",
      },
      {
        src: "/images/detail/oranda-03.jpg",
        alt: "포인트 넷 소개",
        width: 860,
        height: 1349,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAATAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDPjSMr8+8Hr04qJsBjtzj361YYMYo8Bj8g7H1PvVdhz0x+Fch2IKKKKQz/2Q==",
      },
      {
        src: "/images/detail/oranda-04.jpg",
        alt: "POINT 1 나주배청으로 만든 수제 오란다",
        width: 860,
        height: 2201,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAfAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrJpWUqFDHnJ2j9KlDZANZV9eTW90P3QEe4AkgHI7n1FXrS6iuofMiyFzjBGOazUr3KaMCR7kKJbibIXKlV4Gfz6VatLgtESrOi7uFQDAqRItRF+AS5tjnduKYzzjHf0rSjDhfnUZz2ArD2b7mnP5H/9k=",
      },
      {
        src: "/images/detail/oranda-05.jpg",
        alt: "POINT 2 6가지 견과류",
        width: 860,
        height: 2122,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAeAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrJZWVgFVjjk7ec+1SKxZQcYz2qh9olPPlAndj8PWmi9ud7r9mIVWwpyPmHrWPtUacjMwPCjsoDkGXzTmQ/e/w9qsC8Q5ODknJ5qjcIba8KZyrZPXOM+n+TV6DTkeIMQDnuxJJrmZsf//Z",
      },
      {
        src: "/images/detail/oranda-06.jpg",
        alt: "POINT 3 간편한 개별포장",
        width: 860,
        height: 2124,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAeAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDq5pmVgFVjjk4HX2qVX3KDgjPrXOJqtzNL5qblg2ksXUfLjvjrVuyv7i4iZgrEBiAciuf2yRr7NlMt/o7KiRqSMEICc+wFTR3e1AFEca9lCk/y4qHzFinT5chsgjHGcdfeq8NzJKHaBmCbiMM3f2HYe1U4RFzM/9k=",
      },
      {
        src: "/images/detail/oranda-07.jpg",
        alt: "POINT 4 인공첨가물 ZERO, 만드는 모습",
        width: 860,
        height: 1976,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDobmzt5gY2s4ipOSOBn34qaOzg2D9wFA4AzVG/vpYlLxqwYjCqc8nt7VWh1G6nhSTzEXI6ZIqChuoTQmWGZ/N5jyAv3Qc8Z/KswhLwLJMsyPjGIvu/yq7fyeTMqKq7QigAjPYH+tRNGoOUym7khTgZotrcLn//2Q==",
      },
      {
        src: "/images/detail/oranda-08.jpg",
        alt: "온 가족이 나눠 먹는 선물 보자기",
        width: 860,
        height: 1863,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAaAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDLtLWV7dZRHC8ZfZlhyD6e5Oaj1CzaG7eNBnbjJXpnGTWuVFoHhjfeQ+SPK6HHXrj9Kkh0e2vk+0PNJI7k7mJA5rP2rT5mtDXl0LbWEM8pMjbypw2TgZ7cDrSRQSogDXhQ/wByOPhfatok/wDj1SRnhv8AeNL2S2Fzs//Z",
      },
      {
        src: "/images/detail/oranda-09.jpg",
        alt: "맛있게 먹는 방법과 보관 방법",
        width: 860,
        height: 1531,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAVAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqXUIuQuQFyxL4xSDy3RXjKsrDIIbIP405uAQ7AqwwBjP58UKgjRUAUADgKOKwcUlexdyDz/VBn60G4Y9ABRRXn+2m9Lm/Kj//2Q==",
      },
      {
        src: "/images/detail/oranda-10.jpg",
        alt: "제품정보 표",
        width: 860,
        height: 556,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrkBV3wWOT3qQZxzRRQB//2Q==",
      },
    ],
    gallery: [
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
      { label: "소비기한", value: "제조일로부터 6개월" },
      { label: "보관", value: "냉장·냉동 보관 권장 (상온 보관 가능)" },
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
      caption: "겉바속촉 쫀득한 식감!",
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
    imageAlt: "상자·나주배와 함께 차린 절굿대떡 선물세트",
    detailImages: [
      {
        src: "/images/detail/gift-01.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (1/5)",
        width: 1720,
        height: 3964,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDfvLmWBwscO8EZBwamhJkiV3VkZhkrnoa5R/EWppAJd9oQQDtAyfyzVf8A4SzUvSD/AL9//XoA3V8PaaWIaCRcdD5xp/8AwjOlnrC//f1q1NoDZp9YXZdj/9k=",
      },
      {
        src: "/images/detail/gift-02.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (2/5)",
        width: 1720,
        height: 4000,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDqJGijfaUYnGflXNSKFZQQDg0j/N0Cn605dqqAOB6Cpsh6lXYqybljOS2AQw/OpkbcuSMc8c5zUgRT1FLtFMD/2Q==",
      },
      {
        src: "/images/detail/gift-03.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (3/5)",
        width: 1720,
        height: 3381,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAYAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDatbxm1F4Wg8sEsA245OPatNG3KDzz61wp8Saio3pLbFj1xCAab/wleqj+OH/v0KSv1G7dCmlomI1+2243gEksflz61SdQGwGU/TpRRR1A/9k=",
      },
      {
        src: "/images/detail/gift-04.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (4/5)",
        width: 1720,
        height: 3968,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAcAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCrNqkZOJFIyMiohqaY46V2H9m2JkwbO3xj/nkP8Kf/AGXYf8+Vv/37FTYd2PWVjIQyYP8Ae4p+9qZj5s06srsqx//Z",
      },
      {
        src: "/images/detail/gift-05.jpg",
        alt: "선물세트 상세 — 구성·포장·재료·쓰임새·배송·제품정보 (5/5)",
        width: 1720,
        height: 3757,
        blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAaAAwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDp8MXyGBXpjH9aSKORExI+9s9cYpW+8KkHSpauO5ltr2mrgm6AB/vI3+FH/CRaV/z+L/3y3+FcC0juvzOzcAcnPFMpiP/Z",
      },
    ],
    gallery: [
      {
        src: "/images/product-gift-box.jpg",
        alt: "달토끼가 그려진 절굿대달토끼 선물 상자",
      },
      {
        src: "/images/gal-gift-pears.jpg",
        alt: "나주배·오란다와 함께 놓은 선물 상자",
      },
      {
        src: "/images/gal-gift-tteok.jpg",
        alt: "절굿대떡과 차를 곁들인 선물 상자",
      },
      {
        src: "/images/gal-gift-bag.jpg",
        alt: "선물세트를 담아 드리는 종이 가방",
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
  {
    year: "2016",
    items: [
      "절굿대떡屋 설립 (나주목사고을시장 內)",
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
      "사회적기업 인증 제2023-247 (고용노동부)",
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
  { label: "사회적기업 인증", detail: "제2023-247호 고용노동부" },
  { label: "고향사랑 답례품", detail: "2024년 나주시 선정" },
  { label: "상표등록", detail: "제40-2515456호 · 2026년 지식재산처" },
  { label: "인공첨가물 무사용", detail: "유화제·인공감미료를 넣지 않습니다" },
] as const;
