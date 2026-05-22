import { PlaceGuideFields } from "@/data/trip";

export function PlaceGuideLines({
  guide,
  compact = false,
}: {
  guide: PlaceGuideFields;
  compact?: boolean;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Why", value: guide.whySpecial },
    { label: "Order", value: guide.orderSuggestion },
    { label: "Vibe", value: guide.viewOrVibe },
    { label: "Rider note", value: guide.riderNote },
  ];

  return (
    <dl className={`mt-2 space-y-1.5 ${compact ? "text-xs" : "text-sm"}`}>
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt className="font-medium text-forest">{label}</dt>
          <dd className="text-muted">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PrintGuideLines({
  guide,
}: {
  guide: PlaceGuideFields;
}) {
  return (
    <div className="mt-1 space-y-0.5 text-xs text-muted">
      <p>
        <strong>Why:</strong> {guide.whySpecial}
      </p>
      <p>
        <strong>Order:</strong> {guide.orderSuggestion}
      </p>
      <p>
        <strong>Vibe:</strong> {guide.viewOrVibe}
      </p>
      <p>
        <strong>Rider note:</strong> {guide.riderNote}
      </p>
    </div>
  );
}
