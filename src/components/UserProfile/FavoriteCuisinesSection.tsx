import { cuisineOptions } from "../../data/cuisineOptions";

interface FavoriteCuisinesSectionProps {
  profile: { favoriteCuisines: string[] };
  setProfile: (profile: { favoriteCuisines: string[] }) => void;
  isEditing: boolean;
}

export default function FavoriteCuisinesSection({
  profile,
  setProfile,
  isEditing,
}: FavoriteCuisinesSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Favorite Cuisines</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {cuisineOptions.map((cuisine) => (
          <label key={cuisine} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={profile.favoriteCuisines.includes(cuisine)}
              onChange={(e) => {
                if (e.target.checked) {
                  setProfile({
                    ...profile,
                    favoriteCuisines: [...profile.favoriteCuisines, cuisine],
                  });
                } else {
                  setProfile({
                    ...profile,
                    favoriteCuisines: profile.favoriteCuisines.filter(
                      (item: string) => item !== cuisine,
                    ),
                  });
                }
              }}
              disabled={!isEditing}
              className="rounded"
            />
            <span className="text-sm">{cuisine}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

