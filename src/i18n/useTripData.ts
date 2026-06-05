"use client";

import { useMemo } from "react";
import {
  getDayByNumber as getDayByNumberBase,
  getTripDays as getTripDaysBase,
  trip,
  type TripData,
  type TripDayEnriched,
} from "@/data/trip";
import { getTripData } from "@/i18n/localizeTrip";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/locale";

export function getLocalizedTripDays(locale: Locale): TripDayEnriched[] {
  if (locale === "en") return getTripDaysBase();
  return getTripData(locale).days.map((day) => getDayByNumberBase(day.day, locale)!);
}

export function useTripData(): TripData {
  const { locale } = useLocale();
  return useMemo(() => getTripData(locale), [locale]);
}

export function useTripDays(): TripDayEnriched[] {
  const { locale } = useLocale();
  return useMemo(() => getLocalizedTripDays(locale), [locale]);
}

export function useDayByNumber(dayNumber: number): TripDayEnriched | undefined {
  const { locale } = useLocale();
  return useMemo(
    () => getDayByNumberBase(dayNumber, locale),
    [dayNumber, locale]
  );
}

export function useTripMeta() {
  const tripData = useTripData();
  return tripData;
}

export { trip };
