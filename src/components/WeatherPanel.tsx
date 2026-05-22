import type { DayWeather } from "@/data/trip";
import { makeWeatherSearchUrl } from "@/lib/weatherLinks";

type WeatherPanelProps = {
  weather: DayWeather;
  compact?: boolean;
};

export function WeatherPanel({ weather, compact }: WeatherPanelProps) {
  return (
    <section className={`weather-panel card p-4 ${compact ? "weather-panel-compact" : ""}`}>
      <h3 className="text-sm font-semibold text-forest">Weather check</h3>
      <p className="mt-1 text-sm text-muted">{weather.summary}</p>
      <div className="mt-3 flex flex-col gap-2">
        {weather.checkpoints.map((cp) => (
          <a
            key={`${cp.label}-${cp.name}`}
            href={makeWeatherSearchUrl(cp.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="weather-check-btn"
            title={cp.note}
          >
            {cp.label}: {cp.name}
          </a>
        ))}
      </div>
      {!compact && (
        <ul className="mt-3 space-y-1 text-xs text-muted">
          {weather.checkpoints.map((cp) => (
            <li key={`note-${cp.label}`}>{cp.note}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
