"use client";

import { useEffect, useMemo, useState } from "react";
import type { TripDayEnriched } from "@/data/trip";
import { buildPlannedMapStops } from "@/lib/mapStops";
import { loadSkippedIds, loadVisitedIds } from "@/lib/visitState";
import { COFFEE_ROLE_LABELS } from "@/lib/coffeeStops";
import type { CoffeeStopRole } from "@/data/trip";
import { distanceToPlace, formatDistance } from "@/lib/distance";
import type { LatLng } from "@/lib/distance";

type NextStopMiniCardProps = {
  day: TripDayEnriched;
  currentLocation?: LatLng | null;
};

export function NextStopMiniCard({ day, currentLocation }: NextStopMiniCardProps) {
  const [visited, setVisited] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => {
      setVisited(loadVisitedIds(day.day));
      setSkipped(loadSkippedIds(day.day));
    };
    refresh();
    window.addEventListener("roadbook-visit-update", refresh);
    return () => window.removeEventListener("roadbook-visit-update", refresh);
  }, [day.day]);

  const nextStop = useMemo(() => {
    const stops = buildPlannedMapStops(day);
    return stops.find((s) => !visited.includes(s.id) && !skipped.includes(s.id));
  }, [day, visited, skipped]);

  if (!nextStop) {
    return (
      <div className="today-next-card card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Next stop
        </p>
        <p className="mt-1 text-sm text-muted">All planned stops done for today.</p>
      </div>
    );
  }

  const dist =
    currentLocation != null
      ? distanceToPlace(currentLocation, nextStop)
      : null;

  const roleLabel =
    nextStop.type === "coffee" && nextStop.role
      ? COFFEE_ROLE_LABELS[nextStop.role as CoffeeStopRole]
      : null;

  return (
    <div className="today-next-card card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Next stop
      </p>
      <p className="mt-1 text-lg font-semibold text-forest">{nextStop.name}</p>
      <p className="text-sm capitalize text-muted">
        {nextStop.type}
        {roleLabel ? ` · ${roleLabel}` : ""}
      </p>
      {dist != null && (
        <p className="mt-1 text-sm text-forest">~{formatDistance(dist)} away (approx.)</p>
      )}
      <a
        href={nextStop.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="today-action-btn btn-primary mt-3 block w-full text-center"
      >
        Open next stop in Google Maps
      </a>
    </div>
  );
}
