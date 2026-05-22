import {
  CoffeeStop,
  DepartureCoffeeOption,
  FoodPlace,
  MapStop,
  TripDayEnriched,
  TripPlace,
} from "@/data/trip";
import { getDayMap } from "@/data/trip";
import { TOWN_COORDS } from "@/data/townCoords";
import { makeGoogleMapsSearchUrl } from "@/lib/mapLinks";

function guessCoords(query: string, name: string): {
  lat: number;
  lng: number;
} | null {
  const text = `${query} ${name}`.toLowerCase();
  const rules: Array<[string, keyof typeof TOWN_COORDS]> = [
    ["bangkok", "bangkok"],
    ["sukhumvit", "bangkok"],
    ["uthai", "uthaiThani"],
    ["sukhothai", "sukhothai"],
    ["uttaradit", "uttaradit"],
    ["lampang", "lampang"],
    ["chiang mai", "chiangMai"],
    ["santitham", "chiangMai"],
    ["doi inthanon", "doiInthanon"],
    ["chom thong", "doiInthanon"],
    ["mae chaem", "maeChaem"],
    ["mae sariang", "maeSariang"],
    ["khun yuam", "khunYuam"],
    ["mae hong son", "maeHongSon"],
    ["jong kham", "maeHongSon"],
    ["pang mapha", "pangMapha"],
    ["soppong", "pangMapha"],
    [" pai", "pai"],
    ["mae taeng", "maeTaeng"],
    [" kamphaeng", "kamphaengPhet"],
    ["nakhon sawan", "nakhonSawan"],
    ["chainat", "chainat"],
    ["suphan", "suphanBuri"],
    [" tak", "tak"],
  ];

  for (const [needle, key] of rules) {
    if (text.includes(needle)) {
      const t = TOWN_COORDS[key];
      return { lat: t.lat, lng: t.lng };
    }
  }
  return null;
}

type MapStopInput = Omit<MapStop, "mapsUrl" | "coordinateStatus" | "lat" | "lng"> & {
  lat?: number | null;
  lng?: number | null;
};

function toMapStop(partial: MapStopInput): MapStop {
  const guessed =
    partial.lat != null && partial.lng != null
      ? { lat: partial.lat, lng: partial.lng }
      : guessCoords(partial.query, partial.name);

  return {
    ...partial,
    lat: guessed?.lat ?? null,
    lng: guessed?.lng ?? null,
    coordinateStatus: guessed ? "approximate" : "approximate",
    mapsUrl: makeGoogleMapsSearchUrl(partial.query),
  };
}

function coffeeToStop(day: number, c: CoffeeStop, index: number): MapStop {
  return toMapStop({
    id: `d${day}-coffee-${index}`,
    type: "coffee",
    role: c.role,
    name: c.name,
    query: c.query,
    note: c.note,
    whySpecial: c.whySpecial,
    orderSuggestion: c.orderSuggestion,
    viewOrVibe: c.viewOrVibe,
    riderNote: c.riderNote,
  });
}

function foodToStop(day: number, f: FoodPlace, suffix: string): MapStop {
  return toMapStop({
    id: `d${day}-food-${suffix}`,
    type: "food",
    name: f.name,
    query: f.query,
    whySpecial: f.whySpecial,
    orderSuggestion: f.orderSuggestion,
    viewOrVibe: f.viewOrVibe,
    riderNote: f.riderNote,
  });
}

function placeToStop(p: TripPlace): MapStop | null {
  if (p.type === "route") return null;
  return toMapStop({
    id: p.id,
    type: p.type === "viewpoint" ? "viewpoint" : "hotel",
    name: p.name,
    query: p.query,
    whySpecial: p.notes ?? "",
    orderSuggestion: "",
    viewOrVibe: "",
    riderNote: "",
  });
}

function departureCoffeeToStop(
  day: number,
  d: DepartureCoffeeOption
): MapStop {
  return toMapStop({
    id: `d${day}-departure-coffee`,
    type: "coffee",
    role: "departure",
    name: d.name,
    query: d.query,
    note: d.note,
    whySpecial: d.whySpecial,
    orderSuggestion: d.orderSuggestion,
    viewOrVibe: d.viewOrVibe,
    riderNote: d.riderNote,
  });
}

/** Planned stop order for map + next-stop panel. */
export function buildPlannedMapStops(day: TripDayEnriched): MapStop[] {
  const dayMap = getDayMap(day.day);
  const stops: MapStop[] = [];

  stops.push(
    toMapStop({
      id: `d${day.day}-start`,
      type: "start",
      name: dayMap.start.name,
      query: dayMap.start.name,
      lat: dayMap.start.lat,
      lng: dayMap.start.lng,
      whySpecial: "Day start",
      orderSuggestion: "",
      viewOrVibe: "",
      riderNote: "",
    })
  );

  if (day.departureOption) {
    stops.push(departureCoffeeToStop(day.day, day.departureOption));
  }

  const coffees = day.coffeeStops.filter((c) => c.role !== "local_day");
  const departureCoffee = coffees.find((c) => c.role === "departure");
  const midCoffees = coffees.filter((c) => c.role === "mid_route");
  const arrivalCoffee = coffees.find((c) => c.role === "arrival");
  const localCoffees = day.coffeeStops.filter((c) => c.role === "local_day");

  if (departureCoffee && !day.departureOption) {
    stops.push(coffeeToStop(day.day, departureCoffee, 0));
  }
  midCoffees.forEach((c, i) => stops.push(coffeeToStop(day.day, c, i + 1)));

  day.places
    .filter((p) => p.type === "viewpoint")
    .forEach((p) => {
      const s = placeToStop(p);
      if (s) stops.push(s);
    });

  if (arrivalCoffee) stops.push(coffeeToStop(day.day, arrivalCoffee, 99));

  const hotel = day.places.find((p) => p.type === "hotel");
  if (hotel) {
    const s = placeToStop(hotel);
    if (s) stops.push(s);
  }

  if (day.day === 9) {
    localCoffees.forEach((c, i) => stops.push(coffeeToStop(day.day, c, 200 + i)));
  }

  stops.push(foodToStop(day.day, day.food.primary, "primary"));

  if (day.day !== 9) {
    localCoffees.forEach((c, i) => stops.push(coffeeToStop(day.day, c, 300 + i)));
  }

  stops.push(
    toMapStop({
      id: `d${day.day}-end`,
      type: "end",
      name: dayMap.end.name,
      query: dayMap.end.name,
      lat: dayMap.end.lat,
      lng: dayMap.end.lng,
      whySpecial: "Day end / overnight anchor",
      orderSuggestion: "",
      viewOrVibe: "",
      riderNote: "",
    })
  );

  return stops;
}

export function getMapStopsWithCoords(day: TripDayEnriched): MapStop[] {
  return buildPlannedMapStops(day).filter((s) => s.lat != null && s.lng != null);
}
