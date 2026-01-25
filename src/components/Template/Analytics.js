import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

// Vite uses import.meta.env instead of process.env
const NODE_ENV = import.meta.env.MODE;
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

if (NODE_ENV === 'production' && GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID);
}

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (NODE_ENV === 'production') {
      ReactGA.set({
        page: pathname,
      });
      ReactGA.pageview(pathname);
    }
  }, [pathname]);

  return null;
};

export default Analytics;
