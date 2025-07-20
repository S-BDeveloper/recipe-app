import React, { useState } from "react";

interface QuickAddModalProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({
  open,
  onClose,
  darkMode,
}) => {
  const [name, setName] = useState<string>("");

  if (!open) return null;

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: just close modal for now
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`max-w-sm w-full rounded-xl shadow-lg border p-6 relative transition-colors duration-300 ${
          darkMode
            ? "bg-neutral-900 border-neutral-700 text-stone-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-orange-500 text-xl font-bold"
          aria-label="Close quick add"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Quick Add</h2>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Recipe name..."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className={`w-full px-3 py-2 rounded border mb-4 ${
              darkMode
                ? "bg-neutral-800 border-neutral-600"
                : "bg-white border-gray-300"
            }`}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                darkMode
                  ? "bg-neutral-700 hover:bg-neutral-600 text-stone-300"
                  : "bg-stone-200 hover:bg-stone-300 text-stone-900"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAddModal;

