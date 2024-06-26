import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
// const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Indicator = lazy(() => import('./pages/Indicator'));
const Shortener = lazy(() => import('./pages/Shortener'));
const Gauri = lazy(() => import('./pages/Gauri'));
const App = () => {
  return (
    <>
      <BrowserRouter basename={PUBLIC_URL}>
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
            <Route path='/gauris' element={<Gauri />} />
            <Route path='*' element={<Shortener />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
