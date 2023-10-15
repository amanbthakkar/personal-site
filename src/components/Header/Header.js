import React, { useState, useEffect } from 'react';
import './Header.css'; // Import your CSS file

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [visitorCount, setVisitorCount] = useState('Loading...');

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };
  useEffect(() => {
    async function getVisitorCount() {
      const hasCookie = document.cookie.includes('lastVisited');

      if (hasCookie) {
        const response = await fetch(
          `https://cloud.amanthakkar.com/api/old-visitor`
        );
        const data = await response.json();
        setVisitorCount(data.count);
      } else {
        // grab the source from the url, if any
        const urlParams = new URLSearchParams(window.location.search);
        const sourceParam = urlParams.get('source');

        const response = await fetch(
          `https://cloud.amanthakkar.com/api/new-visitor/?source=${sourceParam}`
        );
        const data = await response.json();
        setVisitorCount(data.count);
      }

      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 1000); // 3 minutes
      document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}`;
    }
    getVisitorCount();
  }, []);
  return (
    <div className='banner-style'>
      <span className='text-center'>
        Unique Website Visits (since Oct '23): {visitorCount}{' '}
        <span
          style={{ paddingLeft: '3px' }}
          className='info-icon'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
