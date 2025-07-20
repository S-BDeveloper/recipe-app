// User/session utilities

/**
 * Gets the user's display name with fallback to email or "Anonymous".
 */
export function getUserDisplayName(user: Record<string, unknown>): string {
  return (
    (user?.displayName as string) || (user?.email as string) || "Anonymous"
  );
}

/**
 * Gets the user's ID.
 */
export function getUserId(user: Record<string, unknown>): string | null {
  return (user?.uid as string) || null;
}

/**
 * Checks if the user is a demo user.
 */
export function isDemoUser(user: Record<string, unknown>): boolean {
  return (user?.isDemoUser as boolean) || false;
}
