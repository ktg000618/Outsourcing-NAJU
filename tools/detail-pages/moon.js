// 달 위상 마크 — 사이트 components/moon-mark.tsx 와 같은 규칙(차오르는 순서: 0 삭 → 1 보름).
// <i class="moon" data-phase="0.4"></i> 를 인라인 SVG 로 바꾼다.
document.querySelectorAll("i.moon[data-phase]").forEach((el) => {
  const p = Math.max(0, Math.min(1, Number(el.dataset.phase)));
  const dark = el.dataset.tone === "paper";
  const stroke = dark ? "#dfc05d" : "#161616";
  const r = 8, c = 9;
  // 밝은 부분 = 오른쪽부터 차오른다. p=0.5 반달, p=1 보름.
  const k = Math.cos(Math.PI * p); // 1 → -1
  const sweep = p < 0.5 ? 0 : 1;
  const rx = Math.abs(k) * r;
  const lit = p === 0 ? "" : p === 1
    ? `<circle cx="${c}" cy="${c}" r="${r}" fill="${stroke}"/>`
    : `<path d="M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r} A ${rx} ${r} 0 0 ${sweep} ${c} ${c - r} Z" fill="${stroke}"/>`;
  el.outerHTML = `<svg class="moon" viewBox="0 0 18 18" aria-hidden="true"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${stroke}" stroke-width="1.2"/>${lit}</svg>`;
});
