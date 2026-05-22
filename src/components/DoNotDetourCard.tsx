import type { DoNotDetour } from "@/data/trip";

type DoNotDetourCardProps = {
  note: DoNotDetour;
  prominent?: boolean;
};

const SEVERITY_CLASS: Record<DoNotDetour["severity"], string> = {
  low: "detour-low",
  medium: "detour-medium",
  high: "detour-high",
};

export function DoNotDetourCard({ note, prominent }: DoNotDetourCardProps) {
  return (
    <section
      className={`detour-card ${SEVERITY_CLASS[note.severity]} ${prominent ? "detour-card-prominent" : ""}`}
    >
      <p className="flex items-start gap-2 text-sm font-semibold text-forest">
        <span aria-hidden className="text-lg leading-none">
          ⚠
        </span>
        {note.title}
      </p>
      <p className="mt-2 text-sm text-ink">{note.message}</p>
      {note.exceptions && (
        <p className="mt-2 text-xs text-muted">
          <span className="font-medium">Exception: </span>
          {note.exceptions}
        </p>
      )}
    </section>
  );
}
