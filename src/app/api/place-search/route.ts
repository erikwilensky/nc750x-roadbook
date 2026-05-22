import { NextRequest, NextResponse } from "next/server";
import { getCachedPlaceSearch } from "@/lib/cachedPlaces";
import { PLACES_SEARCH_HTTP_CACHE } from "@/lib/placesCache";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const result = await getCachedPlaceSearch(query);

  if (result.status !== 200) {
    return NextResponse.json(
      {
        place: result.place,
        error: result.error,
        hint: result.hint,
      },
      {
        status: result.status,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  return NextResponse.json(
    { place: result.place },
    {
      headers: {
        "Cache-Control": PLACES_SEARCH_HTTP_CACHE,
      },
    }
  );
}
