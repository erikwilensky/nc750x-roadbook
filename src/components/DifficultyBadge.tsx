import type { DayDifficulty } from "@/data/trip";

type DifficultyBadgeProps = {
  difficulty: DayDifficulty;
  compact?: boolean;
};

function dotColor(rating: number): string {
  if (rating <= 2) return "var(--green, #173d32)";
  if (rating === 3) return "var(--gold, #c9a24a)";
  if (rating === 4) return "var(--warning, #d08a28)";
  return "var(--danger, #b4533c)";
}

export function DifficultyBadge({ difficulty, compact }: DifficultyBadgeProps) {
  return (
    <div className={`difficulty-badge ${compact ? "difficulty-badge-compact" : ""}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-forest">
          Difficulty {difficulty.rating}/5
        </span>
        <span className="text-xs text-muted">{difficulty.label}</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="difficulty-dot"
            style={{
              background: n <= difficulty.rating ? dotColor(difficulty.rating) : "#e6dcc5",
            }}
          />
        ))}
      </div>
      {!compact && (
        <>
          <p className="mt-2 text-sm text-muted">{difficulty.summary}</p>
          {difficulty.factors.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-xs text-muted">
              {difficulty.factors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
