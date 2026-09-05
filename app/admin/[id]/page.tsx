import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NEWS_SELECT, type NewsPost } from "@/lib/news";
import { PostForm } from "@/components/admin/post-form";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { updatePost } from "../actions";

export const metadata: Metadata = {
  title: "소식 수정",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_posts")
    .select(NEWS_SELECT)
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const post = data as NewsPost;
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 lg:px-8 lg:pb-32 lg:pt-14">
      <SectionEyebrow phase={0.1}>소식 관리</SectionEyebrow>
      <h1 className="mt-3 text-h1 lg:text-h1-lg">
        <span className="font-thin tracking-tight">소식 </span>
        <span className="font-black tracking-tighter">수정</span>
      </h1>
      <PostForm action={updatePost.bind(null, post.id)} initial={post} />
    </div>
  );
}
