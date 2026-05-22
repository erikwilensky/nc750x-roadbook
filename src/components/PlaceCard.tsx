"use client";

import { useEffect, useState } from "react";
import { TripPlace } from "@/data/trip";
import {
  getFirstPhotoName,
  getPhotoAttribution,
  getPlaceDisplayName,
  placePhotoProxyUrl,
  type PlaceSearchResult,
} from "@/lib/googlePlaces";
import { googleImageSearchUrl, googleMapsSearchUrl } from "@/lib/maps";
import { MapButton } from "./MapButton";

type PlaceCardProps = {
  place: TripPlace;
  large?: boolean;
  loadPhotos?: boolean;
};

export function PlaceCard({
  place,
  large = false,
  loadPhotos = true,
}: PlaceCardProps) {
  const [loading, setLoading] = useState(loadPhotos);
  const [placeData, setPlaceData] = useState<PlaceSearchResult | null>(null);
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!loadPhotos || place.manualImageUrl) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPlace() {
      try {
        const res = await fetch(
          `/api/place-search?query=${encodeURIComponent(place.query)}`
        );
        if (!res.ok) throw new Error("search failed");
        const data = await res.json();
        if (!cancelled) {
          setPlaceData(data.place);
          if (!data.place) setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlace();
    return () => {
      cancelled = true;
    };
  }, [place.query, place.manualImageUrl, loadPhotos]);

  const photoName = placeData ? getFirstPhotoName(placeData) : null;
  const photoUrl =
    place.manualImageUrl ??
    (photoName && !imgError && !error
      ? placePhotoProxyUrl(photoName, large ? 1200 : 600)
      : null);

  const displayName = placeData
    ? getPlaceDisplayName(placeData)
    : place.name;
  const rating = placeData?.rating;
  const mapsUrl =
    place.mapsUrl ??
    placeData?.googleMapsUri ??
    googleMapsSearchUrl(place.query);
  const attribution = placeData ? getPhotoAttribution(placeData) : null;

  const typeLabels: Record<string, string> = {
    hotel: "Stay",
    coffee: "Coffee",
    food: "Food",
    viewpoint: "View",
    route: "Route",
    town: "Town",
  };

  const showFallback = !loading && (!photoUrl || error || imgError);

  return (
    <article
      className={`card overflow-hidden ${large ? "col-span-full" : ""}`}
    >
      <div
        className={`relative bg-cream ${
          large ? "aspect-[21/9] min-h-[200px]" : "aspect-[4/3]"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-line/50" />
        )}
        {photoUrl && !showFallback && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={displayName}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {showFallback && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream p-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder.svg"
              alt=""
              className="h-16 w-16 opacity-60"
            />
            <p className="text-sm text-muted">Photo unavailable</p>
          </div>
        )}
        {attribution && photoUrl && !showFallback && (
          <p className="absolute bottom-0 left-0 right-0 bg-forest/80 px-2 py-1 text-xs text-paper">
            {attribution}
          </p>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="badge">{typeLabels[place.type] ?? place.type}</span>
          {rating != null && (
            <span className="text-xs text-muted">★ {rating.toFixed(1)}</span>
          )}
        </div>
        <h3 className={`font-semibold text-forest ${large ? "text-xl" : "text-base"}`}>
          {displayName}
        </h3>
        {place.notes && (
          <p className="mt-1 text-sm text-muted">{place.notes}</p>
        )}
        {placeData?.formattedAddress && (
          <p className="mt-1 text-xs text-muted">{placeData.formattedAddress}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            Open in Google Maps
          </a>
          <a
            href={googleImageSearchUrl(place.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs"
          >
            Search images
          </a>
          {!placeData && !loading && (
            <MapButton query={place.query} className="text-xs" />
          )}
        </div>
      </div>
    </article>
  );
}
