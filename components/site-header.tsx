"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { MoonMark } from "./moon-mark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 경로가 바뀌면 열린 메뉴를 닫는다. 모바일에서 항목을 누르고 나면 덮개가 남는다.
  // effect 가 아니라 렌더 중 조정이다 — effect 로 setState 하면 렌더가 한 번 더 돈다.
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  // ESC 로 닫는다. 키보드는 외부 시스템이라 effect 가 맞는 자리이고,
  // setState 는 이벤트 콜백 안에서만 부른다(effect 본문에서 직접 부르지 않는다).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* 맨 위 2px 달노랑 선 — 스크롤 후에도 남는 유일한 브랜드 서명. 넓게 칠하지 않는다. */}
      <header className="sticky top-0 z-50 border-b border-ink/10 border-t-2 border-t-moon bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-20 lg:px-8">
          {/*
          엠블럼(원) + 조판 상호. 세로 락업은 흰 글자+민트 외곽선이라 흰 헤더 위에선 64/80px 로
          키워도 안 읽혔다(실측). 락업은 어두운 면(푸터) 전용 — 리더 결정.
        */}
        <Link href="/" aria-label={`${site.name} 홈`} className="flex items-center gap-3 lg:gap-4">
          <Image
            src="/brand/emblem.png"
            alt=""
            width={640}
            height={719}
            priority
            className="h-10 w-auto lg:h-12"
          />
          <span className="text-lead font-bold tracking-tight lg:text-h3">{site.name}</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative pb-1 text-small transition-colors after:absolute after:left-1/2 after:top-full after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-mint-deep after:transition-opacity after:duration-200 ${
                        active
                          ? "text-ink after:opacity-100"
                          : "text-ink-soft after:opacity-0 hover:text-ink hover:after:opacity-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              {/* 외곽선 상자에 숫자만 두면 입력창으로 읽혔다(리더 지적). 하단 고정 바와 같은
                  전화 아이콘 + 먹색 채움 — 사이트가 이미 쓰는 CTA 언어다. */}
              <li className="ml-2">
                <a
                  aria-label={`전화 걸기 ${site.tel}`}
                  href={`tel:${site.tel.replace(/-/g, "")}`}
                  className="btn-lift inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-small tabular-nums tracking-tight text-paper transition-colors hover:bg-ink-soft"
                >
                  <svg
                    aria-hidden
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4.5 5.5c0-.6.4-1 1-1h2.6c.4 0 .8.3.9.7l1 3c.1.4 0 .8-.3 1l-1.4 1.2a12 12 0 0 0 5.3 5.3l1.2-1.4c.2-.3.6-.4 1-.3l3 1c.4.1.7.5.7.9v2.6c0 .6-.4 1-1 1A15.5 15.5 0 0 1 4.5 5.5Z"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {site.tel}
                </a>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-3 grid size-11 place-items-center lg:hidden"
          >
            <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
            <span aria-hidden className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-200 ${
                  open ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-px w-6 bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-200 ${
                  open ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </header>
      {/*
        모바일 메뉴 — 전면 오버레이. 목록 다섯 줄이 아니라 이 사이트의 활자로 만든 화면이다.
        header 밖에 둔다: header 의 backdrop-blur 가 fixed 자손의 containing block 이 되어
        top-16/bottom-0 이 헤더 66px 안에서 계산됐다(높이 0, 실측).
        항상 렌더하고 hidden 만 토글한다: 조건부 렌더면 닫힌 상태에서 aria-controls 가
        존재하지 않는 id 를 가리킨다.
      */}
      <nav
        id="mobile-nav"
        aria-label="주요 메뉴"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-[45] flex flex-col overflow-y-auto bg-paper lg:hidden"
      >
        <ul className="flex flex-col px-5 pt-6">
          {nav.map((item, i) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-b border-ink/10">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-4 py-5 text-h2 tracking-tight ${
                    active ? "font-black" : "font-thin"
                  }`}
                >
                  <MoonMark
                    phase={(i + 1) / nav.length}
                    size={18}
                    className="shrink-0 text-ink"
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto px-5 pb-10 pt-8">
          <p className="text-caption text-ink-faint">주문·체험 문의</p>
          <a
            aria-label={`전화 걸기 ${site.tel}`}
            href={`tel:${site.tel.replace(/-/g, "")}`}
            className="mt-1 block font-black tracking-tighter tabular-nums text-h1"
          >
            {site.tel}
          </a>
          <p className="mt-2 text-small text-ink-soft">{site.hours}</p>
          {site.instagramUrl && (
            <a
              href={site.instagramUrl}
              rel="noreferrer"
              target="_blank"
              className="link-draw mt-5 inline-block text-small text-ink-soft"
            >
              인스타그램<span className="sr-only"> (새 창)</span>
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
