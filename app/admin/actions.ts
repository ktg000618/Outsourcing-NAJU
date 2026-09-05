"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error: string | null };

/**
 * 폼 → DB 행. 클라이언트 입력은 믿지 않는다 — 길이·형식은 DB CHECK 가 최종 방어선이고
 * 여기서는 한국어 메시지로 먼저 거른다.
 */
function parsePost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const published_on = String(formData.get("published_on") ?? "");
  const published = formData.get("published") === "on";
  const link = String(formData.get("link_url") ?? "").trim();
  const images = formData
    .getAll("images")
    .map((v) => String(v))
    .filter((v) => v.startsWith("http"))
    .slice(0, 3);

  if (!title) return { error: "제목을 적어 주세요." } as const;
  if (title.length > 80) return { error: "제목은 80자까지입니다." } as const;
  if (body.length > 4000)
    return { error: "본문은 4,000자까지입니다." } as const;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(published_on))
    return { error: "날짜를 골라 주세요." } as const;
  if (link && !/^https?:\/\//.test(link))
    return { error: "링크는 https:// 로 시작해야 합니다." } as const;

  return {
    error: null,
    row: {
      title,
      body,
      published_on,
      published,
      images,
      link_url: link || null,
    },
  } as const;
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return { supabase, user };
}

function revalidateNews() {
  revalidatePath("/news");
  revalidatePath("/admin");
}

export async function createPost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, user } = await requireUser();
  const parsed = parsePost(formData);
  if (parsed.error) return { error: parsed.error };
  const { error } = await supabase
    .from("news_posts")
    .insert({ ...parsed.row, created_by: user.id });
  if (error) {
    console.error("[admin] createPost", error.message);
    return { error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
  revalidateNews();
  redirect("/admin");
}

export async function updatePost(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase } = await requireUser();
  const parsed = parsePost(formData);
  if (parsed.error) return { error: parsed.error };
  const { error } = await supabase
    .from("news_posts")
    .update(parsed.row)
    .eq("id", id);
  if (error) {
    console.error("[admin] updatePost", error.message);
    return { error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
  revalidateNews();
  redirect("/admin");
}

export async function setPublished(id: string, published: boolean) {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("news_posts")
    .update({ published })
    .eq("id", id);
  if (error) console.error("[admin] setPublished", error.message);
  revalidateNews();
}

export async function deletePost(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) console.error("[admin] deletePost", error.message);
  revalidateNews();
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
