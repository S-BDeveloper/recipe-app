// Ingredient parsing utilities
import type { Recipe } from "../global";

/**
 * Parses a recipe object and returns an array of formatted ingredient strings.
 * @param {object} recipe
 * @returns {string[]}
 */
export function parseIngredients(recipe: Recipe) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];
    if (ing && ing.trim())
      items.push(`${measure?.trim() || ""} ${ing.trim()}`.trim());
  }
  return items;
}
