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
import LoadingSpinner from "./LoadingSpinner";

export interface NutritionData {
  [key: string]: string | number | undefined;
  source?: string;
}

interface NutritionProps {
  nutrition: NutritionData;
  darkMode: boolean;
  loading?: boolean;
}

const Nutrition: React.FC<NutritionProps> = ({
  nutrition,
  darkMode,
  loading = false,
}) => {
  const [expanded, setExpanded] = useState(false); // always hidden at first

  if (loading) {
    return (
      <div
        className={`nutrition border p-4 sm:p-6 lg:p-8 shadow-md overflow-hidden rounded-lg input-border ${
          darkMode
            ? "bg-black border-gray-600"
            : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
        }`}
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-6 tracking-tight text-main">
          Nutrition
        </h3>
        {/* LoadingSpinner intentionally not typed here, but should be fine */}
        <LoadingSpinner
          size="md"
          color="green"
          text="Analyzing ingredients..."
          className="py-0"
        />
      </div>
    );
  }

  if (!nutrition) return null;

  // Convert object into array of [label, value] pairs
  const entries = Object.entries(nutrition)
    .filter(([, value]) => value) // skip empty or falsy values
    .map(([key, value]) => {
      // convert camelCase or snake_case keys to Title Case labels
      const label = key
        .replace(/[_]/g, " ")
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return { label, value };
    });

  if (entries.length === 0)
    return (
      <p
        className={`nutrition-info ${
          darkMode ? "text-stone-300" : "text-gray-600"
        }`}
      >
        No nutrition information available.
      </p>
    );

  return (
    <div
      className={`nutrition border p-4 sm:p-6 lg:p-8 shadow-md overflow-hidden rounded-lg input-border ${
        darkMode
          ? "bg-black border-gray-600"
          : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3
          className={`font-bold text-base sm:text-lg md:text-2xl lg:text-3xl leading-tight break-words text-main`}
        >
          Nutrition Information
        </h3>
        <button
          onClick={() => setExpanded((e) => !e)}
          className={`ml-2 px-3 py-1 rounded font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            darkMode
              ? expanded
                ? "bg-orange-900 text-orange-200 hover:bg-orange-800"
                : "bg-stone-800 text-orange-300 hover:bg-orange-900"
              : expanded
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "bg-stone-100 text-orange-700 hover:bg-orange-100"
          }`}
          aria-expanded={expanded}
          aria-controls="nutrition-details"
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </div>
      <p
        className={`text-sm mb-4 ${
          darkMode ? "text-stone-400" : "text-gray-600"
        }`}
      >
        {nutrition.source === "fallback"
          ? "Estimated nutrition based on ingredients (API unavailable)"
          : "Based on ingredients analysis via USDA FoodData Central"}
      </p>
      <div
        id="nutrition-details"
        style={{
          maxHeight: expanded ? 1000 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden={!expanded}
      >
        <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
          {entries.map((item, idx) => (
            <li
              key={idx}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b last:border-b-0 gap-1 min-w-0 ${
                darkMode ? "border-stone-700" : "border-gray-200"
              }`}
            >
              <span
                className={`font-semibold text-sm sm:text-base lg:text-lg break-words text-main`}
              >
                {item.label}:
              </span>
              <span
                className={`text-sm sm:text-base lg:text-lg break-words overflow-hidden ${
                  darkMode ? "text-stone-300" : "text-gray-700"
                }`}
              >
                {item.value as string | number}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nutrition;

