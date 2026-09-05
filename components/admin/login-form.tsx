"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * 이메일·비밀번호 로그인. 성공하면 전체 이동(location.assign) — 쿠키가 새로 실린 요청이어야
 * proxy.ts 가드가 통과시킨다. 회원가입 없음: 계정은 Supabase 대시보드에서만 만든다.
 */
export function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        const form = new FormData(e.currentTarget);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
        });
        if (error) {
          setError("이메일 또는 비밀번호가 맞지 않습니다.");
          setBusy(false);
          return;
        }
        window.location.assign(next);
      }}
    >
      <label className="block">
        <span className="text-caption text-ink-faint">이메일</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1 w-full border border-ink/25 bg-paper px-3 py-2.5 text-body outline-none focus:border-ink"
        />
      </label>
      <label className="block">
        <span className="text-caption text-ink-faint">비밀번호</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full border border-ink/25 bg-paper px-3 py-2.5 text-body outline-none focus:border-ink"
        />
      </label>
      {error && (
        <p role="alert" className="text-small text-rose-deep">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="btn-lift w-full border border-ink bg-ink px-7 py-3 text-small text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {busy ? "확인 중…" : "들어가기"}
      </button>
    </form>
  );
}
