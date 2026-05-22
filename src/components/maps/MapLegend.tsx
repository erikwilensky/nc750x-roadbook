import type { MapStopType } from "@/data/trip";

export const MAP_MARKER_COLORS: Record<MapStopType | "current", string> = {
  start: "#2d8a4e",
  end: "#173D32",
  hotel: "#173D32",
  coffee: "#C9A24A",
  food: "#d97706",
  viewpoint: "#2563eb",
  fuel: "#6F6A5F",
  current: "#dc2626",
};

const LABELS: Record<MapStopType | "current", string> = {
  start: "Start",
  end: "End",
  hotel: "Hotel",
  coffee: "Coffee",
  food: "Food",
  viewpoint: "Viewpoint",
  fuel: "Fuel",
  current: "You",
};

export function MapLegend({ compact = false }: { compact?: boolean }) {
  const items: Array<MapStopType | "current"> = [
    "start",
    "hotel",
    "coffee",
    "food",
    "viewpoint",
    "current",
  ];

  return (
    <ul
      className={`flex flex-wrap gap-2 text-xs text-muted ${compact ? "gap-1.5" : "gap-3"}`}
      aria-label="Map legend"
    >
      {items.map((type) => (
        <li key={type} className="inline-flex items-center gap-1.5">
          <span
            className="map-legend-swatch"
            style={{ background: MAP_MARKER_COLORS[type] }}
          />
          <span>{LABELS[type]}</span>
        </li>
      ))}
    </ul>
  );
}
