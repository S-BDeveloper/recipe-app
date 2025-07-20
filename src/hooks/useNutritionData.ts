import { useState, useCallback } from "react";
import { NutritionAPI } from "../services/nutritionAPI";

export function useNutritionData() {
  const [nutritionData, setNutritionData] = useState<Record<
    string,
    string
  > | null>(null);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [nutritionError, setNutritionError] = useState<string | null>(null);

  const fetchNutritionData = useCallback(async (ingredients: string[]) => {
    if (!ingredients || ingredients.length === 0) {
      setNutritionData(null);
      return;
    }

    setNutritionLoading(true);
    setNutritionError(null); // Clear previous errors

    try {
      const data = await NutritionAPI.getNutritionForIngredients(ingredients);
      setNutritionData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch nutrition data";
      setNutritionError(errorMessage); // Use the error variable for user feedback
      console.error("Nutrition data fetch error:", err);
      setNutritionData(null);
    } finally {
      setNutritionLoading(false);
    }
  }, []);

  return {
    nutritionData,
    setNutritionData,
    nutritionLoading,
    nutritionError,
    fetchNutritionData,
  };
}
