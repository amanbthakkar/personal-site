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
    name: 'Glidewell Dental',
    position: 'Software Engineer Intern',
    startDate: '2023-06-19',
    endDate: '2023-09-01',
    summary: `Glidewell Dental is a dental laboratory based in Irvine, California. They provide a 
    wide range of dental lab services, including crowns and bridges, implant prostherics, dentures, and much more.
    Though a dental company, Glidewell is known for its use of technology to improve the quality, convenience 
    and cost-effectiveness of its services. I worked on the mobile app for the Chairside Milling System, where I rapidly 
    added new features to the existing Angular/Ionic app while also leading the migration from Angular to React Native with
    a re-design of the app's architecture.`,
    highlights: [
      'Re-designed front-end architecture of mobile app by independently leading migration from Angular to React Native',
      'Achieved 50% reduction in crown validation time by integrating 3D renders for the manufactured crowns within the app using Three.js',
      'Minimized backend server load through real-time communication of mobile app with milling devices for status updates using web sockets',
      'Slashed hardware bug reporting time from more than a day to just a few seconds with a new feature allowing dentists to exolain issues as well as submit photos or attachments ',
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
