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
    /* 맨 위 2px 달노랑 선 — 스크롤 후에도 남는 유일한 브랜드 서명. 넓게 칠하지 않는다. */
    <header className="sticky top-0 z-50 border-b border-ink/10 border-t-2 border-t-moon bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-24 lg:px-8">
        {/*
          로고는 폭에 따라 구조가 다르다.
          · 모바일: 엠블럼(원) + 조판 상호. 세로 락업은 56px 에서 흰 글자+민트 외곽선이
            흰 바탕에 녹아 안 읽힌다(실측). 원은 40px 에서도 형태가 서고 글자는 글자로.
          · PC: 기존 세로 락업 80px (리더 지시). 판독성은 여전히 약하지만 리더 판단 대기.
        */}
        <Link href="/" aria-label={`${site.name} 홈`} className="flex items-center gap-3 lg:hidden">
          <Image
            src="/brand/emblem.png"
            alt=""
            width={640}
            height={719}
            priority
            className="h-10 w-auto"
          />
          <span className="text-lead font-bold tracking-tight">{site.name}</span>
        </Link>
        <Link href="/" aria-label={`${site.name} 홈`} className="hidden lg:block">
          <Image
            src="/brand/wordmark.png"
            alt={site.name}
            width={640}
            height={735}
            priority
            className="h-20 w-auto"
          />
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
            <li>
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="text-small tracking-tight text-ink-soft transition-colors hover:text-ink"
              >
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

      {/*
        모바일 메뉴 — 전면 오버레이. 목록 다섯 줄이 아니라 이 사이트의 활자로 만든 화면이다.
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
    </header>
  );
}
