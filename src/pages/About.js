import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then(setMarkdown);
    });
  });

  return (
    <>
      <Header />
      <Main title='About' description='Learn about Aman Thakkar'>
        <article className='post markdown' id='about'>
          <header>
            <div className='title'>
              <h2>
                <Link to='/about'>About Me</Link>
              </h2>
              <p>Who I am and why I made this website</p>
            </div>
          </header>
          <Markdown>{markdown}</Markdown>
        </article>
      </Main>
    </>
  );
};

export default About;
