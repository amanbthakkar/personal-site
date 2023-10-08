import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Stats = lazy(() => import('./pages/Stats'));
const Indicator = lazy(() => import('./pages/Indicator'));

const App = () => {
  const [visitorCount, setVisitorCount] = useState('Loading...');

  const [showInfo, setShowInfo] = useState(false);

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
    <>
      <BrowserRouter basename={PUBLIC_URL}>
        <Suspense fallback={<Main />}>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/stats' element={<Stats />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/resume' element={<Resume />} />
            <Route path='/indicator' element={<Indicator />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
