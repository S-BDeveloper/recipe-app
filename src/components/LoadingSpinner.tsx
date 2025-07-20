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

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "green" | "orange" | "gray";
  text?: string;
  darkMode?: boolean;
  className?: string;
}

const sizeClasses: Record<"sm" | "md" | "lg" | "xl", string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const colorClasses: Record<"blue" | "green" | "orange" | "gray", string> = {
  blue: "border-blue-600",
  green: "border-green-600",
  orange: "border-orange-600",
  gray: "border-gray-600",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "blue",
  text = "Loading...",
  darkMode = false,
  className = "",
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div
        className={`inline-block animate-spin rounded-full ${sizeClasses[size]} border-b-2 ${colorClasses[color]}`}
      ></div>
      {text && (
        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

