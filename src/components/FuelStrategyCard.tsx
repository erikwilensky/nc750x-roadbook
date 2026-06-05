"use client";

import type { FuelStrategy } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";
import { rangeConcernTh } from "@/i18n/tripTh";
import { makeGoogleMapsSearchUrl } from "@/lib/mapLinks";
import { formatBaht } from "@/lib/money";

type FuelStrategyCardProps = {
  fuelStrategy: FuelStrategy;
  compact?: boolean;
};

const RANGE_STYLES: Record<FuelStrategy["rangeConcern"], string> = {
  low: "fuel-badge-low",
  medium: "fuel-badge-medium",
  high: "fuel-badge-high",
};

export function FuelStrategyCard({ fuelStrategy, compact }: FuelStrategyCardProps) {
  const { locale, t } = useLocale();
  const rangeLabel =
    locale === "th"
      ? rangeConcernTh[fuelStrategy.rangeConcern]
      : fuelStrategy.rangeConcern;

  return (
    <section className={`fuel-card card p-4 ${compact ? "fuel-card-compact" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-forest">{t.common.fuelStrategy}</h3>
        <span className={`fuel-range-badge ${RANGE_STYLES[fuelStrategy.rangeConcern]}`}>
          {t.common.range}: {rangeLabel}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-sm">
        <span>
          <span className="text-muted">{t.common.estimated} </span>
          {fuelStrategy.estimatedLiters.toFixed(1)} L
        </span>
        <span>
          <span className="text-muted">≈ </span>
          {formatBaht(fuelStrategy.estimatedCost)}
        </span>
        {fuelStrategy.startFull && (
          <span className="text-xs text-forest">{t.common.startFull}</span>
        )}
      </div>
      <p className="mt-3 text-sm">{fuelStrategy.plan}</p>
      {fuelStrategy.suggestedFuelStops.length > 0 && (
        <ul className="mt-3 space-y-2">
          {fuelStrategy.suggestedFuelStops.map((stop) => (
            <li key={stop.name} className="text-sm">
              <a
                href={makeGoogleMapsSearchUrl(stop.query)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline-offset-2 hover:underline"
              >
                {stop.name}
              </a>
              <span className="text-muted"> — {stop.note}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 rounded-xl border border-gold/40 bg-cream/80 px-3 py-2 text-xs text-muted">
        {fuelStrategy.caution}
      </p>
    </section>
  );
}
