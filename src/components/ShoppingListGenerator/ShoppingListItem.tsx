interface ShoppingItem {
  ingredient: string;
  quantity: string;
  unit: string;
  category: string;
  recipes: string[];
  checked: boolean;
  isCustom: boolean;
}

interface ShoppingListItemProps {
  item: ShoppingItem;
  onRemove: () => void;
  darkMode: boolean;
}

export default function ShoppingListItem({
  item,
  onRemove,
  darkMode,
}: ShoppingListItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border ${
        darkMode
          ? "bg-neutral-800 border-neutral-600 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex-1">
        <span className="font-medium">{item.ingredient}</span>
        <span className="text-sm text-gray-500 ml-2">
          {item.quantity} {item.unit}
        </span>
      </div>
      <button
        onClick={onRemove}
        className={`ml-2 px-2 py-1 text-xs rounded ${
          darkMode
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        Remove
      </button>
    </div>
  );
}

