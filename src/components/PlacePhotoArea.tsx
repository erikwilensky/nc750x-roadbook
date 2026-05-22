"use client";

import { useEffect, useState } from "react";
import {
  getFirstPhotoName,
  getPhotoAttribution,
  placePhotoProxyUrl,
  type PlaceSearchResult,
} from "@/lib/googlePlaces";

type PhotoStatus = "idle" | "loading" | "ok" | "no_match" | "api_error";

type PlacePhotoAreaProps = {
  query: string;
  name: string;
  large?: boolean;
  manualImageUrl?: string;
  loadPhotos?: boolean;
  fallbackHint?: string;
};

export function PlacePhotoArea({
  query,
  name,
  large = false,
  manualImageUrl,
  loadPhotos = true,
  fallbackHint,
}: PlacePhotoAreaProps) {
  const [status, setStatus] = useState<PhotoStatus>(
    loadPhotos && !manualImageUrl ? "loading" : "idle"
  );
  const [placeData, setPlaceData] = useState<PlaceSearchResult | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!loadPhotos || manualImageUrl) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setImgError(false);

    async function fetchPlace() {
      try {
        const res = await fetch(
          `/api/place-search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.place) {
          setStatus("no_match");
          return;
        }
        setPlaceData(data.place);
        setStatus("ok");
      } catch {
        if (!cancelled) setStatus("api_error");
      }
    }

    fetchPlace();
    return () => {
      cancelled = true;
    };
  }, [query, manualImageUrl, loadPhotos]);

  const photoName = placeData ? getFirstPhotoName(placeData) : null;
  const photoUrl =
    manualImageUrl ??
    (photoName && !imgError && status === "ok"
      ? placePhotoProxyUrl(photoName, large ? 1200 : 600)
      : null);

  const attribution = placeData ? getPhotoAttribution(placeData) : null;
  const showFallback = status !== "loading" && !photoUrl;

  return (
    <div
      className={`relative bg-cream ${
        large ? "aspect-[21/9] min-h-[200px]" : "aspect-[16/10]"
      }`}
    >
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-line/50" />
      )}
      {photoUrl && !showFallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={name}
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
            className="mb-2 h-12 w-12 opacity-50"
          />
          <p className="max-w-[220px] text-xs text-muted">
            {fallbackHint ?? "No photo from Google — use Search images below"}
          </p>
        </div>
      )}
      {attribution && photoUrl && !showFallback && (
        <p className="absolute bottom-0 left-0 right-0 bg-forest/80 px-2 py-1 text-xs text-paper">
          {attribution}
        </p>
      )}
    </div>
  );
}
