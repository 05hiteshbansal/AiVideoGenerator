/**
 * Content Filter Utility
 * Checks text against blocked keywords and content guardrails
 */

/**
 * Check if text contains blocked content
 * @param {string} text - Text to check
 * @param {Array<string>} blockedKeywords - Array of blocked keywords
 * @param {boolean} caseSensitive - Whether matching should be case-sensitive
 * @returns {Object} - { isBlocked: boolean, matchedKeywords: Array<string> }
 */
export function checkBlockedContent(
  text,
  blockedKeywords = [],
  caseSensitive = false,
) {
  if (!text || !blockedKeywords || blockedKeywords.length === 0) {
    return { isBlocked: false, matchedKeywords: [] };
  }

  const textToCheck = caseSensitive ? text : text.toLowerCase();
  const matchedKeywords = [];

  for (const keyword of blockedKeywords) {
    if (!keyword || keyword.trim() === "") continue;

    const keywordToCheck = caseSensitive
      ? keyword.trim()
      : keyword.trim().toLowerCase();

    // Check for whole word match using word boundaries
    const regex = new RegExp(`\\b${escapeRegex(keywordToCheck)}\\b`, "gi");

    if (regex.test(textToCheck)) {
      matchedKeywords.push(keyword.trim());
    }
  }

  return {
    isBlocked: matchedKeywords.length > 0,
    matchedKeywords,
  };
}

/**
 * Escape special regex characters in a string
 * @param {string} string - String to escape
 * @returns {string} - Escaped string
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Validate multiple text fields against blocked content
 * @param {Object} fields - Object with field names as keys and text as values
 * @param {Array<string>} blockedKeywords - Array of blocked keywords
 * @returns {Object} - { isValid: boolean, blockedFields: Array<{field, keywords}> }
 */
export function validateMultipleFields(fields, blockedKeywords = []) {
  const blockedFields = [];

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    if (!fieldValue) continue;

    const result = checkBlockedContent(
      String(fieldValue),
      blockedKeywords,
      false,
    );

    if (result.isBlocked) {
      blockedFields.push({
        field: fieldName,
        keywords: result.matchedKeywords,
      });
    }
  }

  return {
    isValid: blockedFields.length === 0,
    blockedFields,
  };
}

/**
 * Get a user-friendly error message for blocked content
 * @param {Array<string>} matchedKeywords - Array of matched blocked keywords
 * @returns {string} - Error message
 */
export function getBlockedContentMessage(matchedKeywords) {
  if (!matchedKeywords || matchedKeywords.length === 0) {
    return "Content contains blocked keywords.";
  }

  if (matchedKeywords.length === 1) {
    return `Content contains blocked keyword: "${matchedKeywords[0]}". Please remove it and try again.`;
  }

  return `Content contains blocked keywords: ${matchedKeywords.map((k) => `"${k}"`).join(", ")}. Please remove them and try again.`;
}

/**
 * Sanitize text by removing blocked keywords
 * @param {string} text - Text to sanitize
 * @param {Array<string>} blockedKeywords - Array of blocked keywords
 * @param {string} replacement - Replacement text (default: "[FILTERED]")
 * @returns {string} - Sanitized text
 */
export function sanitizeText(
  text,
  blockedKeywords = [],
  replacement = "[FILTERED]",
) {
  if (!text || !blockedKeywords || blockedKeywords.length === 0) {
    return text;
  }

  let sanitized = text;

  for (const keyword of blockedKeywords) {
    if (!keyword || keyword.trim() === "") continue;

    const regex = new RegExp(`\\b${escapeRegex(keyword.trim())}\\b`, "gi");
    sanitized = sanitized.replace(regex, replacement);
  }

  return sanitized;
}

/**
 * Check if content is safe for AI generation
 * @param {string} prompt - Prompt text to check
 * @param {Object} config - Configuration object
 * @returns {Object} - { isSafe: boolean, reason: string }
 */
export function checkPromptSafety(prompt, config = {}) {
  const { blockedKeywords = [], enableContentFilter = true } = config;

  if (!enableContentFilter) {
    return { isSafe: true, reason: "" };
  }

  // Check against blocked keywords
  const blockedResult = checkBlockedContent(prompt, blockedKeywords);

  if (blockedResult.isBlocked) {
    return {
      isSafe: false,
      reason: getBlockedContentMessage(blockedResult.matchedKeywords),
    };
  }

  // Additional safety checks can be added here
  // (e.g., toxicity detection, PII detection, etc.)

  return { isSafe: true, reason: "" };
}

export default {
  checkBlockedContent,
  validateMultipleFields,
  getBlockedContentMessage,
  sanitizeText,
  checkPromptSafety,
};
