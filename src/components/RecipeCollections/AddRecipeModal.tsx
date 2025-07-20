import React from "react";
import type { Recipe } from "../RecipeCollections";

interface AddRecipeModalProps {
  showModal: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  availableRecipes: Recipe[];
  onAddRecipe: (r: Recipe) => void;
  onClose: () => void;
  darkMode: boolean;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({
  showModal,
  searchTerm,
  setSearchTerm,
  availableRecipes,
  onAddRecipe,
  onClose,
  darkMode,
}) => {
  if (!showModal) return null;

  const filteredRecipes = availableRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          darkMode ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Add Recipe to Collection</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Search Recipes
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-neutral-800 border-neutral-700 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Search your recipes..."
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50 ${
                  darkMode
                    ? "border-neutral-700 hover:bg-neutral-700"
                    : "border-gray-200"
                }`}
                onClick={() => onAddRecipe(recipe)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onAddRecipe(recipe);
                  }
                }}
              >
                <div className="font-medium">
                  {recipe.name || (recipe.recipeName as string)}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-stone-400" : "text-gray-600"
                  }`}
                >
                  {recipe.category || (recipe.recipeCategory as string)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-neutral-700 hover:bg-neutral-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeModal;

