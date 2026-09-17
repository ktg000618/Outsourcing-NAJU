"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStaff } from "@/lib/staff";
import { NOTICE_MAX } from "@/lib/notice-shared";

export type ActionState = { error: string | null };

/* 사진은 우리 버킷 URL 만 받는다 — 다른 호스트가 저장되면 next/image 가 /news 렌더에서 throw 해 공개 페이지가 죽는다. */
const NEWS_PUBLIC_PREFIX = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/`;
const storagePath = (url: string) =>
  decodeURIComponent(url.slice(NEWS_PUBLIC_PREFIX.length));

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
    .filter((v) => v.startsWith(NEWS_PUBLIC_PREFIX))
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

/** 로그인 + 직원 표 등록. RLS 가 어차피 막지만, 여기서 먼저 걸러 「저장 실패」 대신 로그인 화면으로 보낸다. */
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  if (!(await isStaff(supabase))) {
    await supabase.auth.signOut();
    redirect("/admin/login?denied=1");
  }
  return { supabase, user };
}

/* 글에서 빠진 사진은 버킷에서도 지운다 — 공개 버킷이라 URL 을 아는 사람은 계속 볼 수 있다. */
async function removeImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  urls: string[],
) {
  if (urls.length === 0) return;
  const { error } = await supabase.storage
    .from("news")
    .remove(urls.map(storagePath));
  if (error) console.error("[admin] removeImages", error.message);
}

function revalidateNews() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/news/page/[n]", "page");
  revalidatePath("/news/[id]", "page");
  revalidatePath("/news/feed.xml");
  revalidatePath("/sitemap.xml");
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
  const { data: before } = await supabase
    .from("news_posts")
    .select("images")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase
    .from("news_posts")
    .update(parsed.row)
    .eq("id", id);
  if (error) {
    console.error("[admin] updatePost", error.message);
    return { error: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
  const kept = new Set(parsed.row.images);
  await removeImages(
    supabase,
    ((before?.images as string[] | null) ?? []).filter((u) => !kept.has(u)),
  );
  revalidateNews();
  redirect("/admin");
}

/* 목록 행 액션도 실패를 화면에 돌려준다 — 콘솔에만 남기면 직원은 버튼이 안 먹는 줄 안다. */
export async function setPublished(
  id: string,
  published: boolean,
): Promise<ActionState> {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("news_posts")
    .update({ published })
    .eq("id", id);
  if (error) {
    console.error("[admin] setPublished", error.message);
    return {
      error: published
        ? "게시하지 못했습니다. 잠시 후 다시 시도해 주세요."
        : "숨기지 못했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
  revalidateNews();
  return { error: null };
}

export async function deletePost(id: string): Promise<ActionState> {
  const { supabase } = await requireUser();
  const { data: before } = await supabase
    .from("news_posts")
    .select("images")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) {
    console.error("[admin] deletePost", error.message);
    return { error: "삭제하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
  await removeImages(supabase, (before?.images as string[] | null) ?? []);
  revalidateNews();
  return { error: null };
}

/* 예약 문의 — 손님이 /visit 에서 남긴 접수. 처리 표시·삭제만 있고 수정은 없다(손님 말을 직원이 고치지 않는다). */
export async function setRequestStatus(
  id: string,
  status: "new" | "done",
): Promise<ActionState> {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("experience_requests")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("[admin] setRequestStatus", error.message);
    return {
      error: "처리 상태를 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
  revalidatePath("/admin/requests");
  revalidatePath("/admin");
  return { error: null };
}

export async function deleteRequest(id: string): Promise<ActionState> {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("experience_requests")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("[admin] deleteRequest", error.message);
    return { error: "삭제하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
  revalidatePath("/admin/requests");
  revalidatePath("/admin");
  return { error: null };
}

/** 공지 띠 — 행 하나(id = 1)를 고친다. 켠 채 빈 글은 띄울 게 없으니 막는다. 모든 페이지 머리에 있어 layout 째 갱신. */
export async function saveNotice(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase } = await requireUser();
  const text = String(formData.get("text") ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const enabled = formData.get("enabled") === "on";
  if (enabled && !text) return { error: "띄울 문구를 적어 주세요." };
  if (text.length > NOTICE_MAX)
    return { error: `공지는 ${NOTICE_MAX}자까지입니다.` };
  const { error } = await supabase
    .from("site_notice")
    .update({ text, enabled, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) {
    console.error("[admin] saveNotice", error.message);
    return { error: "저장하지 못했습니다. 다시 시도해 주세요." };
  }
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
