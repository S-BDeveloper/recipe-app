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

import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import type { Recipe, NutritionData, User } from "../../global";

import FoodCategory from "../../components/FoodCategory";
import Ingredients from "../../components/Ingredients";
import Instructions from "../../components/Instructions";
import Nutrition from "../../components/Nutrition";
import RecipeScaling from "../../components/RecipeScaling";
import RecipeDifficulty from "../../components/RecipeDifficulty";
import CookingVideos from "../../components/CookingVideos";
import LeftoverIntegration from "../../components/LeftoverIntegration";
import RecipeReviews from "../../components/RecipeReviews";
import LoadingSkeleton from "../../components/home/LoadingSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ServicesSection from "../../components/home/ServicesSection";
import RecipeCard from "./RecipeCard";
import QuickAccessSection from "../../components/home/QuickAccessSection";
import { useFavorites } from "../../hooks/useFavorites";
import RecipeMetaHelmet from "../../components/RecipeMetaHelmet";
// Example royalty-free food images (Unsplash)
const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // pasta
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80", // salad
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", // steak
];

// Featured recipes images (separate from main food images)
const featuredRecipeImages = [
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80", // sushi
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80", // grilled salmon
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", // fresh vegetables
  "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", // dessert
];

// Word arrays for food description generation
const FOOD_WORDS = [
  "delicious",
  "mouthwatering",
  "flavorful",
  "tasty",
  "scrumptious",
  "delectable",
  "savory",
  "aromatic",
  "fresh",
  "homemade",
  "traditional",
  "authentic",
  "gourmet",
  "premium",
  "handcrafted",
  "artisanal",
  "seasonal",
  "organic",
];
const COOKING_WORDS = [
  "cooked",
  "prepared",
  "crafted",
  "made",
  "created",
  "assembled",
  "slow-cooked",
  "grilled",
  "baked",
  "roasted",
  "steamed",
  "fried",
  "braised",
  "poached",
  "smoked",
  "cured",
  "fermented",
  "pickled",
];
const INGREDIENT_WORDS = [
  "fresh ingredients",
  "quality produce",
  "premium spices",
  "herbs and seasonings",
  "locally sourced ingredients",
  "organic vegetables",
  "hand-selected spices",
  "farm-fresh produce",
  "artisanal ingredients",
  "traditional spices",
];
const EXPERIENCE_WORDS = [
  "culinary experience",
  "dining delight",
  "gastronomic journey",
  "flavor adventure",
  "taste sensation",
  "foodie paradise",
  "culinary masterpiece",
  "dining excellence",
];

