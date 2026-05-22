import { unstable_cache } from "next/cache";
import { PLACES_CACHE_REVALIDATE_SECONDS } from "./placesCache";

export type CachedPlaceSearchResult = {
  place: unknown;
  error?: string;
  hint?: string;
  status: number;
};

async function fetchPlaceFromGoogle(
  query: string
): Promise<CachedPlaceSearchResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return {
      place: null,
      status: 500,
      error: "Missing GOOGLE_MAPS_API_KEY",
    };
  }

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.id",
          "places.displayName",
          "places.formattedAddress",
          "places.rating",
          "places.googleMapsUri",
          "places.photos.name",
          "places.photos.authorAttributions",
        ].join(","),
      },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 1,
        regionCode: "TH",
        languageCode: "en",
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const parsed = JSON.parse(text) as {
        error?: { message?: string };
      };
      message = parsed.error?.message ?? text;
    } catch {
      /* raw */
    }
    return {
      place: null,
      status: response.status,
      error: message,
      hint:
        response.status === 403
          ? "Enable Places API (New) in Google Cloud Console and allow it on this API key."
          : undefined,
    };
  }

  const data = await response.json();
  return {
    place: data.places?.[0] ?? null,
    status: 200,
  };
}

export function getCachedPlaceSearch(query: string) {
  return unstable_cache(
    () => fetchPlaceFromGoogle(query),
    ["place-search", query],
    {
      revalidate: PLACES_CACHE_REVALIDATE_SECONDS,
      tags: [`place-search-${query}`],
    }
  )();
}

type CachedPhotoPayload = {
  contentType: string;
  base64: string;
  status: number;
};

async function fetchPhotoFromGoogle(
  name: string,
  maxWidthPx: string
): Promise<CachedPhotoPayload> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return { contentType: "application/json", base64: "", status: 500 };
  }

  const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${encodeURIComponent(maxWidthPx)}`;
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "X-Goog-Api-Key": apiKey },
  });

  if (!response.ok) {
    return { contentType: "application/json", base64: "", status: response.status };
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const buffer = await response.arrayBuffer();
  return {
    contentType,
    base64: Buffer.from(buffer).toString("base64"),
    status: 200,
  };
}

export function getCachedPlacePhoto(name: string, maxWidthPx: string) {
  return unstable_cache(
    () => fetchPhotoFromGoogle(name, maxWidthPx),
    ["place-photo", name, maxWidthPx],
    {
      revalidate: PLACES_CACHE_REVALIDATE_SECONDS,
      tags: [`place-photo-${name}-${maxWidthPx}`],
    }
  )();
}
