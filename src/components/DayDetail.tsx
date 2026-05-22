import { TripDay } from "@/data/trip";
import { googleMapsDirectionsUrl } from "@/lib/maps";
import { formatBaht, formatKm } from "@/lib/money";
import { CostPill } from "./CostPill";
import { PhotoGrid } from "./PhotoGrid";

type DayDetailProps = {
  day: TripDay;
};

function getHeroPlace(day: TripDay) {
  return (
    day.places.find((p) => p.type === "route") ??
    day.places.find((p) => p.type === "viewpoint") ??
    day.places[0]
  );
}

function getRouteParts(route: string): [string, string] | null {
  const parts = route.split("→").map((s) => s.trim());
  if (parts.length >= 2) {
    return [parts[0], parts[parts.length - 1]];
  }
  return null;
}

export function DayDetail({ day }: DayDetailProps) {
  const heroPlace = getHeroPlace(day);
  const routeParts = getRouteParts(day.route);
  const coffeeStops = day.places.filter((p) => p.type === "coffee");
  const hotel = day.places.find((p) => p.type === "hotel");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <div className="space-y-4">
          <section className="card overflow-hidden">
            <div className="card-header">
              <p className="text-sm text-gold">
                Day {day.day} · {day.date}
              </p>
              <h2 className="text-xl font-bold">{day.title}</h2>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm font-medium text-forest">Route</p>
                <p className="text-muted">{day.route}</p>
                <p className="mt-1 text-sm">{formatKm(day.distanceKm)}</p>
              </div>

              {(day.departureTarget || day.arrivalTarget) && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {day.departureTarget && (
                    <div>
                      <p className="text-xs uppercase text-muted">Depart</p>
                      <p className="font-medium">{day.departureTarget}</p>
                    </div>
                  )}
                  {day.arrivalTarget && (
                    <div>
                      <p className="text-xs uppercase text-muted">Arrive</p>
                      <p className="font-medium">{day.arrivalTarget}</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-forest">Overnight</p>
                <p>{day.overnight}</p>
                <p className="text-sm text-muted">Stay: {day.stay}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <CostPill label="Fuel" amount={day.costs.fuel} />
                <CostPill label="Food" amount={day.costs.food} />
                <CostPill label="Hotel" amount={day.costs.hotel} />
                <CostPill
                  label="Day total"
                  amount={day.costs.total}
                  variant="total"
                />
              </div>

              {routeParts && (
                <a
                  href={googleMapsDirectionsUrl(routeParts[0], routeParts[1])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary block w-full text-center"
                >
                  Open route map
                </a>
              )}
            </div>
          </section>

          <section className="card p-5">
            <h3 className="mb-2 font-semibold text-forest">Food target</h3>
            <p className="font-medium">{day.foodTarget}</p>
            {day.foodBackups.length > 0 && (
              <ul className="mt-2 list-inside list-disc text-sm text-muted">
                {day.foodBackups.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>

          {coffeeStops.length > 0 && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">Coffee stops</h3>
              <ul className="space-y-1 text-sm">
                {coffeeStops.map((c) => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            </section>
          )}

          {hotel && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">Accommodation</h3>
              <p>{hotel.name}</p>
            </section>
          )}

          {day.highlights.length > 0 && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">Highlights</h3>
              <ul className="list-inside list-disc text-sm text-muted">
                {day.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {day.ridingNotes.length > 0 && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">Riding notes</h3>
              <ul className="space-y-2 text-sm text-muted">
                {day.ridingNotes.map((n) => (
                  <li key={n} className="border-l-2 border-gold pl-3">
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <PhotoGrid
          places={day.places}
          heroPlace={heroPlace}
          loadPhotos={true}
        />
      </div>
    </div>
  );
}
