"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TripDayEnriched } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTripDays } from "@/i18n/useTripData";
import {
  getTodayTripDay,
  isDayCompleted,
  markDayCompleted,
  setSelectedDay,
  unmarkDayCompleted,
} from "@/lib/today";
import { makeGoogleMapsDayRouteUrl } from "@/lib/mapLinks";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { TodayHeroCard } from "./TodayHeroCard";
import { NextStopMiniCard } from "./NextStopMiniCard";
import { WeatherPanel } from "./WeatherPanel";
import { FuelStrategyCard } from "./FuelStrategyCard";
import { DoNotDetourCard } from "./DoNotDetourCard";
import { CoffeeStrategy } from "./CoffeeStrategy";

export function TodayMode() {
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const days = useTripDays();
  const [activeDay, setActiveDay] = useState<TripDayEnriched>(() =>
    getTodayTripDay(days)
  );
  const [completed, setCompleted] = useState(false);

  const {
    currentLocation,
    error: locationError,
    loading: locationLoading,
    requestLocation,
  } = useCurrentLocation();

  useEffect(() => {
    const dayParam = searchParams.get("day");
    if (dayParam) {
      const n = Number(dayParam);
      const picked = days.find((d) => d.day === n);
      if (picked) {
        setSelectedDay(n);
        setActiveDay(picked);
      }
    }
  }, [searchParams, days]);

  useEffect(() => {
    setCompleted(isDayCompleted(activeDay.day));
    const onUpdate = () => {
      const next = getTodayTripDay(days);
      setActiveDay(next);
      setCompleted(isDayCompleted(next.day));
    };
    window.addEventListener("roadbook-today-update", onUpdate);
    window.addEventListener("roadbook-visit-update", onUpdate);
    return () => {
      window.removeEventListener("roadbook-today-update", onUpdate);
      window.removeEventListener("roadbook-visit-update", onUpdate);
    };
  }, [days, activeDay.day]);

  const selectDay = (n: number) => {
    setSelectedDay(n);
    const picked = days.find((d) => d.day === n);
    if (picked) setActiveDay(picked);
  };

  const toggleCompleted = () => {
    if (completed) unmarkDayCompleted(activeDay.day);
    else markDayCompleted(activeDay.day);
    setCompleted(!completed);
  };

  const dayRouteUrl = makeGoogleMapsDayRouteUrl(activeDay);
  const showProminentDetour =
    activeDay.doNotDetour.severity === "high" ||
    activeDay.doNotDetour.severity === "medium";

  return (
    <div className="today-mode -mx-4 sm:mx-0">
      <div className="today-day-picker sticky top-[57px] z-40 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <label htmlFor="today-day-select" className="sr-only">
          {t.today.selectDay}
        </label>
        <select
          id="today-day-select"
          className="today-day-select w-full"
          value={activeDay.day}
          onChange={(e) => selectDay(Number(e.target.value))}
        >
          {days.map((d) => (
            <option key={d.day} value={d.day}>
              {t.common.day} {d.day} · {d.date} — {d.title}
            </option>
          ))}
        </select>
      </div>

      <div className="today-content space-y-4 px-4 pb-6 pt-4">
        <TodayHeroCard day={activeDay} completed={completed} />

        <NextStopMiniCard day={activeDay} currentLocation={currentLocation} />

        <div className="today-actions grid gap-2 sm:grid-cols-2">
          <a
            href={dayRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="today-action-btn btn-primary w-full text-center"
          >
            {t.today.openRoute}
          </a>
          <Link
            href={`/day/${activeDay.day}`}
            className="today-action-btn btn-secondary w-full text-center"
          >
            {t.today.fullDetails}
          </Link>
          <button
            type="button"
            className="today-action-btn btn-secondary w-full"
            onClick={requestLocation}
            disabled={locationLoading}
          >
            {locationLoading ? t.today.locating : t.today.useLocation}
          </button>
          <button
            type="button"
            className={`today-action-btn w-full ${completed ? "btn-secondary" : "btn-primary"}`}
            onClick={toggleCompleted}
          >
            {completed ? t.today.unmarkComplete : t.today.markComplete}
          </button>
        </div>

        {locationError && (
          <p className="text-sm text-muted">{locationError}</p>
        )}

        <DoNotDetourCard note={activeDay.doNotDetour} prominent={showProminentDetour} />

        <FuelStrategyCard fuelStrategy={activeDay.fuelStrategy} compact />

        <WeatherPanel weather={activeDay.weather} compact />

        <section className="card p-4">
          <h3 className="text-sm font-semibold text-forest">{t.common.coffeeStrategy}</h3>
          <div className="mt-2">
            <CoffeeStrategy day={activeDay} compact />
          </div>
        </section>

        <p className="text-xs text-muted border-l-2 border-gold pl-3">
          {t.today.fuelRule}
        </p>
      </div>
    </div>
  );
}
