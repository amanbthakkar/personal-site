import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id='sidebar'>
    <section id='intro'>
      <Link to='/' className='logo'>
        <img src={`${PUBLIC_URL}/images/me.png`} alt='' />
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
        Hi, I am Aman! I'm a Computer Science grad student at the University of
        California, Irvine. I'll be graduating in December of 2023! Previously,
        I was a software developer at Barclays where I worked after completing
        my Bachelor's in Computer Engineering in Mumbai, India. I am really
        passionate about technology, finance, and their intersection! Please do
        check out my <Link to='/resume'>resume</Link>,{' '}
        <Link to='/projects'>projects</Link>, and if you're interested, my{' '}
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
