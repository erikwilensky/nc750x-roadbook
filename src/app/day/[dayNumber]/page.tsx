import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DayDetail } from "@/components/DayDetail";
import { getDayByNumber, trip } from "@/data/trip";

type PageProps = {
  params: Promise<{ dayNumber: string }>;
};

export function generateStaticParams() {
  return trip.days.map((d) => ({ dayNumber: String(d.day) }));
}

export default async function DayPage({ params }: PageProps) {
  const { dayNumber } = await params;
  const num = parseInt(dayNumber, 10);
  const day = getDayByNumber(num);

  if (!day) {
    notFound();
  }

  const prev = num > 1 ? num - 1 : null;
  const next = num < trip.days.length ? num + 1 : null;

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-sm text-muted hover:text-forest">
          ← Back to dashboard
        </Link>
        <div className="flex gap-2">
          {prev && (
            <Link href={`/day/${prev}`} className="btn-secondary text-sm">
              Day {prev}
            </Link>
          )}
          {next && (
            <Link href={`/day/${next}`} className="btn-secondary text-sm">
              Day {next}
            </Link>
          )}
        </div>
      </div>
      <DayDetail day={day} />
    </AppShell>
  );
}
