import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';

const Index = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/data/about.md')
      .then((r) => r.text())
      .then(setMarkdown);
  }, []);

  return (
    <>
      <Header />
      <Main title='About' description='Learn about Aman Thakkar'>
        <article className='post markdown' id='about'>
          <header>
            <div className='title'>
              <h2>
                <Link to='/'>Who I am and why I made this website</Link>
              </h2>
              <p>Built before LLMs, now maintained by LLMs.</p>
            </div>
          </header>

          <Markdown>{markdown}</Markdown>
        </article>
      </Main>
    </>
  );
};

export default Index;
