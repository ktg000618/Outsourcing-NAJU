import { formatNewsDate } from "@/lib/news";

/** 체험 예약 문의 한 건. DB 행과 같은 모양 — 관리 화면이 이 계약을 쓴다. */
export type ExperienceRequest = {
  id: string;
  name: string;
  phone: string;
  /** YYYY-MM-DD, 손님이 안 고르면 null */
  wanted_on: string | null;
  people: number | null;
  message: string;
  status: "new" | "done";
  created_at: string;
};

export const REQUEST_SELECT =
  "id, name, phone, wanted_on, people, message, status, created_at";

/** 희망 날짜 — 소식과 같은 "2026. 9. 5. (토)". */
export const formatRequestDate = formatNewsDate;

/** 접수 시각 — "2026. 9. 5. 14:03" (KST). 같은 날 여러 건이면 시각이 순서를 말한다. */
export function formatRequestTime(iso: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
