import { AppShell } from "@/components/AppShell";
import { MapMode } from "@/components/maps/MapMode";

export default function MapPage() {
  return (
    <AppShell title="Map mode" subtitle="Roadbook companion — not turn-by-turn">
      <MapMode />
    </AppShell>
  );
}
