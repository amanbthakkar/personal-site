import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getShortenedUrl } from '../services/api';
import { normalizeUrl } from '../utils/urlValidation';

/**
 * Component to handle shortened URL redirects
 * This only runs for routes that React Router didn't match (catch-all)
 * Flow: Check if it's a shortened URL -> redirect to original URL
 *       If not a shortened URL -> redirect to homepage
 */
const ShortUrlRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const checkAndRedirect = async () => {
      // Get the pathname (e.g., "/8843c77" or "/some/unknown/path")
      const pathname = location.pathname;
      
      // Remove leading slash to get the path segment
      const pathWithoutSlash = pathname.replace(/^\/+/, '');
      
      if (!pathWithoutSlash) {
        // Empty path, go to homepage
        window.location.href = 'https://amanthakkar.com/';
        return;
      }

      // Extract the first part of the path (the potential short code)
      // e.g., "8843c77" from "/8843c77" or "some" from "/some/unknown/path"
      const pathParts = pathWithoutSlash.split('/');
      const shortCode = pathParts[0];

      // Check if it's a shortened URL
      try {
        const data = await getShortenedUrl(shortCode);
        const originalURL = data.originalURL;
        const redirectToURL = normalizeUrl(originalURL);

        // Redirect to the original URL
        window.location.href = redirectToURL;
      } catch (error) {
        // Not a valid shortened URL, redirect to homepage
        console.log(`Path "${shortCode}" is not a shortened URL, redirecting to homepage`);
        window.location.href = 'https://amanthakkar.com/';
      }
    };

    checkAndRedirect();
  }, [location.pathname]);

  // Show loading state while checking
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default ShortUrlRedirect;
