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

interface FoodCategoryProps {
  category?: string;
  darkMode: boolean;
}

function FoodCategory({ category = "N/A", darkMode }: FoodCategoryProps) {
  if (!category) return null;

  return (
    <div
      className={`border p-4 sm:p-6 lg:p-8 shadow-md overflow-hidden rounded-lg ${
        darkMode
          ? "bg-black border-gray-600"
          : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
      }`}
    >
      <h3
        className={`font-bold text-base sm:text-lg md:text-2xl lg:text-3xl mb-2 sm:mb-3 leading-tight break-words ${
          darkMode ? "text-green-300" : "text-green-900"
        }`}
      >
        Food Category
      </h3>
      <p
        className={`text-sm sm:text-base lg:text-lg break-words overflow-hidden ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {category}
      </p>
    </div>
  );
}
export default FoodCategory;

