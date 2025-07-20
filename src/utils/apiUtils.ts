// API data extraction utilities

/**
 * Minimal Recipe type for ingredient extraction
 */
export interface Recipe {
  [key: string]: unknown;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
}

/**
 * Extracts ingredients from a recipe API response object.
 * @param recipe Recipe object
 * @returns {string[]}
 */
export function extractIngredientsFromRecipe(recipe: Recipe): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}
