"use client";

import type { DoNotDetour } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";

type DoNotDetourCardProps = {
  note: DoNotDetour;
  prominent?: boolean;
};

const SEVERITY_CLASS: Record<DoNotDetour["severity"], string> = {
  low: "detour-low",
  medium: "detour-medium",
  high: "detour-high",
};

export function DoNotDetourCard({ note, prominent }: DoNotDetourCardProps) {
  const { t } = useLocale();

  return (
    <section
      className={`detour-card ${SEVERITY_CLASS[note.severity]} ${prominent ? "detour-card-prominent" : ""}`}
    >
      <p className="flex items-start gap-2 text-sm font-semibold text-forest">
        <span aria-hidden className="text-lg leading-none">
          ⚠
        </span>
        {note.title}
      </p>
      <p className="mt-2 text-sm text-ink">{note.message}</p>
      {note.exceptions && (
        <p className="mt-2 text-xs text-muted">
          <span className="font-medium">{t.common.exception}: </span>
          {note.exceptions}
        </p>
      )}
    </section>
  );
}
