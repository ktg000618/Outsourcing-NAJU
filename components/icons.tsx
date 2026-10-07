/** 헤더 전화 버튼과 모바일 하단 바가 같은 선 굵기(1.6)·같은 크기(size-4)로 쓰는 아이콘 둘. */
type IconProps = { className?: string };

export function PhoneIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.5 5.5c0-.6.4-1 1-1h2.6c.4 0 .8.3.9.7l1 3c.1.4 0 .8-.3 1l-1.4 1.2a12 12 0 0 0 5.3 5.3l1.2-1.4c.2-.3.6-.4 1-.3l3 1c.4.1.7.5.7.9v2.6c0 .6-.4 1-1 1A15.5 15.5 0 0 1 4.5 5.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  );
}

/** 공식 SNS 글리프 — 전화·핀과 같은 선 굵기 1.6. 네이버는 초록 원색 로고 대신 둥근 네모 안의 N 선 하나(먹색 푸터에서 원색이 혼자 튄다). */
export function InstagramIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NaverBlogIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M8.5 15.5v-7l7 7v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
