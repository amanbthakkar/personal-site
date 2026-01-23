import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
      toast.error('Invalid or expired shortened URL');
      navigate('/url-shortener');
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

  const formatInputURL = () => {
    if (inputURL.length > 40) {
      return `${inputURL.substring(0, 35)}...`;
    }
    return inputURL;
  };
  return (
    <>
      {' '}
      <Header />
      <Main
        title='URL Shortener'
        description='Explore a URL shortener I created using Golang'
      >
        <article className='post' id='projects'>
          <div className='shortener-container'>
            <header>
              <div className='title'>
                <h2>
                  <Link to='/power-law-oscillator-indicator'>
                    URL Shortener
                  </Link>
                </h2>
                <p>Explore a URL shortener I created using Golang</p>
              </div>
            </header>
            <Container>
              <div className='container'>
                <form onSubmit={handleSubmit}>
                  <div className='input-container'>
                    <input
                      id='longURL'
                      className='input-field'
                      type="url"
                      placeholder='Enter a URL to be shortened (e.g., https://example.com)'
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
                    {error && (
                      <p id="url-error" style={{ color: 'red', fontSize: '0.9em', marginTop: '0.5rem' }}>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className='submit-button'
                    disabled={isLoading || !inputURL.trim()}
                  >
                    {isLoading ? 'Shortening...' : 'Shorten this URL!'}
                  </button>
                </form>

                {outputURL && (
                  <div className='output-url'>
                    <p>
                      <em>{formatInputURL()}</em> is shortened to{' '}
                      <span>
                        <a href={`https://amanthakkar.com/${outputURL}`}>
                          amanthakkar.com/{outputURL}
                        </a>
                      </span>{' '}
                      <button
                        type="button"
                        onClick={handleCopy}
                        aria-label='Copy shortened URL'
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2em',
                          padding: '0 0.5rem',
                        }}
                      >
                        📋
                      </button>
                    </p>
                    <p>
                      {outputURL && (
                        <span style={{ color: 'red' }}>
                          Note: Anything you enter followed by a <i>/</i> after
                          the shortened URL will be ignored during the
                          redirection!
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </article>
      </Main>
    </>
  );
}

export default Shortener;
