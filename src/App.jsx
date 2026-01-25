import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ToastProvider from './components/Toast/ToastProvider';
import ScrollRestoration from './components/ScrollRestoration/ScrollRestoration';
import './static/css/main.scss'; // All of our styles

// Vite uses import.meta.env instead of process.env
const PUBLIC_URL = import.meta.env.BASE_URL || '/';

// Optimized code splitting: Only lazy-load heavy pages
// Light pages (Contact, Index, NotFound) are loaded synchronously for faster initial load
import Contact from './pages/Contact';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Heavy pages are lazy-loaded
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Indicator = lazy(() => import('./pages/Indicator'));
const Shortener = lazy(() => import('./pages/Shortener'));
const App = () => {
  return (
    <ErrorBoundary>
      <ToastProvider />
      <BrowserRouter basename={PUBLIC_URL}>
        <ScrollRestoration />
        <Suspense fallback={<Main />}>
          <Routes>
            <Route path='/' element={<Index />} />
            {/* <Route path='/about' element={<About />} /> */}
            <Route
              path='/power-law-oscillator-indicator'
              element={<Indicator />}
            />
            <Route path='/projects' element={<Projects />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/resume' element={<Resume />} />
            <Route path='/url-shortener' element={<Shortener />} />
            <Route path='*' element={<Shortener />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
