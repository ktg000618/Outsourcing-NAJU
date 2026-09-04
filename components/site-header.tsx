"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

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

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:h-26 lg:px-8">
        <Link href="/" aria-label={`${site.name} 홈`} className="block">
          <Image
            src="/brand/wordmark.png"
            alt={site.name}
            width={235}
            height={269}
            priority
            className="h-14 w-auto lg:h-[4.5rem]"
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
                    className={`border-b pb-1 text-[15px] transition-colors ${
                      active
                        ? "border-mint-deep text-ink"
                        : "border-transparent text-ink-soft hover:text-ink"
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
                className="text-[15px] tracking-tight text-ink-soft transition-colors hover:text-ink"
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
          className="-mr-2 grid size-10 place-items-center lg:hidden"
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

      {open && (
        <nav
          id="mobile-nav"
          aria-label="주요 메뉴"
          className="border-t border-ink/10 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-ink/8 py-4 text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="block py-4 text-lg text-mint-link"
              >
                전화 {site.tel}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
