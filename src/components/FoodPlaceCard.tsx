"use client";

import { FoodPlace } from "@/data/trip";
import { PlaceGuideLines } from "@/lib/placeGuide";
import { googleMapsSearchUrl } from "@/lib/maps";
import { PlacePhotoArea } from "./PlacePhotoArea";

type FoodPlaceCardProps = {
  place: FoodPlace;
  variant?: "primary" | "backup";
  loadPhotos?: boolean;
};

export function FoodPlaceCard({
  place,
  variant = "primary",
  loadPhotos = true,
}: FoodPlaceCardProps) {
  const compact = variant === "backup";

  return (
    <article
      className={`rounded-2xl border border-line bg-paper ${
        compact ? "p-3" : "overflow-hidden"
      }`}
    >
      {!compact && (
        <PlacePhotoArea
          query={place.query}
          name={place.name}
          loadPhotos={loadPhotos}
        />
      )}
      <div className={compact ? "" : "p-4"}>
        <h4
          className={`font-semibold text-forest ${compact ? "text-sm" : "text-base"}`}
        >
          {place.name}
        </h4>
        <PlaceGuideLines guide={place} compact={compact} />
        <a
          href={googleMapsSearchUrl(place.query)}
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
