import L from "leaflet";

let iconsReady = false;

/** Fix default marker icons broken under Vite / Next bundlers. */
export function setupLeafletIcons(): void {
  if (typeof window === "undefined" || iconsReady) return;
  iconsReady = true;

  const proto = L.Icon.Default.prototype as L.Icon.Default & {
    _getIconUrl?: unknown;
  };
  delete proto._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export function markerDivIcon(color: string, size = 14): L.DivIcon {
  return L.divIcon({
    className: "leaflet-div-icon-custom",
    html: `<span class="map-pin" style="--pin-color:${color}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}
