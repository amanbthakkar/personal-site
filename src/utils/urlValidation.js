/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Basic URL pattern
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  
  // More strict validation
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    // If URL constructor fails, try regex
    return urlPattern.test(url.trim());
  }
};

/**
 * Normalizes a URL by adding protocol if missing
 * @param {string} url - The URL to normalize
 * @returns {string}
 */
export const normalizeUrl = (url) => {
  if (!url) return '';
  
  const trimmed = url.trim();
  if (!trimmed) return '';

  // If it already has a protocol, return as is
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Otherwise, add https://
  return `https://${trimmed}`;
};
