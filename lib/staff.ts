import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 「로그인했나」가 아니라 「직원인가」 — public.staff 표에 이메일이 있어야 관리 화면·쓰기가 열린다.
 * DB 함수 is_staff() 와 같은 판정이라, RLS 가 막는 것을 화면이 먼저 알려 준다(supabase/004_staff.sql).
 * 함수 호출이 실패하면 직원이 아닌 것으로 본다 — 열어 두는 쪽으로 기울지 않는다.
 */
export async function isStaff(supabase: SupabaseClient): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_staff");
  if (error) {
    console.error("[staff] is_staff", error.message);
    return false;
  }
  return data === true;
}

export const STAFF_DENIED_MESSAGE =
  "직원으로 등록된 계정이 아닙니다. 관리자에게 등록을 요청하세요.";
