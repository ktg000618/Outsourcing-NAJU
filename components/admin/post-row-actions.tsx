"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  deletePost,
  setPublished,
  type ActionState,
} from "@/app/admin/actions";

/**
 * 목록 행의 글 보기·주소 복사·게시/숨김·수정·삭제. 삭제는 한 번 되묻는다 — 되돌릴 수 없다.
 * 실패 문구는 행 아래에, 다음 성공에 지운다. 글 보기·주소 복사는 게시된 글에만 — 숨긴 글은 공개 주소가 404 다.
 */
export function PostRowActions({
  id,
  published,
  url,
}: {
  id: string;
  published: boolean;
  /** 공개 글 주소(절대 경로). 카톡에 붙여 넣을 그 주소. */
  url: string;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드가 막힌 브라우저 — 주소를 보여 주고 직접 복사하게
      window.prompt("이 주소를 복사해 쓰세요", url);
    }
  };
  const run = (action: () => Promise<ActionState>) =>
    start(async () => {
      const result = await action();
      setError(result.error);
    });
  const quiet = "btn-secondary btn-sm";
  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${pending ? "opacity-60" : ""}`}
      >
        {published && (
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-link text-caption"
            >
              글 보기<span className="sr-only"> (새 창)</span>
            </a>
            <button
              type="button"
              onClick={copy}
              aria-live="polite"
              className="text-link text-caption"
            >
              {copied ? "복사했습니다" : "주소 복사"}
            </button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={pending}
            className={
              published ? "text-link text-caption" : "btn-primary btn-sm"
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
            className="text-link text-caption text-rose-deep"
            onClick={() => {
              if (
                window.confirm("이 글을 삭제하시겠습니까? 되돌릴 수 없습니다.")
              )
                run(() => deletePost(id));
            }}
          >
            삭제
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-caption text-rose-deep">
          {error}
        </p>
      )}
    </div>
  );
}
