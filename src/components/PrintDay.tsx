import { TripDayEnriched, getDayMap } from "@/data/trip";
import { makeWeatherSearchUrl } from "@/lib/weatherLinks";
import {
  COFFEE_ROLE_LABELS,
  coffeePhotoPlaceholder,
  getDayCoffeeNote,
} from "@/lib/coffeeStops";
import { makeGoogleMapsDayRouteUrl } from "@/lib/mapLinks";
import { buildPlannedMapStops } from "@/lib/mapStops";
import { googleMapsSearchUrl } from "@/lib/maps";
import { PrintGuideLines } from "@/lib/placeGuide";
import { formatBaht, formatKm } from "@/lib/money";
import { PlaceCard } from "./PlaceCard";

type PrintDayProps = {
  day: TripDayEnriched;
  withPhotos: boolean;
};

export function PrintDay({ day, withPhotos }: PrintDayProps) {
  const note = getDayCoffeeNote(day);
  const dayMap = getDayMap(day.day);
  const plannedStops = buildPlannedMapStops(day);
  const dayRouteUrl = makeGoogleMapsDayRouteUrl(day);

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
        <p className="mt-1 text-sm">
          <strong>Difficulty:</strong> {day.difficulty.rating}/5 —{" "}
          {day.difficulty.label}
        </p>
        <p className="text-xs text-muted">{day.difficulty.summary}</p>
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
        <div className="rounded-lg border border-line p-3">
          <p className="font-semibold text-forest">Food plan</p>
          <p className="mt-1">
            <strong>Primary:</strong> {day.food.primary.name}
          </p>
          <PrintGuideLines guide={day.food.primary} />
          {day.food.backups.length > 0 && (
            <div className="mt-2 border-t border-line pt-2">
              <p className="text-xs font-semibold uppercase text-muted">
                Backups
              </p>
              {day.food.backups.map((b) => (
                <div key={b.name} className="mt-2">
                  <p>
                    <strong>{b.name}</strong>
                  </p>
                  <PrintGuideLines guide={b} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {day.coffeeStops.length > 0 && (
        <div className="mb-4 rounded-lg border border-line p-3 text-sm">
          <p className="font-semibold text-forest">Coffee strategy</p>
          <p className="mt-1 text-muted">{note}</p>
          <ul className="mt-3 space-y-3">
            {day.coffeeStops.map((stop, i) => (
              <li
                key={`${stop.role}-${stop.name}-${i}`}
                className="border-b border-line pb-2 last:border-0"
              >
                <p>
                  <strong>{COFFEE_ROLE_LABELS[stop.role]}:</strong> {stop.name}
                </p>
                <p className="text-muted">{stop.note}</p>
                <PrintGuideLines guide={stop} />
                <p className="mt-1 text-xs italic">
                  {coffeePhotoPlaceholder(stop)}
                </p>
                <p className="mt-1 break-all text-xs">
                  {googleMapsSearchUrl(stop.query)}
                </p>
              </li>
            ))}
          </ul>
          {day.departureOption && (
            <div className="mt-3 border-t border-dashed border-line pt-2">
              <p className="text-xs font-semibold uppercase text-muted">
                Optional before departure
              </p>
              <p>
                <strong>{day.departureOption.name}</strong>
              </p>
              <p className="text-muted">{day.departureOption.note}</p>
              <PrintGuideLines guide={day.departureOption} />
              <p className="mt-1 break-all text-xs">
                {googleMapsSearchUrl(day.departureOption.query)}
              </p>
            </div>
          )}
        </div>
      )}

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

      <div className="mb-4 rounded-lg border border-line p-3 text-sm">
        <p className="font-semibold text-forest">Do not detour</p>
        <p className="mt-1 font-medium">{day.doNotDetour.title}</p>
        <p className="text-muted">{day.doNotDetour.message}</p>
        {day.doNotDetour.exceptions && (
          <p className="mt-1 text-xs text-muted">{day.doNotDetour.exceptions}</p>
        )}
      </div>

      <div className="mb-4 rounded-lg border border-line p-3 text-sm">
        <p className="font-semibold text-forest">Fuel strategy</p>
        <p className="mt-1">{day.fuelStrategy.plan}</p>
        <p className="text-xs text-muted">{day.fuelStrategy.caution}</p>
        <p className="mt-1 text-xs">
          Est. {day.fuelStrategy.estimatedLiters.toFixed(1)} L ·{" "}
          {formatBaht(day.fuelStrategy.estimatedCost)} · Range:{" "}
          {day.fuelStrategy.rangeConcern}
        </p>
      </div>

      <div className="mb-4 rounded-lg border border-line p-3 text-sm">
        <p className="font-semibold text-forest">Weather</p>
        <p className="text-muted">{day.weather.summary}</p>
        <ul className="mt-2 space-y-1 text-xs break-all">
          {day.weather.checkpoints.map((cp) => (
            <li key={cp.label}>
              {cp.label} ({cp.name}): {makeWeatherSearchUrl(cp.query)}
            </li>
          ))}
        </ul>
      </div>

      <div className="print-map-placeholder mb-4 rounded-lg border border-line p-3 text-sm">
        <p className="font-semibold text-forest">Day map (print)</p>
        <p className="mt-1 text-muted">
          {dayMap.start.name} → {dayMap.end.name} · route waypoints on map
          links below
        </p>
        <p className="mt-2 break-all text-xs">
          <strong>Google Maps day route:</strong> {dayRouteUrl}
        </p>
        <p className="mt-3 text-xs font-semibold uppercase text-muted">
          Planned stop order
        </p>
        <ol className="mt-1 list-decimal list-inside space-y-1">
          {plannedStops.map((stop) => (
            <li key={stop.id}>
              {stop.name}{" "}
              <span className="text-muted">({stop.type})</span>
            </li>
          ))}
        </ol>
      </div>

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
        <p className="mt-1 font-semibold text-forest">Food & coffee maps</p>
        <p className="break-all">
          {day.food.primary.name}:{" "}
          {googleMapsSearchUrl(day.food.primary.query)}
        </p>
        {day.food.backups.map((b) => (
          <p key={b.name} className="break-all">
            Backup {b.name}: {googleMapsSearchUrl(b.query)}
          </p>
        ))}
        {day.coffeeStops.map((stop, i) => (
          <p key={`coffee-map-${i}`} className="break-all">
            {COFFEE_ROLE_LABELS[stop.role]} — {stop.name}:{" "}
            {googleMapsSearchUrl(stop.query)}
          </p>
        ))}
      </div>
    </section>
  );
}
