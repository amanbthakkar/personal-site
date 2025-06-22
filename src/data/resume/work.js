/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Meta Platforms, Inc.',
    position: 'Software Performance and Capacity Engineer',
    startDate: '2025-06-23',
    summary: 'Just joined Meta!',
    highlights: [,],
  },
  {
    name: 'Hewlett Packard Enterprise',
    position: 'Cloud Applications Developer II',
    startDate: '2024-02-12',
    endDate: '2025-06-16',
    summary: `I worked on building the cloud platform for the next generation of Aruba's enterprise switches.
    `,
    highlights: [
      'Detected & resolved race conditions in concurrent goroutines by redesigning high-volume message processing pipeline',
      'Eliminated OOM errors in Kubernetes pods with efficient memory usage along with distributed message tracing and logging',
      'Achieved ~30% lower inter-service communication latency by transitioning multiple legacy APIs from REST to gRPC',
      'Optimized Golang cloud service for Aruba switches with Redis caching, lowering database queries by 80%',
      'Boosted feature branch testing speed by ~10% across organization by improving Python-based test automation framework',
      'Led effort to deliver multiple workflows and services for Aruba\'s on-premise solution with intensive testing within tight deadlines',
      'Enhanced real-time service performance insights via Prometheus metric collection and custom Grafana dashboards',
      'Developed Proof of Concept application using RAG techniques to provide automated Level 1 triages for bugs based on runbooks from multiple services',
    ],
  },
  {
    name: 'Glidewell Dental',
    position: 'Software Engineer Intern',
    startDate: '2023-06-19',
    endDate: '2023-09-01',
    summary: `Glidewell Dental, based in Irvine, California, is a leading dental laboratory known for its innovative use of technology to enhance the quality and efficiency of its services.
    I led the migration from Angular to React Native and redesigned the Chairside Milling System mobile app, adding new features to improve user experience. `,
    highlights: [
      'Re-designed front-end architecture of mobile app by independently leading migration from Angular to React Native',
      'Achieved 50% reduction in crown validation time by integrating 3D renders for the manufactured crowns within the app using Three.js',
      'Minimized backend server load through real-time communication of mobile app with milling devices for status updates using web sockets',
      'Slashed hardware bug reporting time from more than a day to just a few seconds with a new feature allowing dentists to explain issues as well as submit photos or attachments ',
    ],
  },
  {
    name: 'Barclays Global Service Center',
    position: 'Software Developer',
    startDate: '2019-07-19',
    endDate: '2022-08-02',
    summary: `Barclays Global Service Center (BGSC) is a global capability center of Barclays Bank PLC, providing best-in-class Technology, Operations, and Functions services 
    to Barclays businesses and customers globally. BGSC is headquartered in Pune, India, with operations in other countries as well. I worked with Payment Sanctions in the Financial Crimes
    Division, on multiple projects and internal services.`,
    highlights: [
      'Saved USD 30,000 in capital costs by developing an in-house website using React for Operations to flag fraudulent transactions',
      'Led cross-functional effort to develop, test, and deploy new payment route configurations using Fircosoft for real-time,cross-border euro transfers with over 6 million annual transactions and sub-second processing time',
      'Reduced manual effort by approximately 75% by creating Python scripts to detect live data breaches in test environments',
      'Boosted analysts’ efficiency by 30% with Python parser to process over 50 types of raw payment files into customizable reports',
      'Received “Recognition of Excellence” for contributions to a challenging ESQL project that modified internal sanctions broker',
      'Designed SOPs and provisioned new environment for ad-hoc rescreening tasks right from data extraction to validation of results',
      'Enhanced software consistency via automated Chef deployments, streamlining infrastructure operations across 7 environments',
      'Achieved 5x increase in code coverage through the utilization of Selenium and Cucumber for test case automation',
    ],
  },
  {
    name: 'PredCred',
    position: 'Intern',
    startDate: '2016-10-01',
    endDate: '2017-10-01',
    summary: `PredCred was a startup that aimed to game-ify sports betting in India. It enabled users to stake virtual currencies on outcomes of sports games 
    and win more virtual currencies in return. These returns could be used to redeem coupons or prizes with our merchant partners. I wore multiple hats as an Intern here inluding development, 
    user base analysis, customer support, marketing, pitching to investors, etc.`,
    highlights: [,],
  },
];

export default work;
