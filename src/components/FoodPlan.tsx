"use client";

import { useState } from "react";
import { FoodPlan as FoodPlanType } from "@/data/trip";
import { FoodPlaceCard } from "./FoodPlaceCard";

type FoodPlanProps = {
  food: FoodPlanType;
};

export function FoodPlan({ food }: FoodPlanProps) {
  const [backupsOpen, setBackupsOpen] = useState(false);

  return (
    <section className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-lg font-semibold">Food plan</h3>
      </div>
      <div className="space-y-4 p-5">
        <FoodPlaceCard place={food.primary} variant="primary" />
        {food.backups.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setBackupsOpen(!backupsOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-line bg-cream px-3 py-2 text-left text-sm font-medium text-forest"
            >
              Backups
              <span className="text-muted">{backupsOpen ? "−" : "+"}</span>
            </button>
            {backupsOpen && (
              <div className="mt-3 space-y-3">
                {food.backups.map((b) => (
                  <FoodPlaceCard key={b.name} place={b} variant="backup" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
