import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버 컴포넌트·서버 액션용. 쿠키의 세션을 그대로 쓰므로 RLS 가 로그인한 직원 기준으로 걸린다.
 * 서버 컴포넌트에서는 setAll 이 실패할 수 있다(쿠키 쓰기 불가) — proxy.ts 가 세션을 갱신하므로 무시한다.
 */
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* 서버 컴포넌트 렌더 중 — proxy 가 갱신한다 */
          }
        },
      },
    },
  );
}

/** 공개 읽기용 — 쿠키 없이 anon. 소식 목록처럼 로그인과 무관한 조회. */
export function createPublicClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}
