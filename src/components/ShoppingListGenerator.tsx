/**
 * Copyright (c) 2024 Sabina Begum. All rights reserved.
 *
 * PROPRIETARY SOFTWARE - CONFIDENTIAL
 *
 * This file contains proprietary and confidential information.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 *
 * For licensing inquiries: begumsabina81193@gmail.com
 *
 * Educational use only - Commercial use prohibited.
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ShoppingListHeader from "./ShoppingListGenerator/ShoppingListHeader";
import ShoppingListForm from "./ShoppingListGenerator/ShoppingListForm";
import ShoppingListItems from "./ShoppingListGenerator/ShoppingListItems";
import EmptyState from "./RecipeCollections/EmptyState";

interface ShoppingListGeneratorProps {
  darkMode: boolean;
}

interface ShoppingItem {
  ingredient: string;
  quantity: string;
  unit: string;
  category: string;
  recipes: string[];
  checked: boolean;
  isCustom: boolean;
}

const ShoppingListGenerator = ({ darkMode }: ShoppingListGeneratorProps) => {
  const { currentUser } = useAuth();
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState({
    ingredient: "",
    quantity: "1",
    unit: "",
    category: "Produce",
  });

  const loadMealPlan = useCallback(async () => {
    if (!currentUser) return;
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const mealPlanDoc = await getDoc(
        doc(db, "mealPlans", `${currentUser.uid}_${year}_${month}`),
      );

      if (mealPlanDoc.exists()) {
        // setMealPlan(mealPlanDoc.data().meals || {}); // This line was removed
      } else {
        // setMealPlan({}); // This line was removed
      }
    } catch (error) {
      console.error("Error loading meal plan:", error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadMealPlan();
    }
  }, [currentUser, loadMealPlan]);

  const removeItem = (index: number) => {
    setShoppingList((prev) => prev.filter((_, i) => i !== index));
  };

  const addCustomItem = () => {
    if (!newItem.ingredient) return;
    setShoppingList((prev) => [
      ...prev,
      {
        ...newItem,
        recipes: ["Custom"],
        checked: false,
        isCustom: true,
      },
    ]);
    setNewItem({
      ingredient: "",
      quantity: "1",
      unit: "",
      category: "Produce",
    });
  };

  if (!currentUser) {
    return (
      <div
        className={`text-center py-8 ${
          darkMode ? "text-stone-300" : "text-stone-600"
        }`}
      >
        Please log in to access shopping list generator.
      </div>
    );
  }

  return (
    <div
      className={`max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-4 sm:pt-8 lg:pt-12 pb-4 sm:pb-8 lg:pb-12 ${
        darkMode ? "text-stone-100" : "text-stone-800"
      }`}
    >
      <div
        className={`rounded-xl shadow-lg border p-3 sm:p-4 md:p-6 ${
          darkMode ? "bg-black border-stone-700" : "bg-white border-stone-200"
        }`}
      >
        <ShoppingListHeader
          onAddItem={addCustomItem}
          onClearList={() => setShoppingList([])}
          darkMode={darkMode}
        />
        <ShoppingListForm
          newItem={newItem}
          setNewItem={setNewItem}
          onAdd={addCustomItem}
          darkMode={darkMode}
        />
        <ShoppingListItems
          items={shoppingList}
          onRemoveItem={removeItem}
          darkMode={darkMode}
        />
        {shoppingList.length === 0 && (
          <EmptyState
            message="Your shopping list is empty. Add some items!"
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingListGenerator;

