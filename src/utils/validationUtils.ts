// Validation utilities

/**
 * Validates email format.
 */
export function isValidEmail(email: unknown): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email as string);
}

/**
 * Validates password strength.
 */
export function validatePassword(password: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!password || (password as string).length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if ((password as string).length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates required fields in an object.
 */
export function validateRequired(
  data: unknown,
  requiredFields: unknown,
): { valid: boolean; errors: unknown[] } {
  const errors: unknown[] = [];

  (requiredFields as unknown[]).forEach((field: unknown) => {
    if (!data || (typeof data === "string" && !data.trim())) {
      errors.push(`${field} is required`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
