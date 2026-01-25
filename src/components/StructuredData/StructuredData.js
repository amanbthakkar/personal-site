import { Helmet } from 'react-helmet-async';

const StructuredData = ({ type = 'Person' }) => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aman Thakkar',
    url: 'https://amanthakkar.com',
    email: 'amanbthakkar@gmail.com',
    jobTitle: 'Software Performance and Capacity Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Meta Platforms, Inc.',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'UC Irvine',
    },
    sameAs: [
      'https://www.linkedin.com/in/amanbthakkar/',
      'https://github.com/amanbthakkar',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aman Thakkar',
    url: 'https://amanthakkar.com',
    author: {
      '@type': 'Person',
      name: 'Aman Thakkar',
    },
  };

  const schema = type === 'Person' ? personSchema : websiteSchema;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default StructuredData;
