import ShoppingListItem from "./ShoppingListItem";

interface ShoppingItem {
  ingredient: string;
  quantity: string;
  unit: string;
  category: string;
  recipes: string[];
  checked: boolean;
  isCustom: boolean;
}

interface ShoppingListItemsProps {
  items: ShoppingItem[];
  onRemoveItem: (index: number) => void;
  darkMode: boolean;
}

export default function ShoppingListItems({
  items,
  onRemoveItem,
  darkMode,
}: ShoppingListItemsProps) {
  return (
    <div className="space-y-2">
      {items.map((item: ShoppingItem, idx: number) => (
        <ShoppingListItem
          key={idx}
          item={item}
          onRemove={() => onRemoveItem(idx)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

