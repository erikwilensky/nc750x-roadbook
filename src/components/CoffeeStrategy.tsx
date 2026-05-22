import { TripDay } from "@/data/trip";
import { COFFEE_ROLE_LABELS, getDayCoffeeNote } from "@/lib/coffeeStops";
import { PlaceGuideLines } from "@/lib/placeGuide";
import { googleMapsSearchUrl } from "@/lib/maps";
import { CoffeeStopCard } from "./CoffeeStopCard";

type CoffeeStrategyProps = {
  day: TripDay;
  compact?: boolean;
};

function DepartureOptionBox({
  option,
}: {
  option: NonNullable<TripDay["departureOption"]>;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-cream/80 p-3 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Optional before departure
      </p>
      <p className="mt-1 font-medium text-forest">{option.name}</p>
      <p className="mt-1 text-sm text-muted">{option.note}</p>
      <PlaceGuideLines guide={option} compact />
      <a
        href={googleMapsSearchUrl(option.query)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary mt-2 inline-block text-xs"
      >
        Open in Google Maps
      </a>
    </div>
  );
}

export function CoffeeStrategy({ day, compact = false }: CoffeeStrategyProps) {
  const note = getDayCoffeeNote(day);

  if (day.coffeeStops.length === 0) return null;

  if (compact) {
    return (
      <div className="mt-3 border-t border-line pt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">
          Coffee strategy
        </p>
        <p className="mt-1 text-xs text-muted">{note}</p>
        <ul className="mt-2 space-y-1.5">
          {day.coffeeStops.map((stop, i) => (
            <li key={`${stop.role}-${stop.name}-${i}`} className="text-xs">
              <span className="font-medium text-forest">
                {COFFEE_ROLE_LABELS[stop.role]}:
              </span>{" "}
              {stop.name}
            </li>
          ))}
        </ul>
        {day.departureOption && (
          <p className="mt-2 text-xs text-muted">
            Optional before departure: {day.departureOption.name}
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-lg font-semibold">Coffee strategy</h3>
      </div>
      <div className="space-y-4 p-5">
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-muted">
          {note}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {day.coffeeStops.map((stop, i) => (
            <CoffeeStopCard
              key={`${stop.role}-${stop.name}-${i}`}
              stop={stop}
              loadPhotos={true}
            />
          ))}
        </div>
        {day.departureOption && (
          <DepartureOptionBox option={day.departureOption} />
        )}
      </div>
    </section>
  );
}
