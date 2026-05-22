import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { BudgetSummary } from "@/components/BudgetSummary";
import { DayCard } from "@/components/DayCard";
import { RoutePhaseCard } from "@/components/RoutePhaseCard";
import { trip } from "@/data/trip";
import { formatBaht, formatKm } from "@/lib/money";

export default function DashboardPage() {
  return (
    <AppShell title={trip.title} subtitle={trip.subtitle}>
      <div className="space-y-8 -mt-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <span>{trip.dates}</span>
          <span>{trip.bike}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-5 sm:col-span-2">
            <p className="text-sm text-muted">Budget envelope</p>
            <p className="text-4xl font-bold text-forest">
              {formatBaht(trip.totals.budgetEnvelope)}
            </p>
            <p className="mt-2 text-muted">
              Estimated trip total: {formatBaht(trip.totals.estimatedTotal)}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-muted">Total distance</p>
            <p className="text-3xl font-bold text-forest">
              {formatKm(trip.totals.distanceKm)}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-muted">Days on the road</p>
            <p className="text-3xl font-bold text-forest">{trip.days.length}</p>
          </div>
        </div>

        <BudgetSummary trip={trip} />

        <section>
          <h2 className="mb-4 text-xl font-semibold text-forest">Route phases</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {trip.phases.map((phase) => (
              <RoutePhaseCard
                key={phase.title}
                title={phase.title}
                days={phase.days}
                route={phase.route}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-forest">Day-by-day roadbook</h2>
            <div className="flex gap-2 no-print">
              <Link href="/print" className="btn-primary">
                View print roadbook
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trip.days.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
