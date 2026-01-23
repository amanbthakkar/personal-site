import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Analytics from '../components/Template/Analytics';
import Navigation from '../components/Template/Navigation';
import SideBar from '../components/Template/SideBar';
import ScrollToTop from '../components/Template/ScrollToTop';
import SkipToContent from '../components/SkipToContent/SkipToContent';
import StructuredData from '../components/StructuredData/StructuredData';

const Main = (props) => (
  <>
    <HelmetProvider>
      <Analytics />
      <ScrollToTop />
      <Helmet
        titleTemplate='%s | Aman Thakkar'
        defaultTitle='Aman Thakkar'
        defer={false}
      >
        {props.title && <title>{props.title}</title>}
        <meta name='description' content={props.description} />
        <meta property='og:title' content={props.title || 'Aman Thakkar'} />
        <meta property='og:description' content={props.description} />
        <meta property='og:url' content='https://amanthakkar.com' />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={props.title || 'Aman Thakkar'} />
        <meta name='twitter:description' content={props.description} />
      </Helmet>
      <StructuredData type="Person" />
      <div id='wrapper'>
        <SkipToContent />
        <header></header>
        <Navigation />
        <main id='main'>{props.children}</main>
        {props.fullPage ? null : <SideBar />}
      </div>
    </HelmetProvider>
  </>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullPage: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
};

Main.defaultProps = {
  children: null,
  fullPage: false,
  title: null,
  description: "Aman Thakkar's personal website.",
};

export default Main;
