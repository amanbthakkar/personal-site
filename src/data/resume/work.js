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
    summary: `Just joined Meta as a Software Performance and Capacity Engineer. Please reach out to me if you'd like to know more!
    `,
    highlights: [,],
  },
  {
    name: 'Hewlett Packard Enterprise',
    position: 'Cloud Applications Developer II',
    startDate: '2024-02-12',
    endDate: '2025-06-16',
    summary: `I worked on building the cloud platform for the next generation of Aruba's (a Hewlett Packard Enterprise company) enterprise switches.
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
`,
    highlights: [
      'Re-designed front-end architecture of mobile app by independently leading migration from Angular to React Native',
      'Achieved 50% reduction in crown validation time by integrating 3D renders within the app using Three.js',
      'Minimized backend server load through real-time communication with milling devices with advanced web socket implementation',
      'Slashed hardware bug reporting time by 90% with new feature allowing dentists to snap and submit photos with seconds',
    ],
  },
  {
    name: 'Barclays Global Service Center',
    position: 'Software Developer',
    startDate: '2019-07-19',
    endDate: '2022-08-02',
    summary: `Barclays Global Service Center (BGSC) is a global capability center of Barclays Bank PLCI worked with Payment Sanctions in the Financial Crimes
    Division, on multiple projects and internal services.`,
    highlights: [
      'Saved USD 30,000 in capital costs by developing an in-house website using React for Operations to flag fraudulent transactions',
      'Led cross functional effort to develop, test and deploy new payment route configurations for real-time, cross-border euro transfers',
      'Reduced manual effort by ~75% by creating Python scripts to detect live data breaches in test environments',
      'Boosted analysis efficiency by ~30% with Python parser to process raw payment files of over 50 types into customizable reports',
      'Achieved 5x increase in code coverage through the utilization of Selenium and Cucumber for test case automation',
    ],
  },
];

export default work;
