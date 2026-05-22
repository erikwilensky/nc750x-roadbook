import { TripPlace } from "@/data/trip";
import { PlaceCard } from "./PlaceCard";

type PhotoGridProps = {
  places: TripPlace[];
  heroPlace?: TripPlace;
  loadPhotos?: boolean;
};

export function PhotoGrid({
  places,
  heroPlace,
  loadPhotos = true,
}: PhotoGridProps) {
  const gridPlaces = heroPlace
    ? places.filter((p) => p.id !== heroPlace.id)
    : places;

  return (
    <div className="space-y-4">
      {heroPlace && (
        <PlaceCard place={heroPlace} large loadPhotos={loadPhotos} />
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gridPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            loadPhotos={loadPhotos}
          />
        ))}
      </div>
    </div>
  );
}
