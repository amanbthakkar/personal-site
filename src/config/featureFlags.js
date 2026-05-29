/**
 * Client-side feature flags (Vite).
 *
 * Override any flag with VITE_<FLAG_NAME>=true|false at build/dev time.
 * Unset values use per-flag defaults below.
 *
 * @example
 *   VITE_FRONTEND_NEWSFEED=true npm run build   # enable on production build
 *   VITE_FRONTEND_NEWSFEED=false npm run dev    # hide while developing
 */

/** @type {'true' | 'false' | '1' | '0' | undefined} */
const NEWSFEED_RAW = import.meta.env.VITE_FRONTEND_NEWSFEED;

/**
 * Parse env override. Returns null when unset so defaults apply.
 * @param {string | undefined} raw
 * @returns {boolean | null}
 */
const parseEnvBool = (raw) => {
  if (raw === 'true' || raw === '1') return true;
  if (raw === 'false' || raw === '0') return false;
  return null;
};

const newsfeedOverride = parseEnvBool(NEWSFEED_RAW);

/** Flag registry — add new flags here with defaults */
export const featureFlags = {
  /**
   * Discover / newsfeed tab (`/feed`).
   * Default: on in dev (`npm run dev`), off in production builds.
   */
  frontendNewsfeed:
    newsfeedOverride !== null ? newsfeedOverride : import.meta.env.DEV,
};

/**
 * @param {keyof typeof featureFlags} key
 * @returns {boolean}
 */
export const isFeatureEnabled = (key) => Boolean(featureFlags[key]);

export default featureFlags;
