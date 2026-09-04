"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 경로가 바뀌면 열린 메뉴를 닫는다. 모바일에서 항목을 누르고 나면 덮개가 남는다.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-moss text-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-20 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} 홈`}
        >
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-full border border-signage/70 font-display text-[13px] leading-none text-signage lg:size-10"
          >
            달
          </span>
          <span className="font-display text-lg tracking-tight lg:text-xl">
            {site.name}
          </span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-1 text-[15px] transition-colors hover:text-signage ${
                      active ? "text-signage" : "text-paper/85"
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
                className="rounded-full border border-paper/35 px-4 py-1.5 text-[15px] transition-colors hover:border-signage hover:text-signage"
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
              className={`absolute left-0 block h-px w-6 bg-paper transition-transform duration-200 ${
                open ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-px w-6 bg-paper transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-paper transition-transform duration-200 ${
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
          className="border-t border-paper/15 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-paper/10 py-3.5 font-display text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`tel:${site.tel.replace(/-/g, "")}`}
                className="block py-3.5 text-signage"
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
