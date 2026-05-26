import React, { useState, useEffect } from 'react';
import './Header.css';
import { getVisitorCount } from '../../services/api';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [visitorCount, setVisitorCount] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const hasCookie = document.cookie.includes('lastVisited');
      const sourceParam = new URLSearchParams(window.location.search).get('source');

      const countData = await getVisitorCount(!hasCookie, sourceParam);
      if (cancelled) return;

      setVisitorCount(countData.count);
      setIsLoading(false);

      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
      document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}; path=/`;
    }

    load().catch((error) => {
      console.error('Failed to fetch visitor count:', error);
      if (!cancelled) {
        setVisitorCount('N/A');
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className='banner-style'>
      <span className='text-center'>
        Site visits:{' '}
        {isLoading ? (
          <span style={{ opacity: 0.7 }}>Loading...</span>
        ) : (
          visitorCount
        )}{' '}
        <span
          style={{ paddingLeft: '3px', cursor: 'help' }}
          className='info-icon'
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          role='button'
          tabIndex={0}
          aria-label='Information about visitor tracking'
        >
          ⓘ
        </span>
      </span>
      {showInfo && (
        <div className='info-bar text-center'>
          This website uses cookies and URL tracking. Only user visits are
          tracked and no personal information is used or stored.
        </div>
      )}
    </div>
  );
};

export default Header;
