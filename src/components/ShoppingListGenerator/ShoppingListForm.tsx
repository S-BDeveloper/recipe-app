import React from "react";

interface ShoppingListFormProps {
  newItem: {
    ingredient: string;
    quantity: string;
    unit: string;
    category: string;
  };
  setNewItem: React.Dispatch<
    React.SetStateAction<{
      ingredient: string;
      quantity: string;
      unit: string;
      category: string;
    }>
  >;
  onAdd: () => void;
  darkMode: boolean;
}

export default function ShoppingListForm({
  newItem,
  setNewItem,
  onAdd,
  darkMode,
}: ShoppingListFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd();
      }}
      className="flex gap-2 mb-4"
    >
      <input
        type="text"
        placeholder="Add custom ingredient..."
        className={`w-full p-2 border rounded ${
          darkMode
            ? "bg-neutral-800 border-neutral-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        value={newItem.ingredient}
        onChange={(e) =>
          setNewItem((prev) => ({ ...prev, ingredient: e.target.value }))
        }
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          darkMode
            ? "bg-green-700 hover:bg-green-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        Add
      </button>
    </form>
  );
}

