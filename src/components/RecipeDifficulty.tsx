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

import type { Recipe } from "../global";

interface RecipeDifficultyProps {
  recipe: Recipe;
  darkMode: boolean;
}

const RecipeDifficulty = ({ recipe, darkMode }: RecipeDifficultyProps) => {
  if (!recipe) return null;

  // Calculate difficulty based on recipe complexity
  const calculateDifficulty = () => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}` as keyof Recipe];
      if (ing && typeof ing === "string" && ing.trim()) ingredients.push(ing);
    }

    const instructions: string = recipe.strInstructions || "";
    const instructionSteps = instructions
      .split(/[.!?]+/)
      .filter((step: string) => step.trim().length > 10);

    let difficulty = 1; // Start with easy

    // Factor 1: Number of ingredients
    if (ingredients.length > 15) difficulty += 1;
    else if (ingredients.length > 10) difficulty += 0.5;

    // Factor 2: Instruction complexity
    if (instructionSteps.length > 8) difficulty += 1;
    else if (instructionSteps.length > 5) difficulty += 0.5;

    // Factor 3: Cooking techniques mentioned
    const complexTechniques = [
      "braise",
      "sauté",
      "sear",
      "deglaze",
      "reduce",
      "emulsify",
      "fold",
      "knead",
      "proof",
      "temper",
      "clarify",
      "confit",
    ];
    const hasComplexTechniques = complexTechniques.some((technique: string) =>
      instructions.toLowerCase().includes(technique),
    );
    if (hasComplexTechniques) difficulty += 1;

    // Factor 4: Special equipment
    const specialEquipment = [
      "food processor",
      "stand mixer",
      "blender",
      "pressure cooker",
      "slow cooker",
      "air fryer",
      "sous vide",
      "thermometer",
    ];
    const needsSpecialEquipment = specialEquipment.some((equipment: string) =>
      instructions.toLowerCase().includes(equipment),
    );
    if (needsSpecialEquipment) difficulty += 0.5;

    return Math.min(5, Math.max(1, Math.round(difficulty)));
  };

  const difficulty = calculateDifficulty();
  const difficultyLabels: { [key: number]: string } = {
    1: "Easy",
    2: "Easy-Medium",
    3: "Medium",
    4: "Medium-Hard",
    5: "Hard",
  };

  const difficultyColors: { [key: number]: string } = {
    1: "text-green-500",
    2: "text-green-400",
    3: "text-yellow-500",
    4: "text-orange-500",
    5: "text-red-500",
  };

  const difficultyBgColors: { [key: number]: string } = {
    1: "bg-green-100 dark:bg-green-900",
    2: "bg-green-50 dark:bg-green-800",
    3: "bg-yellow-100 dark:bg-yellow-900",
    4: "bg-orange-100 dark:bg-orange-900",
    5: "bg-red-100 dark:bg-red-900",
  };

  // Estimate cooking time
  const estimateCookingTime = () => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = recipe[`strIngredient${i}` as keyof Recipe];
      if (ing && typeof ing === "string" && ing.trim()) ingredients.push(ing);
    }

    const instructions: string = recipe.strInstructions || "";
    const instructionSteps = instructions
      .split(/[.!?]+/)
      .filter((step: string) => step.trim().length > 10);

    let prepTime = 15; // Base prep time
    let cookTime = 20; // Base cook time

    // Adjust based on ingredients
    if (ingredients.length > 10) prepTime += 10;
    if (ingredients.length > 15) prepTime += 15;

    // Adjust based on instructions
    if (instructionSteps.length > 5) cookTime += 15;
    if (instructionSteps.length > 8) cookTime += 20;

    // Check for time-consuming techniques
    if (instructions.toLowerCase().includes("marinate")) prepTime += 30;
    if (
      instructions.toLowerCase().includes("slow cook") ||
      instructions.toLowerCase().includes("braise")
    )
      cookTime += 60;
    if (
      instructions.toLowerCase().includes("bake") &&
      !instructions.toLowerCase().includes("quick")
    )
      cookTime += 30;

    return { prepTime, cookTime, totalTime: prepTime + cookTime };
  };

  const { prepTime, cookTime, totalTime } = estimateCookingTime();

  return (
    <div
      className={`space-y-4 p-4 sm:p-6 rounded-lg ${
        darkMode
          ? "bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-700 text-gray-100"
          : "bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 text-gray-800"
      }`}
    >
      <div
        className={`rounded-lg p-4 ${
          darkMode
            ? "bg-purple-800/50 border border-purple-600"
            : "bg-white/80 border border-purple-300"
        }`}
      >
        {/* Difficulty Rating */}
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm font-medium">Difficulty:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl ${
                    star <= difficulty
                      ? difficultyColors[difficulty]
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyBgColors[difficulty]} ${difficultyColors[difficulty]}`}
            >
              {difficultyLabels[difficulty]}
            </span>
          </div>
        </div>

        {/* Cooking Times */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`text-center p-3 rounded-lg ${
              darkMode ? "bg-purple-700/50" : "bg-purple-100"
            }`}
          >
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {prepTime}
            </div>
            <div className="text-sm text-gray-600 dark:text-stone-300">
              Prep Time (min)
            </div>
          </div>
          <div
            className={`text-center p-3 rounded-lg ${
              darkMode ? "bg-purple-700/50" : "bg-purple-100"
            }`}
          >
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {cookTime}
            </div>
            <div className="text-sm text-gray-600 dark:text-stone-300">
              Cook Time (min)
            </div>
          </div>
          <div
            className={`text-center p-3 rounded-lg ${
              darkMode ? "bg-purple-700/50" : "bg-purple-100"
            }`}
          >
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalTime}
            </div>
            <div className="text-sm text-gray-600 dark:text-stone-300">
              Total Time (min)
            </div>
          </div>
        </div>

        {/* Difficulty Tips */}
        <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            💡 <strong>Tip:</strong>{" "}
            {difficulty === 1 &&
              "Perfect for beginners! This recipe uses simple techniques and common ingredients."}
            {difficulty === 2 &&
              "Great for cooks with some experience. Take your time with prep work."}
            {difficulty === 3 &&
              "Intermediate level. Read through all instructions before starting."}
            {difficulty === 4 &&
              "Advanced level. Consider prepping ingredients ahead of time."}
            {difficulty === 5 &&
              "Expert level. This recipe requires advanced techniques and patience."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDifficulty;

