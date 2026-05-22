"use client";

import { useState } from "react";
import { BudgetSummary } from "@/components/BudgetSummary";
import { PrintDay } from "@/components/PrintDay";
import { getTripDays, trip } from "@/data/trip";
import { formatBaht, formatKm } from "@/lib/money";

export function PrintView() {
  const [withPhotos, setWithPhotos] = useState(true);

  return (
    <>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-paper p-4">
        <div>
          <p className="font-medium text-forest">Print options</p>
          <p className="text-sm text-muted">
            Use your browser&apos;s Print → Save as PDF
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setWithPhotos(true)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              withPhotos
                ? "bg-forest text-paper"
                : "border border-line text-muted"
            }`}
          >
            Print with photos
          </button>
          <button
            type="button"
            onClick={() => setWithPhotos(false)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              !withPhotos
                ? "bg-forest text-paper"
                : "border border-line text-muted"
            }`}
          >
            Print text only
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      <section className="print-page mb-8 bg-white p-8 text-ink">
        <h1 className="text-4xl font-bold text-forest">{trip.title}</h1>
        <p className="mt-2 text-xl text-muted">{trip.subtitle}</p>
        <p className="mt-4 text-lg">{trip.dates}</p>
        <p className="text-muted">{trip.bike}</p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <span className="text-muted">Distance</span>
            <p className="font-bold">{formatKm(trip.totals.distanceKm)}</p>
          </div>
          <div>
            <span className="text-muted">Budget</span>
            <p className="font-bold">
              {formatBaht(trip.totals.budgetEnvelope)}
            </p>
          </div>
          <div>
            <span className="text-muted">Estimated</span>
            <p className="font-bold">
              {formatBaht(trip.totals.estimatedTotal)}
            </p>
          </div>
          <div>
            <span className="text-muted">Days</span>
            <p className="font-bold">{trip.days.length}</p>
          </div>
        </div>
      </section>

      <div className="print-page mb-8 bg-white p-4">
        <BudgetSummary trip={trip} compact />
      </div>

      {getTripDays().map((day) => (
        <PrintDay key={day.day} day={day} withPhotos={withPhotos} />
      ))}
    </>
  );
}
