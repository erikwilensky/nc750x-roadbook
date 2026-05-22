import { TripData } from "@/data/trip";
import { formatBaht, formatKm } from "@/lib/money";
import { CostPill } from "./CostPill";

type BudgetSummaryProps = {
  trip: TripData;
  compact?: boolean;
};

export function BudgetSummary({ trip, compact = false }: BudgetSummaryProps) {
  const { totals } = trip;

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <CostPill label="Fuel" amount={totals.fuelCost} />
        <CostPill label="Food" amount={totals.food} />
        <CostPill label="Stay" amount={totals.accommodation} />
        <CostPill label="Total est." amount={totals.estimatedTotal} variant="total" />
      </div>
    );
  }

  return (
    <section className="card overflow-hidden">
      <div className="card-header">
        <h2 className="text-xl font-semibold">Trip budget</h2>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Budget envelope</p>
            <p className="text-3xl font-bold text-forest">
              {formatBaht(totals.budgetEnvelope)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Estimated total</p>
            <p className="text-2xl font-semibold">
              {formatBaht(totals.estimatedTotal)}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">
          Total distance: {formatKm(totals.distanceKm)}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <CostPill label="Fuel" amount={totals.fuelCost} />
          <CostPill label="Food" amount={totals.food} />
          <CostPill label="Accommodation" amount={totals.accommodation} />
          <CostPill label="Contingency" amount={totals.contingency} />
          <CostPill
            label="Budget envelope"
            amount={totals.budgetEnvelope}
            variant="total"
          />
        </div>
      </div>
    </section>
  );
}
