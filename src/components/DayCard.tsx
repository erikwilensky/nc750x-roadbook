import Link from "next/link";
import { TripDay } from "@/data/trip";
import { formatBaht, formatKm } from "@/lib/money";

type DayCardProps = {
  day: TripDay;
};

export function DayCard({ day }: DayCardProps) {
  return (
    <Link
      href={`/day/${day.day}`}
      className="card block overflow-hidden transition hover:shadow-lg hover:border-gold/50"
    >
      <div className="flex items-start justify-between gap-2 bg-forest px-4 py-3 text-paper">
        <div>
          <p className="text-xs text-gold">
            Day {day.day} · {day.date}
          </p>
          <h3 className="font-semibold leading-snug">{day.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-forest2 px-2 py-1 text-xs font-medium">
          {formatBaht(day.costs.total)}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-sm text-muted">{day.route}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span>{formatKm(day.distanceKm)}</span>
          <span>Overnight: {day.overnight}</span>
        </div>
        <span className="btn-primary mt-2 inline-block text-xs">
          View day
        </span>
      </div>
    </Link>
  );
}
