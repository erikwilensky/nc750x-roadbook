"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TripDayEnriched } from "@/data/trip";
import { buildPlannedMapStops } from "@/lib/mapStops";
import {
  loadSkippedIds,
  loadVisitedIds,
  saveSkippedIds,
  saveVisitedIds,
} from "@/lib/visitState";
import { distanceToPlace, formatDistance } from "@/lib/distance";
import type { LatLng } from "@/lib/distance";
import { COFFEE_ROLE_LABELS } from "@/lib/coffeeStops";
import type { CoffeeStopRole } from "@/data/trip";

const VISIT_EVENT = "roadbook-visit-update";

type NextStopPanelProps = {
  day: TripDayEnriched;
  currentLocation?: LatLng | null;
};

export function NextStopPanel({ day, currentLocation }: NextStopPanelProps) {
  const [visited, setVisited] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setVisited(loadVisitedIds(day.day));
    setSkipped(loadSkippedIds(day.day));
  }, [day.day]);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(VISIT_EVENT, onUpdate);
    return () => window.removeEventListener(VISIT_EVENT, onUpdate);
  }, [refresh]);

  const stops = useMemo(() => buildPlannedMapStops(day), [day]);

  const nextStop = stops.find(
    (s) => !visited.includes(s.id) && !skipped.includes(s.id)
  );

  const markVisited = (id: string) => {
    const next = [...visited, id];
    saveVisitedIds(day.day, next);
    setVisited(next);
    window.dispatchEvent(new Event(VISIT_EVENT));
  };

  const markSkipped = (id: string) => {
    const next = [...skipped, id];
    saveSkippedIds(day.day, next);
    setSkipped(next);
    window.dispatchEvent(new Event(VISIT_EVENT));
  };

  const dist =
    nextStop && currentLocation
      ? distanceToPlace(currentLocation, nextStop)
      : null;

  return (
    <div className="map-panel card p-4">
      <h3 className="text-lg font-semibold text-forest">Next stop</h3>
      {nextStop ? (
        <div className="mt-3">
          <p className="font-medium text-ink">{nextStop.name}</p>
          <p className="text-sm capitalize text-muted">{nextStop.type}</p>
          {nextStop.role && (
            <p className="text-xs text-muted">
              {nextStop.type === "coffee" && nextStop.role
                ? COFFEE_ROLE_LABELS[nextStop.role as CoffeeStopRole]
                : nextStop.role}
            </p>
          )}
          {dist != null && (
            <p className="mt-1 text-sm text-forest">
              ~{formatDistance(dist)} away (approx.)
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={nextStop.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-btn btn-primary"
            >
              Open next stop in Google Maps
            </a>
            <button
              type="button"
              className="map-action-btn btn-secondary"
              onClick={() => markVisited(nextStop.id)}
            >
              Mark visited
            </button>
            <button
              type="button"
              className="map-action-btn btn-secondary"
              onClick={() => markSkipped(nextStop.id)}
            >
              Skip
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted">
          All planned stops marked for today. Ride safe.
        </p>
      )}

      <details className="map-stop-details mt-4">
        <summary className="cursor-pointer text-sm font-medium text-forest">
          Today&apos;s stop order
        </summary>
        <ul className="mt-3 space-y-3">
          {stops.map((stop) => {
            const done = visited.includes(stop.id);
            const skip = skipped.includes(stop.id);
            return (
              <li
                key={stop.id}
                className={`rounded-xl border border-line p-3 ${
                  done ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-ink">
                      {stop.name}
                      {done && (
                        <span className="ml-2 text-xs text-forest">✓</span>
                      )}
                      {skip && (
                        <span className="ml-2 text-xs text-muted">skipped</span>
                      )}
                    </p>
                    <p className="text-xs capitalize text-muted">
                      {stop.type}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={stop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-action-btn btn-secondary text-xs"
                  >
                    Google Maps
                  </a>
                  {!done && !skip && (
                    <>
                      <button
                        type="button"
                        className="map-action-btn btn-secondary text-xs"
                        onClick={() => markVisited(stop.id)}
                      >
                        Visited
                      </button>
                      <button
                        type="button"
                        className="map-action-btn btn-secondary text-xs"
                        onClick={() => markSkipped(stop.id)}
                      >
                        Skip
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
}
