"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { dayMapsByNumber } from "@/data/dayMaps";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTripData } from "@/i18n/useTripData";
import { setupLeafletIcons, markerDivIcon } from "@/lib/leafletSetup";
import { MAP_MARKER_COLORS } from "./MapLegend";

const SEGMENT_COLORS = [
  "#245A48",
  "#2d8a4e",
  "#173D32",
  "#C9A24A",
  "#2563eb",
  "#d97706",
];

function FitAllBounds({ positions }: { positions: LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length) map.fitBounds(positions, { padding: [40, 40] });
  }, [map, positions]);
  return null;
}

type TripOverviewMapProps = {
  selectedDay?: number | null;
  onSelectDay?: (day: number) => void;
  className?: string;
};

export function TripOverviewMap({
  selectedDay,
  onSelectDay,
  className,
}: TripOverviewMapProps) {
  useEffect(() => {
    setupLeafletIcons();
  }, []);

  const { t } = useLocale();
  const trip = useTripData();

  const allPositions = useMemo(() => {
    const pts: LatLngTuple[] = [];
    trip.days.forEach((d) => {
      const dm = dayMapsByNumber[d.day];
      dm.routePolyline.forEach((p) => pts.push(p as LatLngTuple));
    });
    return pts;
  }, [trip.days]);

  const overnightMarkers = useMemo(
    () =>
      trip.days.map((d) => {
        const end = dayMapsByNumber[d.day].end;
        return { day: d.day, title: d.title, ...end };
      }),
    [trip.days]
  );

  return (
    <div className={`interactive-map map-viewport ${className ?? ""}`}>
      <MapContainer
        center={[17.5, 99.2]}
        zoom={6}
        scrollWheelZoom
        className="map-leaflet h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trip.days.map((d) => {
          const dm = dayMapsByNumber[d.day];
          const color = SEGMENT_COLORS[(d.day - 1) % SEGMENT_COLORS.length];
          const isSelected = selectedDay === d.day;
          return (
            <Polyline
              key={d.day}
              positions={dm.routePolyline as LatLngTuple[]}
              pathOptions={{
                color,
                weight: isSelected ? 7 : 4,
                opacity: isSelected ? 1 : 0.65,
              }}
              eventHandlers={{
                click: () => onSelectDay?.(d.day),
              }}
            />
          );
        })}
        {overnightMarkers.map((m) => (
          <Marker
            key={m.day}
            position={[m.lat, m.lng]}
            icon={markerDivIcon(
              selectedDay === m.day ? "#C9A24A" : MAP_MARKER_COLORS.hotel,
              12
            )}
            eventHandlers={{ click: () => onSelectDay?.(m.day) }}
          >
            <Popup>
              <p className="text-sm font-semibold text-forest">
                {t.common.day} {m.day}: {m.title}
              </p>
              <p className="text-xs text-muted">{m.name}</p>
              {onSelectDay && (
                <button
                  type="button"
                  className="map-popup-btn mt-2"
                  onClick={() => onSelectDay(m.day)}
                >
                  {t.map.viewDayMap}
                </button>
              )}
            </Popup>
          </Marker>
        ))}
        <FitAllBounds positions={allPositions} />
      </MapContainer>
    </div>
  );
}
