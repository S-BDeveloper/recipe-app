// Text formatting helpers

/**
 * Cleans up instruction text by removing numbered prefixes and common step labels.
 * @param {string} instruction
 * @returns {string}
 */
export const cleanInstruction = (instruction: string) => {
  const cleaned = instruction
    // Remove patterns like "1.", "2.", "1)", "2)", "1-", "2-", etc. at the start
    .replace(/^\d+[.)\-\s]+/, "")
    // Remove patterns like "Step 1:", "Step 2:", etc.
    .replace(/^Step\s+\d+[:\s]+/i, "")
    // Remove patterns like "1st step:", "2nd step:", etc.
    .replace(/^\d+(st|nd|rd|th)\s+step[:\s]+/i, "")
    // Remove patterns like "First:", "Second:", etc.
    .replace(
      /^(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth)[:\s]+/i,
      "",
    )
    // Remove any remaining leading numbers with various separators
    .replace(/^\d+[.\-)\s]+/, "")
    // Clean up any extra whitespace
    .trim();
  return cleaned;
};
