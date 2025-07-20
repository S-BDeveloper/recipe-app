import { Helmet } from "react-helmet-async";
import type { Recipe, NutritionData } from "../global";

interface RecipeMetaHelmetProps {
  selected: Recipe | null;
  nutritionData: NutritionData | null;
}

export default function RecipeMetaHelmet({
  selected,
  nutritionData,
}: RecipeMetaHelmetProps) {
  return (
    <Helmet>
      {selected ? (
        <>
          <title>{`${selected.strMeal} Recipe - Recipe App`}</title>
          <meta
            name="description"
            content={`Learn how to make ${selected.strMeal}. Get step-by-step instructions, ingredients, nutrition information, and cooking tips for this delicious recipe.`}
          />
          <meta
            name="keywords"
            content={`${selected.strMeal}, recipe, cooking, ${selected.strCategory}, ${selected.strArea} cuisine`}
          />
          {/* Recipe Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              name: selected.strMeal,
              description: `Learn how to make ${selected.strMeal} with step-by-step instructions`,
              image: selected.strMealThumb,
              author: {
                "@type": "Organization",
                name: "Recipe App",
              },
              datePublished: new Date().toISOString(),
              prepTime: "PT30M",
              cookTime: "PT45M",
              totalTime: "PT1H15M",
              recipeCategory: selected.strCategory,
              recipeCuisine: selected.strArea,
              recipeYield: "4 servings",
              nutrition: {
                "@type": "NutritionInformation",
                calories: nutritionData?.Calories || "300 kcal",
              },
            })}
          </script>
        </>
      ) : (
        <>
          <title>Recipe App - Discover Delicious Recipes & Cooking Tips</title>
          <meta
            name="description"
            content="Find amazing recipes, cooking tips, and meal planning ideas. Browse thousands of recipes from around the world with nutrition information and step-by-step instructions."
          />
        </>
      )}
    </Helmet>
  );
}

