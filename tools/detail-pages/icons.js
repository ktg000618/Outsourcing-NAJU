// 선 아이콘 — <i class="ico" data-icon="leaf"></i> 를 인라인 SVG 로 바꾼다. 굵기 2.2, 먹색.
const ICONS = {
  leaf: '<path d="M12 58c0-24 16-40 44-42-2 28-18 44-42 44" /><path d="M14 56c8-14 20-26 32-32" />',
  hand: '<path d="M22 40V18a5 5 0 0 1 10 0v18M32 34V14a5 5 0 0 1 10 0v20M42 34V18a5 5 0 0 1 10 0v24c0 12-8 20-20 20S12 54 12 44v-8a5 5 0 0 1 10 0" />',
  ban: '<circle cx="36" cy="36" r="24" /><path d="M20 20l32 32" />',
  box: '<path d="M12 26l24-12 24 12v24L36 62 12 50z" /><path d="M12 26l24 12 24-12M36 38v24" />',
  snow: '<path d="M36 10v52M14 23l44 26M14 49l44-26M36 10l-6 6M36 10l6 6M36 62l-6-6M36 62l6-6" />',
  micro: '<rect x="10" y="18" width="52" height="36" rx="4" /><rect x="16" y="24" width="30" height="24" rx="2" /><path d="M52 28v2M52 36v2" />',
  steam: '<path d="M14 40h44M18 40c0 10 8 18 18 18s18-8 18-18M26 30c0-6 4-6 4-12M36 30c0-6 4-6 4-12M46 30c0-6 4-6 4-12" />',
  gift: '<rect x="12" y="28" width="48" height="34" rx="4" /><path d="M12 40h48M36 28v34M36 28c-8 0-14-6-14-10s6-6 14 10c8-16 14-14 14-10s-6 10-14 10" />',
  moon: '<path d="M44 12a24 24 0 1 0 12 44 20 20 0 0 1-12-44z" />',
  clock: '<circle cx="36" cy="36" r="24" /><path d="M36 20v16l10 6" />',
  phone: '<path d="M20 14h10l4 10-6 4c3 8 8 13 16 16l4-6 10 4v10c0 2-2 4-4 4C32 56 16 40 16 18c0-2 2-4 4-4z" />',
  truck: '<path d="M10 20h34v26H10zM44 30h10l8 8v8H44z" /><circle cx="20" cy="52" r="5" /><circle cx="52" cy="52" r="5" />',
};
document.querySelectorAll("i.ico[data-icon]").forEach((el) => {
  const d = ICONS[el.dataset.icon] || "";
  const color = el.dataset.color || "currentColor";
  el.outerHTML = `<svg class="ico" viewBox="0 0 72 72" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
});
