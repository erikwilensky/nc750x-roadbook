export type PlaceSearchResult = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  googleMapsUri?: string;
  photos?: Array<{
    name?: string;
    authorAttributions?: Array<{
      displayName?: string;
      uri?: string;
    }>;
  }>;
};

export function placePhotoProxyUrl(
  photoName: string,
  maxWidthPx = 900
): string {
  const params = new URLSearchParams({
    name: photoName,
    maxWidthPx: String(maxWidthPx),
  });
  return `/api/place-photo?${params.toString()}`;
}

export function getPlaceDisplayName(place: PlaceSearchResult): string {
  return place.displayName?.text ?? "Unknown place";
}

export function getFirstPhotoName(place: PlaceSearchResult): string | null {
  return place.photos?.[0]?.name ?? null;
}

export function getPhotoAttribution(place: PlaceSearchResult): string | null {
  const attr = place.photos?.[0]?.authorAttributions?.[0];
  return attr?.displayName ?? null;
}
