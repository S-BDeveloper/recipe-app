interface NutritionalGoalsSectionProps {
  profile: {
    dailyCalories: number;
    proteinGoal: number;
    carbsGoal: number;
    fatGoal: number;
  };
  setProfile: (profile: {
    dailyCalories: number;
    proteinGoal: number;
    carbsGoal: number;
    fatGoal: number;
  }) => void;
  isEditing: boolean;
  darkMode: boolean;
}

export default function NutritionalGoalsSection({
  profile,
  setProfile,
  isEditing,
  darkMode,
}: NutritionalGoalsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Nutritional Goals (Daily)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Calories</label>
          <input
            type="number"
            value={profile.dailyCalories}
            onChange={(e) =>
              setProfile({
                ...profile,
                dailyCalories: parseInt(e.target.value),
              })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } ${!isEditing ? "opacity-50" : ""}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Protein (g)</label>
          <input
            type="number"
            value={profile.proteinGoal}
            onChange={(e) =>
              setProfile({
                ...profile,
                proteinGoal: parseInt(e.target.value),
              })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } ${!isEditing ? "opacity-50" : ""}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Carbs (g)</label>
          <input
            type="number"
            value={profile.carbsGoal}
            onChange={(e) =>
              setProfile({
                ...profile,
                carbsGoal: parseInt(e.target.value),
              })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } ${!isEditing ? "opacity-50" : ""}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fat (g)</label>
          <input
            type="number"
            value={profile.fatGoal}
            onChange={(e) =>
              setProfile({
                ...profile,
                fatGoal: parseInt(e.target.value),
              })
            }
            disabled={!isEditing}
            className={`w-full px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            } ${!isEditing ? "opacity-50" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

