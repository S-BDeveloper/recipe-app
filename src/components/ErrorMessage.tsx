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

function ErrorMessage({
  message,
  darkMode = false,
  className = "",
  showIcon = true,
}: {
  message: string;
  darkMode?: boolean;
  className?: string;
  showIcon?: boolean;
}) {
  if (!message) return null;

  // Check if this is a "no recipes found" error
  const isNoRecipesFound = message.includes("No recipes found");

  if (isNoRecipesFound) {
    return (
      <>
        {/* Alert Banner */}
        <div
          className={`w-full py-4 px-6 mb-8 ${
            darkMode
              ? "bg-red-900/20 border-b border-red-700 text-red-200"
              : "bg-red-100 border-b border-red-300 text-red-800"
          }`}
        >
          <div className="container mx-auto flex items-center justify-center">
            <span className="text-2xl mr-3">⚠️</span>
            <span className="text-lg font-semibold">
              Search returned no results
            </span>
          </div>
        </div>

        <div className={`text-center py-16 ${className}`}>
          <div
            className={`max-w-3xl mx-auto p-10 rounded-2xl shadow-2xl border-2 ${
              darkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border-red-500/30"
                : "bg-gradient-to-br from-red-50 to-orange-50 border-red-300"
            }`}
          >
            {/* Large Icon */}
            <div className="text-8xl mb-8">🔍</div>

            {/* Main Message */}
            <h3
              className={`text-4xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-red-800"
              }`}
            >
              ❌ No Recipes Found
            </h3>

            <p
              className={`text-xl mb-8 ${
                darkMode ? "text-gray-300" : "text-red-700"
              }`}
            >
              <strong>
                We could not find any recipes matching &quot;
                {message.split("&quot;")[1] || "your search"}&quot;
              </strong>
            </p>

            {/* Suggestions */}
            <div
              className={`p-6 rounded-lg mb-6 ${
                darkMode
                  ? "bg-gray-700/50 border border-gray-600"
                  : "bg-white/60 border border-orange-200"
              }`}
            >
              <h4
                className={`font-semibold mb-3 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Try these suggestions:
              </h4>
              <ul
                className={`text-left space-y-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Check your spelling and try again
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Use more general terms (e.g., &quot;chicken&quot; instead of
                  &quot;chicken breast&quot;)
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Try different ingredients or cuisines
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Browse our recipe categories for inspiration
                </li>
              </ul>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Popular searches:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "pasta",
                  "chicken",
                  "beef",
                  "fish",
                  "vegetarian",
                  "dessert",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      // Trigger a new search with this term
                      const searchInput = document.querySelector(
                        'input[type="text"]',
                      ) as HTMLInputElement | null;
                      if (searchInput) {
                        (searchInput as HTMLInputElement).value = term;
                        searchInput.dispatchEvent(
                          new Event("input", { bubbles: true }),
                        );
                        // Trigger search (you might need to adjust this based on your search implementation)
                        const searchForm = searchInput.closest("form");
                        if (searchForm) {
                          searchForm.dispatchEvent(
                            new Event("submit", { bubbles: true }),
                          );
                        }
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-orange-200"
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  // Clear the search and show default content
                  const searchInput = document.querySelector(
                    'input[type="text"]',
                  ) as HTMLInputElement | null;
                  if (searchInput) {
                    (searchInput as HTMLInputElement).value = "";
                    searchInput.dispatchEvent(
                      new Event("input", { bubbles: true }),
                    );
                  }
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Clear Search
              </button>
              <button
                onClick={() => {
                  // Navigate to recipes page
                  window.location.href = "/recipes";
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Browse All Recipes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Default error message for other types of errors
  return (
    <div className={`text-center py-8 ${className}`}>
      <div
        className={`border rounded-lg px-4 py-3 max-w-md mx-auto ${
          darkMode
            ? "bg-red-900 border-red-700 text-red-200"
            : "bg-red-100 border-red-400 text-red-700"
        }`}
      >
        {showIcon && (
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;

