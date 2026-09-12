"use client";

import { useState, useTransition } from "react";
import {
  deleteRequest,
  setRequestStatus,
  type ActionState,
} from "@/app/admin/actions";

/** 문의 행의 처리 완료/되돌리기·삭제. 삭제는 한 번 되묻는다 — 되돌릴 수 없다. 실패 문구는 행 아래에, 다음 성공에 지운다. */
export function RequestRowActions({
  id,
  status,
}: {
  id: string;
  status: "new" | "done";
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const run = (action: () => Promise<ActionState>) =>
    start(async () => {
      const result = await action();
      setError(result.error);
    });
  const done = status === "done";
  return (
    <div>
      <div className={`flex gap-1.5 ${pending ? "opacity-60" : ""}`}>
        <button
          type="button"
          disabled={pending}
          className="btn-secondary btn-sm"
          onClick={() => run(() => setRequestStatus(id, done ? "new" : "done"))}
        >
          {done ? "다시 새 문의로" : "처리 완료"}
        </button>
        <button
          type="button"
          disabled={pending}
          className="btn-secondary btn-sm border-transparent text-ink-faint hover:border-rose-deep hover:text-rose-deep"
          onClick={() => {
            if (
              window.confirm("이 문의를 삭제하시겠습니까? 되돌릴 수 없습니다.")
            )
              run(() => deleteRequest(id));
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
