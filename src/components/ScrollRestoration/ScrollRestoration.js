import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { restoreScroll } from '../../utils/scrollRestoration';

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    restoreScroll();
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
