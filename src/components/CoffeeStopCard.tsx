"use client";

import { CoffeeStop } from "@/data/trip";
import {
  COFFEE_ROLE_BADGE,
  COFFEE_ROLE_LABELS,
} from "@/lib/coffeeStops";
import { PlaceGuideLines } from "@/lib/placeGuide";
import { googleMapsSearchUrl } from "@/lib/maps";
import { PlacePhotoArea } from "./PlacePhotoArea";

type CoffeeStopCardProps = {
  stop: CoffeeStop;
  compact?: boolean;
  loadPhotos?: boolean;
};

export function CoffeeStopCard({
  stop,
  compact = false,
  loadPhotos = true,
}: CoffeeStopCardProps) {
  return (
    <article
      className={`rounded-2xl border border-line bg-paper ${compact ? "p-3" : "overflow-hidden"}`}
    >
      {!compact && (
        <PlacePhotoArea
          query={stop.query}
          name={stop.name}
          loadPhotos={loadPhotos}
        />
      )}
      <div className={compact ? "" : "p-4"}>
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${COFFEE_ROLE_BADGE[stop.role]}`}
        >
          {COFFEE_ROLE_LABELS[stop.role]}
        </span>
        <h4
          className={`mt-2 font-semibold text-forest ${compact ? "text-sm" : "text-base"}`}
        >
          {stop.name}
        </h4>
        <p className="mt-1 text-sm text-muted">{stop.note}</p>
        <PlaceGuideLines guide={stop} compact={compact} />
        <a
          href={googleMapsSearchUrl(stop.query)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary mt-3 inline-block text-xs"
        >
          Open in Google Maps
        </a>
      </div>
    </article>
  );
}
