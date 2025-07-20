/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

// USDA FoodData Central API - Free and comprehensive
const USDA_API_KEY = import.meta.env.VITE_USDA_API_KEY || "DEMO_KEY"; // Use env var or fallback to demo
const USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

// Nutrition API service
interface FoodNutrient {
  nutrientName?: string;
  value: number;
}

interface FoodData {
  foodNutrients?: FoodNutrient[];
}

export class NutritionAPI {
  // Search for food items
  static async searchFood(query: string) {
    try {
      console.log(`Making API request for: ${query}`);
      const response = await fetch(
        `${USDA_BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(
          query,
        )}&pageSize=5&dataType=Foundation,SR Legacy`,
      );

      if (!response.ok) {
        throw new Error(`USDA API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API response for ${query}:`, data);
      return data.foods || [];
    } catch (error) {
      console.error("Error searching food:", error);
      return [];
    }
  }

  // Get detailed nutrition for a specific food ID
  static async getFoodDetails(fdcId: string) {
    try {
      const response = await fetch(
        `${USDA_BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`USDA API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting food details:", error);
      return null;
    }
  }

  // Extract nutrition data from USDA response
  static extractNutritionData(
    foodData: FoodData,
  ): Record<string, string> | null {
    if (!foodData || !foodData.foodNutrients) {
      return null;
    }

    const nutrition: Record<string, string> = {};

    foodData.foodNutrients.forEach((nutrient: FoodNutrient) => {
      const name = nutrient.nutrientName?.toLowerCase();
      const value = nutrient.value;

      if (name && value !== undefined) {
        // Map common nutrients to readable names
        if (name.includes("energy")) {
          nutrition["Calories"] = `${Math.round(value)} kcal`;
        } else if (name.includes("protein")) {
          nutrition["Protein"] = `${value.toFixed(1)}g`;
        } else if (name.includes("total lipid")) {
          nutrition["Total Fat"] = `${value.toFixed(1)}g`;
        } else if (name.includes("carbohydrate")) {
          nutrition["Carbohydrates"] = `${value.toFixed(1)}g`;
        } else if (name.includes("fiber")) {
          nutrition["Fiber"] = `${value.toFixed(1)}g`;
        } else if (name.includes("sugar")) {
          nutrition["Sugar"] = `${value.toFixed(1)}g`;
        } else if (name.includes("sodium")) {
          nutrition["Sodium"] = `${Math.round(value)}mg`;
        } else if (name.includes("calcium")) {
          nutrition["Calcium"] = `${Math.round(value)}mg`;
        } else if (name.includes("iron")) {
          nutrition["Iron"] = `${value.toFixed(1)}mg`;
        } else if (name.includes("vitamin c")) {
          nutrition["Vitamin C"] = `${Math.round(value)}mg`;
        } else if (name.includes("vitamin a")) {
          nutrition["Vitamin A"] = `${Math.round(value)} IU`;
        } else if (name.includes("vitamin d")) {
          nutrition["Vitamin D"] = `${value.toFixed(1)} µg`;
        } else if (name.includes("vitamin e")) {
          nutrition["Vitamin E"] = `${value.toFixed(1)}mg`;
        } else if (name.includes("vitamin k")) {
          nutrition["Vitamin K"] = `${value.toFixed(1)}µg`;
        } else if (name.includes("thiamin")) {
          nutrition["Vitamin B1"] = `${value.toFixed(3)}mg`;
        } else if (name.includes("riboflavin")) {
          nutrition["Vitamin B2"] = `${value.toFixed(3)}mg`;
        } else if (name.includes("niacin")) {
          nutrition["Niacin"] = `${value.toFixed(1)}mg`;
        } else if (name.includes("vitamin b-6")) {
          nutrition["Vitamin B6"] = `${value.toFixed(3)}mg`;
        } else if (name.includes("Vitamin B9")) {
          nutrition["Vitamin B9"] = `${Math.round(value)}µg`;
        } else if (name.includes("vitamin b-12")) {
          nutrition["Vitamin B12"] = `${value.toFixed(2)}µg`;
        } else if (name.includes("potassium")) {
          nutrition["Potassium"] = `${Math.round(value)}mg`;
        } else if (name.includes("magnesium")) {
          nutrition["Magnesium"] = `${Math.round(value)}mg`;
        } else if (name.includes("zinc")) {
          nutrition["Zinc"] = `${value.toFixed(1)}mg`;
        } else if (name.includes("copper")) {
          nutrition["Copper"] = `${value.toFixed(3)}mg`;
        } else if (name.includes("selenium")) {
          nutrition["Selenium"] = `${Math.round(value)}µg`;
        } else if (name.includes("phosphorus")) {
          nutrition["Phosphorus"] = `${Math.round(value)}mg`;
        } else if (name.includes("cholesterol")) {
          nutrition["Cholesterol"] = `${Math.round(value)}mg`;
        } else if (name.includes("saturated")) {
          nutrition["Saturated Fat"] = `${value.toFixed(1)}g`;
        } else if (name.includes("monounsaturated")) {
          nutrition["Monounsaturated Fat"] = `${value.toFixed(1)}g`;
        } else if (name.includes("polyunsaturated")) {
          nutrition["Polyunsaturated Fat"] = `${value.toFixed(1)}g`;
        }
      }
    });

    return nutrition;
  }

  // Get nutrition data for a list of ingredients
  static async getNutritionForIngredients(
    ingredients: string[],
  ): Promise<Record<string, string> | null> {
    if (!ingredients || ingredients.length === 0) {
      console.log("No ingredients provided for nutrition analysis");
      return null;
    }

    console.log("Starting nutrition analysis for ingredients:", ingredients);
    const nutritionData: Record<string, string> = {};
    const processedIngredients = new Set();

    for (const ingredient of ingredients) {
      const cleanIngredient = ingredient.toLowerCase().trim();

      // Skip if already processed or too generic
      if (
        processedIngredients.has(cleanIngredient) ||
        cleanIngredient.length < 2 ||
        ["salt", "pepper", "water", "oil", "butter", "flour"].includes(
          cleanIngredient,
        )
      ) {
        console.log(`Skipping ingredient: ${cleanIngredient}`);
        continue;
      }

      try {
        console.log(`Searching for ingredient: ${cleanIngredient}`);
        // Search for the ingredient
        const foods: Array<{ fdcId: string }> =
          await this.searchFood(cleanIngredient);

        if (foods.length > 0) {
          console.log(`Found ${foods.length} foods for ${cleanIngredient}`);
          // Get details for the first (most relevant) result
          const foodDetails: FoodData = await this.getFoodDetails(
            foods[0].fdcId,
          );

          if (foodDetails) {
            const nutrition = this.extractNutritionData(foodDetails);

            if (nutrition) {
              console.log(
                `Extracted nutrition for ${cleanIngredient}:`,
                nutrition,
              );
              // Merge nutrition data (average if multiple ingredients have same nutrient)
              Object.entries(nutrition).forEach(([nutrient, value]) => {
                if (nutritionData[nutrient]) {
                  // For now, just use the latest value
                  // In a more sophisticated version, you'd calculate totals
                  nutritionData[nutrient] = value;
                } else {
                  nutritionData[nutrient] = value;
                }
              });
            } else {
              console.log(`No nutrition data extracted for ${cleanIngredient}`);
            }
          } else {
            console.log(`No food details found for ${cleanIngredient}`);
          }
        } else {
          console.log(`No foods found for ${cleanIngredient}`);
        }

        processedIngredients.add(cleanIngredient);

        // Add small delay to respect API rate limits
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error processing ingredient ${ingredient}:`, error);
      }
    }

    console.log("Final nutrition data:", nutritionData);

    // If no nutrition data found, provide fallback data
    if (Object.keys(nutritionData).length === 0) {
      console.log("No nutrition data found, providing fallback data");
      return this.getFallbackNutritionData(ingredients);
    }

    // Add source indicator for real API data
    nutritionData.source = "usda";
    return nutritionData;
  }

  // Fallback nutrition data when API fails
  static getFallbackNutritionData(
    ingredients: string[],
  ): Record<string, string> {
    // Create a basic nutrition estimate based on common ingredients
    const fallbackData: Record<string, string> = {
      Calories: "250",
      Protein: "12g",
      "Total Fat": "8g",
      Carbohydrates: "35g",
      Fiber: "4g",
      Sodium: "450mg",
      source: "fallback",
    };

    // Add some vitamin estimates based on common ingredients
    if (
      ingredients.some((ing: string) => ing.toLowerCase().includes("tomato"))
    ) {
      fallbackData["Vitamin C"] = "14mg";
    }
    if (
      ingredients.some((ing: string) => ing.toLowerCase().includes("carrot"))
    ) {
      fallbackData["Vitamin C"] = "7.4mg";
    }

    return fallbackData;
  }
}
