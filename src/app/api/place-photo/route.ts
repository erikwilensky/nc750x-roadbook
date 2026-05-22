import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const maxWidthPx = req.nextUrl.searchParams.get("maxWidthPx") ?? "900";

  if (!name) {
    return NextResponse.json({ error: "Missing photo name" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY" },
      { status: 500 }
    );
  }

  const url = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${encodeURIComponent(maxWidthPx)}`;

  const response = await fetch(url, {
    redirect: "follow",
    headers: { "X-Goog-Api-Key": apiKey },
  });
  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not load photo" },
      { status: response.status }
    );
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    },
  });
}
