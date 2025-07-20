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

// Input sanitization utilities to prevent XSS and injection attacks

// HTML entity mapping for escaping
const HTML_ENTITIES: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

// Escape HTML to prevent XSS
export const escapeHtml = (text: unknown) => {
  if (typeof text !== "string") return text;
  return (text as string).replace(
    /[&<>"'/]/g,
    (char: string) => HTML_ENTITIES[char],
  );
};

// Sanitize user input
export const sanitizeInput = (input: unknown) => {
  if (typeof input !== "string") return input;

  return (input as string)
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .replace(/data:/gi, "") // Remove data: protocol
    .replace(/vbscript:/gi, "") // Remove vbscript: protocol
    .replace(/expression\(/gi, "") // Remove CSS expressions
    .replace(/url\(/gi, "") // Remove CSS url() functions
    .replace(/eval\(/gi, "") // Remove eval() calls
    .replace(/document\./gi, "") // Remove document access
    .replace(/window\./gi, "") // Remove window access
    .replace(/localStorage\./gi, "") // Remove localStorage access
    .replace(/sessionStorage\./gi, ""); // Remove sessionStorage access
};

// Validate and sanitize email
export const sanitizeEmail = (email: unknown) => {
  if (!email || typeof email !== "string") return "";

  const sanitized = (email as string).trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    throw new Error("Invalid email format");
  }

  return sanitized;
};

// Validate and sanitize URL
export const sanitizeUrl = (url: unknown) => {
  if (!url || typeof url !== "string") return "";

  const sanitized = (url as string).trim();

  // Only allow http, https, and relative URLs
  if (
    !sanitized.startsWith("http://") &&
    !sanitized.startsWith("https://") &&
    !sanitized.startsWith("/") &&
    !sanitized.startsWith("./")
  ) {
    throw new Error("Invalid URL format");
  }

  return sanitized;
};

// Sanitize file name
export const sanitizeFileName = (fileName: unknown) => {
  if (!fileName || typeof fileName !== "string") return "";

  return (fileName as string)
    .replace(/[<>:"/\\|?*]/g, "") // Remove invalid characters
    .replace(/\.\./g, "") // Remove directory traversal
    .trim()
    .substring(0, 100); // Limit length
};

// Validate and sanitize recipe data
export const sanitizeRecipe = (recipe: Record<string, unknown>) => {
  const sanitized = { ...recipe };

  if (sanitized.name && typeof sanitized.name === "string") {
    sanitized.name = (sanitizeInput(sanitized.name) as string).substring(
      0,
      200,
    );
  }

  if (sanitized.description && typeof sanitized.description === "string") {
    sanitized.description = (
      sanitizeInput(sanitized.description) as string
    ).substring(0, 2000);
  }

  if (sanitized.category && typeof sanitized.category === "string") {
    sanitized.category = (
      sanitizeInput(sanitized.category) as string
    ).substring(0, 50);
  }

  if (sanitized.ingredients && Array.isArray(sanitized.ingredients)) {
    sanitized.ingredients = sanitized.ingredients.map(
      (ingredient: Record<string, unknown>) => ({
        ...ingredient,
        ingredient: (
          sanitizeInput(
            typeof ingredient === "object" &&
              ingredient &&
              "ingredient" in ingredient &&
              typeof ingredient.ingredient === "string"
              ? ingredient.ingredient
              : "",
          ) as string
        ).substring(0, 100),
        measure: (
          sanitizeInput(
            typeof ingredient === "object" &&
              ingredient &&
              "measure" in ingredient &&
              typeof ingredient.measure === "string"
              ? ingredient.measure
              : "",
          ) as string
        ).substring(0, 50),
      }),
    );
  }

  if (sanitized.instructions && Array.isArray(sanitized.instructions)) {
    sanitized.instructions = sanitized.instructions.map(
      (instruction: unknown) =>
        (sanitizeInput(instruction) as string).substring(0, 1000),
    );
  }

  return sanitized;
};

// Validate and sanitize user profile
export const sanitizeUserProfile = (profile: Record<string, unknown>) => {
  const sanitized = { ...profile };

  if (sanitized.displayName && typeof sanitized.displayName === "string") {
    sanitized.displayName = (
      sanitizeInput(sanitized.displayName) as string
    ).substring(0, 100);
  }

  if (sanitized.dailyCalories) {
    const calories = parseInt(String(sanitized.dailyCalories));
    if (isNaN(calories) || calories < 500 || calories > 10000) {
      throw new Error("Invalid daily calories value");
    }
    sanitized.dailyCalories = calories;
  }

  return sanitized;
};

// Validate and sanitize review
export const sanitizeReview = (review: Record<string, unknown>) => {
  const sanitized = { ...review };

  if (sanitized.comment && typeof sanitized.comment === "string") {
    sanitized.comment = (sanitizeInput(sanitized.comment) as string).substring(
      0,
      1000,
    );
  }

  if (sanitized.rating) {
    const rating = parseInt(String(sanitized.rating));
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new Error("Invalid rating value");
    }
    sanitized.rating = rating;
  }

  return sanitized;
};

// Generate secure random string
export const generateSecureToken = (length = 32) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    result += chars.charAt(array[i] % chars.length);
  }

  return result;
};

// Validate password strength
export const validatePassword = (password: unknown) => {
  if (!password || typeof password !== "string") {
    return { valid: false, errors: ["Password is required"] };
  }

  const errors = [];

  if ((password as string).length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if ((password as string).length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  if (!/[A-Z]/.test(password as string)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password as string)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password as string)) {
    errors.push("Password must contain at least one number");
  }

  return {
    valid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password),
  };
};

// Calculate password strength
const calculatePasswordStrength = (password: unknown) => {
  let score = 0;

  if ((password as string).length >= 8) score += 1;
  if ((password as string).length >= 12) score += 1;
  if (/[A-Z]/.test(password as string)) score += 1;
  if (/[a-z]/.test(password as string)) score += 1;
  if (/\d/.test(password as string)) score += 1;
  if (/[^A-Za-z0-9]/.test(password as string)) score += 1;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
};
