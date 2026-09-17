"use server";

import { createPublicClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/news";
import type { ActionState } from "@/app/admin/actions";

export type RequestState = ActionState & { ok?: boolean };

const DB_ERROR = "지금은 접수할 수 없습니다. 전화로 문의해 주세요.";

function todayKst() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(
    new Date(),
  );
}

/**
 * 폼 → DB 행. 길이·형식은 DB CHECK 가 최종 방어선이고 여기서는 한국어 메시지로 먼저 거른다.
 * 봇은 숨긴 칸(company)을 채운다 — 그러면 저장하지 않고 성공한 척 보낸다.
 */
function parseRequest(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\s/g, "");
  const wanted_on = String(formData.get("wanted_on") ?? "").trim();
  const peopleRaw = String(formData.get("people") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "이름을 적어 주세요." } as const;
  if (name.length > 40) return { error: "이름은 40자까지입니다." } as const;
  if (!/^[0-9-]{9,15}$/.test(phone))
    return { error: "연락처는 숫자와 - 만으로 적어 주세요." } as const;
  if (wanted_on && !/^\d{4}-\d{2}-\d{2}$/.test(wanted_on))
    return { error: "희망 날짜를 다시 골라 주세요." } as const;
  if (wanted_on && wanted_on < todayKst())
    return { error: "희망 날짜는 오늘 이후로 골라 주세요." } as const;
  const people = peopleRaw ? Number(peopleRaw) : null;
  if (
    people !== null &&
    (!Number.isInteger(people) || people < 1 || people > 200)
  )
    return { error: "인원은 1~200 사이 숫자로 적어 주세요." } as const;
  if (message.length > 1000)
    return { error: "문의 내용은 1,000자까지입니다." } as const;
  if (formData.get("consent") !== "on")
    return { error: "개인정보 수집·이용에 동의해 주세요." } as const;

  return {
    error: null,
    row: { name, phone, wanted_on: wanted_on || null, people, message },
  } as const;
}

export async function submitExperienceRequest(
  _prev: RequestState,
  formData: FormData,
): Promise<RequestState> {
  if (String(formData.get("company") ?? "")) return { error: null, ok: true };
  const parsed = parseRequest(formData);
  if (parsed.error) return { error: parsed.error };
  if (!hasSupabaseEnv()) {
    console.error("[visit] submitExperienceRequest: no supabase env");
    return { error: DB_ERROR };
  }
  const { error } = await createPublicClient()
    .from("experience_requests")
    .insert(parsed.row);
  if (error) {
    console.error("[visit] submitExperienceRequest", error.message);
    return { error: DB_ERROR };
  }
  return { error: null, ok: true };
}
