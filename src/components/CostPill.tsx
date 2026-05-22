import { formatBaht } from "@/lib/money";

type CostPillProps = {
  label: string;
  amount: number;
  variant?: "default" | "total";
};

export function CostPill({ label, amount, variant = "default" }: CostPillProps) {
  return (
    <div
      className={`rounded-xl px-3 py-2 ${
        variant === "total"
          ? "bg-forest text-paper"
          : "bg-cream border border-line"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wide ${
          variant === "total" ? "text-gold" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="text-sm font-semibold">{formatBaht(amount)}</p>
    </div>
  );
}
