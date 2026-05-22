/** How long cached place data is reused before calling Google again (seconds). */
export const PLACES_CACHE_REVALIDATE_SECONDS = Number(
  process.env.PLACES_CACHE_REVALIDATE_SECONDS ?? 60 * 60 * 24 * 30
);

/** Browser / CDN cache for proxied photo bytes (not permanent disk storage). */
export const PLACES_PHOTO_HTTP_CACHE =
  `public, max-age=${PLACES_CACHE_REVALIDATE_SECONDS}, s-maxage=${PLACES_CACHE_REVALIDATE_SECONDS}, stale-while-revalidate=86400`;

/** JSON responses from our place-search API. */
export const PLACES_SEARCH_HTTP_CACHE =
  `public, max-age=${PLACES_CACHE_REVALIDATE_SECONDS}, s-maxage=${PLACES_CACHE_REVALIDATE_SECONDS}`;
