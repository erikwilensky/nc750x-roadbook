import { NextResponse } from "next/server";

/** Quick check that GOOGLE_MAPS_API_KEY is set and Places API (New) responds. */
export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      message:
        "GOOGLE_MAPS_API_KEY is not set. Add it to .env.local locally or Vercel → Settings → Environment Variables, then restart/redeploy.",
    });
  }

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName",
      },
      body: JSON.stringify({
        textQuery: "B2 Budget Hotel Chiang Mai",
        maxResultCount: 1,
        regionCode: "TH",
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
    return NextResponse.json({
      ok: false,
      status: response.status,
      message,
      hint: "In Google Cloud: enable Places API (New), turn on billing, and restrict the key to that API only.",
    });
  }

  const data = await response.json();
  return NextResponse.json({
    ok: true,
    message: "Places API (New) is working.",
    samplePlace: data.places?.[0]?.displayName?.text ?? null,
  });
}
