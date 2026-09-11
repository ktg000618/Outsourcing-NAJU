// 상세페이지 HTML → 860px 세로 이미지(2x = 1720px). playwright-core 는 스크랩패드에 설치된 것을 쓴다.
//   node render.mjs jeolgutdae gift
// Chromium 은 한 장의 캡처가 16,384px 을 넘으면 되감긴다 → 6,000px(CSS) 단위로 잘라 찍어 이어 붙인다.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
const require = createRequire("/private/tmp/claude-501/-Users-taegyun-farm-mvp/f2830fbc-c281-4e0d-a205-0305d0c922b6/scratchpad/package.json");
const { chromium } = require("playwright-core");
const EXE = "/Users/taegyun/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "out");
fs.mkdirSync(out, { recursive: true });
const SCALE = 2, CHUNK = 6000;
const browser = await chromium.launch({ executablePath: EXE });
for (const name of process.argv.slice(2)) {
  const page = await browser.newPage({ viewport: { width: 860, height: 1200 }, deviceScaleFactor: SCALE });
  await page.goto("file://" + path.join(here, `${name}.html`), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  const h = await page.evaluate(() => document.body.scrollHeight);
  const parts = [];
  for (let y = 0; y < h; y += CHUNK) {
    const ph = Math.min(CHUNK, h - y);
    const file = path.join(out, `${name}.part${parts.length}.png`);
    await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y, width: 860, height: ph } });
    parts.push({ file, h: ph });
  }
  fs.writeFileSync(path.join(out, `${name}.parts.json`), JSON.stringify({ height: h, scale: SCALE, parts }));
  console.log(name, "860 x", h, "in", parts.length, "parts");
  await page.close();
}
await browser.close();
