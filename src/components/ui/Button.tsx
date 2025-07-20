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

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
  darkMode?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  size = "md",
  variant = "primary",
  disabled = false,
  className = "",
  isActive = false,
  darkMode = false,
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center border rounded-lg font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap overflow-hidden";

  const sizeClasses: { [key: string]: string } = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
    xl: "py-4 px-8 text-xl",
  };

  const variantClasses: { [key: string]: string } = {
    primary: isActive
      ? darkMode
        ? "bg-blue-600 text-stone-100 border-blue-600"
        : "bg-blue-600 text-stone-100 border-blue-600"
      : darkMode
        ? "bg-neutral-900 text-amber-400 border border-stone-700 hover:bg-blue-100 dark:hover:bg-stone-700"
        : "bg-white text-green-700 border border-blue-300 hover:bg-blue-100",
    secondary: darkMode
      ? "bg-neutral-800 border-stone-700 text-stone-300 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-stone-500"
      : "bg-stone-200 text-green-700 hover:bg-blue-100",
    danger: darkMode
      ? "bg-red-900 border-red-700 text-red-200 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-red-500"
      : "bg-red-500 text-white hover:bg-blue-100",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type as "button" | "submit" | "reset"}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

