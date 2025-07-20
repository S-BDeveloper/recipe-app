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

import { parseIngredients } from "../utils/ingredientUtils";
import type { Recipe } from "../global";

interface IngredientsProps {
  recipe: unknown;
  darkMode: boolean;
}

function Ingredients({ recipe, darkMode }: IngredientsProps) {
  if (!recipe) return null;

  const items = parseIngredients(recipe as Recipe);

  if (items.length === 0) return <p>No ingredients listed.</p>;

  return (
    <>
      <div className="ingredients-section rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 my-4 bg-card border border-border relative">
        {/* Paper texture overlay - removed for true black background */}
        <div className="relative z-10">
          <h3
            className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-6 tracking-tight ${
              darkMode ? "text-green-300" : "text-green-900"
            }`}
          >
            Ingredients
          </h3>
          <ul className="compact-list-compact">
            {items.map((text, idx) => (
              <li key={idx} className="flex items-start min-w-0">
                <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-sm sm:text-base lg:text-lg break-words overflow-hidden text-card-foreground">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Ingredients;

