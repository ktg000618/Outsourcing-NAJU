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

  const label = "mb-2 block text-caption tracking-[0.04em] text-ink-faint";
  const field =
    "w-full border border-ink/20 bg-paper px-3.5 py-3 text-body outline-none transition-colors placeholder:text-ink/30 focus:border-ink";

  return (
    <form
      className="mt-8 space-y-5"
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
      <div>
        <label htmlFor="login-email" className={label}>
          이메일
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          placeholder="name@example.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="login-password" className={label}>
          비밀번호
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={field}
        />
      </div>
      {error && (
        <p role="alert" className="text-small text-rose-deep">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="btn-lift w-full border border-ink bg-ink px-7 py-3.5 text-small text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {busy ? "확인 중…" : "들어가기"}
      </button>
    </form>
  );
}
