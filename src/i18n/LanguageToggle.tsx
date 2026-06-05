"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="language-toggle shrink-0 rounded-full border-2 border-gold bg-gold/20 px-4 py-2 text-sm font-bold text-forest shadow-sm transition hover:bg-gold/35"
      aria-label={
        locale === "en" ? t.language.switchToThai : t.language.switchToEnglish
      }
    >
      {locale === "en" ? t.language.switchToThai : t.language.switchToEnglish}
    </button>
  );
}
