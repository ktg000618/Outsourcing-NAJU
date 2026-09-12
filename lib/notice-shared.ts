/** 공지 띠 계약 — 클라이언트 폼과 서버 액션이 같은 상한을 쓴다(서버 전용 모듈을 끌지 않게 따로 둔다). */
export type SiteNotice = { text: string; enabled: boolean };
export const NOTICE_MAX = 120;
