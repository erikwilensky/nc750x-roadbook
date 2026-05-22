import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { MapMode } from "@/components/maps/MapMode";
import { getDayByNumber } from "@/data/trip";

type PageProps = {
  params: Promise<{ dayNumber: string }>;
};

export default async function MapDayPage({ params }: PageProps) {
  const { dayNumber } = await params;
  const n = Number(dayNumber);
  if (!Number.isFinite(n) || n < 1 || n > 13) notFound();
  const day = getDayByNumber(n);
  if (!day) notFound();

  return (
    <AppShell title="Map mode" subtitle={`Day ${day.day} — ${day.title}`}>
      <MapMode initialDay={n} />
    </AppShell>
  );
}
