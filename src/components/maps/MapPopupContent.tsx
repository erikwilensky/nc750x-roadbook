import type { MapStop } from "@/data/trip";
import { COFFEE_ROLE_LABELS } from "@/lib/coffeeStops";
import type { CoffeeStopRole } from "@/data/trip";

type MapPopupContentProps = {
  stop: MapStop;
};

export function MapPopupContent({ stop }: MapPopupContentProps) {
  const roleLabel =
    stop.type === "coffee" && stop.role
      ? COFFEE_ROLE_LABELS[stop.role as CoffeeStopRole]
      : stop.role;

  return (
    <div className="map-popup text-sm">
      <p className="font-semibold text-forest">{stop.name}</p>
      <p className="text-xs capitalize text-muted">Type: {stop.type}</p>
      {roleLabel && (
        <p className="text-xs text-muted">Role: {roleLabel}</p>
      )}
      {stop.whySpecial && (
        <p className="mt-1 text-xs">
          <span className="font-medium">Why:</span> {stop.whySpecial}
        </p>
      )}
      {stop.riderNote && (
        <p className="mt-1 text-xs">
          <span className="font-medium">Rider:</span> {stop.riderNote}
        </p>
      )}
      {stop.coordinateStatus === "approximate" && (
        <p className="mt-1 text-[10px] text-muted">Approx. town location</p>
      )}
      <a
        href={stop.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-popup-btn mt-2"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
