import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Main from '../layouts/Main';
import Header from '../components/Header/Header';
import { shortenUrl, getShortenedUrl } from '../services/api';
import { isValidUrl, normalizeUrl } from '../utils/urlValidation';
import '../Shortener.css';

function Shortener() {
  const [inputURL, setInputURL] = useState('');
  const [outputURL, setOutputURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('shortener-page-active');

    return () => {
      document.body.classList.remove('shortener-page-active');
    };
  }, []);

  useEffect(() => {
    // Extract the shortened part from the URL
    const fullPath = window.location.pathname;
    
    // Remove leading slash and split by '/'
    const pathParts = fullPath.replace(/^\/+/, '').split('/');
    const firstPart = pathParts[0];

    // If there is a shortened part (and it's not the url-shortener route itself), redirect
    if (firstPart && firstPart !== 'url-shortener' && firstPart.trim() !== '') {
      handleRedirect(firstPart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = async (shortenedPart) => {
    try {
      const data = await getShortenedUrl(shortenedPart);
      const originalURL = data.originalURL;
      const redirectToURL = normalizeUrl(originalURL);

      if (typeof window !== 'undefined') {
        window.location.href = redirectToURL;
      }
    } catch (error) {
      console.error('Error handling redirect:', error);
      // Invalid shortened URL - redirect to homepage
      window.location.href = 'https://amanthakkar.com/';
    }
  };

  const handleCopy = async () => {
    try {
      const urlToCopy = `https://amanthakkar.com/${outputURL}`;
      await navigator.clipboard.writeText(urlToCopy);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy URL');
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validate URL
    if (!inputURL.trim()) {
      setError('Please enter a URL');
      toast.error('Please enter a URL');
      return;
    }

    if (!isValidUrl(inputURL)) {
      setError('Please enter a valid URL');
      toast.error('Please enter a valid URL');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const normalizedUrl = normalizeUrl(inputURL);
      const data = await shortenUrl(normalizedUrl);
      setOutputURL(data.value);
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL. Please try again.');
      toast.error('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {' '}
      <Header />
      <Main
        title='URL Shortener'
        description='Explore a URL shortener I created using Golang'
      >
        <article className='post' id='shortener'>
          <header>
            <div className='title'>
              <h2>
                <Link to='/url-shortener'>URL Shortener</Link>
              </h2>
              <p>Explore a URL shortener I created using Golang</p>
            </div>
          </header>
          <div className='shortener-container'>
            <div className='shortener-hero'>
              <span className='icon' role="img" aria-label="Link icon">🔗</span>
              <p className='description'>
                Transform long, unwieldy URLs into short, shareable links. Built with Go and React for speed and reliability.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='input-container'>
                <div className='input-wrapper'>
                  <input
                    id='longURL'
                    className='input-field'
                    type="url"
                    placeholder='Paste your long URL here (e.g., https://example.com/very/long/path)'
                    value={inputURL}
                    onChange={(e) => {
                      setInputURL(e.target.value);
                      setError('');
                    }}
                    disabled={isLoading}
                    aria-label="URL to shorten"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'url-error' : undefined}
                  />
                  <span className='input-icon'>🌐</span>
                </div>
                {error && (
                  <p id="url-error">
                    {error}
                  </p>
                )}
              </div>

              <div className='button-container'>
                <button
                  type="submit"
                  className='submit-button'
                  disabled={isLoading || !inputURL.trim()}
                >
                  <span className='button-text'>
                    {isLoading ? '⏳ Shortening...' : '✨ Shorten URL'}
                  </span>
                </button>
              </div>
            </form>

            {outputURL && (
              <div className='output-url'>
                <p>
                  <span className='success-icon'>✅</span>
                  <strong>Success!</strong> Your URL has been shortened.
                </p>
                <p>
                  <em>Original URL:</em>
                </p>
                <div className='short-url-container'>
                  <a 
                    href={`https://amanthakkar.com/${outputURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    amanthakkar.com/{outputURL}
                  </a>
                  <button
                    type="button"
                    className='copy-button'
                    onClick={handleCopy}
                    aria-label='Copy shortened URL'
                  >
                    <span>📋</span> Copy
                  </button>
                </div>
                <p>
                  <span className='note-text'>
                    <strong>Note:</strong> Any path appended after the shortened URL (e.g., /extra/path) will be ignored during redirection.
                  </span>
                </p>
              </div>
            )}

            {!outputURL && (
              <div className='shortener-features'>
                <h3>Why Use This URL Shortener?</h3>
                <div className='features-grid'>
                  <div className='feature-item'>
                    <span className='feature-icon'>⚡</span>
                    <h4>Fast & Reliable</h4>
                    <p>Built with Go for lightning-fast performance</p>
                  </div>
                  <div className='feature-item'>
                    <span className='feature-icon'>🔒</span>
                    <h4>Secure</h4>
                    <p>Rate-limited and secure URL processing</p>
                  </div>
                  <div className='feature-item'>
                    <span className='feature-icon'>📊</span>
                    <h4>Simple</h4>
                    <p>No sign-up required, just shorten and share</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </Main>
    </>
  );
}

export default Shortener;
