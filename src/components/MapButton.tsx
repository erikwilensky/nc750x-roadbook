import { googleMapsSearchUrl } from "@/lib/maps";

type MapButtonProps = {
  query: string;
  label?: string;
  className?: string;
};

export function MapButton({
  query,
  label = "Open in Google Maps",
  className = "",
}: MapButtonProps) {
  return (
    <a
      href={googleMapsSearchUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-secondary ${className}`}
    >
      {label}
    </a>
  );
}
