import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { createPost } from "../actions";

export const metadata: Metadata = {
  title: "새 소식",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 lg:px-8 lg:pb-32 lg:pt-14">
      <SectionEyebrow phase={0.1}>소식 관리</SectionEyebrow>
      <h1 className="mt-3 text-h1 lg:text-h1-lg">
        <span className="font-thin tracking-tight">새 </span>
        <span className="font-black tracking-tighter">소식</span>
      </h1>
      <PostForm action={createPost} />
    </div>
  );
}
