import { NextRequest, NextResponse } from "next/server";
import { getCachedPlacePhoto } from "@/lib/cachedPlaces";
import { PLACES_PHOTO_HTTP_CACHE } from "@/lib/placesCache";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const maxWidthPx = req.nextUrl.searchParams.get("maxWidthPx") ?? "900";

  if (!name) {
    return NextResponse.json({ error: "Missing photo name" }, { status: 400 });
  }

  const cached = await getCachedPlacePhoto(name, maxWidthPx);

  if (cached.status !== 200 || !cached.base64) {
    return NextResponse.json(
      { error: "Could not load photo" },
      { status: cached.status === 200 ? 502 : cached.status }
    );
  }

  const buffer = Buffer.from(cached.base64, "base64");

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": cached.contentType,
      "Cache-Control": PLACES_PHOTO_HTTP_CACHE,
    },
  });
}
