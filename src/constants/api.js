// API endpoints and URLs
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://cloud.amanthakkar.com';
export const S3_INDICATOR_URL =
  'https://bitcoin-indicator-script.s3.us-east-2.amazonaws.com/indicator.png';

/** Shown when API is unreachable (curated Pi baseline). */
export const ANALYTICS_FALLBACK_TOTAL = 2913;

export const API_ENDPOINTS = {
  VISITOR_COUNT: `${API_BASE_URL}/api/visitor-count`,
  STATS: `${API_BASE_URL}/api/stats`,
  NEW_VISITOR: `${API_BASE_URL}/api/new-visitor`,
  OLD_VISITOR: `${API_BASE_URL}/api/old-visitor`,
  SHORTEN_URL: `${API_BASE_URL}/shorten`,
  GET_SHORTENED_URL: (shortCode) =>
    `${API_BASE_URL}/shorten/?shortened=${shortCode}`,
};
