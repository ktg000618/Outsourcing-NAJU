"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  deletePost,
  setPublished,
  type ActionState,
} from "@/app/admin/actions";

/** 목록 행의 게시/숨김·수정·삭제. 삭제는 한 번 되묻는다 — 되돌릴 수 없다. 실패 문구는 행 아래에, 다음 성공에 지운다. */
export function PostRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (action: () => Promise<ActionState>) =>
    start(async () => {
      const result = await action();
      setError(result.error);
    });
  const base =
    "pressable px-3 py-1.5 text-caption transition-colors disabled:opacity-50 border";
  const quiet = `${base} border-ink/20 text-ink-soft hover:border-ink hover:text-ink`;
  return (
    <div>
      <div className={`flex gap-1.5 ${pending ? "opacity-60" : ""}`}>
        <button
          type="button"
          disabled={pending}
          className={
            published
              ? quiet
              : `${base} border-ink bg-ink text-paper hover:bg-ink-soft`
          }
          onClick={() => run(() => setPublished(id, !published))}
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
            if (window.confirm("이 글을 삭제하시겠습니까? 되돌릴 수 없습니다."))
              run(() => deletePost(id));
          }}
        >
          삭제
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-caption text-rose-deep">
          {error}
        </p>
      )}
    </div>
  );
}
