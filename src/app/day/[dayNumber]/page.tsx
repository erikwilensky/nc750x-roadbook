import { notFound } from "next/navigation";
import { DayPageClient } from "@/components/DayPageClient";
import { trip } from "@/data/trip";

type PageProps = {
  params: Promise<{ dayNumber: string }>;
};

export function generateStaticParams() {
  return trip.days.map((d) => ({ dayNumber: String(d.day) }));
}

export default async function DayPage({ params }: PageProps) {
  const { dayNumber } = await params;
  const num = parseInt(dayNumber, 10);

  if (!trip.days.some((d) => d.day === num)) {
    notFound();
  }

  return <DayPageClient dayNumber={num} />;
}
