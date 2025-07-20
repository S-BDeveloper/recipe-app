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

import React, { useState } from "react";
import performanceService from "../services/performanceService";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  darkMode: boolean;
  loading?: boolean;
}

function SearchBar({ onSearch, darkMode, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    performanceService.measurePerformance("Search Submit", () => {
      onSearch(trimmed);
    });
    setQuery("");
  };

  return (
    <div
      className={`relative w-full transition-all duration-300 ease-in-out ${
        darkMode
          ? "bg-transparent"
          : "bg-white rounded-lg shadow-lg hover:shadow-xl focus-within:shadow-xl"
      } border ${
        darkMode
          ? "border-transparent"
          : "border-gray-300 focus-within:border-green-500"
      }`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search for a recipe..."
          className={`w-full py-3 pl-12 pr-32 text-base outline-none transition-colors duration-300 ${
            darkMode
              ? "rounded-l-lg bg-neutral-900 border-stone-700 text-stone-200 focus:border-green-500 focus:ring-green-500 placeholder-stone-500"
              : "rounded-l-lg text-gray-800 focus:ring-0 placeholder-gray-400"
          }`}
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`absolute inset-y-0 right-0 flex items-center justify-center w-32 text-white focus:outline-none transition-all duration-200 shadow-sm ${
            darkMode
              ? "rounded-r-lg bg-green-700 hover:bg-green-600"
              : "rounded-r-lg bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 hover:from-orange-500 hover:via-orange-400 hover:to-orange-300"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
