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

const PHOTO_SKIP_TYPES = new Set(["route"]);

type PlaceCardProps = {
  place: TripPlace;
  large?: boolean;
  loadPhotos?: boolean;
};

type PhotoStatus = "idle" | "loading" | "ok" | "no_match" | "api_error";

function photoStatusMessage(
  status: PhotoStatus,
  place: TripPlace,
  skipPhotoLookup: boolean,
  apiError?: string | null
): string {
  if (skipPhotoLookup && place.type === "route") {
    return "Route overview — open Maps for the drive";
  }
  if (status === "api_error") {
    if (apiError?.includes("Missing GOOGLE_MAPS_API_KEY")) {
      return "Add GOOGLE_MAPS_API_KEY to .env.local (local) or Vercel env vars";
    }
    if (
      apiError?.includes("PERMISSION_DENIED") ||
      apiError?.toLowerCase().includes("not enabled")
    ) {
      return "Enable Places API (New) on your Google Cloud project";
    }
    return "Places API error — check key and billing in Google Cloud";
  }
  if (status === "no_match") {
    return "No matching place on Google — use Search images";
  }
  return "Photo unavailable";
}

export function PlaceCard({
  place,
  large = false,
  loadPhotos = true,
}: PlaceCardProps) {
  const [status, setStatus] = useState<PhotoStatus>(
    loadPhotos ? "loading" : "idle"
  );
  const [placeData, setPlaceData] = useState<PlaceSearchResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const skipPhotoLookup =
    PHOTO_SKIP_TYPES.has(place.type) || Boolean(place.manualImageUrl);

  useEffect(() => {
    if (!loadPhotos || skipPhotoLookup) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setApiError(null);
    setImgError(false);

    async function fetchPlace() {
      try {
        const res = await fetch(
          `/api/place-search?query=${encodeURIComponent(place.query)}`
        );
        const data = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setApiError(
            typeof data.error === "string"
              ? data.hint
                ? `${data.error} — ${data.hint}`
                : data.error
              : "Request failed"
          );
          setStatus("api_error");
          return;
        }

        if (!data.place) {
          setStatus("no_match");
          return;
        }

        setPlaceData(data.place);
        setStatus("ok");
      } catch {
        if (!cancelled) {
          setApiError("Network error calling place search");
          setStatus("api_error");
        }
      }
    }

    fetchPlace();
    return () => {
      cancelled = true;
    };
  }, [place.query, skipPhotoLookup, loadPhotos]);

  const photoName = placeData ? getFirstPhotoName(placeData) : null;
  const photoUrl =
    place.manualImageUrl ??
    (photoName && !imgError && status === "ok"
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

  const showFallback =
    status !== "loading" && (skipPhotoLookup || !photoUrl || imgError);
  const photoMessage = photoStatusMessage(
    imgError && status === "ok" ? "no_match" : status,
    place,
    skipPhotoLookup,
    apiError
  );

  return (
    <article
      className={`card overflow-hidden ${large ? "col-span-full" : ""}`}
    >
      <div
        className={`relative bg-cream ${
          large ? "aspect-[21/9] min-h-[200px]" : "aspect-[4/3]"
        }`}
      >
        {status === "loading" && (
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
            <p className="max-w-[220px] text-sm text-muted">{photoMessage}</p>
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
        <h3
          className={`font-semibold text-forest ${large ? "text-xl" : "text-base"}`}
        >
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
        </div>
      </div>
    </article>
  );
}
