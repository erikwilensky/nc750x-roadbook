import type { TripDayEnriched } from "@/data/trip";
import { getDayMap } from "@/data/trip";
import { DifficultyBadge } from "./DifficultyBadge";
import { formatBaht, formatKm } from "@/lib/money";

type TodayHeroCardProps = {
  day: TripDayEnriched;
  completed?: boolean;
};

export function TodayHeroCard({ day, completed }: TodayHeroCardProps) {
  const dayMap = getDayMap(day.day);

  return (
    <header className="today-hero card overflow-hidden">
      <div className="bg-forest px-4 py-4 text-paper sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Today
        </p>
        <p className="mt-1 text-lg sm:text-xl">
          Day {day.day} · {day.date}
          {completed && (
            <span className="ml-2 rounded-full bg-gold/30 px-2 py-0.5 text-xs">
              Completed
            </span>
          )}
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
          {day.route}
        </h1>
        <p className="mt-2 text-sm text-gold/90">
          {formatKm(day.distanceKm)} · {dayMap.start.name} → {dayMap.end.name}
        </p>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <DifficultyBadge difficulty={day.difficulty} compact />
        <div className="flex items-center justify-between rounded-xl bg-cream px-3 py-2">
          <span className="text-sm text-muted">Daily budget</span>
          <span className="text-xl font-bold text-forest">
            {formatBaht(day.costs.total)}
          </span>
        </div>
      </div>
    </header>
  );
}
