"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();

  const nav = [
    {
      href: "/today",
      label: t.nav.today,
      icon: "◉",
      match: (p: string) => p.startsWith("/today"),
    },
    {
      href: "/#roadbook-days",
      label: t.nav.days,
      icon: "☰",
      match: (p: string) => p.startsWith("/day"),
    },
    {
      href: "/map",
      label: t.nav.map,
      icon: "◎",
      match: (p: string) => p.startsWith("/map"),
    },
    {
      href: "/#budget",
      label: t.nav.budget,
      icon: "฿",
      match: () => false,
    },
    {
      href: "/print",
      label: t.nav.print,
      icon: "⎙",
      match: (p: string) => p.startsWith("/print"),
    },
  ] as const;

  return (
    <nav className="mobile-bottom-nav no-print" aria-label="Main">
      {nav.map((item) => {
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
