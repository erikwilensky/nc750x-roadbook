const visitedKey = (day: number) => `roadbook_visited_day_${day}`;
const skippedKey = (day: number) => `roadbook_skipped_day_${day}`;

export function loadVisitedIds(day: number): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(visitedKey(day));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function loadSkippedIds(day: number): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(skippedKey(day));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveVisitedIds(day: number, ids: string[]): void {
  localStorage.setItem(visitedKey(day), JSON.stringify(ids));
}

export function saveSkippedIds(day: number, ids: string[]): void {
  localStorage.setItem(skippedKey(day), JSON.stringify(ids));
}
