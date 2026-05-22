import { CoffeeStop, CoffeeStopRole, TripDay } from "@/data/trip";

export const COFFEE_ROLE_LABELS: Record<CoffeeStopRole, string> = {
  departure: "Departure coffee",
  mid_route: "Mid-route coffee",
  arrival: "Arrival coffee",
  local_day: "Local café",
};

export const COFFEE_ROLE_BADGE: Record<CoffeeStopRole, string> = {
  departure: "bg-gold/25 text-forest border border-gold/50",
  mid_route: "bg-forest/15 text-forest border border-forest/30",
  arrival: "bg-teal-700/15 text-forest border border-teal-700/35",
  local_day: "bg-violet-700/12 text-forest border border-violet-700/25",
};

export const DEFAULT_DAY_COFFEE_NOTE =
  "Coffee stops are positioned as departure, mid-route, or arrival breaks rather than fixed sightseeing stops.";

export const SHORT_DAY_COFFEE_NOTE =
  "Short ride: one true stop plus an arrival café is enough.";

export const PAI_REST_DAY_COFFEE_NOTE =
  "Local cafés only. Keep this as the recovery day.";

export function getDayCoffeeNote(day: TripDay): string {
  if (day.dayCoffeeNote) return day.dayCoffeeNote;
  if (day.day === 9) return PAI_REST_DAY_COFFEE_NOTE;
  if (day.distanceKm < 120 && day.day !== 9) return SHORT_DAY_COFFEE_NOTE;
  return DEFAULT_DAY_COFFEE_NOTE;
}

/** Print-only reminder to paste in your own photos later. */
export function coffeePhotoPlaceholder(stop: CoffeeStop): string {
  const roleLabel = COFFEE_ROLE_LABELS[stop.role];
  return `INSERT REAL PHOTO: ${roleLabel} — ${stop.name}`;
}
