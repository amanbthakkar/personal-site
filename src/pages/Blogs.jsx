import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';

import Cell from '../components/Projects/Cell';

const Blogs = () => (
  <>
    <Header />
    <Main title='Blogs' description="Learn about Aman's blog posts.">
      <article className='post' id='blogs'>
        <header>
          <div className='title'>
            <h2>
              <Link to='/blogs'>Blogs</Link>
            </h2>
            <p>
              I wrote some blog posts. Coming soon... (visit my{' '}
              <a 
                href='https://medium.com/@amanbthakkar'
                target='_blank'
                rel='noopener noreferrer'
              >
                Medium
              </a>{' '}
              until then)
            </p>
          </div>
        </header>
      </article>
    </Main>
  </>
);

export default Blogs;
