import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY" },
      { status: 500 }
    );
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
        error?: { message?: string; status?: string };
      };
      message = parsed.error?.message ?? text;
    } catch {
      /* use raw text */
    }
    return NextResponse.json(
      {
        place: null,
        error: message,
        hint:
          response.status === 403
            ? "Enable Places API (New) in Google Cloud Console and allow it on this API key."
            : undefined,
      },
      { status: response.status }
    );
  }

  const data = await response.json();
  const place = data.places?.[0] ?? null;
  return NextResponse.json({ place });
}
