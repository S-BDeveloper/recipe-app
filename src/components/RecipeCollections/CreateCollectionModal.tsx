import React from "react";
import type { NewCollection } from "../RecipeCollections";

interface CreateCollectionModalProps {
  showModal: boolean;
  newCollection: NewCollection;
  setNewCollection: React.Dispatch<React.SetStateAction<NewCollection>>;
  collectionCategories: string[];
  onCreate: () => void;
  onClose: () => void;
  darkMode: boolean;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  showModal,
  newCollection,
  setNewCollection,
  collectionCategories,
  onCreate,
  onClose,
  darkMode,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md p-6 rounded-lg ${
          darkMode ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Create New Collection</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newCollection.name}
              onChange={(e) =>
                setNewCollection({ ...newCollection, name: e.target.value })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-neutral-800 border-neutral-700 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Collection name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={newCollection.description}
              onChange={(e) =>
                setNewCollection({
                  ...newCollection,
                  description: e.target.value,
                })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-neutral-800 border-neutral-700 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Collection description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={newCollection.category}
              onChange={(e) =>
                setNewCollection({
                  ...newCollection,
                  category: e.target.value,
                })
              }
              className={`w-full p-2 border rounded ${
                darkMode
                  ? "bg-neutral-800 border-neutral-700 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {collectionCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;

