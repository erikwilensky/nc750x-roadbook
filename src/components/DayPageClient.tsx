"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DayDetail } from "@/components/DayDetail";
import { useLocale } from "@/i18n/LocaleProvider";
import { useDayByNumber, useTripData } from "@/i18n/useTripData";
type DayPageClientProps = {
  dayNumber: number;
};

export function DayPageClient({ dayNumber }: DayPageClientProps) {
  const { t } = useLocale();
  const trip = useTripData();
  const day = useDayByNumber(dayNumber);

  if (!day) return null;

  const prev = dayNumber > 1 ? dayNumber - 1 : null;
  const next = dayNumber < trip.days.length ? dayNumber + 1 : null;

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-sm text-muted hover:text-forest">
          {t.common.backToDashboard}
        </Link>
        <div className="flex gap-2">
          {prev && (
            <Link href={`/day/${prev}`} className="btn-secondary text-sm">
              {t.common.day} {prev}
            </Link>
          )}
          {next && (
            <Link href={`/day/${next}`} className="btn-secondary text-sm">
              {t.common.day} {next}
            </Link>
          )}
        </div>
      </div>
      <DayDetail day={day} />
    </AppShell>
  );
}
