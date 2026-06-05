import { trip, type TripData, type TripDay } from "@/data/trip";
import type { Locale } from "@/i18n/locale";
import { dayContentTh, tripMetaTh } from "@/i18n/tripTh";

function localizeDay(day: TripDay, locale: Locale): TripDay {
  if (locale === "en") return day;
  const tr = dayContentTh[day.day];
  if (!tr) return day;
  return { ...day, ...tr };
}

export function getTripData(locale: Locale): TripData {
  if (locale === "en") return trip;
  return {
    ...trip,
    ...tripMetaTh,
    days: trip.days.map((day) => localizeDay(day, locale)),
  };
}
