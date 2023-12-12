import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link, useNavigate, Route } from 'react-router-dom';
import axios from 'axios';
import Main from '../layouts/Main';
import Header from '../components/Header/Header';
import Cell from '../components/Projects/Cell';
import data from '../data/projects';

import '../Shortener.css';

function Shortener() {
  const [inputURL, setInputURL] = useState('');
  const [outputURL, setOutputURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the shortened part from the URL
    const fullPath = window.location.pathname;
    console.log(fullPath);
    const keyword = '/';

    // Find the index of "personal-site/"
    const startIndex = fullPath.indexOf(keyword);

    // Take whatever comes after "personal-site/"
    const substringAfterKeyword =
      startIndex !== -1 ? fullPath.substring(startIndex + keyword.length) : '';

    // Find the first "/" in the new variable
    const endIndex = substringAfterKeyword.indexOf('/');

    // Give substring from the start of the new variable till the "/" OR till the end if it doesn't exist
    const result =
      endIndex !== -1
        ? substringAfterKeyword.substring(0, endIndex)
        : substringAfterKeyword;

    // make this to be after the last /url-shortener part
    console.log(result);
    // If there is a shortened part, make the GET request
    if (result && result !== 'url-shortener') {
      handleRedirect(result);
    }
  }, []);

  const handleRedirect = async (shortenedPart) => {
    try {
      const newURL =
        'https://cloud.amanthakkar.com/shorten/?shortened=' + shortenedPart;
      const response = await axios.get(newURL);
      console.log('Shortened URL: ', response);
      if (response.status === 200) {
        const originalURL = response.data.originalURL;
        console.log('Trying to go to', originalURL);

        // Ensure that the URL has a protocol (https:// or http://)
        const redirectToURL = /^https?:\/\//i.test(originalURL)
          ? originalURL
          : 'https://' + originalURL;
        console.log('New URL:', redirectToURL);

        if (typeof window !== 'undefined') {
          window.location.href = redirectToURL;
        }
      } else {
        console.log(response.status);
        navigate('/url-shortener');
      }
    } catch (error) {
      navigate('/url-shortener');

      console.error('Error handling redirect:', error.message);
    }
  };

  const handleCopy = () => {
    // Copy the shortened URL to the clipboard
    navigator.clipboard.writeText(`https://amanthakkar.com/${outputURL}`);
    alert('Shortened URL copied to clipboard!');
  };

  const handleSubmit = async () => {
    const submitObject = {
      url: inputURL,
    };
    try {
      const response = await axios.post(
        'https://cloud.amanthakkar.com/shorten',
        submitObject
      );
      setOutputURL(response.data.value);
    } catch (error) {
      console.error('Error submitting data:', error.message);
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
        <div>
          <article className='post' id='projects'>
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
                <div className='input-container'>
                  <input
                    id='longURL'
                    className='input-field'
                    placeholder='Enter a URL to be shortened'
                    value={inputURL}
                    onChange={(e) => setInputURL(e.target.value)}
                  />
                </div>

                <button className='submit-button' onClick={handleSubmit}>
                  Shorten this URL!
                </button>

                {outputURL && (
                  <div className='output-url'>
                    <p>
                      <em>{formatInputURL()}</em> is shortened to{' '}
                      <span>
                        <a href={`https://amanthakkar.com/${outputURL}`}>
                          amanthakkar.com/{outputURL}
                        </a>
                      </span>{' '}
                      <span
                        role='img'
                        aria-label='copy-icon'
                        onClick={handleCopy}
                      >
                        📋
                      </span>
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
          </article>
        </div>
      </Main>
    </>
  );
}

export default Shortener;
