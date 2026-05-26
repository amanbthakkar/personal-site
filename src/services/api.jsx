import {
  API_ENDPOINTS,
  ANALYTICS_FALLBACK_TOTAL,
} from '../constants/api';

/**
 * Record or fetch visitor count using Pi homelab APIs (with legacy fallback).
 * @param {boolean} isNewVisitor - Whether this is a new visitor (no session cookie)
 * @param {string|null} source - Optional source parameter from URL
 * @returns {Promise<{count: number, offline?: boolean}>}
 */
export const getVisitorCount = async (isNewVisitor, source = null) => {
  try {
    if (isNewVisitor) {
      const params = new URLSearchParams();
      if (source) params.set('source', source);
      const qs = params.toString();
      const url = `${API_ENDPOINTS.NEW_VISITOR}${qs ? `?${qs}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const count = data.total ?? data.count;
      if (count === undefined || count === null) throw new Error('Invalid payload');
      return { count };
    }

    const response = await fetch(API_ENDPOINTS.VISITOR_COUNT);
    if (response.ok) {
      const data = await response.json();
      if (data.total !== undefined) return { count: data.total };
    }

    const legacy = await fetch(API_ENDPOINTS.OLD_VISITOR);
    if (!legacy.ok) throw new Error(`HTTP ${legacy.status}`);
    const data = await legacy.json();
    const count = data.count ?? data.total;
    if (count === undefined || count === null) throw new Error('Invalid payload');
    return { count };
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return { count: ANALYTICS_FALLBACK_TOTAL, offline: true };
  }
};

/**
 * Fetch source breakdown (optional UI).
 * @returns {Promise<{sources: Array, total?: number, offline?: boolean}>}
 */
export const getVisitorStats = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.STATS);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { ...data, offline: false };
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return { sources: [], total: ANALYTICS_FALLBACK_TOTAL, offline: true };
  }
};

/**
 * Shorten a URL (legacy — backend shortener removed on Pi).
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
 * Get original URL from shortened code (legacy — backend shortener removed on Pi).
 */
export const getShortenedUrl = async (shortCode) => {
  try {
    const response = await fetch(API_ENDPOINTS.GET_SHORTENED_URL(shortCode));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    if (text === 'Shortened URL not found' || text.trim() === 'Shortened URL not found') {
      throw new Error('Shortened URL not found');
    }
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
