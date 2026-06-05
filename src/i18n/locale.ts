export type Locale = "en" | "th";

export const LOCALE_STORAGE_KEY = "roadbook-locale";

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "th";
}
