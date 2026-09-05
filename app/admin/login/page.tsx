import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { MoonMark } from "@/components/moon-mark";

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
    <div className="mx-auto max-w-sm px-5 pb-28 pt-16 lg:pt-24">
      <MoonMark phase={0.5} size={32} className="text-ink" />
      <h1 className="mt-6 text-h2">
        <span className="block font-thin tracking-tight">소식을 쓰려면</span>
        <span className="block font-black tracking-tighter">로그인</span>
      </h1>
      <p className="mt-3 text-small text-ink-soft">
        직원 계정으로만 들어올 수 있습니다.
      </p>
      <LoginForm next={next?.startsWith("/admin") ? next : "/admin"} />
    </div>
  );
}
