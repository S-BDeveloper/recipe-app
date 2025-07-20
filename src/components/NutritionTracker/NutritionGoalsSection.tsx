import React from "react";
import type { NutritionGoals } from "../NutritionTracker";

interface NutritionGoalsSectionProps {
  nutritionGoals: NutritionGoals;
  onRecalculate: () => void;
  darkMode: boolean;
}

const NutritionGoalsSection: React.FC<NutritionGoalsSectionProps> = ({
  nutritionGoals,
  onRecalculate,
}) => {
  return (
    <div className="rounded-lg p-4 mb-6 bg-main text-main">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Nutrition Goals</h3>
        <button
          onClick={onRecalculate}
          className="px-3 py-1 rounded-lg text-sm font-medium transition-colors bg-main text-main"
        >
          Recalculate
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-xs opacity-70">Calories</div>
          <div className="font-bold">{nutritionGoals.calories} kcal</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Protein</div>
          <div className="font-bold">{nutritionGoals.protein} g</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Carbs</div>
          <div className="font-bold">{nutritionGoals.carbs} g</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Fat</div>
          <div className="font-bold">{nutritionGoals.fat} g</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Fiber</div>
          <div className="font-bold">{nutritionGoals.fiber} g</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Sugar</div>
          <div className="font-bold">{nutritionGoals.sugar} g</div>
        </div>
        <div>
          <div className="text-xs opacity-70">Sodium</div>
          <div className="font-bold">{nutritionGoals.sodium} mg</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionGoalsSection;

