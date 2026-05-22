type RoutePhaseCardProps = {
  title: string;
  days: string;
  route: string;
};

export function RoutePhaseCard({ title, days, route }: RoutePhaseCardProps) {
  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gold">{days}</p>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted leading-relaxed">{route}</p>
      </div>
    </div>
  );
}
