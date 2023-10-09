// TODO Add a couple lines about each project
const data = [
  {
    title: 'amanthakkar.com',
    subtitle: 'This personal website + a live Bitcoin indicator',
    link: 'amanthakkar.com',
    image: '/images/projects/amanthakkar.png',
    date: '2015-11-20',
    desc:
      "A full-stack website showing what you're reading here.  Front-end is hosted using Github Pages. " +
      'The unique visits count is done through a self-hosted backend on AWS with containerized Node and Redis. ' +
      "I've also used Nginx and Certbot for enabling HTTPS communication. " +
      'Domain and subdomain purchased through Squarespace. ',
  },
  {
    title: 'Subscribite (Subscribe + Bite)',
    subtitle: 'Capstone project at UC Irvine',
    link: 'https://github.com/amanbthakkar/SubscriBite',
    image: '/images/projects/subscribite.jpeg',
    date: '2023-06-20',
    desc:
      'Designed, developed, and deployed cross-platform mobile app for cost-effective, scheduled grocery subscriptions and deliveries. ' +
      'Incorporated REST APIs with Node.js backend and efficient state management for smooth cart manipulation and order processing. ' +
      'Deployed Docker containers to an EC2 instance by leveraging an automated backend workflow powered by GitHub Actions. ',
  },
  {
    title: 'Financial Analysis of Cryptocurrencies',
    subtitle:
      'I explore various mathematical models and how to construct them from scratch.',
    link: 'https://github.com/amanbthakkar/crypto_finance',
    image: '/images/projects/crypto.png',
    date: '2021-12-28',
    desc: (
      <>
        Created an AWS hosted Bitcoin Buy/Sell indicator that powers this page.{' '}
        I showed, through various blog posts, how certain popular
        cryptocurrencies (Litecoin) are pretty much useless to invest in. I also
        predicted Bitcoin to fall below $30,000 in 2022 and wrote about it{' '}
        <a href='https://www.linkedin.com/posts/amanbthakkar_bitcoin-cryptocurrency-cryptocrash-activity-6942058321973514241-AUwB?'>
          here
        </a>
        .
      </>
    ),
  },
  {
    title: 'Smart Contract for Liquidation of On-Chain Loans',
    subtitle: "Project for UC Berkeley's first ever Decentralized Finance MOOC",
    link: 'https://github.com/amanbthakkar/defi-mooc-lab2',
    image: '/images/projects/flashloan.jpg',
    date: '2021-12-15',
    desc:
      'Analyzed liquidity pools and protocols for lending and borrowing on Decentralized Exchanges. ' +
      'We used flash loans to implement a two-step fixed spread liquidation of an overcollateralized on-chain loan.',
  },
  {
    title: 'Instagram Saved Images Downloader',
    subtitle: 'Telegram Bot',
    image: '/images/projects/telegram_bots.png',
    link: 'https://github.com/amanbthakkar/instagrambot-download_saved',
    date: '2019-05-15',
    desc: 'A Telegram Bot that logged into my account and fetched my saved images. Nothing too fancy.',
  },
];

export default data;
