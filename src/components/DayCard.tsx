"use client";

import Link from "next/link";
import { TripDayEnriched } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatBaht, formatKm } from "@/lib/money";
import { CoffeeStrategy } from "./CoffeeStrategy";
import { DifficultyBadge } from "./DifficultyBadge";

type DayCardProps = {
  day: TripDayEnriched;
};

export function DayCard({ day }: DayCardProps) {
  const { t } = useLocale();

  return (
    <article className="card overflow-hidden transition hover:shadow-lg hover:border-gold/50">
      <Link href={`/day/${day.day}`} className="block">
        <div className="flex items-start justify-between gap-2 bg-forest px-4 py-3 text-paper">
          <div>
            <p className="text-xs text-gold">
              {t.common.day} {day.day} · {day.date}
            </p>
            <h3 className="font-semibold leading-snug">{day.title}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-forest2 px-2 py-1 text-xs font-medium">
            {formatBaht(day.costs.total)}
          </span>
        </div>
        <div className="space-y-2 p-4 pb-2">
          <p className="text-sm text-muted">{day.route}</p>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span>{formatKm(day.distanceKm)}</span>
            <span>
              {t.common.overnight}: {day.overnight}
            </span>
          </div>
          <DifficultyBadge difficulty={day.difficulty} compact />
          <CoffeeStrategy day={day} compact />
        </div>
      </Link>
      <div className="flex flex-wrap gap-2 px-4 pb-4">
        <Link href={`/day/${day.day}`} className="btn-primary text-xs">
          {t.common.viewDay}
        </Link>
        <Link href={`/today?day=${day.day}`} className="btn-secondary text-xs">
          {t.nav.today}
        </Link>
      </div>
    </article>
  );
}
