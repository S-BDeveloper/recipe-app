import type { Recipe } from "../../global";

interface RecipeCardProps {
  selected: Recipe;
  isFavorite: boolean;
  favoriteLoading: boolean;
  toggleFavorite: () => void;
  darkMode: boolean;
  generateFoodDescription: string;
}

export default function RecipeCard({
  selected,
  isFavorite,
  favoriteLoading,
  toggleFavorite,
  darkMode,
  generateFoodDescription,
}: RecipeCardProps) {
  if (!selected) return null;
  return (
    <div
      className={`compact-card compact-card-elevated overflow-hidden ${
        darkMode
          ? "bg-neutral-900 border-neutral-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[450px] 2xl:max-w-[500px] mx-auto md:mx-0">
              {/* Recipe Title above the image */}
              <h2
                className={`text-xl sm:text-2xl md:text-3xl font-bold my-4 text-left break-words w-full ${
                  darkMode ? "text-green-300" : "text-green-900"
                }`}
              >
                {selected.strMeal}
              </h2>
              <img
                src={selected.strMealThumb}
                alt={`${selected.strMeal} recipe - ${selected.strCategory} dish from ${selected.strArea} cuisine`}
                title={`${selected.strMeal} Recipe`}
                className="w-full h-auto object-contain compact-image"
                loading="lazy"
              />
              {/* Action Buttons (always beneath image) */}
              <div className="flex flex-row justify-between items-center w-full px-2 sm:px-4 mt-4">
                <button
                  onClick={() => window.print()}
                  className="compact-button-compact compact-button-primary flex items-center gap-1 whitespace-nowrap min-w-[60px] px-1 text-xs sm:min-w-[80px] sm:px-2 sm:text-sm md:min-w-[100px] md:px-6 md:text-base py-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(
                      `Check out this amazing recipe: ${selected.strMeal}`
                    );
                    window.open(
                      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                      "_blank"
                    );
                  }}
                  className="compact-button-compact flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 whitespace-nowrap min-w-[60px] px-1 text-xs sm:min-w-[80px] sm:px-2 sm:text-sm md:min-w-[100px] md:px-6 md:text-base py-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                      "_blank"
                    );
                  }}
                  className="flex items-center gap-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap min-w-[60px] px-1 text-xs sm:min-w-[80px] sm:px-2 sm:text-sm md:min-w-[100px] md:px-6 md:text-base py-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="flex flex-col justify-center h-full space-y-2 sm:space-y-3 md:space-y-4">
              {selected.strTags && (
                <>
                  <h3
                    className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 border-b pb-2 sm:pb-3 ${
                      darkMode
                        ? "text-green-300 border-neutral-700"
                        : "text-green-900 border-gray-100"
                    }`}
                  >
                    Tags
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-3 flex-shrink-0">
                    {selected.strTags
                      .split(",")
                      .map((tag: string, index: number) => (
                        <li
                          key={index}
                          className={`flex items-center p-1 rounded-lg transition-colors duration-200 ${
                            darkMode ? "hover:bg-black" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                          <span
                            className={`text-sm sm:text-base lg:text-lg break-words ${
                              darkMode ? "text-stone-300" : "text-gray-700"
                            }`}
                          >
                            {tag.trim()}
                          </span>
                        </li>
                      ))}
                  </ul>
                </>
              )}
              <div
                className={`pt-2 sm:pt-3 ${
                  selected.strTags ? "border-t border-gray-200" : ""
                }`}
              >
                {/* Favorite Button */}
                <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                      favoriteLoading
                        ? "opacity-50 cursor-not-allowed"
                        : isFavorite
                        ? "bg-red-500 text-white hover:bg-red-600 shadow-md"
                        : darkMode
                        ? "bg-neutral-800 text-stone-300 hover:bg-stone-800 hover:shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    {favoriteLoading ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isFavorite
                            ? "text-white"
                            : darkMode
                            ? "text-red-400"
                            : "text-red-500"
                        }`}
                        fill={isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                    <span className="hidden sm:inline">
                      {favoriteLoading
                        ? "Saving..."
                        : isFavorite
                        ? "In Favorites"
                        : "Add to Favorites"}
                    </span>
                  </button>
                </div>
                <h4
                  className={`compact-heading ${
                    darkMode ? "text-green-300" : "text-green-900"
                  }`}
                >
                  About This Recipe
                </h4>
                <p
                  className={`compact-text-compact line-clamp-3 sm:line-clamp-4 md:line-clamp-5 ${
                    darkMode ? "text-stone-300" : "text-gray-700"
                  }`}
                >
                  {generateFoodDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
