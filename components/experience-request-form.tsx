"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitExperienceRequest } from "@/app/visit/actions";
import { DateField } from "@/components/date-field";

type Props = {
  tel: string;
  telHref: string;
  /** 문자를 받을 휴대전화. 폰에서는 적은 내용을 그대로 문자창에 채워 보낸다 — 서버 없이도 접수가 된다. */
  smsNumber: string;
};

/**
 * 체험 예약 문의 폼. 전화 대신 남기는 길 — 실패하면 전화 링크가 바로 아래 선다.
 * 접수되면 폼 자리를 짧은 안내 한 줄로 바꾼다(다시 보낼 이유가 없다).
 */
export function ExperienceRequestForm({ tel, telHref, smsNumber }: Props) {
  const [state, formAction, pending] = useActionState(submitExperienceRequest, {
    error: null,
  });

  if (state.ok) {
    return (
      <div
        role="status"
        className="mt-8 border-y border-ink/10 py-5 text-small text-ink-soft"
      >
        <p className="text-body font-bold text-ink">접수했습니다.</p>
        <p className="mt-1">
          확인 후 연락드립니다. 급하시면{" "}
          <a href={telHref} className="text-link">
            {tel}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8">
      {/* 봇 덫 — 사람은 못 보고, 채우면 서버가 저장하지 않는다. */}
      <div aria-hidden className="sr-only">
        <label htmlFor="request-company">회사</label>
        <input
          id="request-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="request-name" className="field-label">
            이름
          </label>
          <input
            id="request-name"
            name="name"
            required
            maxLength={40}
            autoComplete="name"
            placeholder="예) 김나주"
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="request-phone" className="field-label">
            연락처
          </label>
          <input
            id="request-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-0000-0000"
            className="field-input tabular-nums"
          />
        </div>
        <div>
          <label htmlFor="request-date" className="field-label">
            희망 날짜 <span className="text-ink-faint">· 선택</span>
          </label>
          <DateField id="request-date" name="wanted_on" />
        </div>
        <div>
          <label htmlFor="request-people" className="field-label">
            인원 <span className="text-ink-faint">· 선택</span>
          </label>
          <input
            id="request-people"
            name="people"
            type="number"
            min={1}
            max={200}
            step={1}
            inputMode="numeric"
            placeholder="예) 20"
            className="field-input tabular-nums"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="request-message" className="field-label">
            문의 내용 <span className="text-ink-faint">· 선택</span>
          </label>
          <textarea
            id="request-message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="단체명, 희망 시간대, 궁금한 점을 적어 주세요."
            className="field-input"
          />
        </div>
      </div>
      {/* 개인정보 동의 — 이름·연락처를 저장하므로 동의 없이는 보내지 않는다. 자세한 것은 /privacy. */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-small text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 shrink-0 accent-ink"
        />
        <span>
          개인정보 수집·이용에 동의합니다. 이름과 연락처는 예약 문의 응대에만
          쓰고 접수일부터 90일 뒤 지웁니다.{" "}
          <Link href="/privacy" className="text-link-inline">
            개인정보처리방침
          </Link>
        </span>
      </label>
      {state.error && (
        <p role="alert" className="mt-4 text-caption text-rose-deep">
          {state.error}
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "보내는 중…" : "예약 문의 보내기"}
        </button>
        <a href={telHref} className="text-link self-start">
          전화로 문의 {tel}
        </a>
        <button
          type="button"
          className="text-link self-start sm:hidden"
          onClick={(e) => {
            const form = e.currentTarget.form;
            if (!form) return;
            const v = (name: string) =>
              (
                form.elements.namedItem(name) as HTMLInputElement | null
              )?.value.trim() ?? "";
            const lines = [
              "[체험 예약 문의]",
              v("name") && `이름: ${v("name")}`,
              v("phone") && `연락처: ${v("phone")}`,
              v("wanted_on") && `희망 날짜: ${v("wanted_on")}`,
              v("people") && `인원: ${v("people")}명`,
              v("message") && `문의: ${v("message")}`,
            ].filter(Boolean);
            window.location.href = `sms:${smsNumber.replace(/-/g, "")}?body=${encodeURIComponent(lines.join("\n"))}`;
          }}
        >
          문자로 보내기
        </button>
      </div>
    </form>
  );
}
