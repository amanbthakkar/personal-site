import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Header from '../components/Header/Header';

const PageNotFound = () => (
  <>
    <Header />
    <Main title='404 Not Found' description='Page not found'>
      <article className='post' id='not-found'>
        <header>
          <div className='title'>
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        </header>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p>Sorry, we couldn't find the page you were looking for.</p>
          <p>
            <Link to='/'>Return to home</Link> or check out{' '}
            <Link to='/projects'>my projects</Link>,{' '}
            <Link to='/resume'>my resume</Link>, or{' '}
            <Link to='/contact'>contact me</Link>.
          </p>
        </div>
      </article>
    </Main>
  </>
);

export default PageNotFound;