function generateFoodDescription(recipeName: string | undefined): string {
  if (!recipeName) return "";
  const randomFood = FOOD_WORDS[Math.floor(Math.random() * FOOD_WORDS.length)];
  const randomCooking =
    COOKING_WORDS[Math.floor(Math.random() * COOKING_WORDS.length)];
  const randomIngredient =
    INGREDIENT_WORDS[Math.floor(Math.random() * INGREDIENT_WORDS.length)];
  const randomExperience =
    EXPERIENCE_WORDS[Math.floor(Math.random() * EXPERIENCE_WORDS.length)];
  const descriptions = [
    `A ${randomFood} ${recipeName.toLowerCase()} that will transport your taste buds to culinary heaven. ${randomCooking} with ${randomIngredient}, this dish offers a truly ${randomExperience}.`,
    `Experience the perfect blend of flavors in this ${randomFood} ${recipeName.toLowerCase()}. Carefully ${randomCooking} using ${randomIngredient}, it's a ${randomExperience} that will impress even the most discerning palates.`,
    `This ${randomFood} ${recipeName.toLowerCase()} is a testament to culinary excellence. ${randomCooking} with precision and ${randomIngredient}, it delivers a ${randomExperience} that's both comforting and sophisticated.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Define prop types for HomePage
interface HomePageProps {
  selected: Recipe | null;
  nutritionData: NutritionData | null;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  nutritionLoading: boolean;
}

export default function HomePage({
  selected,
  nutritionData,
  loading,
  error,
  darkMode,
  nutritionLoading,
}: HomePageProps) {
  const { currentUser, isDemoUser } = useAuth() as {
    currentUser: User | null;
    isDemoUser: boolean;
  };
  const { isFavorite, favoriteLoading, toggleFavorite } = useFavorites(
    currentUser,
    selected,
    isDemoUser
  );
  const [toolsExpanded, setToolsExpanded] = useState(false);

  const memoizedDescription = useMemo(
    () => generateFoodDescription(selected?.strMeal),
    [selected?.strMeal]
  );
  const handleToolsToggle = useCallback(
    () => setToolsExpanded((prev) => !prev),
    []
  );

  if (!selected) {
    return (
      <div className="bg-main text-main min-h-screen w-full">
        {/* Hero Section (unchanged) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center min-h-[80vh] md:min-h-[90vh]">
          {/* Left: Hero Text & CTA */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center py-12 md:py-0 px-4 md:px-0 max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 tracking-tight text-center md:text-left">
              Premium Recipes for Culinary Excellence
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-center md:text-left max-w-xl">
              Unlock exclusive, chef-curated dishes and gourmet inspiration.
              Experience the art of fine cooking—crafted for discerning food
              lovers.
            </p>
            <a
              href="#featured"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg hover:bg-green-700 transition-colors mb-8 md:mb-0"
            >
              Explore Featured Recipe
            </a>
            <div className="mt-10 border-t pt-8 w-full bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">
                Featured: Truffle Risotto
              </h2>
              <p className="text-base text-muted-foreground mb-2">
                Creamy Arborio rice, wild mushrooms, and shaved black
                truffle—finished with Parmigiano-Reggiano. A true gourmet
                classic.
              </p>
              <div className="flex justify-start items-center gap-4 mt-4">
                <span className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
                  ⭐ 4.9
                </span>
                <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  Chef&apos;s Pick
                </span>
              </div>
            </div>
          </div>
          {/* Right: Food Images Grid (BBC Food style, debug version) */}
          <div className="flex-1 flex items-center justify-center w-full h-full py-8 md:py-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 w-full max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={foodImages[0]}
                  alt="Premium Pasta Dish"
                  className="rounded-2xl shadow-md object-cover w-full h-40 md:h-56 lg:h-64 border border-border"
                  style={{ background: "#fffbe6" }}
                  loading="lazy"
                  onError={() => console.log("Failed to load:", foodImages[0])}
                />
                <img
                  src={foodImages[1]}
                  alt="Fresh Salad"
                  className="rounded-2xl shadow-md object-cover w-full h-40 md:h-56 lg:h-64 border border-border"
                  style={{ background: "#ffe5d9" }}
                  loading="lazy"
                  onError={() => console.log("Failed to load:", foodImages[1])}
                />
              </div>
              <img
                src={foodImages[2]}
                alt="Gourmet Steak"
                className="rounded-2xl shadow-md object-cover w-full h-40 md:h-56 lg:h-64 border border-border mt-4"
                style={{ background: "#f8f8f8" }}
                loading="lazy"
                onError={() => console.log("Failed to load:", foodImages[2])}
              />
            </div>
          </div>
        </div>

        {/* Featured Recipes Grid */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-900 dark:text-green-300 text-left">
            Featured Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example featured recipes (replace with real data as needed) */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl shadow-lg bg-white dark:bg-neutral-900 border border-border overflow-hidden flex flex-col"
              >
                <div className="h-40 bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
                  <img
                    src={
                      featuredRecipeImages[
                        (i - 1) % featuredRecipeImages.length
                      ]
                    }
                    alt="Featured Recipe"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">
                    Premium Dish {i}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    A delicious chef-curated recipe to inspire your next meal.
                  </p>
                  <button className="mt-auto px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Shortcuts: Quick Access & Our Services */}
        <section className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-300">
              Quick Access
            </h2>
            <QuickAccessSection darkMode={darkMode} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-300">
              Our Services
            </h2>
            <ServicesSection darkMode={darkMode} />
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-900 dark:text-green-300 text-left">
            Recommended For You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Popular Recipe Categories */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-stone-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                  Quick & Easy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  30-minute meals for busy weeknights
                </p>
                <Link
                  to="/recipes"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  Explore Recipes →
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-stone-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2v1a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1 1zM3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 8a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zM3 12a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                  Healthy Choices
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Nutritious meals under 500 calories
                </p>
                <Link
                  to="/nutrition-tracker"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  Track Nutrition →
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-stone-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16 6V4a2 2 0 00-2-2H6a2 2 0 00-2 2v2H2v2h1l1.6 9.2A2 2 0 006.6 19h6.8a2 2 0 001.98-1.8L18 8h1V6h-3zM6 4h8v2H6V4zm2 10a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                  Budget Friendly
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Delicious meals under $10
                </p>
                <Link
                  to="/shopping-list"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  Shopping List →
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-stone-200 dark:border-neutral-800 p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                  Chef&apos;s Picks
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Curated recipes from top chefs
                </p>
                <Link
                  to="/collections"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                >
                  View Collections →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Collection Section */}
        <section className="py-16 relative overflow-hidden -mx-4 sm:-mx-8 lg:-mx-16">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50 dark:from-transparent dark:via-black/30 dark:to-black/50" />

          <div className="relative z-10 px-4 sm:px-8 lg:px-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-900 dark:text-green-300 text-left">
              Seasonal Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Spring Collection */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-lg border border-green-200 dark:border-green-700 p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-3">
                    Spring Fresh
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Light, fresh dishes with seasonal vegetables and herbs
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div>• Asparagus & Pea Risotto</div>
                    <div>• Strawberry Spinach Salad</div>
                    <div>• Lemon Herb Chicken</div>
                  </div>
                  <Link
                    to="/seasonal-ingredients"
                    className="inline-flex items-center mt-4 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                  >
                    Explore Spring →
                  </Link>
                </div>
              </div>

              {/* Summer Collection */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl shadow-lg border border-orange-200 dark:border-orange-700 p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-300 mb-3">
                    Summer Grilling
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    BBQ favorites and refreshing summer dishes
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div>• Grilled Salmon with Citrus</div>
                    <div>• Watermelon Feta Salad</div>
                    <div>• BBQ Ribs with Coleslaw</div>
                  </div>
                  <Link
                    to="/seasonal-ingredients"
                    className="inline-flex items-center mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
                  >
                    Explore Summer →
                  </Link>
                </div>
              </div>

              {/* Fall Collection */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl shadow-lg border border-red-200 dark:border-red-700 p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 dark:text-red-300 mb-3">
                    Autumn Comfort
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Warm, hearty dishes perfect for cooler weather
                  </p>
                  <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                    <div>• Butternut Squash Soup</div>
                    <div>• Apple Cinnamon Pork</div>
                    <div>• Pumpkin Spice Bread</div>
                  </div>
                  <Link
                    to="/seasonal-ingredients"
                    className="inline-flex items-center mt-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
                  >
                    Explore Autumn →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-green-900 dark:text-green-300 text-left">
            What Our Users Say
          </h2>
          <div>
            <div className="rounded-xl shadow-lg bg-white dark:bg-neutral-900 border border-border p-8 flex flex-col items-center w-full">
              {/* Review 1 */}
              <div className="flex flex-col items-center text-center mb-8 w-full">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4 text-2xl font-bold text-green-700 dark:text-green-200">
                  A
                </div>
                <blockquote className="italic text-lg text-muted-foreground mb-4">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, nisi vel consectetur euismod, nisl nisi
                  consectetur nisi, euismod euismod nisi nisi euismod.”
                </blockquote>
                <div className="font-semibold text-green-900 dark:text-green-300">
                  John A Doe.
                </div>
                <div className="text-xs text-muted-foreground">Home Chef</div>
              </div>
              {/* Review 2 */}
              <div className="flex flex-col items-center text-center mb-8 w-full">
                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center mb-4 text-2xl font-bold text-orange-700 dark:text-orange-200">
                  J
                </div>
                <blockquote className="italic text-lg text-muted-foreground mb-4">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, nisi vel consectetur euismod, nisl nisi
                  consectetur nisi, euismod euismod nisi nisi euismod.”
                </blockquote>
                <div className="font-semibold text-green-900 dark:text-green-300">
                  Jane J Doe.
                </div>
                <div className="text-xs text-muted-foreground">
                  Fitness Enthusiast
                </div>
              </div>
              {/* Review 3 */}
              <div className="flex flex-col items-center text-center w-full">
                <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center mb-4 text-2xl font-bold text-yellow-700 dark:text-yellow-200">
                  S
                </div>
                <blockquote className="italic text-lg text-muted-foreground mb-4">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque euismod, nisi vel consectetur euismod, nisl nisi
                  consectetur nisi, euismod euismod nisi nisi euismod.”
                </blockquote>
                <div className="font-semibold text-green-900 dark:text-green-300">
                  John S Doe.
                </div>
                <div className="text-xs text-muted-foreground">
                  Food Blogger
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-main text-main min-h-screen">
      <div>
        <RecipeMetaHelmet selected={selected} nutritionData={nutritionData} />
        {loading && <LoadingSkeleton darkMode={darkMode} />}
        {error && <ErrorMessage message={error} darkMode={darkMode} />}
        {/* Recipe Card */}
        {!loading && selected && (
          <section
            data-recipe-section
            className="bg-card rounded-xl shadow-md p-6 md:p-8 mb-8 px-0"
          >
            <h2 className="text-2xl font-semibold mb-4">Recipe</h2>
            <RecipeCard
              selected={selected}
              darkMode={darkMode}
              generateFoodDescription={memoizedDescription}
              isFavorite={isFavorite}
              favoriteLoading={favoriteLoading}
              toggleFavorite={toggleFavorite}
            />
          </section>
        )}

        {/* Category, Ingredients, Method, Nutrition */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card rounded-xl shadow-md p-6 md:p-8 mb-8 px-0">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Category & Ingredients
            </h2>
            <FoodCategory category={selected.strCategory} darkMode={darkMode} />
            <Ingredients recipe={selected} darkMode={darkMode} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Method & Nutrition</h2>
            <Instructions
              instructions={selected.strInstructions}
              darkMode={darkMode}
            />
            <Nutrition
              nutrition={nutritionData || {}}
              darkMode={darkMode}
              loading={nutritionLoading}
            />
          </div>
        </section>
        {/* Tools Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card rounded-xl shadow-md p-6 md:p-8 mb-8 px-0">
          {/* Leftover Ideas */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <h2 className="text-lg font-medium mb-4">Leftover Ideas</h2>
            <LeftoverIntegration recipe={selected} darkMode={darkMode} />
          </div>
          {/* Adjust Servings */}
          <div className="flex flex-col p-0 h-full">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-stone-200 dark:border-neutral-800 relative h-full flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="text-lg font-medium">Adjust Servings</h2>
              </div>
              {toolsExpanded ? (
                <div className="p-4 pt-0 flex-1 flex flex-col">
                  <RecipeScaling recipe={selected} darkMode={darkMode} />
                </div>
              ) : (
                <div className="relative flex-1 flex flex-col justify-between h-full">
                  <div className="p-4 pt-0 flex-1 overflow-hidden max-h-24">
                    <RecipeScaling recipe={selected} darkMode={darkMode} />
                  </div>
                  <div className="absolute bottom-12 left-0 w-full h-14 bg-gradient-to-t from-white/95 dark:from-neutral-900/95 to-transparent pointer-events-none transition-all duration-200" />
                </div>
              )}
            </div>
          </div>
          {/* Difficulty & Time */}
          <div className="flex flex-col p-0 h-full">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-stone-200 dark:border-neutral-800 relative h-full flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="text-lg font-medium">Difficulty & Time</h2>
              </div>
              {toolsExpanded ? (
                <div className="p-4 pt-0 flex-1 flex flex-col">
                  <RecipeDifficulty recipe={selected} darkMode={darkMode} />
                </div>
              ) : (
                <div className="relative flex-1 flex flex-col justify-between h-full">
                  <div className="p-4 pt-0 flex-1 overflow-hidden max-h-24">
                    <RecipeDifficulty recipe={selected} darkMode={darkMode} />
                  </div>
                  <div className="absolute bottom-12 left-0 w-full h-14 bg-gradient-to-t from-white/95 dark:from-neutral-900/95 to-transparent pointer-events-none transition-all duration-200" />
                </div>
              )}
            </div>
          </div>
          {/* Cooking Techniques */}
          <div className="flex flex-col p-0 h-full">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-stone-200 dark:border-neutral-800 relative h-full flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="text-lg font-medium">Cooking Techniques</h2>
              </div>
              {toolsExpanded ? (
                <div className="p-4 pt-0 flex-1 flex flex-col">
                  <CookingVideos recipe={selected} darkMode={darkMode} />
                </div>
              ) : (
                <div className="relative flex-1 flex flex-col justify-between h-full">
                  <div className="p-4 pt-0 flex-1 overflow-hidden max-h-24">
                    <CookingVideos recipe={selected} darkMode={darkMode} />
                  </div>
                  <div className="absolute bottom-12 left-0 w-full h-14 bg-gradient-to-t from-white/95 dark:from-neutral-900/95 to-transparent pointer-events-none transition-all duration-200" />
                </div>
              )}
            </div>
          </div>
          {/* Expand/Collapse Button */}
          <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
            <button
              className="text-sm px-4 py-2 rounded bg-stone-200 dark:bg-neutral-700 hover:bg-stone-300 dark:hover:bg-neutral-600 transition shadow"
              onClick={handleToolsToggle}
              aria-expanded={toolsExpanded}
            >
              {toolsExpanded ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </section>
        {/* Reviews */}
        <section className="bg-card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <RecipeReviews recipeId={selected.idMeal} darkMode={darkMode} />
        </section>
      </div>
    </div>
  );
}
