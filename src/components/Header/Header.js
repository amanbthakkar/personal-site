import React, { useState, useEffect } from 'react';
import './Header.css';
import { getVisitorCount } from '../../services/api';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [visitorCount, setVisitorCount] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        setIsLoading(true);
        const hasCookie = document.cookie.includes('lastVisited');

        // Get source from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const sourceParam = urlParams.get('source');

        const data = await getVisitorCount(!hasCookie, sourceParam);
        setVisitorCount(data.count);

        // Set cookie for returning visitors
        if (!hasCookie) {
          const expirationTime = new Date();
          expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 1000); // 3 minutes
          document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}`;
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setVisitorCount('N/A');
      } finally {
        setIsLoading(false);
      }
    }
    fetchVisitorCount();
  }, []);
  return (
    <div className='banner-style'>
      <span className='text-center'>
        Unique Website Visits (since Oct '23):{' '}
        {isLoading ? (
          <span style={{ opacity: 0.7 }}>Loading...</span>
        ) : (
          visitorCount
        )}{' '}
        <span
          style={{ paddingLeft: '3px', cursor: 'help' }}
          className='info-icon'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="button"
          tabIndex={0}
          aria-label="Information about visitor tracking"
        >
          ⓘ
        </span>
      </span>
      {showInfo && (
        <div className='info-bar text-center'>
          This website uses cookies and URL tracking. Only user visits are
          tracked and no personal information is used or stored.
          <br />
          Visit count is maintained using Redis.
        </div>
      )}
    </div>
  );
};

export default Header;
