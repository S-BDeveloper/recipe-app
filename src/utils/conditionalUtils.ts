// Conditional rendering and logic utilities

/**
 * Checks if user has a specific role or permission.
 * @param user User object
 * @param role Role string
 * @returns boolean
 */
export function hasRole(
  user: { roles?: string[] } | null,
  role: string,
): boolean {
  return user?.roles?.includes(role) || false;
}

/**
 * Checks if user is authenticated.
 * @param user User object
 * @returns boolean
 */
export function isAuthenticated(
  user: { isDemoUser?: boolean } | null,
): boolean {
  return !!user && !user.isDemoUser;
}

/**
 * Checks if user is a demo user.
 * @param user User object
 * @returns boolean
 */
export function isDemoUser(user: { isDemoUser?: boolean } | null): boolean {
  return user?.isDemoUser || false;
}

/**
 * Returns a fallback value if the primary value is falsy.
 * @param value
 * @param fallback
 * @returns value or fallback
 */
export function fallback<T>(value: T, fallback: T): T {
  return value || fallback;
}

/**
 * Conditionally renders content based on a condition.
 * @param condition
 * @param trueValue
 * @param falseValue
 * @returns trueValue or falseValue
 */
export function conditional<T>(
  condition: boolean,
  trueValue: T,
  falseValue: T | null = null,
): T | null {
  return condition ? trueValue : falseValue;
}
