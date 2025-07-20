import React from "react";
import RecipeItem from "./RecipeItem";
import type { Collection } from "../RecipeCollections";

interface CollectionDetailsProps {
  selectedCollection: Collection | null;
  onAddRecipe: () => void;
  onRemoveRecipe: (id: string) => void;
  darkMode: boolean;
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({
  selectedCollection,
  onAddRecipe,
  onRemoveRecipe,
  darkMode,
}) => {
  if (!selectedCollection) {
    return (
      <div
        className={`text-center py-8 ${
          darkMode ? "text-stone-400" : "text-gray-600"
        }`}
      >
        <p>Select a collection to view its recipes</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold">
            {selectedCollection.name}
          </h3>
          <p
            className={`text-sm ${
              darkMode ? "text-stone-400" : "text-gray-600"
            }`}
          >
            {selectedCollection.description}
          </p>
        </div>
        <button
          onClick={onAddRecipe}
          className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 whitespace-nowrap"
        >
          + Add Recipe
        </button>
      </div>

      {selectedCollection.recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {selectedCollection.recipes.map((recipe, index) => (
            <RecipeItem
              key={`${recipe.id}-${index}`}
              recipe={recipe}
              onRemove={onRemoveRecipe}
              darkMode={darkMode}
            />
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-8 ${
            darkMode ? "text-stone-400" : "text-gray-600"
          }`}
        >
          <p>
            No recipes in this collection yet. Add some recipes to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionDetails;

