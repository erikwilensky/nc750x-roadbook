"use client";

import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import type { TripDayEnriched } from "@/data/trip";
import { getDayMap } from "@/data/trip";
import { getMapStopsWithCoords } from "@/lib/mapStops";
import { setupLeafletIcons, markerDivIcon } from "@/lib/leafletSetup";
import type { LatLng } from "@/lib/distance";
import { MAP_MARKER_COLORS } from "./MapLegend";
import { MapPopupContent } from "./MapPopupContent";

function FitBounds({ positions }: { positions: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length < 1) return;
    map.fitBounds(positions, { padding: [36, 36], maxZoom: 12 });
  }, [map, positions]);

  return null;
}

type DayMapProps = {
  day: TripDayEnriched;
  currentLocation?: LatLng | null;
  className?: string;
};

export function DayMap({ day, currentLocation, className }: DayMapProps) {
  useEffect(() => {
    setupLeafletIcons();
  }, []);

  const dayMap = getDayMap(day.day);
  const stops = getMapStopsWithCoords(day);

  const polyline = dayMap.routePolyline as LatLngTuple[];

  const boundsPositions = useMemo(() => {
    const pts: LatLngTuple[] = [...polyline];
    stops.forEach((s) => {
      if (s.lat != null && s.lng != null) pts.push([s.lat, s.lng]);
    });
    if (currentLocation) pts.push([currentLocation.lat, currentLocation.lng]);
    return pts;
  }, [polyline, stops, currentLocation]);

  const center: LatLngTuple = polyline[0] ?? [18.7883, 98.9853];

  return (
    <div className={`interactive-map map-viewport ${className ?? ""}`}>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom
        className="map-leaflet h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={polyline}
          pathOptions={{ color: "#245A48", weight: 5, opacity: 0.85 }}
        />
        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.lat!, stop.lng!]}
            icon={markerDivIcon(MAP_MARKER_COLORS[stop.type])}
          >
            <Popup>
              <MapPopupContent stop={stop} />
            </Popup>
          </Marker>
        ))}
        {currentLocation && (
          <CircleMarker
            center={[currentLocation.lat, currentLocation.lng]}
            radius={8}
            pathOptions={{
              color: MAP_MARKER_COLORS.current,
              fillColor: MAP_MARKER_COLORS.current,
              fillOpacity: 0.9,
              weight: 2,
            }}
          />
        )}
        <FitBounds positions={boundsPositions} />
      </MapContainer>
    </div>
  );
}
