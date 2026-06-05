import type { DayMap } from "@/data/trip";

export const dayMapsByNumber: Record<number, DayMap> = {
  1: {
    start: { name: "Bangkok", lat: 13.737, lng: 100.56 },
    end: { name: "Nakhon Sawan", lat: 15.7047, lng: 100.1372 },
    routePolyline: [
      [13.737, 100.56],
      [14.4745, 100.1177],
      [15.1852, 100.125],
      [15.7047, 100.1372],
    ],
  },
  2: {
    start: { name: "Nakhon Sawan", lat: 15.7047, lng: 100.1372 },
    end: { name: "Sukhothai", lat: 17.0196, lng: 99.7036 },
    routePolyline: [
      [15.7047, 100.1372],
      [16.4828, 99.522],
      [17.0196, 99.7036],
    ],
  },
  3: {
    start: { name: "Sukhothai", lat: 17.0196, lng: 99.7036 },
    end: { name: "Lamphun", lat: 18.5745, lng: 99.0087 },
    routePolyline: [
      [17.0196, 99.7036],
      [17.6256, 100.0993],
      [18.2888, 99.4909],
      [18.5745, 99.0087],
    ],
  },
  4: {
    start: { name: "Lamphun", lat: 18.5745, lng: 99.0087 },
    end: { name: "Mae Chaem", lat: 18.499, lng: 98.361 },
    routePolyline: [
      [18.5745, 99.0087],
      [18.417, 98.674],
      [18.5889, 98.4867],
      [18.499, 98.361],
    ],
  },
  5: {
    start: { name: "Mae Chaem", lat: 18.499, lng: 98.361 },
    end: { name: "Khun Yuam", lat: 18.8297, lng: 97.9336 },
    routePolyline: [
      [18.499, 98.361],
      [18.35, 98.15],
      [18.8297, 97.9336],
    ],
  },
  6: {
    start: { name: "Khun Yuam", lat: 18.8297, lng: 97.9336 },
    end: { name: "Mae Hong Son", lat: 19.3011, lng: 97.9654 },
    routePolyline: [
      [18.8297, 97.9336],
      [19.05, 97.95],
      [19.3011, 97.9654],
    ],
  },
  7: {
    start: { name: "Mae Hong Son", lat: 19.3011, lng: 97.9654 },
    end: { name: "Mae Hong Son", lat: 19.3011, lng: 97.9654 },
    routePolyline: [
      [19.3011, 97.9654],
      [19.314, 97.98],
      [19.3011, 97.9654],
    ],
  },
  8: {
    start: { name: "Mae Hong Son", lat: 19.3011, lng: 97.9654 },
    end: { name: "Pai", lat: 19.3583, lng: 98.4367 },
    routePolyline: [
      [19.3011, 97.9654],
      [19.5185, 98.2446],
      [19.3583, 98.4367],
    ],
  },
  9: {
    start: { name: "Pai", lat: 19.3583, lng: 98.4367 },
    end: { name: "Pai", lat: 19.3583, lng: 98.4367 },
    routePolyline: [
      [19.3583, 98.4367],
      [19.3149, 98.4522],
      [19.3583, 98.4367],
    ],
  },
  10: {
    start: { name: "Pai", lat: 19.3583, lng: 98.4367 },
    end: { name: "Lamphun", lat: 18.5745, lng: 99.0087 },
    routePolyline: [
      [19.3583, 98.4367],
      [19.1177, 98.9418],
      [18.7883, 98.9853],
      [18.5745, 99.0087],
    ],
  },
  11: {
    start: { name: "Lamphun", lat: 18.5745, lng: 99.0087 },
    end: { name: "Uttaradit", lat: 17.62, lng: 100.0993 },
    routePolyline: [
      [18.5745, 99.0087],
      [18.2888, 99.4909],
      [17.62, 100.0993],
    ],
  },
  12: {
    start: { name: "Uttaradit", lat: 17.62, lng: 100.0993 },
    end: { name: "Pichit", lat: 16.4429, lng: 100.3488 },
    routePolyline: [
      [17.62, 100.0993],
      [16.8211, 100.2659],
      [16.4429, 100.3488],
    ],
  },
  13: {
    start: { name: "Pichit", lat: 16.4429, lng: 100.3488 },
    end: { name: "Nakhon Sawan", lat: 15.7047, lng: 100.1372 },
    routePolyline: [
      [16.4429, 100.3488],
      [15.7047, 100.1372],
    ],
  },
  14: {
    start: { name: "Nakhon Sawan", lat: 15.7047, lng: 100.1372 },
    end: { name: "Bangkok", lat: 13.737, lng: 100.56 },
    routePolyline: [
      [15.7047, 100.1372],
      [15.1852, 100.125],
      [14.4745, 100.1177],
      [13.737, 100.56],
    ],
  },
};
