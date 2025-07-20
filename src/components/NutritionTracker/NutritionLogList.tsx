import React from "react";
import NutritionLogItem from "./NutritionLogItem";
import type { Meal } from "../NutritionTracker";

interface NutritionLogListProps {
  meals: Meal[];
  onRemoveMeal: (mealId: number) => void;
  darkMode: boolean;
}

const NutritionLogList: React.FC<NutritionLogListProps> = ({
  meals,
  onRemoveMeal,
  darkMode,
}) => {
  if (!meals.length) return null;
  return (
    <div className="mb-4">
      {meals.map((meal, idx) => (
        <NutritionLogItem
          key={meal.id ?? idx}
          meal={meal}
          onRemove={() => onRemoveMeal(meal.id ?? idx)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default NutritionLogList;

