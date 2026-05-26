import {
  API_ENDPOINTS,
  ANALYTICS_FALLBACK_TOTAL,
} from '../constants/api';

const FETCH_TIMEOUT_MS = 8000;

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Record or fetch visitor count using Pi homelab APIs (with legacy fallback).
 */
export const getVisitorCount = async (isNewVisitor, source = null) => {
  try {
    if (isNewVisitor) {
      const params = new URLSearchParams();
      if (source) params.set('source', source);
      const qs = params.toString();
      const url = `${API_ENDPOINTS.NEW_VISITOR}${qs ? `?${qs}` : ''}`;
      const data = await fetchJson(url);
      const count = data.total ?? data.count;
      if (count === undefined || count === null) throw new Error('Invalid payload');
      return { count, offline: false };
    }

    try {
      const data = await fetchJson(API_ENDPOINTS.VISITOR_COUNT);
      if (data.total !== undefined) {
        return { count: data.total, offline: false };
      }
    } catch {
      // fall through to legacy endpoint
    }

    const data = await fetchJson(API_ENDPOINTS.OLD_VISITOR);
    const count = data.count ?? data.total;
    if (count === undefined || count === null) throw new Error('Invalid payload');
    return { count, offline: false };
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return { count: ANALYTICS_FALLBACK_TOTAL, offline: true };
  }
};

/**
 * Fetch source breakdown (API/admin only — not used in public header UI).
 */
export const getVisitorStats = async () => {
  try {
    const data = await fetchJson(API_ENDPOINTS.STATS);
    return { ...data, offline: false };
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return { sources: [], total: ANALYTICS_FALLBACK_TOTAL, offline: true };
  }
};
