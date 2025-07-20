import { dietaryOptions } from "../../data/dietaryOptions";

interface DietaryRestrictionsSectionProps {
  profile: { dietaryRestrictions: string[] };
  setProfile: (profile: { dietaryRestrictions: string[] }) => void;
  isEditing: boolean;
}

export default function DietaryRestrictionsSection({
  profile,
  setProfile,
  isEditing,
}: DietaryRestrictionsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Dietary Restrictions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {dietaryOptions.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={profile.dietaryRestrictions.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setProfile({
                    ...profile,
                    dietaryRestrictions: [
                      ...profile.dietaryRestrictions,
                      option,
                    ],
                  });
                } else {
                  setProfile({
                    ...profile,
                    dietaryRestrictions: profile.dietaryRestrictions.filter(
                      (item: string) => item !== option,
                    ),
                  });
                }
              }}
              disabled={!isEditing}
              className="rounded"
            />
            <span className="text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

