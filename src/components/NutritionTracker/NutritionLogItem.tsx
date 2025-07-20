import React from "react";
import { Meal } from "../NutritionTracker";

interface NutritionLogItemProps {
  meal: Meal;
  onRemove: () => void;
  darkMode: boolean;
}

const NutritionLogItem: React.FC<NutritionLogItemProps> = ({
  meal,
  onRemove,
  darkMode,
}) => {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg border mb-2 ${
        darkMode
          ? "bg-stone-800 border-stone-600 text-stone-200"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div>
        <div className="font-semibold">{meal.name}</div>
        <div
          className={`text-xs mb-1 ${
            darkMode ? "text-stone-400" : "text-gray-600"
          }`}
        >
          {meal.ingredients}
        </div>
        <div className="text-sm">
          {meal.calories} kcal | {meal.protein}g protein | {meal.carbs}g carbs |{" "}
          {meal.fat}g fat
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 text-sm ml-2"
      >
        Remove
      </button>
    </div>
  );
};

export default NutritionLogItem;

