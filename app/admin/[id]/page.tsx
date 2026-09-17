import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NEWS_SELECT, type NewsPost } from "@/lib/news";
import { previewUrls } from "@/lib/news-images";
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
  const previews = await previewUrls(supabase, post.images);
  return (
    <div className="page-top page-bottom mx-auto max-w-4xl px-5 lg:px-8">
      <SectionEyebrow phase={0.1}>소식 관리</SectionEyebrow>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="mt-3 text-h1 lg:text-h2-lg">
          <span className="font-thin tracking-tight">소식 </span>
          <span className="font-black tracking-tighter">수정</span>
        </h1>
        {post.published && (
          <Link
            href={`/news/${post.id}`}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            사이트에서 이 글 보기<span className="sr-only"> (새 창)</span>
          </Link>
        )}
      </div>
      <PostForm
        action={updatePost.bind(null, post.id)}
        initial={post}
        previews={previews}
      />
    </div>
  );
}
