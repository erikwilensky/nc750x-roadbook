"use client";

import Link from "next/link";
import { PrintView } from "@/components/PrintView";
import { LanguageToggle } from "@/i18n/LanguageToggle";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTripData } from "@/i18n/useTripData";

export default function PrintPage() {
  const { t } = useLocale();
  const trip = useTripData();

  return (
    <div className="min-h-screen bg-cream">
      <nav className="no-print border-b border-line bg-paper px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link href="/" className="font-semibold text-forest">
            ← {t.nav.dashboard}
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">{t.print.title}</span>
            <LanguageToggle />
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-4 py-6">
        <PrintView />
      </main>
      <footer className="no-print py-4 text-center text-xs text-muted">
        {trip.title} — {t.print.subtitle}
      </footer>
    </div>
  );
}
