"use client";

import Link from "next/link";
import { TripDayEnriched } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatMessage } from "@/i18n/messages";
import { DifficultyBadge } from "./DifficultyBadge";
import { WeatherPanel } from "./WeatherPanel";
import { FuelStrategyCard } from "./FuelStrategyCard";
import { DoNotDetourCard } from "./DoNotDetourCard";
import { googleMapsDirectionsUrl } from "@/lib/maps";
import { formatKm } from "@/lib/money";
import { CoffeeStrategy } from "./CoffeeStrategy";
import { FoodPlan } from "./FoodPlan";
import { CostPill } from "./CostPill";
import { PhotoGrid } from "./PhotoGrid";

type DayDetailProps = {
  day: TripDayEnriched;
};

function getHeroPlace(day: TripDayEnriched) {
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
  const { t } = useLocale();
  const heroPlace = getHeroPlace(day);
  const routeParts = getRouteParts(day.route);
  const hotel = day.places.find((p) => p.type === "hotel");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <div className="space-y-4">
          <section className="card overflow-hidden">
            <div className="card-header">
              <p className="text-sm text-gold">
                {t.common.day} {day.day} · {day.date}
              </p>
              <h2 className="text-xl font-bold">{day.title}</h2>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-sm font-medium text-forest">{t.common.route}</p>
                <p className="text-muted">{day.route}</p>
                <p className="mt-1 text-sm">{formatKm(day.distanceKm)}</p>
              </div>

              {(day.departureTarget || day.arrivalTarget) && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {day.departureTarget && (
                    <div>
                      <p className="text-xs uppercase text-muted">{t.common.depart}</p>
                      <p className="font-medium">{day.departureTarget}</p>
                    </div>
                  )}
                  {day.arrivalTarget && (
                    <div>
                      <p className="text-xs uppercase text-muted">{t.common.arrive}</p>
                      <p className="font-medium">{day.arrivalTarget}</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-forest">{t.common.overnight}</p>
                <p>{day.overnight}</p>
                <p className="text-sm text-muted">
                  {t.common.stay}: {day.stay}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <CostPill label={t.common.fuel} amount={day.costs.fuel} />
                <CostPill label={t.common.food} amount={day.costs.food} />
                <CostPill label={t.common.hotel} amount={day.costs.hotel} />
                <CostPill
                  label={t.common.dayTotal}
                  amount={day.costs.total}
                  variant="total"
                />
              </div>

              <div className="flex flex-col gap-2">
                {routeParts && (
                  <a
                    href={googleMapsDirectionsUrl(routeParts[0], routeParts[1])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary block w-full text-center"
                  >
                    {t.day.openGoogleMaps}
                  </a>
                )}
                <Link
                  href={`/map/day/${day.day}`}
                  className="btn-secondary block w-full text-center"
                >
                  {formatMessage(t.day.roadbookMap, { day: day.day })}
                </Link>
                <Link
                  href={`/today?day=${day.day}`}
                  className="btn-secondary block w-full text-center"
                >
                  {formatMessage(t.day.todayMode, { day: day.day })}
                </Link>
              </div>
            </div>
          </section>

          <section className="card p-5">
            <DifficultyBadge difficulty={day.difficulty} />
          </section>

          <DoNotDetourCard note={day.doNotDetour} />
          <FuelStrategyCard fuelStrategy={day.fuelStrategy} />
          <WeatherPanel weather={day.weather} />

          <FoodPlan food={day.food} />

          <CoffeeStrategy day={day} />

          {hotel && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">{t.common.accommodation}</h3>
              <p>{hotel.name}</p>
            </section>
          )}

          {day.highlights.length > 0 && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">{t.common.highlights}</h3>
              <ul className="list-inside list-disc text-sm text-muted">
                {day.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {day.ridingNotes.length > 0 && (
            <section className="card p-5">
              <h3 className="mb-2 font-semibold text-forest">{t.common.ridingNotes}</h3>
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
