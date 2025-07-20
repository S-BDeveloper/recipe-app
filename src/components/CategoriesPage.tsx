import { useState } from "react";
import { ingredientCategories } from "../data/ingredientCategories";

const CategoriesPage = ({ darkMode }: { darkMode: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div
      className={`max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-lg border transition-colors duration-300 ${
        darkMode
          ? "bg-neutral-800 border-neutral-700 text-stone-300"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {ingredientCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-3 rounded-lg font-medium border transition-all duration-200 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              selectedCategory === cat
                ? darkMode
                  ? "bg-green-800 border-green-400 text-white"
                  : "bg-orange-100 border-orange-400 text-orange-900"
                : darkMode
                  ? "bg-neutral-900 border-neutral-700 text-stone-300 hover:bg-stone-800"
                  : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-orange-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Recipes in &quot;{selectedCategory}&quot; (coming soon)
          </h3>
          <p className="text-stone-400">
            This will show recipes for the selected category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;

