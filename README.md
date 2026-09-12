# 절굿대달토끼 홈페이지

나주 절굿대달토끼(농업회사법인 주식회사 절굿대)의 소개 사이트입니다. Next.js 16 · React 19 · Tailwind 4 · Supabase.
배포: https://naju-daltokki.vercel.app (Vercel, `main` 푸시 = 배포)

## 운영

- **소식 올리기**: `/admin/login` 에서 직원 계정으로 로그인 → 「새 글」. 제목·본문·날짜·사진(3장, 장당 5MB, 가로 사진 권장)·링크.
  저장하면 `/news` 에 바로 반영됩니다. 목록에서 숨기기·수정·삭제.
- **직원 계정**: Supabase 대시보드 → Authentication → Users → Add user(이메일·비밀번호). 회원가입은 꺼 둡니다(켜면 아무나 글을 쓸 수 있음).
- **제품·문구·연락처**: `lib/site.ts` 한 파일. 가격·소비기한처럼 아직 비어 있는 값은 `null` 로 두었고, 채우면 화면에 자리가 생깁니다.
- **사진**: `public/images/`. 제품·재료 사진(원형 자리)은 가장자리 복제+블러로 패딩한 정사각(1600·1200px).
- **상세페이지 이미지**: `tools/detail-pages/` (`*.html` → `node render.mjs` → `python3 stitch.py` → `python3 slice.py`).
  렌더는 Playwright 크로미움을 씁니다. 처음 한 번 `npx playwright install chromium`, 또는 `CHROME_PATH=/경로/Chrome node render.mjs …`.

## 개발

```bash
npm install
cp .env.example .env.local   # Supabase URL·publishable key
npm run dev
npm run lint && npm run build
```

DB 스키마·RLS·스토리지 버킷은 `supabase/001_news.sql` 하나입니다(대시보드 SQL Editor 에서 실행).
