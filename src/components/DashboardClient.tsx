"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { BudgetSummary } from "@/components/BudgetSummary";
import { DayCard } from "@/components/DayCard";
import { RoutePhaseCard } from "@/components/RoutePhaseCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTripData, useTripDays } from "@/i18n/useTripData";
import { formatBaht, formatKm } from "@/lib/money";

export function DashboardClient() {
  const { t } = useLocale();
  const trip = useTripData();
  const days = useTripDays();

  return (
    <AppShell title={trip.title} subtitle={trip.subtitle}>
      <div className="space-y-8 -mt-4">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span>{trip.dates}</span>
          <span>{trip.bike}</span>
          <Link href="/today" className="btn-primary no-print text-sm">
            {t.dashboard.openToday}
          </Link>
        </div>

        <p className="no-print rounded-card border border-gold/40 bg-paper px-4 py-3 text-sm text-muted">
          <strong className="text-forest">{t.dashboard.fuelRule}</strong>{" "}
          {t.dashboard.fuelRuleBody}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-5 sm:col-span-2">
            <p className="text-sm text-muted">{t.common.budgetEnvelope}</p>
            <p className="text-4xl font-bold text-forest">
              {formatBaht(trip.totals.budgetEnvelope)}
            </p>
            <p className="mt-2 text-muted">
              {t.common.estimatedTotal}: {formatBaht(trip.totals.estimatedTotal)}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-muted">{t.common.totalDistance}</p>
            <p className="text-3xl font-bold text-forest">
              {formatKm(trip.totals.distanceKm)}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-muted">{t.common.daysOnRoad}</p>
            <p className="text-3xl font-bold text-forest">{trip.days.length}</p>
          </div>
        </div>

        <div id="budget">
          <BudgetSummary trip={trip} />
        </div>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-forest">
            {t.dashboard.routePhases}
          </h2>
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

        <section id="roadbook-days">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-forest">
              {t.dashboard.dayByDay}
            </h2>
            <Link href="/map" className="btn-secondary no-print">
              {t.dashboard.openMapMode}
            </Link>
            <div className="flex gap-2 no-print">
              <Link href="/print" className="btn-primary">
                {t.dashboard.viewPrint}
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {days.map((day) => (
              <DayCard key={day.day} day={day} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
