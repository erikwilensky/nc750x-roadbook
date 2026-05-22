import type { DayMap } from "@/data/trip";

export const dayMapsByNumber: Record<number, DayMap> = {
  1: {
    start: { name: "Bangkok", lat: 13.737, lng: 100.56 },
    end: { name: "Uthai Thani", lat: 15.3794, lng: 100.0245 },
    routePolyline: [
      [13.737, 100.56],
      [14.4745, 100.1177],
      [15.1852, 100.125],
      [15.3794, 100.0245],
    ],
  },
  2: {
    start: { name: "Uthai Thani", lat: 15.3794, lng: 100.0245 },
    end: { name: "Sukhothai", lat: 17.0196, lng: 99.7036 },
    routePolyline: [
      [15.3794, 100.0245],
      [16.4828, 99.522],
      [17.0196, 99.7036],
    ],
  },
  3: {
    start: { name: "Sukhothai", lat: 17.0196, lng: 99.7036 },
    end: { name: "Lampang", lat: 18.2888, lng: 99.4909 },
    routePolyline: [
      [17.0196, 99.7036],
      [17.6256, 100.0993],
      [18.2888, 99.4909],
    ],
  },
  4: {
    start: { name: "Lampang", lat: 18.2888, lng: 99.4909 },
    end: { name: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    routePolyline: [
      [18.2888, 99.4909],
      [18.4642, 99.14],
      [18.7883, 98.9853],
    ],
  },
  5: {
    start: { name: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    end: { name: "Mae Chaem", lat: 18.499, lng: 98.361 },
    routePolyline: [
      [18.7883, 98.9853],
      [18.417, 98.674],
      [18.5889, 98.4867],
      [18.499, 98.361],
    ],
  },
  6: {
    start: { name: "Mae Chaem", lat: 18.499, lng: 98.361 },
    end: { name: "Mae Sariang", lat: 18.1667, lng: 97.9333 },
    routePolyline: [
      [18.499, 98.361],
      [18.35, 98.15],
      [18.1667, 97.9333],
    ],
  },
  7: {
    start: { name: "Mae Sariang", lat: 18.1667, lng: 97.9333 },
    end: { name: "Mae Hong Son", lat: 19.3011, lng: 97.9654 },
    routePolyline: [
      [18.1667, 97.9333],
      [18.8297, 97.9336],
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
    end: { name: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    routePolyline: [
      [19.3583, 98.4367],
      [19.1177, 98.9418],
      [18.7883, 98.9853],
    ],
  },
  11: {
    start: { name: "Chiang Mai", lat: 18.7883, lng: 98.9853 },
    end: { name: "Tak", lat: 16.8833, lng: 99.125 },
    routePolyline: [
      [18.7883, 98.9853],
      [18.2888, 99.4909],
      [17.0, 99.25],
      [16.8833, 99.125],
    ],
  },
  12: {
    start: { name: "Tak", lat: 16.8833, lng: 99.125 },
    end: { name: "Nakhon Sawan", lat: 15.7047, lng: 100.1372 },
    routePolyline: [
      [16.8833, 99.125],
      [16.4828, 99.522],
      [15.7047, 100.1372],
    ],
  },
  13: {
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
