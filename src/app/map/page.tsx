"use client";

import { AppShell } from "@/components/AppShell";
import { MapMode } from "@/components/maps/MapMode";
import { useLocale } from "@/i18n/LocaleProvider";

export default function MapPage() {
  const { t } = useLocale();

  return (
    <AppShell title={t.map.title} subtitle={t.map.subtitle}>
      <MapMode />
    </AppShell>
  );
}
