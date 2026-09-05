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
  const cls =
    "pressable px-3 py-1.5 text-caption border border-ink/25 transition-colors hover:border-mint-link hover:text-mint-link disabled:opacity-50";
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        disabled={pending}
        className={cls}
        onClick={() => start(() => setPublished(id, !published))}
      >
        {published ? "숨기기" : "게시"}
      </button>
      <Link href={`/admin/${id}`} className={cls}>
        수정
      </Link>
      <button
        type="button"
        disabled={pending}
        className={cls}
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
