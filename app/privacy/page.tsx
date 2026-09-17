import type { Metadata } from "next";
import Link from "next/link";
import { SectionHead } from "@/components/section-head";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.name}가 체험 예약 문의로 받는 이름·연락처를 어떻게 쓰고 언제 지우는지.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * 개인정보처리방침 — 이 사이트가 개인정보를 받는 자리는 체험 예약 문의 폼 하나뿐이다.
 * 그래서 방침도 그 한 가지만 적는다. 값(항목·기간·담당)은 코드와 DB 가 실제로 하는 것과 같아야 하며,
 * 보유기간 90일은 supabase/migrations 의 직원 허용 목록 마이그레이션(pg_cron 삭제 주기)와 같은 숫자다(한쪽만 바꾸지 말 것).
 */
const sections: { title: string; body: string[] }[] = [
  {
    title: "받는 정보",
    body: [
      "체험 예약 문의 폼: 이름, 연락처(전화번호), 희망 날짜·인원·문의 내용(선택).",
      "그 밖의 페이지는 개인정보를 받지 않습니다. 방문 기록을 남기는 분석 도구도 쓰지 않습니다.",
    ],
  },
  {
    title: "쓰는 목적",
    body: [
      "예약 문의에 답하고 일정을 잡기 위해서만 씁니다. 광고·마케팅에 쓰지 않고, 다른 곳에 주지 않습니다.",
    ],
  },
  {
    title: "보관 기간",
    body: [
      "접수일부터 90일이 지나면 자동으로 지웁니다. 처리가 끝난 문의는 그 전에 직원이 지울 수 있습니다.",
      "「문자로 보내기」로 보낸 내용은 사이트에 저장되지 않고 매장 휴대전화로만 갑니다.",
    ],
  },
  {
    title: "보관 장소와 위탁",
    body: [
      "문의 내용은 Supabase(데이터베이스, 서버 소재지 대한민국 서울)에 저장하고, 웹사이트는 Vercel(미국)이 호스팅합니다. 두 곳은 저장·전송만 맡고 내용을 다른 목적에 쓰지 않습니다.",
    ],
  },
  {
    title: "본인의 권리",
    body: [
      "남긴 문의를 확인하거나 지우고 싶으시면 아래 연락처로 말씀해 주세요. 확인 즉시 처리합니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="page-top mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHead
          as="h1"
          phase={0.1}
          eyebrow="안내"
          title={{ thin: "개인정보", black: "처리방침" }}
          lead="이 사이트가 개인정보를 받는 자리는 체험 예약 문의 하나뿐입니다. 무엇을 받고, 어디에 쓰고, 언제 지우는지 적습니다."
        />
      </section>

      <section className="page-bottom mx-auto max-w-6xl px-5 pt-12 lg:px-8 lg:pt-16">
        <dl className="max-w-prose divide-y divide-ink/10 border-y border-ink/10">
          {sections.map((s) => (
            <div
              key={s.title}
              className="grid gap-2 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="font-bold">{s.title}</dt>
              <dd className="space-y-2 text-small text-ink-soft">
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </dd>
            </div>
          ))}
          <div className="grid gap-2 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
            <dt className="font-bold">책임자</dt>
            <dd className="text-small text-ink-soft">
              <p>
                {site.legalName} 대표 {site.owner}
              </p>
              <p className="mt-1 tabular-nums">
                <a href={site.telHref} className="text-link-inline">
                  {site.tel}
                </a>
                {site.email && (
                  <>
                    {" · "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-link-inline"
                    >
                      {site.email}
                    </a>
                  </>
                )}
              </p>
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-caption text-ink-faint">
          시행일 2026년 9월 17일
        </p>
        <Link href="/visit" className="text-link mt-8">
          체험 예약 문의로 돌아가기
        </Link>
      </section>
    </>
  );
}
