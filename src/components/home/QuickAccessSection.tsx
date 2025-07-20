import { Link } from "react-router-dom";
import { CalendarDays, ShoppingCart, BookMarked, Search } from "lucide-react";

interface QuickAccessSectionProps {
  darkMode: boolean;
}

export default function QuickAccessSection({
  darkMode,
}: QuickAccessSectionProps) {
  return (
    <div
      className={`compact-card compact-section bg-gradient-to-br from-orange-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-800 rounded-lg shadow-sm p-6 ${
        darkMode ? "" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row compact-grid-compact justify-center items-center h-full">
        <Link
          to="/meal-planning"
          className={`flex-1 compact-card-compact text-center hover:shadow-lg transition-all duration-200 ${
            darkMode
              ? "bg-stone-900 hover:bg-stone-800 text-green-300"
              : "bg-white hover:bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          <div className="text-green-600 mb-1 flex items-center justify-center">
            <CalendarDays className="w-[29.5px] h-[29.5px] sm:w-[33.5px] sm:h-[33.5px] md:w-[33.5px] md:h-[33.5px] mx-auto" />
          </div>
          <span
            className={`font-semibold text-sm ${
              darkMode ? "text-green-300" : "text-green-700"
            }`}
          >
            Meal Planning
          </span>
        </Link>
        <Link
          to="/shopping-list"
          className={`flex-1 compact-card-compact text-center hover:shadow-lg transition-all duration-200 ${
            darkMode
              ? "bg-stone-900 hover:bg-stone-800 text-green-300"
              : "bg-white hover:bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          <div className="text-green-600 mb-1 flex items-center justify-center">
            <ShoppingCart className="w-[29.5px] h-[29.5px] sm:w-[33.5px] sm:h-[33.5px] md:w-[33.5px] md:h-[33.5px] mx-auto" />
          </div>
          <span
            className={`font-semibold text-sm ${
              darkMode ? "text-green-300" : "text-green-700"
            }`}
          >
            Shopping List
          </span>
        </Link>
        <Link
          to="/collections"
          className={`flex-1 compact-card-compact text-center hover:shadow-lg transition-all duration-200 ${
            darkMode
              ? "bg-stone-900 hover:bg-stone-800 text-green-300"
              : "bg-white hover:bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          <div className="text-green-600 mb-1 flex items-center justify-center">
            <BookMarked className="w-[29.5px] h-[29.5px] sm:w-[33.5px] sm:h-[33.5px] md:w-[33.5px] md:h-[33.5px] mx-auto" />
          </div>
          <span
            className={`font-semibold text-sm ${
              darkMode ? "text-green-300" : "text-green-700"
            }`}
          >
            Collections
          </span>
        </Link>
        <Link
          to="/advanced-search"
          className={`flex-1 compact-card-compact text-center hover:shadow-lg transition-all duration-200 ${
            darkMode
              ? "bg-stone-900 hover:bg-stone-800 text-green-300"
              : "bg-white hover:bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          <div className="text-green-600 mb-1 flex items-center justify-center">
            <Search className="w-[29.5px] h-[29.5px] sm:w-[33.5px] sm:h-[33.5px] md:w-[33.5px] md:h-[33.5px] mx-auto" />
          </div>
          <span
            className={`font-semibold text-sm ${
              darkMode ? "text-green-300" : "text-green-700"
            }`}
          >
            Advanced Search
          </span>
        </Link>
      </div>
    </div>
  );
}
