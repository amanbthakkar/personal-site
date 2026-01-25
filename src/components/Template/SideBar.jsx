import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

// In Vite, public assets are served from root, no need for BASE_URL prefix
const SideBar = () => (
  <section id='sidebar'>
    <section id='intro'>
      <Link to='/' className='logo'>
        <img src='/images/me.jpg' alt='Aman Thakkar' />
      </Link>
      <header>
        <h2>Aman Thakkar</h2>
        <p>
          <a href='mailto:amanbthakkar@gmail.com'>amanbthakkar@gmail.com</a>
        </p>
      </header>
    </section>

    <section className='blurb'>
      <h2>About</h2>
      <p>
        Hi, I'm Aman! I'm a Software Engineer at Meta, and I'm curious about what happens next. I build things, I learn constantly, and I think a lot about how AI is changing what it means to be an engineer. I'm also fascinated by markets, finance, and the math behind prediction. Check out my{' '}
        <Link to='/resume'>resume</Link>, <Link to='/projects'>projects</Link>,
        and if you're interested, my{' '}
        <Link to='/power-law-oscillator-indicator'>Bitcoin indicator</Link>!
      </p>
      <ul className='actions'>
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to='/resume' className='button'>
              Learn More
            </Link>
          ) : (
            <Link to='/' className='button'>
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    {/* <section id='footer'>
      <ContactIcons />
      <p className='copyright'>
        &copy; Michael D&apos;Angelo <Link to='/'>mldangelo.com</Link>.
      </p>
    </section> */}
  </section>
);

export default SideBar;
