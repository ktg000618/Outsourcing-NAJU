/**
 * 달의 위상으로 진행을 표시한다.
 *
 * 이 브랜드에서 원은 장식이 아니다 — 로고가 원형이고, 절굿대 꽃이 구체이고,
 * 매장 벽 장식도 크고 작은 원이다. 연표에 01/02/03 을 붙이는 대신 달이 차오르게 한 것은
 * '사라졌다가 돌아온' 내용이 실제로 순서를 갖기 때문이다.
 *
 * @param phase 0 = 삭(보이지 않음), 0.5 = 반달, 1 = 보름
 */
export function MoonMark({
  phase,
  size = 28,
  className = "",
}: {
  phase: number;
  size?: number;
  className?: string;
}) {
  const r = 10;
  const p = Math.min(1, Math.max(0, phase));
  // 명암 경계선은 타원이다. 반달(0.5)에서 폭 0으로 납작해졌다가 반대로 부푼다.
  const rx = Math.abs(r * (1 - 2 * p));
  const sweep = p < 0.5 ? 1 : 0;

  return (
    <svg
      viewBox="-12 -12 24 24"
      width={size}
      height={size}
      aria-hidden
      className={className}
    >
      <circle r={r} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {p > 0.01 && (
        <path
          d={`M 0,${-r} A ${r},${r} 0 0,1 0,${r} A ${rx},${r} 0 0,${sweep} 0,${-r} Z`}
          fill="currentColor"
        />
      )}
    </svg>
  );
}
