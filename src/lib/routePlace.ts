import { TripPlace } from "@/data/trip";
import { googleMapsDirectionsUrl } from "@/lib/maps";

/** Parse "Uthai Thani to Sukhothai route" → origin / destination. */
export function parseRouteEndpoints(
  name: string
): { origin: string; destination: string } | null {
  if (!name.toLowerCase().includes(" to ")) return null;
  const withoutRoute = name.replace(/\s+route$/i, "").trim();
  const idx = withoutRoute.toLowerCase().indexOf(" to ");
  if (idx === -1) return null;

  const origin = withoutRoute.slice(0, idx).trim();
  let destination = withoutRoute.slice(idx + 4).trim();
  destination = destination.replace(/\s+via\s+.+$/i, "").trim();

  if (!origin || !destination) return null;
  return { origin, destination };
}

/** Places search for a scenic photo of the day's destination, not the driving route string. */
export function routePhotoSearchQuery(place: TripPlace): string {
  const endpoints = parseRouteEndpoints(place.name);
  if (endpoints) {
    return `${endpoints.destination} Thailand`;
  }
  const parts = place.query.split(/\s+to\s+/i);
  if (parts.length >= 2) {
    const dest = parts[parts.length - 1]
      .replace(/\s+driving.*/i, "")
      .replace(/\s+route.*/i, "")
      .trim();
    return `${dest} Thailand`;
  }
  return place.query;
}

export function routeDirectionsUrl(place: TripPlace): string | null {
  const endpoints = parseRouteEndpoints(place.name);
  if (!endpoints) return null;
  return googleMapsDirectionsUrl(endpoints.origin, endpoints.destination);
}
