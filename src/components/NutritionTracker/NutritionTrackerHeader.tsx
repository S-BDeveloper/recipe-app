interface NutritionTrackerHeaderProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  onShowAddMeal: () => void;
}

export default function NutritionTrackerHeader({
  selectedDate,
  setSelectedDate,
  onShowAddMeal,
}: NutritionTrackerHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
      <h2 className="text-2xl font-bold text-main">Nutrition Tracker</h2>
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm input-bg input-text input-border"
        />
        <button
          onClick={onShowAddMeal}
          className="px-4 py-2 rounded-lg font-medium transition-colors bg-main text-main"
        >
          + Add Meal
        </button>
      </div>
    </div>
  );
}

