export type LatLng = { lat: number; lng: number };

export function haversineDistanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function distanceToPlace(
  current: LatLng,
  place: { lat: number | null; lng: number | null }
): number | null {
  if (place.lat == null || place.lng == null) return null;
  return haversineDistanceKm(current, { lat: place.lat, lng: place.lng });
}

export function formatDistance(km: number | null): string {
  if (km == null) return "—";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
