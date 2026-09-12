import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  REQUEST_SELECT,
  formatRequestDate,
  formatRequestTime,
  type ExperienceRequest,
} from "@/lib/requests";
import { RequestRowActions } from "@/components/admin/request-row-actions";
import { SectionEyebrow } from "@/components/section-eyebrow";

export const metadata: Metadata = {
  title: "예약 문의",
  robots: { index: false, follow: false },
};

/** 직원용 문의 목록. 새 문의가 위, 같은 상태 안에서는 최신순(RLS: authenticated 만 읽는다). */
export default async function AdminRequestsPage() {
  const supabase = await createClient();
  const [{ data }, { data: auth }] = await Promise.all([
    supabase
      .from("experience_requests")
      .select(REQUEST_SELECT)
      .order("status", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);
  const requests = (data ?? []) as ExperienceRequest[];
  const newCount = requests.filter((r) => r.status === "new").length;
  const doneCount = requests.length - newCount;

  return (
    <div className="page-top page-bottom mx-auto max-w-4xl px-5 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionEyebrow phase={0.1}>
            예약 문의 · {auth.user?.email}
          </SectionEyebrow>
          <h1 className="mt-3 text-h1 lg:text-h2-lg">
            <span className="font-thin tracking-tight">받은 </span>
            <span className="font-black tracking-tighter">예약 문의</span>
          </h1>
          <p className="mt-1 text-small text-ink-soft">
            새 문의 {newCount}
            {doneCount > 0 && ` · 처리 ${doneCount}`}
          </p>
        </div>
        <Link href="/admin" className="text-link">
          ← 소식 관리
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="mt-10 border border-dashed border-ink/20 px-6 py-14 text-center lg:mt-12">
          <p className="text-lead font-bold">아직 문의가 없습니다</p>
          <p className="mt-2 text-small text-ink-soft">
            손님이 사이트 「체험·매장」에서 보낸 예약 문의가 여기에 쌓입니다.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10 lg:mt-12">
          {requests.map((r) => (
            <li
              key={r.id}
              className={`grid gap-x-6 gap-y-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start ${
                r.status === "done" ? "opacity-70" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-caption tabular-nums text-ink-faint">
                  {formatRequestTime(r.created_at)}
                  <span
                    className={
                      r.status === "new"
                        ? "bg-ink/8 px-1.5 py-0.5 text-caption text-ink"
                        : "bg-ink/8 px-1.5 py-0.5 text-caption text-ink-faint"
                    }
                  >
                    {r.status === "new" ? "새 문의" : "처리 완료"}
                  </span>
                </p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-lead font-bold">{r.name}</span>
                  <a
                    href={`tel:${r.phone.replace(/-/g, "")}`}
                    className="text-link-inline tabular-nums"
                  >
                    {r.phone}
                  </a>
                </p>
                {(r.wanted_on || r.people !== null) && (
                  <p className="mt-1 text-small text-ink-soft">
                    {[
                      r.wanted_on && `희망 ${formatRequestDate(r.wanted_on)}`,
                      r.people !== null && `${r.people}명`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
                {r.message && (
                  <p className="mt-2 whitespace-pre-line text-small">
                    {r.message}
                  </p>
                )}
              </div>
              <RequestRowActions id={r.id} status={r.status} />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 text-caption text-ink-faint">
        연락한 뒤 「처리 완료」로 표시하면 아래로 내려갑니다. 삭제하면 되돌릴 수
        없습니다.
      </p>
    </div>
  );
}
