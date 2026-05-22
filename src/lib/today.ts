import { getTripDays, trip, type TripDayEnriched } from "@/data/trip";

const SELECTED_KEY = "roadbook_selected_day";
const COMPLETED_KEY = "roadbook_completed_days";

export function getSelectedDay(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SELECTED_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 1 && n <= 13 ? n : null;
  } catch {
    return null;
  }
}

export function setSelectedDay(dayNumber: number): void {
  localStorage.setItem(SELECTED_KEY, String(dayNumber));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("roadbook-today-update"));
  }
}

export function getCompletedDays(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    const list = raw ? (JSON.parse(raw) as number[]) : [];
    return list.filter((n) => n >= 1 && n <= 13);
  } catch {
    return [];
  }
}

export function markDayCompleted(dayNumber: number): void {
  const set = new Set(getCompletedDays());
  set.add(dayNumber);
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...set].sort((a, b) => a - b)));
  window.dispatchEvent(new Event("roadbook-today-update"));
}

export function unmarkDayCompleted(dayNumber: number): void {
  const next = getCompletedDays().filter((d) => d !== dayNumber);
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("roadbook-today-update"));
}

export function isDayCompleted(dayNumber: number): boolean {
  return getCompletedDays().includes(dayNumber);
}

export function getFirstIncompleteDay(): number {
  const completed = new Set(getCompletedDays());
  const days = getTripDays();
  const first = days.find((d) => !completed.has(d.day));
  return first?.day ?? 1;
}

function parseTripDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Pick the day to show in Today Mode for a given calendar date. */
export function getTodayTripDay(
  days: TripDayEnriched[],
  currentDate: Date = new Date()
): TripDayEnriched {
  const selected = getSelectedDay();
  if (selected != null) {
    const picked = days.find((d) => d.day === selected);
    if (picked) return picked;
  }

  const start = parseTripDate(trip.startDate);
  const end = parseTripDate(trip.endDate);
  end.setHours(23, 59, 59, 999);

  if (currentDate >= start && currentDate <= end) {
    const dayIndex = Math.floor(
      (currentDate.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
    );
    const clamped = Math.min(Math.max(dayIndex, 0), days.length - 1);
    return days[clamped];
  }

  const incomplete = getFirstIncompleteDay();
  return days.find((d) => d.day === incomplete) ?? days[0];
}
