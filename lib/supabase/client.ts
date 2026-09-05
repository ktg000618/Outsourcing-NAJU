import { createBrowserClient } from "@supabase/ssr";

/** 브라우저용. 로그인 폼과 이미지 업로드에서만 쓴다. 글 쓰기는 서버 액션으로. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
