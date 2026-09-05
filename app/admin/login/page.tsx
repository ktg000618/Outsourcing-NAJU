import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { MoonMark } from "@/components/moon-mark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "직원 로그인",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-14 lg:pt-20">
      {/* 관리 화면 폼과 같은 문법 — 캡션·굵은 제목·한 줄 설명. 카드 상자는 두지 않는다(사이트 어디에도 없다). */}
      <div className="flex items-center gap-3">
        <MoonMark phase={0.5} size={20} className="text-ink" />
        <p className="text-caption tracking-[0.04em] text-ink-faint">
          {site.name} · 직원용
        </p>
      </div>
      <h1 className="mt-4 text-h2 font-black tracking-tighter">
        소식 관리 로그인
      </h1>
      <p className="mt-2 text-small text-ink-soft">
        직원 계정으로만 들어올 수 있습니다. 계정은 관리자에게 받으세요.
      </p>
      <LoginForm next={next?.startsWith("/admin") ? next : "/admin"} />
    </div>
  );
}
