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

import { useState, useEffect } from "react";

interface Recipe {
  [key: string]: string | number | null | undefined;
}

interface Ingredient {
  ingredient: string;
  measure: string;
  originalMeasure: string;
}

interface RecipeScalingProps {
  recipe: unknown;
  darkMode: boolean;
}

const RecipeScaling = ({ recipe, darkMode }: RecipeScalingProps) => {
  const [servings, setServings] = useState<number>(4);
  const [originalServings, setOriginalServings] = useState<number>(4);
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (recipe) {
      // Extract ingredients from recipe
      const ingredients: Ingredient[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = (recipe as Recipe)[`strIngredient${i}`];
        const measure = (recipe as Recipe)[`strMeasure${i}`];
        if (typeof ingredient === "string" && ingredient.trim()) {
          ingredients.push({
            ingredient: ingredient.trim(),
            measure: typeof measure === "string" ? measure.trim() : "",
            originalMeasure: typeof measure === "string" ? measure.trim() : "",
          });
        }
      }
      setScaledIngredients(ingredients);
      setOriginalServings(4); // Default servings
      setServings(4);
    }
  }, [recipe]);

  useEffect(() => {
    if (originalServings > 0) {
      const scaleFactor = servings / originalServings;
      setScaledIngredients((prev: Ingredient[]) =>
        prev.map((item: Ingredient) => ({
          ...item,
          measure: scaleMeasure(item.originalMeasure, scaleFactor),
        })),
      );
    }
  }, [servings, originalServings]);

  const scaleMeasure = (measure: string, scaleFactor: number): string => {
    if (!measure) return "";

    // Extract number and unit from measure
    const match = measure.match(/^([\d./\s]+)\s*(.*)$/);
    if (!match) return measure;

    const [, numberPart, unit] = match;

    // Handle fractions and mixed numbers
    let number = 0;
    if (numberPart.includes("/")) {
      const [numerator, denominator] = numberPart
        .split("/")
        .map((n: string) => parseFloat(n.trim()));
      number = numerator / denominator;
    } else {
      number = parseFloat(numberPart);
    }

    if (isNaN(number)) return measure;

    const scaledNumber = number * scaleFactor;

    // Round to reasonable precision
    let roundedNumber;
    if (scaledNumber < 1) {
      roundedNumber = Math.round(scaledNumber * 4) / 4; // Round to nearest 1/4
    } else {
      roundedNumber = Math.round(scaledNumber * 2) / 2; // Round to nearest 1/2
    }

    // Format the number nicely
    let formattedNumber;
    if (roundedNumber === Math.floor(roundedNumber)) {
      formattedNumber = Math.floor(roundedNumber).toString();
    } else if (roundedNumber === 0.25) {
      formattedNumber = "1/4";
    } else if (roundedNumber === 0.5) {
      formattedNumber = "1/2";
    } else if (roundedNumber === 0.75) {
      formattedNumber = "3/4";
    } else if (roundedNumber === 1.5) {
      formattedNumber = "1 1/2";
    } else if (roundedNumber === 2.5) {
      formattedNumber = "2 1/2";
    } else {
      formattedNumber = roundedNumber.toString();
    }

    return `${formattedNumber} ${unit}`.trim();
  };

  const handleServingsChange = (newServings: number) => {
    if (newServings > 0 && newServings <= 20) {
      setServings(newServings);
    }
  };

  if (!recipe) return null;

  return (
    <div
      className={`space-y-4 p-4 sm:p-6 rounded-lg ${
        darkMode
          ? "bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-700 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-gray-800"
      }`}
    >
      <div
        className={`rounded-lg p-4 ${
          darkMode
            ? "bg-blue-800/50 border border-blue-600"
            : "bg-white/80 border border-blue-300"
        }`}
      >
        {/* Removed duplicate heading <h3>Adjust Servings</h3> */}

        <div className="flex items-center space-x-4 mb-4">
          <label className="text-sm font-medium">Servings:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleServingsChange(servings - 1)}
              disabled={servings <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                servings <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{servings}</span>
            <button
              onClick={() => handleServingsChange(servings + 1)}
              disabled={servings >= 20}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                servings >= 20
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            (Original: {originalServings})
          </span>
        </div>

        <div className="text-sm text-gray-500">
          {servings > originalServings ? (
            <span className="text-green-600">
              ↑ Increased by {servings - originalServings} servings
            </span>
          ) : servings < originalServings ? (
            <span className="text-orange-600">
              ↓ Decreased by {originalServings - servings} servings
            </span>
          ) : (
            <span>Original recipe size</span>
          )}
        </div>
      </div>

      {/* Scaled Ingredients */}
      <div
        className={`rounded-lg p-4 ${
          darkMode
            ? "bg-blue-800/50 border border-blue-600"
            : "bg-white/80 border border-blue-300"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">
          Ingredients for {servings} servings
        </h3>

        <div className="space-y-2">
          {scaledIngredients.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  darkMode ? "bg-orange-400" : "bg-orange-500"
                }`}
              ></div>
              <div className="flex-1">
                <span className="font-medium">{item.measure}</span>
                <span className="ml-2">{item.ingredient}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Adjust the servings above to automatically
            scale all ingredient quantities. Perfect for meal prep or feeding a
            crowd!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeScaling;

