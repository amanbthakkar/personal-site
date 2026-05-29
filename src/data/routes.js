import { featureFlags } from '../config/featureFlags';

const routes = [
  {
    index: true,
    label: 'Aman Thakkar',
    path: '/',
  },
  // {
  //   label: 'About',
  //   path: '/about',
  // },
  {
    label: 'Resume',
    path: '/resume',
  },
  ...(featureFlags.frontendNewsfeed
    ? [
        {
          label: 'Discover',
          path: '/feed',
        },
      ]
    : []),
  {
    label: 'Projects',
    path: '/projects',
  },
  {
    label: 'Blogs',
    path: '/blogs',
  },
  {
    label: 'Bitcoin Indicator',
    path: '/power-law-oscillator-indicator',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export default routes;
