"use client";

import { TripData } from "@/data/trip";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatBaht, formatKm } from "@/lib/money";
import { CostPill } from "./CostPill";

type BudgetSummaryProps = {
  trip: TripData;
  compact?: boolean;
};

export function BudgetSummary({ trip, compact = false }: BudgetSummaryProps) {
  const { t } = useLocale();
  const { totals } = trip;

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <CostPill label={t.common.fuel} amount={totals.fuelCost} />
        <CostPill label={t.common.food} amount={totals.food} />
        <CostPill label={t.common.stay} amount={totals.accommodation} />
        <CostPill label={t.common.estimatedTotal} amount={totals.estimatedTotal} variant="total" />
      </div>
    );
  }

  return (
    <section className="card overflow-hidden">
      <div className="card-header">
        <h2 className="text-xl font-semibold">{t.common.tripBudget}</h2>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{t.common.budgetEnvelope}</p>
            <p className="text-3xl font-bold text-forest">
              {formatBaht(totals.budgetEnvelope)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">{t.common.estimatedTotal}</p>
            <p className="text-2xl font-semibold">
              {formatBaht(totals.estimatedTotal)}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">
          {t.common.totalDistance}: {formatKm(totals.distanceKm)}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <CostPill label={t.common.fuel} amount={totals.fuelCost} />
          <CostPill label={t.common.food} amount={totals.food} />
          <CostPill label={t.common.hotel} amount={totals.accommodation} />
          <CostPill label={t.common.contingency} amount={totals.contingency} />
          <CostPill
            label={t.common.budgetEnvelope}
            amount={totals.budgetEnvelope}
            variant="total"
          />
        </div>
      </div>
    </section>
  );
}
