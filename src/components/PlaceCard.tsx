"use client";

import { useEffect, useMemo, useState } from "react";
import { TripPlace } from "@/data/trip";
import {
  getFirstPhotoName,
  getPhotoAttribution,
  getPlaceDisplayName,
  placePhotoProxyUrl,
  type PlaceSearchResult,
} from "@/lib/googlePlaces";
import { googleImageSearchUrl, googleMapsSearchUrl } from "@/lib/maps";
import {
  parseRouteEndpoints,
  routeDirectionsUrl,
  routePhotoSearchQuery,
} from "@/lib/routePlace";

type PlaceCardProps = {
  place: TripPlace;
  large?: boolean;
  loadPhotos?: boolean;
};

type PhotoStatus = "idle" | "loading" | "ok" | "no_match" | "api_error";

function photoStatusMessage(
  status: PhotoStatus,
  apiError?: string | null
): string {
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

function RouteFallbackPanel({ place }: { place: TripPlace }) {
  const endpoints = parseRouteEndpoints(place.name);
  const directions = routeDirectionsUrl(place);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-forest/10 via-cream to-gold/10 p-6 text-center">
      <div className="flex w-full max-w-[200px] items-center gap-2 text-forest">
        <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
        <span className="h-0.5 flex-1 bg-gold/60" />
        <span className="text-lg" aria-hidden>
          →
        </span>
        <span className="h-0.5 flex-1 bg-gold/60" />
        <span className="h-2 w-2 shrink-0 rounded-full bg-forest" />
      </div>
      {endpoints && (
        <p className="text-sm font-medium text-forest">
          {endpoints.origin} → {endpoints.destination}
        </p>
      )}
      <p className="max-w-[240px] text-xs text-muted">
        Driving routes don&apos;t have Google place photos — use directions for
        the full ride.
      </p>
      {directions && (
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs"
        >
          Open route in Google Maps
        </a>
      )}
    </div>
  );
}

export function PlaceCard({
  place,
  large = false,
  loadPhotos = true,
}: PlaceCardProps) {
  const isRoute = place.type === "route";
  const searchQuery = useMemo(
    () => (isRoute ? routePhotoSearchQuery(place) : place.query),
    [isRoute, place]
  );

  const [status, setStatus] = useState<PhotoStatus>(
    loadPhotos && !place.manualImageUrl ? "loading" : "idle"
  );
  const [placeData, setPlaceData] = useState<PlaceSearchResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const directionsUrl = isRoute ? routeDirectionsUrl(place) : null;

  useEffect(() => {
    if (!loadPhotos || place.manualImageUrl) {
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
          `/api/place-search?query=${encodeURIComponent(searchQuery)}`
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
  }, [searchQuery, place.manualImageUrl, loadPhotos]);

  const photoName = placeData ? getFirstPhotoName(placeData) : null;
  const photoUrl =
    place.manualImageUrl ??
    (photoName && !imgError && status === "ok"
      ? placePhotoProxyUrl(photoName, large ? 1200 : 600)
      : null);

  const displayName = placeData
    ? isRoute
      ? place.name
      : getPlaceDisplayName(placeData)
    : place.name;
  const rating = !isRoute ? placeData?.rating : undefined;
  const mapsUrl =
    directionsUrl ??
    place.mapsUrl ??
    placeData?.googleMapsUri ??
    googleMapsSearchUrl(isRoute ? place.name : place.query);
  const attribution = placeData ? getPhotoAttribution(placeData) : null;

  const typeLabels: Record<string, string> = {
    hotel: "Stay",
    food: "Food",
    viewpoint: "View",
    route: "Route",
    town: "Town",
  };

  const showFallback =
    status !== "loading" && (!photoUrl || imgError);
  const showRouteFallback = isRoute && showFallback && status !== "api_error";
  const photoMessage = photoStatusMessage(
    imgError && status === "ok" ? "no_match" : status,
    apiError
  );

  const mapsButtonLabel = isRoute
    ? "Open route in Google Maps"
    : "Open in Google Maps";

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
        {showFallback && showRouteFallback && (
          <RouteFallbackPanel place={place} />
        )}
        {showFallback && !showRouteFallback && (
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
        {isRoute && photoUrl && !showFallback && (
          <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-2 py-1 text-xs font-medium text-paper">
            Route · {parseRouteEndpoints(place.name)?.destination ?? "Today"}
          </span>
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
        {isRoute && placeData && (
          <p className="mt-1 text-xs text-muted">
            Photo: {getPlaceDisplayName(placeData)}
          </p>
        )}
        {place.notes && (
          <p className="mt-1 text-sm text-muted">{place.notes}</p>
        )}
        {placeData?.formattedAddress && !isRoute && (
          <p className="mt-1 text-xs text-muted">{placeData.formattedAddress}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            {mapsButtonLabel}
          </a>
          {!isRoute && (
            <a
              href={googleImageSearchUrl(place.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              Search images
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
