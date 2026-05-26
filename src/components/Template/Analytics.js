import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_PRODUCTION = import.meta.env.PROD;

let gaInitialized = false;

function ensureGAInitialized() {
  if (gaInitialized || !IS_PRODUCTION || !MEASUREMENT_ID) {
    return false;
  }
  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      // Manual SPA pageviews only — avoids duplicate hits on load + route change.
      send_page_view: false,
    },
  });
  gaInitialized = true;
  return true;
}

/**
 * Tracks GA4 pageviews on React Router navigation (production only).
 */
const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!ensureGAInitialized()) {
      return;
    }

    const page = `${pathname}${search}`;
    ReactGA.send({
      hitType: 'pageview',
      page,
      title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default Analytics;
