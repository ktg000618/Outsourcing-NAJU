import { createPublicClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/news";

import type { SiteNotice } from "@/lib/notice-shared";

export type { SiteNotice } from "@/lib/notice-shared";

/** 켜져 있고 글이 있을 때만 값이 온다 — anon 은 RLS 로 꺼진 행을 못 보고, 빈 글은 띄울 게 없다. */
export async function getNotice(): Promise<SiteNotice | null> {
  if (!hasSupabaseEnv()) return null;
  const { data, error } = await createPublicClient()
    .from("site_notice")
    .select("text, enabled")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("[notice] getNotice", error.message);
    return null;
  }
  if (!data || !data.enabled || !data.text.trim()) return null;
  return data as SiteNotice;
}
