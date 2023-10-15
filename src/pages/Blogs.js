import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Header from '../components/Header/Header';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <>
    <Header />
    <Main title='Blogs' description="Learn about Aman's blog posts.">
      <article className='post' id='projects'>
        <header>
          <div className='title'>
            <h2>
              <Link to='/blogs'>Projects</Link>
            </h2>
            <p>
              I wrote some blog posts. Coming soon... (visit my{' '}
              <a href='https://medium.com/@amanbthakkar'>Medium</a> until then)
            </p>
          </div>
        </header>
        {/* {data.map((project) => (
          <Cell data={project} key={project.title} />
        ))} */}
      </article>
    </Main>
  </>
);

export default Projects;
