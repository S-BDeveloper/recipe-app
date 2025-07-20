import React from "react";

interface RecipeItemProps {
  recipe: {
    id: string;
    name: string;
    category: string;
    [key: string]: unknown;
  };
  onRemove: (id: string) => void;
  darkMode: boolean;
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe,
  onRemove,
  darkMode,
}) => {
  return (
    <div
      className={`p-4 rounded-lg border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold">
            {recipe.name || (recipe.recipeName as string)}
          </h4>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {recipe.category || (recipe.recipeCategory as string)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Added {new Date().toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onRemove(recipe.id)}
          className="text-red-500 hover:text-red-700 text-sm ml-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RecipeItem;

