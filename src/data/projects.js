// TODO Add a couple lines about each project
const data = [
  {
    title: 'URL Shortener',
    subtitle: 'Golang based URL shortener!',
    link: 'https://github.com/amanbthakkar/url-shortener-golang-react',
    image: '/images/projects/url_shortener.png',
    date: '2023-11-20',
    desc:
      'A URL shortening service that converts a long URL to a short URL, and allows navigation to the actual URL using the shortened version. ' +
      'It is built using React for a simple front-end and Golang with Fiber for the backend.' +
      'I used goroutines and channels to exploit concurrency while creating UUIDs for uniquely mapped, non-conflicting shortened URLs. ' +
      'Mapping and IP based Rate limiting is done through Redis, with all services dockerized and ready to deploy on any cloud service. ',
  },
  {
    title: 'amanthakkar.com',
    subtitle: 'This personal website + a live Bitcoin indicator',
    link: 'amanthakkar.com',
    image: '/images/projects/amanthakkar.png',
    date: '2023-10-20',
    desc:
      "A full-stack website showing what you're reading here, including my Bitcoin indicator.  Front-end is hosted using Github Pages. " +
      'The unique visits count is done through a self-hosted backend on AWS with containerized Node and Redis. ' +
      'Python script for the indicator runs daily on the same server, with the image uploaded to a public S3 bucket. ' +
      "I tried using AWS Lambda with CloudWatch and layers using Cloud9 but it wasn't feasible in the free tier so now it's just a cron job :D. " +
      "I've also used Nginx as a reverse proxy and Certbot for enabling HTTPS communication. " +
      'Domain and subdomain purchased through Squarespace. ',
  },
  {
    title: 'Subscribite (Subscribe + Bite)',
    subtitle: 'Capstone project at UC Irvine',
    link: 'https://github.com/amanbthakkar/SubscriBite',
    image: '/images/projects/subscribite.jpeg',
    date: '2023-06-20',
    desc:
      'Designed, developed, and deployed a cross-platform mobile app using React Native for cost-effective, scheduled grocery subscriptions and deliveries. ' +
      'We incorporated REST APIs with a Node.js backend and used efficient state management on the frontend for extremely smooth cart manipulation and order processing. ' +
      'Backend was deployed to an EC2 instance using Docker, by leveraging an automated workflow powered by GitHub Actions. Click on the image to view our Github repo and associated vidoes! ',
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
        Created an AWS hosted Bitcoin Buy/Sell indicator that powers{' '}
        <a href='https://www.amanthakkar.com/power-law-oscillator-indicator'>
          this page
        </a>
        . I showed, through various blog posts, how certain popular
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
      'We used flash loans to implement a two-step fixed spread liquidation of an overcollateralized on-chain loan. ',
  },
  {
    title: 'Counterfeit Detection in Supply Chains using Blockchain',
    subtitle: 'Undergrad Capstone Project',
    link: 'https://github.com/amanbthakkar/defi-mooc-lab2',
    image: '/images/projects/supply_chain.png',
    date: '2019-05-15',
    desc:
      'Studied Andreas Antonopoulos\' "Mastering Bitcoin" to understand how Bitcoin enables "Proof Of Possession" of funds  . ' +
      'Our team of 4 then created our own version of a Bitcoin-like blockchain, entirely from scratch in Golang, to mimic supply chain transactions to prevent counterfeits. ',
  },
  {
    title: 'Instagram Saved Images Downloader',
    subtitle: 'Telegram Bot',
    image: '/images/projects/telegram_bots.png',
    link: 'https://www.reddit.com/r/Python/comments/gs54y9/made_a_telegram_bot_that_logs_into_my_instagram/',
    date: '2019-05-15',
    desc:
      "A Telegram Bot built with Python that logged into my account and fetched my saved images. Nothing too fancy. I had hosted it somewhere earlier but it isn't hosted anywhere anymore. " +
      'Click on the image to see a small video of how it works.',
  },
];

export default data;
