import { TripDay } from "@/data/trip";
import { googleMapsSearchUrl } from "@/lib/maps";
import { formatBaht, formatKm } from "@/lib/money";
import { PlaceCard } from "./PlaceCard";

type PrintDayProps = {
  day: TripDay;
  withPhotos: boolean;
};

export function PrintDay({ day, withPhotos }: PrintDayProps) {
  const coffeeStops = day.places.filter((p) => p.type === "coffee");

  return (
    <section className="print-page bg-white p-8 text-ink">
      <header className="mb-4 border-b-2 border-forest pb-3">
        <p className="text-sm text-muted">
          Day {day.day} · {day.date}
        </p>
        <h2 className="text-2xl font-bold text-forest">{day.title}</h2>
        <p className="text-sm">
          {day.route} · {formatKm(day.distanceKm)}
        </p>
      </header>

      <div className="mb-4 grid grid-cols-4 gap-2 text-sm">
        <div>
          <span className="text-muted">Fuel</span>
          <p className="font-semibold">{formatBaht(day.costs.fuel)}</p>
        </div>
        <div>
          <span className="text-muted">Food</span>
          <p className="font-semibold">{formatBaht(day.costs.food)}</p>
        </div>
        <div>
          <span className="text-muted">Hotel</span>
          <p className="font-semibold">{formatBaht(day.costs.hotel)}</p>
        </div>
        <div>
          <span className="text-muted">Total</span>
          <p className="font-semibold">{formatBaht(day.costs.total)}</p>
        </div>
      </div>

      <div className="mb-4 space-y-2 text-sm">
        <p>
          <strong>Stay:</strong> {day.stay}
        </p>
        <p>
          <strong>Food:</strong> {day.foodTarget}
        </p>
        {coffeeStops.length > 0 && (
          <p>
            <strong>Coffee:</strong>{" "}
            {coffeeStops.map((c) => c.name).join(" · ")}
          </p>
        )}
      </div>

      {day.ridingNotes.length > 0 && (
        <div className="mb-4 text-sm">
          <strong>Riding notes:</strong>
          <ul className="mt-1 list-inside list-disc text-muted">
            {day.ridingNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={`mb-4 grid gap-2 sm:grid-cols-3 ${
          !withPhotos ? "print-hide-photos" : ""
        }`}
      >
        {day.places.slice(0, 6).map((place) => (
          <div key={place.id} className="text-xs">
            <PlaceCard place={place} loadPhotos={withPhotos} />
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-3 text-xs text-muted">
        <p className="mb-1 font-semibold text-forest">Map links</p>
        {day.places.map((place) => (
          <p key={place.id} className="break-all">
            {place.name}: {googleMapsSearchUrl(place.query)}
          </p>
        ))}
      </div>
    </section>
  );
}
