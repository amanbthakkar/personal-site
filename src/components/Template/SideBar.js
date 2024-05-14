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
        Hi, I am Aman! I am currently working at HPE as a Software Engineer. Previously at Barclays prior to my Master's from UC Irvine. I am
        really passionate about technology and also have a special interest in
        finance and its intersection with technology! Please do check out my{' '}
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
