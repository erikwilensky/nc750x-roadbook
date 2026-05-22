"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/today",
    label: "Today",
    icon: "◉",
    match: (p: string) => p.startsWith("/today"),
  },
  {
    href: "/#roadbook-days",
    label: "Days",
    icon: "☰",
    match: (p: string) => p.startsWith("/day"),
  },
  {
    href: "/map",
    label: "Map",
    icon: "◎",
    match: (p: string) => p.startsWith("/map"),
  },
  {
    href: "/#budget",
    label: "Budget",
    icon: "฿",
    match: () => false,
  },
  {
    href: "/print",
    label: "Print",
    icon: "⎙",
    match: (p: string) => p.startsWith("/print"),
  },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav no-print" aria-label="Main">
      {NAV.map((item) => {
        const active = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "active" : undefined}
          >
            <span className="nav-icon" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
