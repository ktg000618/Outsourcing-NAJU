"use client";

import { useTransition } from "react";
import Link from "next/link";
import { deletePost, setPublished } from "@/app/admin/actions";

/** 목록 행의 게시/숨김·수정·삭제. 삭제는 한 번 되묻는다 — 되돌릴 수 없다. */
export function PostRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, start] = useTransition();
  const base =
    "pressable px-3 py-1.5 text-caption transition-colors disabled:opacity-50 border";
  const quiet = `${base} border-ink/20 text-ink-soft hover:border-ink hover:text-ink`;
  return (
    <div className={`flex gap-1.5 ${pending ? "opacity-60" : ""}`}>
      <button
        type="button"
        disabled={pending}
        className={
          published
            ? quiet
            : `${base} border-ink bg-ink text-paper hover:bg-ink-soft`
        }
        onClick={() => start(() => setPublished(id, !published))}
      >
        {published ? "숨기기" : "게시"}
      </button>
      <Link href={`/admin/${id}`} className={quiet}>
        수정
      </Link>
      <button
        type="button"
        disabled={pending}
        className={`${base} border-transparent text-ink-faint hover:border-rose-deep hover:text-rose-deep`}
        onClick={() => {
          if (window.confirm("이 글을 지울까요? 되돌릴 수 없습니다."))
            start(() => deletePost(id));
        }}
      >
        삭제
      </button>
    </div>
  );
}
