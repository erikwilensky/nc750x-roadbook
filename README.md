# NC750X Roadbook Builder

Personal web roadbook for the **Bangkok to Mae Hong Son Loop** — 13-day Honda NC750X ride plan (21 June – 3 July 2026).

## Features

- Dashboard with budget summary, route phases, and day cards
- Day detail pages (`/day/1` … `/day/13`) with costs, notes, and Google Places photos
- Print/PDF mode at `/print` (browser Print → Save as PDF)
- Server-side Google Places API (API key never exposed to the browser)

## Setup

```bash
npm install
cp .env.example .env.local
```

Add your Google Maps API key to `.env.local`:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Enable **Places API (New)** in [Google Cloud Console](https://console.cloud.google.com/). Restrict the key to server IPs or use Vercel env vars in production.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `GOOGLE_MAPS_API_KEY` in project Environment Variables
4. Deploy

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

Trip data lives in `src/data/trip.ts`.
