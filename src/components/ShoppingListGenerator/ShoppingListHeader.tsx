interface ShoppingListHeaderProps {
  onAddItem: () => void;
  onClearList: () => void;
  darkMode: boolean;
}

export default function ShoppingListHeader({
  onAddItem,
  onClearList,
  darkMode,
}: ShoppingListHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
        Shopping List
      </h2>
      <div className="flex gap-2">
        <button
          onClick={onAddItem}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          + Add Item
        </button>
        <button
          onClick={onClearList}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode
              ? "bg-stone-700 hover:bg-stone-600 text-stone-100"
              : "bg-stone-100 hover:bg-stone-200 text-stone-800"
          }`}
        >
          Clear List
        </button>
      </div>
    </div>
  );
}

