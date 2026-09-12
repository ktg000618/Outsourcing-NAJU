"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ActionState } from "@/app/admin/actions";
import { NOTICE_MAX, type SiteNotice } from "@/lib/notice-shared";

type Props = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  initial: SiteNotice;
};

/** 공지 띠 한 줄 — 글과 켜기 스위치뿐. 글 폼과 같은 부품(field-input·btn-primary)을 쓴다. */
export function NoticeForm({ action, initial }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const [text, setText] = useState(initial.text);

  return (
    <form action={formAction} className="mt-8 max-w-2xl lg:mt-12">
      <label className="block">
        <span className="block text-body font-bold">띄울 문구</span>
        <span className="mt-1 block text-caption text-ink-faint">
          한 줄이면 됩니다. 전화번호를 적으면 눌러서 걸 수 있게 됩니다.
        </span>
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={NOTICE_MAX}
          rows={2}
          placeholder="예: 9월 24일(수)~26일(금)은 추석 연휴로 쉽니다. 택배는 22일 주문분까지 연휴 전에 보냅니다."
          className="field-input mt-3 field-sizing-content"
        />
        <span className="mt-1 block text-right text-caption tabular-nums text-ink-faint">
          {text.length} / {NOTICE_MAX}
        </span>
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3 border-t border-ink/10 py-5">
        <input
          type="checkbox"
          name="enabled"
          defaultChecked={initial.enabled}
          className="mt-1 size-5 accent-ink"
        />
        <span>
          <span className="block text-body font-bold">사이트에 띄우기</span>
          <span className="block text-caption text-ink-faint">
            끄면 문구는 남고 손님에게는 보이지 않습니다. 다음에 다시 켜면
            됩니다.
          </span>
        </span>
      </label>

      {state.error && (
        <p role="alert" className="mb-3 text-small text-rose-deep">
          {state.error}
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary flex-1 sm:flex-none"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
        <Link href="/admin" className="btn-secondary w-auto shrink-0">
          취소
        </Link>
      </div>
      <p className="mt-3 text-caption text-ink-faint">
        저장하면 모든 페이지 머리 아래에 바로 반영됩니다.
      </p>
    </form>
  );
}
