import React, { useState, useEffect } from 'react';
import './Header.css';
import { getVisitorCount, getVisitorStats } from '../../services/api';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [visitorCount, setVisitorCount] = useState('…');
  const [sources, setSources] = useState([]);
  const [offline, setOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVisitorCount() {
      try {
        setIsLoading(true);

        const hasCookie = document.cookie.includes('lastVisited');
        const urlParams = new URLSearchParams(window.location.search);
        const sourceParam = urlParams.get('source');

        const [countData, statsData] = await Promise.all([
          getVisitorCount(!hasCookie, sourceParam),
          getVisitorStats(),
        ]);

        setVisitorCount(countData.count);
        setOffline(Boolean(countData.offline || statsData.offline));
        setSources(statsData.sources || []);

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 10 * 60 * 1000);
        document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}; path=/`;
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        setVisitorCount('N/A');
        setOffline(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVisitorCount();
  }, []);

  return (
    <div className='banner-style'>
      <span className='text-center'>
        Site visits:{' '}
        {isLoading ? (
          <span style={{ opacity: 0.7 }}>Loading…</span>
        ) : (
          <>
            <strong>{visitorCount}</strong>
            {offline && (
              <span
                style={{ fontSize: '0.75rem', opacity: 0.85, marginLeft: '0.25rem' }}
                title='API unreachable — showing cached baseline'
              >
                (cached)
              </span>
            )}
          </>
        )}{' '}
        {!isLoading && sources.length > 0 && !offline && (
          <button
            type='button'
            className='btn btn-link btn-sm text-white p-0 align-baseline'
            onClick={() => setShowSources((v) => !v)}
          >
            {showSources ? 'Hide sources' : 'Sources'}
          </button>
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
      {showSources && sources.length > 0 && (
        <ul
          className='list-unstyled small text-center mb-0 mt-1'
          style={{ maxWidth: '320px', margin: '0 auto' }}
        >
          {sources.slice(0, 6).map((s) => (
            <li key={s.key}>
              {s.label}: {s.count}
              {s.percent != null ? ` (${s.percent}%)` : ''}
            </li>
          ))}
        </ul>
      )}
      {showInfo && (
        <div className='info-bar text-center'>
          This site uses a short-lived cookie to avoid double-counting reloads.
          Counts are stored on a self-hosted backend (Redis). No personal data is
          collected.
        </div>
      )}
    </div>
  );
};

export default Header;
