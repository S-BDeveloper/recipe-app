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

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { SecurityProvider } from "./components/SecurityWrapper";
import { ModalProvider } from "./contexts/ModalContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { useNutritionData } from "./hooks/useNutritionData";
import performanceService from "./services/performanceService";
import { extractIngredientsFromRecipe } from "./utils/apiUtils";
import Toast from "./components/Toast";
import { AuthProvider } from "./contexts/AuthContext";
import type { Recipe } from "./global";

// Lazy load components for better performance
const MainLayout = lazy(() => import("./components/MainLayout"));
const MainRoutes = lazy(() => import("./components/MainRoutes"));

function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const location = useLocation();

  // Nutrition hook
  const {
    nutritionData,
    setNutritionData,
    nutritionLoading,
    fetchNutritionData,
  } = useNutritionData();

  // Check if current route is an auth page
  const isAuthPage = useMemo(() => {
    return ["/login", "/signup"].includes(location.pathname);
  }, [location.pathname]);

  // Function to check if recipe contains pork or alcohol
  const containsPorkOrAlcohol = (recipe: Recipe) => {
    const searchTerms = [
      "pork",
      "bacon",
      "ham",
      "sausage",
      "prosciutto",
      "pancetta",
      "lard",
      "speck",
      "alcohol",
      "wine",
      "beer",
      "vodka",
      "whiskey",
      "rum",
      "gin",
      "tequila",
      "brandy",
      "sherry",
      "port",
      "cognac",
      "bourbon",
      "scotch",
      "liqueur",
      "schnapps",
      "absinthe",
    ];

    const recipeText = [
      recipe.strMeal?.toLowerCase() || "",
      recipe.strCategory?.toLowerCase() || "",
      recipe.strArea?.toLowerCase() || "",
      recipe.strInstructions?.toLowerCase() || "",
      ...Array.from(
        { length: 20 },
        (_, i) => recipe[`strIngredient${i + 1}`]?.toLowerCase() || ""
      ),
    ].join(" ");

    return searchTerms.some((term) => recipeText.includes(term));
  };

  const handleSearch = useCallback(
    async (query: string) => {
      console.log("App handleSearch called with:", query);
      if (!query.trim()) return;

      setLoading(true);
      setError(null);
      setNutritionData(null);
      setHasUserSearched(true);

      try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query.trim()
        )}`;

        const json = await performanceService.cachedFetch(url);
        const meals = json.meals || [];

        if (!meals.length) {
          setSelected(null);
          setError(null); // Don't show error in Home
          setToast(`No recipes found for "${query}". Try another search!`);
          return;
        }

        // Filter out recipes containing pork or alcohol
        const filteredMeals = meals.filter(
          (meal: Recipe) => !containsPorkOrAlcohol(meal)
        );

        if (!filteredMeals.length) {
          setSelected(null);
          setError(null);
          setToast(
            `No suitable recipes found for "${query}". Try searching for something else!`
          );
          return;
        }

        const random =
          filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
        setSelected(random);

        // Extract ingredients and fetch nutrition data
        const ingredients = extractIngredientsFromRecipe(random);

        await fetchNutritionData(ingredients);

        // Navigate to homepage/results
        navigate("/");

        // Auto-scroll to recipe results after successful search
        setTimeout(() => {
          const recipeSection = document.querySelector("[data-recipe-section]");
          if (recipeSection) {
            recipeSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100); // Small delay to ensure DOM is updated
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipes. Please try again.");
        setToast("Failed to fetch recipes. Please try again.");
        setSelected(null);
      } finally {
        setLoading(false);
      }
    },
    [fetchNutritionData, setNutritionData, navigate]
  );

  // Original initial search logic
  const initialSearch = useMemo(() => "", []);

  useEffect(() => {
    // Only perform initial search if not on auth page
    if (!isAuthPage) {
      handleSearch(initialSearch);
    }
  }, [handleSearch, initialSearch, isAuthPage]);

  return (
    <SecurityProvider>
      <AuthProvider>
        <HelmetProvider>
          <ModalProvider>
            <DarkModeProvider>
              <main className="bg-main text-main min-h-screen">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Loading...
                    </div>
                  }
                >
                  <MainLayout handleSearch={handleSearch}>
                    <MainRoutes
                      selected={selected}
                      nutritionData={nutritionData}
                      loading={loading}
                      error={error}
                      nutritionLoading={nutritionLoading}
                      hasUserSearched={hasUserSearched}
                    />
                  </MainLayout>
                  {toast && (
                    <Toast message={toast} onClose={() => setToast(null)} />
                  )}
                </Suspense>
              </main>
            </DarkModeProvider>
          </ModalProvider>
        </HelmetProvider>
      </AuthProvider>
    </SecurityProvider>
  );
}

export default App;
