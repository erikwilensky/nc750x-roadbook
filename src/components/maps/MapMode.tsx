"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { trip, getDayByNumber } from "@/data/trip";

const DayMap = dynamic(
  () => import("./DayMap").then((m) => m.DayMap),
  {
    ssr: false,
    loading: () => (
      <div className="map-viewport flex items-center justify-center text-sm text-muted">
        Loading map…
      </div>
    ),
  }
);

const TripOverviewMap = dynamic(
  () => import("./TripOverviewMap").then((m) => m.TripOverviewMap),
  {
    ssr: false,
    loading: () => (
      <div className="map-viewport flex items-center justify-center text-sm text-muted">
        Loading map…
      </div>
    ),
  }
);
import { NextStopPanel } from "./NextStopPanel";
import { MapLegend } from "./MapLegend";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { makeGoogleMapsDayRouteUrl } from "@/lib/mapLinks";
import { DifficultyBadge } from "@/components/DifficultyBadge";

type MapModeProps = {
  initialDay?: number | null;
};

export function MapMode({ initialDay = null }: MapModeProps) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | null>(initialDay);

  useEffect(() => {
    setSelectedDay(initialDay ?? null);
  }, [initialDay]);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const {
    currentLocation,
    permissionStatus,
    error,
    loading,
    requestLocation,
  } = useCurrentLocation();

  const day = selectedDay ? getDayByNumber(selectedDay) : undefined;
  const viewOverview = selectedDay == null;

  const dayRouteUrl = useMemo(
    () => (day ? makeGoogleMapsDayRouteUrl(day) : null),
    [day]
  );

  const goToDay = (n: number | null) => {
    setSelectedDay(n);
    if (n == null) router.push("/map");
    else router.push(`/map/day/${n}`);
  };

  return (
    <div className="map-shell -mx-4 sm:mx-0">
      <div className="map-toolbar sticky top-[57px] z-40 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`map-chip ${viewOverview ? "map-chip-active" : ""}`}
            onClick={() => goToDay(null)}
          >
            Trip overview
          </button>
          <div className="map-day-scroll flex flex-1 gap-2 overflow-x-auto pb-1">
            {trip.days.map((d) => (
              <button
                key={d.day}
                type="button"
                className={`map-chip shrink-0 ${
                  selectedDay === d.day ? "map-chip-active" : ""
                }`}
                onClick={() => goToDay(d.day)}
              >
                D{d.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="map-layout px-4">
        <aside className="map-sidebar hidden lg:block">
          <p className="mb-2 text-sm font-semibold text-forest">Days</p>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                className={`map-side-link w-full text-left ${
                  viewOverview ? "map-side-link-active" : ""
                }`}
                onClick={() => goToDay(null)}
              >
                Full trip
              </button>
            </li>
            {trip.days.map((d) => (
              <li key={d.day}>
                <button
                  type="button"
                  className={`map-side-link w-full text-left ${
                    selectedDay === d.day ? "map-side-link-active" : ""
                  }`}
                  onClick={() => goToDay(d.day)}
                >
                  Day {d.day}: {d.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="map-main min-w-0 flex-1">
          {day && (
            <header className="map-day-header py-4">
              <p className="text-sm text-muted">
                Day {day.day} · {day.date}
              </p>
              <h2 className="text-xl font-bold text-forest sm:text-2xl">
                {day.title}
              </h2>
              <p className="text-sm text-muted">{day.route}</p>
              <div className="mt-2">
                <DifficultyBadge difficulty={day.difficulty} compact />
              </div>
            </header>
          )}

          {viewOverview ? (
            <TripOverviewMap
              selectedDay={selectedDay}
              onSelectDay={(n) => goToDay(n)}
            />
          ) : day ? (
            <DayMap day={day} currentLocation={currentLocation} />
          ) : null}

          <div className="map-controls mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="map-action-btn btn-primary"
              onClick={requestLocation}
              disabled={loading}
            >
              {loading ? "Locating…" : "Use current location"}
            </button>
            {currentLocation && (
              <button
                type="button"
                className="map-action-btn btn-secondary"
                onClick={requestLocation}
              >
                Refresh location
              </button>
            )}
            {dayRouteUrl && (
              <a
                href={dayRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-action-btn btn-primary"
              >
                Open day route in Google Maps
              </a>
            )}
          </div>

          {(error || permissionStatus === "denied") && (
            <p className="mt-2 text-sm text-muted" role="status">
              {error}
            </p>
          )}

          <div className="mt-3">
            <MapLegend compact />
          </div>

          <p className="map-safety-note mt-3 text-xs text-muted">
            Use this as a roadbook companion. For turn-by-turn navigation, open
            the route or next stop in Google Maps.
          </p>

          <button
            type="button"
            className="map-details-toggle mt-4 w-full lg:hidden"
            onClick={() => setDetailsOpen((o) => !o)}
            aria-expanded={detailsOpen}
          >
            {detailsOpen ? "Hide" : "Show"} stop details
          </button>

          <div
            className={`map-details mt-4 space-y-4 ${
              detailsOpen ? "" : "map-details-collapsed"
            }`}
          >
            {day ? (
              <NextStopPanel day={day} currentLocation={currentLocation} />
            ) : (
              <div className="card p-4 text-sm text-muted">
                <p className="font-medium text-forest">Trip overview</p>
                <p className="mt-2">
                  Tap a route segment or overnight marker, or pick a day above.
                  Each day map shows coffee, food, hotel, and viewpoint pins with
                  Google Maps handoff.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
