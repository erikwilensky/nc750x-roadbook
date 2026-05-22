"use client";

import { useCallback, useState } from "react";
import type { LatLng } from "@/lib/distance";

export type LocationPermissionStatus =
  | "idle"
  | "prompt"
  | "granted"
  | "denied"
  | "unavailable";

export function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationPermissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setPermissionStatus("unavailable");
      setError("Geolocation is not supported in this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setPermissionStatus("granted");
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionStatus("denied");
          setError(
            "Location access is off. You can still use map links and day routes."
          );
        } else {
          setPermissionStatus("unavailable");
          setError(err.message || "Could not read your location.");
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  return {
    currentLocation,
    permissionStatus,
    error,
    loading,
    requestLocation,
  };
}
