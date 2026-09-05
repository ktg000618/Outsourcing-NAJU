"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** 직원 화면(/admin)에서는 손님용 하단 바를 숨긴다 — 저장 줄이 그 자리에 고정된다. */
export function MobileActionBarGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
