import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortenedUrl } from '../services/api';
import { normalizeUrl } from '../utils/urlValidation';

/**
 * Component to handle shortened URL redirects
 * This intercepts unknown routes and checks if they're shortened URLs
 */
const ShortUrlRedirect = () => {
  const { '*': path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (!path) {
        // No path, go to homepage
        navigate('/', { replace: true });
        return;
      }

      // Extract the first part of the path (the potential short code)
      const pathParts = path.split('/');
      const shortCode = pathParts[0];

      // Skip if it's a known route
      const knownRoutes = [
        'resume',
        'projects',
        'blogs',
        'contact',
        'url-shortener',
        'power-law-oscillator-indicator',
        'static',
        'images',
        'data',
      ];

      if (knownRoutes.includes(shortCode.toLowerCase())) {
        // It's a known route, let React Router handle it (shouldn't reach here)
        navigate('/', { replace: true });
        return;
      }

      // Check if it's a shortened URL
      try {
        const data = await getShortenedUrl(shortCode);
        const originalURL = data.originalURL;
        const redirectToURL = normalizeUrl(originalURL);

        // Redirect to the original URL
        if (typeof window !== 'undefined') {
          window.location.href = redirectToURL;
        }
      } catch (error) {
        // Not a valid shortened URL, redirect to homepage
        console.log(`Path "${shortCode}" is not a shortened URL, redirecting to homepage`);
        window.location.href = 'https://amanthakkar.com/';
      }
    };

    checkAndRedirect();
  }, [path, navigate]);

  // Show loading state while checking
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default ShortUrlRedirect;
