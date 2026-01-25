import { API_ENDPOINTS } from '../constants/api';

/**
 * Get visitor count - checks if user is new or returning
 * @param {boolean} isNewVisitor - Whether this is a new visitor
 * @param {string|null} source - Optional source parameter from URL
 * @returns {Promise<{count: number}>}
 */
export const getVisitorCount = async (isNewVisitor, source = null) => {
  try {
    const url = isNewVisitor
      ? `${API_ENDPOINTS.NEW_VISITOR}${source ? `/?source=${source}` : ''}`
      : API_ENDPOINTS.OLD_VISITOR;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    throw error;
  }
};

/**
 * Shorten a URL
 * @param {string} url - The URL to shorten
 * @returns {Promise<{value: string}>}
 */
export const shortenUrl = async (url) => {
  try {
    const response = await fetch(API_ENDPOINTS.SHORTEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};

/**
 * Get original URL from shortened code
 * @param {string} shortCode - The shortened URL code
 * @returns {Promise<{originalURL: string}>}
 */
export const getShortenedUrl = async (shortCode) => {
  try {
    const response = await fetch(API_ENDPOINTS.GET_SHORTENED_URL(shortCode));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    // Check if response is "Shortened URL not found" (plain text)
    if (text === 'Shortened URL not found' || text.trim() === 'Shortened URL not found') {
      throw new Error('Shortened URL not found');
    }
    // Try to parse as JSON
    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Error fetching shortened URL:', error);
    throw error;
  }
};
