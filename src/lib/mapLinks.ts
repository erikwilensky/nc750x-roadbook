import { TripDayEnriched } from "@/data/trip";
import { getDayMap } from "@/data/trip";
import { buildPlannedMapStops } from "@/lib/mapStops";

export function makeGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function makeGoogleMapsDirectionsUrl(
  originQuery: string,
  destinationQuery: string
): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originQuery)}&destination=${encodeURIComponent(destinationQuery)}&travelmode=driving`;
}

/** Day route in Google Maps with a few waypoint stops (coffee / hotel / viewpoint). */
export function makeGoogleMapsDayRouteUrl(day: TripDayEnriched): string {
  const dayMap = getDayMap(day.day);
  const stops = buildPlannedMapStops(day).filter(
    (s) => s.lat != null && s.lng != null
  );

  const waypointNames = stops
    .filter((s) => !["start", "end"].includes(s.type))
    .slice(0, 8)
    .map((s) => s.query);

  const params = new URLSearchParams({
    api: "1",
    origin: dayMap.start.name,
    destination: dayMap.end.name,
    travelmode: "driving",
  });

  if (waypointNames.length > 0) {
    params.set("waypoints", waypointNames.join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
