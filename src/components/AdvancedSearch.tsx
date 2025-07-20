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

import React, { useState } from "react";

interface AdvancedSearchProps {
  onSearch: (params: SearchParams) => void;
  darkMode: boolean;
}

interface SearchParams {
  query: string;
  includedIngredients: string[];
  excludedIngredients: string[];
  cookingMethods: string[];
  difficulty: string;
  maxTime: string;
  cuisine: string;
  dietaryRestrictions: string[];
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [cookingMethods, setCookingMethods] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [newIncludedIngredient, setNewIncludedIngredient] = useState("");
  const [newExcludedIngredient, setNewExcludedIngredient] = useState("");

  const cookingMethodOptions = [
    "Baking",
    "Grilling",
    "Frying",
    "Boiling",
    "Steaming",
    "Roasting",
    "Slow Cooking",
    "Air Frying",
    "Smoking",
    "Pickling",
  ];

  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const timeOptions = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1.5 hours",
    "2 hours",
    "3+ hours",
  ];
  const cuisineOptions = [
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Japanese",
    "Thai",
    "French",
    "Mediterranean",
    "American",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Middle Eastern",
    "Caribbean",
    "African",
  ];
  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Low-Carb",
    "Keto",
    "Paleo",
    "Halal",
    "Kosher",
    "Low-Sodium",
    "Sugar-Free",
  ];

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      includedIngredients,
      excludedIngredients,
      cookingMethods,
      difficulty,
      maxTime,
      cuisine,
      dietaryRestrictions,
    });
  };

  const addIncludedIngredient = () => {
    if (newIncludedIngredient.trim()) {
      setIncludedIngredients([
        ...includedIngredients,
        newIncludedIngredient.trim(),
      ]);
      setNewIncludedIngredient("");
    }
  };

  const removeIncludedIngredient = (ingredient: string) => {
    setIncludedIngredients(includedIngredients.filter((i) => i !== ingredient));
  };

  const addExcludedIngredient = () => {
    if (newExcludedIngredient.trim()) {
      setExcludedIngredients([
        ...excludedIngredients,
        newExcludedIngredient.trim(),
      ]);
      setNewExcludedIngredient("");
    }
  };

  const removeExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients(excludedIngredients.filter((i) => i !== ingredient));
  };

  const toggleCookingMethod = (method: string) => {
    setCookingMethods(
      cookingMethods.includes(method)
        ? cookingMethods.filter((m) => m !== method)
        : [...cookingMethods, method]
    );
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(
      dietaryRestrictions.includes(restriction)
        ? dietaryRestrictions.filter((r) => r !== restriction)
        : [...dietaryRestrictions, restriction]
    );
  };

  const clearAll = () => {
    setSearchQuery("");
    setIncludedIngredients([]);
    setExcludedIngredients([]);
    setCookingMethods([]);
    setDifficulty("");
    setMaxTime("");
    setCuisine("");
    setDietaryRestrictions([]);
    setNewIncludedIngredient("");
    setNewExcludedIngredient("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode ? "text-stone-300" : "text-gray-900"
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full pt-4 pb-6">
        <div
          className={`rounded-2xl shadow-2xl border-2 p-6 sm:p-8 lg:p-12 relative overflow-hidden ${
            darkMode ? "border-stone-700" : "border-stone-200"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg-gradient' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fef3c7;stop-opacity:0.4' /%3E%3Cstop offset='50%25' style='stop-color:%23fed7aa;stop-opacity:0.3' /%3E%3Cstop offset='100%25' style='stop-color:%23fdba74;stop-opacity:0.4' /%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='3' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg-gradient)'/%3E%3Cg opacity='0.2'%3E%3C!-- Search icons --%3E%3Cg transform='translate(50,50)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='25' fill='none' stroke='%23f59e0b' stroke-width='2'/%3E%3Cpath d='M18 18 L32 32' stroke='%23f59e0b' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(300,120)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='20' fill='none' stroke='%23ea580c' stroke-width='2'/%3E%3Cpath d='M14 14 L26 26' stroke='%23ea580c' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(600,80)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='22' fill='none' stroke='%23d97706' stroke-width='2'/%3E%3Cpath d='M16 16 L28 28' stroke='%23d97706' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(200,300)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='18' fill='none' stroke='%23f59e0b' stroke-width='2'/%3E%3Cpath d='M13 13 L23 23' stroke='%23f59e0b' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(500,350)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='24' fill='none' stroke='%23ea580c' stroke-width='2'/%3E%3Cpath d='M17 17 L29 29' stroke='%23ea580c' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3Cg transform='translate(800,250)' filter='url(%23glow)'%3E%3Ccircle cx='0' cy='0' r='19' fill='none' stroke='%23d97706' stroke-width='2'/%3E%3Cpath d='M14 14 L24 24' stroke='%23d97706' stroke-width='3' stroke-linecap='round'/%3E%3C/g%3E%3C!-- Recipe ingredients --%3E%3Cg opacity='0.3'%3E%3Ccircle cx='120' cy='180' r='6' fill='%23fbbf24'/%3E%3Ccircle cx='350' cy='280' r='4' fill='%23f97316'/%3E%3Ccircle cx='550' cy='150' r='8' fill='%23eab308'/%3E%3Ccircle cx='750' cy='320' r='5' fill='%23f59e0b'/%3E%3Ccircle cx='250' cy='450' r='7' fill='%23ea580c'/%3E%3Ccircle cx='450' cy='500' r='3' fill='%23d97706'/%3E%3C/g%3E%3C!-- Connection lines --%3E%3Cg stroke='%23fbbf24' stroke-width='1.5' opacity='0.15'%3E%3Cpath d='M50 50 L300 120'/%3E%3Cpath d='M300 120 L600 80'/%3E%3Cpath d='M600 80 L500 350'/%3E%3Cpath d='M200 300 L500 350'/%3E%3Cpath d='M500 350 L800 250'/%3E%3Cpath d='M50 50 L200 300'/%3E%3Cpath d='M300 120 L200 300'/%3E%3C/g%3E%3C!-- Data flow lines --%3E%3Cg opacity='0.1' stroke-dasharray='4,4'%3E%3Cpath d='M250 100 L450 180'/%3E%3Cpath d='M450 180 L700 130'/%3E%3Cpath d='M700 130 L600 300'/%3E%3Cpath d='M600 300 L250 400'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for better readability */}
          <div
            className={`absolute inset-0 ${
              darkMode ? "bg-black/70" : "bg-white/60"
            }`}
          ></div>
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Advanced Recipe Search
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    darkMode ? "text-stone-400" : "text-gray-600"
                  }`}
                >
                  Discover your perfect recipe with our powerful search filters
                </p>
              </div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm sm:text-base font-medium hover:scale-105 transition-transform"
              >
                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
              </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label
                className={`block text-base font-medium mb-3 ${
                  darkMode ? "text-stone-200" : "text-gray-700"
                }`}
              >
                Search Query
              </label>
              <input
                type="text"
                placeholder="Search recipes by name, ingredients, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-base ${
                  darkMode
                    ? "bg-stone-800 border-stone-600 text-white placeholder-stone-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Advanced Search Options */}
            {showAdvanced && (
              <div className="space-y-4">
                {/* Included Ingredients */}
                <div
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? "bg-neutral-800 border-stone-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <label
                    className={`block text-base font-medium mb-3 ${
                      darkMode ? "text-stone-200" : "text-gray-700"
                    }`}
                  >
                    Must Include
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add ingredient..."
                      value={newIncludedIngredient}
                      onChange={(e) => setNewIncludedIngredient(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addIncludedIngredient()
                      }
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? "bg-stone-700 border-stone-500 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <button
                      onClick={addIncludedIngredient}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {includedIngredients.map((ingredient: string) => (
                      <span
                        key={ingredient}
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIncludedIngredient(ingredient)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Excluded Ingredients */}
                <div
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? "bg-neutral-800 border-stone-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <label
                    className={`block text-base font-medium mb-3 ${
                      darkMode ? "text-stone-200" : "text-gray-700"
                    }`}
                  >
                    Exclude
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add ingredient to exclude..."
                      value={newExcludedIngredient}
                      onChange={(e) => setNewExcludedIngredient(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && addExcludedIngredient()
                      }
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? "bg-stone-700 border-stone-500 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <button
                      onClick={addExcludedIngredient}
                      className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {excludedIngredients.map((ingredient: string) => (
                      <span
                        key={ingredient}
                        className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeExcludedIngredient(ingredient)}
                          className="ml-1 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cooking Methods */}
                <div
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? "bg-neutral-800 border-stone-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <label
                    className={`block text-base font-medium mb-3 ${
                      darkMode ? "text-stone-200" : "text-gray-700"
                    }`}
                  >
                    Cooking Methods
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {cookingMethodOptions.map((method: string) => (
                      <label
                        key={method}
                        className="flex items-center space-x-2 text-sm py-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={cookingMethods.includes(method)}
                          onChange={() => toggleCookingMethod(method)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="flex-1">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Difficulty */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-neutral-800 border-stone-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <label
                      className={`block text-base font-medium mb-3 ${
                        darkMode ? "text-stone-200" : "text-gray-700"
                      }`}
                    >
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? "bg-stone-700 border-stone-500 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    >
                      <option value="">Any Difficulty</option>
                      {difficultyOptions.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Max Time */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-neutral-800 border-stone-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <label
                      className={`block text-base font-medium mb-3 ${
                        darkMode ? "text-stone-200" : "text-gray-700"
                      }`}
                    >
                      Max Time
                    </label>
                    <select
                      value={maxTime}
                      onChange={(e) => setMaxTime(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? "bg-stone-700 border-stone-500 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    >
                      <option value="">Any Time</option>
                      {timeOptions.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cuisine */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-neutral-800 border-stone-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <label
                      className={`block text-base font-medium mb-3 ${
                        darkMode ? "text-stone-200" : "text-gray-700"
                      }`}
                    >
                      Cuisine
                    </label>
                    <select
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? "bg-stone-700 border-stone-500 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    >
                      <option value="">Any Cuisine</option>
                      {cuisineOptions.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? "bg-neutral-800 border-stone-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <label
                      className={`block text-base font-medium mb-3 ${
                        darkMode ? "text-stone-200" : "text-gray-700"
                      }`}
                    >
                      Dietary
                    </label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {dietaryOptions.map((restriction: string) => (
                        <label
                          key={restriction}
                          className="flex items-center space-x-2 text-sm py-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={dietaryRestrictions.includes(restriction)}
                            onChange={() =>
                              toggleDietaryRestriction(restriction)
                            }
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="flex-1">{restriction}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-stone-600">
              <button
                onClick={clearAll}
                className="px-6 py-3 rounded-lg text-sm font-medium bg-red-700 text-white hover:bg-red-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-3 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Search Recipes
              </button>
            </div>

            {/* Search Summary */}
            {(searchQuery ||
              includedIngredients.length > 0 ||
              excludedIngredients.length > 0 ||
              cookingMethods.length > 0 ||
              difficulty ||
              maxTime ||
              cuisine ||
              dietaryRestrictions.length > 0) && (
              <div
                className={`mt-6 p-4 rounded-lg border ${
                  darkMode
                    ? "bg-neutral-800 border-stone-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4
                  className={`text-base font-medium mb-3 ${
                    darkMode ? "text-stone-200" : "text-gray-700"
                  }`}
                >
                  Search Summary
                </h4>
                <div
                  className={`text-sm space-y-1 ${
                    darkMode ? "text-stone-300" : "text-gray-600"
                  }`}
                >
                  {searchQuery && (
                    <div>🔍 Query: &quot;{searchQuery}&quot;</div>
                  )}
                  {includedIngredients.length > 0 && (
                    <div>✅ Must include: {includedIngredients.join(", ")}</div>
                  )}
                  {excludedIngredients.length > 0 && (
                    <div>❌ Exclude: {excludedIngredients.join(", ")}</div>
                  )}
                  {cookingMethods.length > 0 && (
                    <div>🍳 Methods: {cookingMethods.join(", ")}</div>
                  )}
                  {difficulty && <div>📊 Difficulty: {difficulty}</div>}
                  {maxTime && <div>⏱️ Max time: {maxTime}</div>}
                  {cuisine && <div>🌍 Cuisine: {cuisine}</div>}
                  {dietaryRestrictions.length > 0 && (
                    <div>🥗 Dietary: {dietaryRestrictions.join(", ")}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
