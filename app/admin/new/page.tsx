import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";
import { createPost } from "../actions";

export const metadata: Metadata = {
  title: "새 소식",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-10 lg:pt-14">
      <p className="text-caption text-ink-faint">소식 관리</p>
      <h1 className="mt-1 text-h2 font-black tracking-tighter">새 소식</h1>
      <PostForm action={createPost} />
    </div>
  );
}
