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
    <div className="page-top page-bottom mx-auto max-w-6xl px-5 lg:px-8">
      <SectionEyebrow phase={0.1}>소식 관리</SectionEyebrow>
      <h1 className="mt-3 text-h1 lg:text-h2-lg">
        <span className="font-thin tracking-tight">새 </span>
        <span className="font-black tracking-tighter">소식</span>
      </h1>
      <PostForm action={createPost} />
    </div>
  );
}
