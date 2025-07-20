import React from "react";
import type { NewMeal } from "../NutritionTracker";

interface NutritionLogFormProps {
  newMeal: NewMeal;
  setNewMeal: React.Dispatch<React.SetStateAction<NewMeal>>;
  onAddMeal: () => void;
  loading: boolean;
}

const NutritionLogForm: React.FC<NutritionLogFormProps> = ({
  newMeal,
  setNewMeal,
  onAddMeal,
  loading,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddMeal();
      }}
      className="space-y-4 mb-6 bg-main text-main"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meal Name</label>
          <input
            type="text"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ingredients</label>
          <input
            type="text"
            value={newMeal.ingredients}
            onChange={(e) =>
              setNewMeal({ ...newMeal, ingredients: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Calories</label>
          <input
            type="number"
            value={newMeal.calories}
            onChange={(e) =>
              setNewMeal({ ...newMeal, calories: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Protein (g)</label>
          <input
            type="number"
            value={newMeal.protein}
            onChange={(e) =>
              setNewMeal({ ...newMeal, protein: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Carbs (g)</label>
          <input
            type="number"
            value={newMeal.carbs}
            onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fat (g)</label>
          <input
            type="number"
            value={newMeal.fat}
            onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border input-bg input-text input-border"
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          } bg-gradient-to-r from-orange-500 to-amber-500 text-white`}
        >
          {loading ? "Adding..." : "Add Meal"}
        </button>
      </div>
    </form>
  );
};

export default NutritionLogForm;

