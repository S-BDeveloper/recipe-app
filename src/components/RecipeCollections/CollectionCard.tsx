import React from "react";
import type { Collection } from "../RecipeCollections";

interface CollectionCardProps {
  collection: Collection;
  isSelected: boolean;
  onSelect: (c: Collection) => void;
  onDelete: (id: string) => void;
  darkMode: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  isSelected,
  onSelect,
  onDelete,
  darkMode,
}) => {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? darkMode
            ? "bg-orange-600 text-white"
            : "bg-orange-100 text-orange-800"
          : darkMode
            ? "bg-neutral-800 hover:bg-neutral-700"
            : "bg-gray-50 hover:bg-gray-100"
      }`}
      onClick={() => onSelect(collection)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold">{collection.name}</h4>
          <p
            className={`text-sm mt-1 ${
              isSelected
                ? "text-orange-100"
                : darkMode
                  ? "text-stone-400"
                  : "text-gray-600"
            }`}
          >
            {collection.recipeCount} recipes
          </p>
          <p
            className={`text-xs mt-1 ${
              isSelected
                ? "text-orange-100"
                : darkMode
                  ? "text-stone-500"
                  : "text-gray-500"
            }`}
          >
            {collection.category}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(collection.id);
          }}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;

