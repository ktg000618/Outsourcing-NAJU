import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { SiteNotice } from "@/lib/notice";
import { NoticeForm } from "@/components/admin/notice-form";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { saveNotice } from "../actions";

export const metadata: Metadata = {
  title: "공지 띠",
  robots: { index: false, follow: false },
};

/** 직원용. 꺼져 있어도 저장된 문구를 보여 준다(RLS: authenticated 는 전부). */
export default async function AdminNoticePage() {
  const supabase = await createClient();
  const [{ data }, { data: auth }] = await Promise.all([
    supabase
      .from("site_notice")
      .select("text, enabled")
      .eq("id", 1)
      .maybeSingle(),
    supabase.auth.getUser(),
  ]);
  const notice = (data ?? { text: "", enabled: false }) as SiteNotice;

  return (
    <div className="page-top page-bottom mx-auto max-w-4xl px-5 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionEyebrow phase={0.1}>
            공지 띠 · {auth.user?.email}
          </SectionEyebrow>
          <h1 className="mt-3 text-h1 lg:text-h2-lg">
            <span className="font-thin tracking-tight">머리 아래 </span>
            <span className="font-black tracking-tighter">공지 한 줄</span>
          </h1>
          <p className="mt-1 text-small text-ink-soft">
            휴무·명절 배송 마감처럼 며칠만 보일 안내. 지금{" "}
            {notice.enabled ? "켜져" : "꺼져"} 있습니다.
          </p>
        </div>
        <Link href="/admin" className="text-link">
          ← 소식 관리
        </Link>
      </div>
      <NoticeForm action={saveNotice} initial={notice} />
    </div>
  );
}
