import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dietitian Sakshi Singla',
  description: 'Privacy policy for Dietitian Sakshi Singla website and services.',
};

const sections = [
  {
    title: '1. Information Collection and Use',
    paragraphs: [
      '1.1. We collect several different types of information for various purposes to provide and improve our Service to you.',
    ],
  },
  {
    title: '2. Types of Data Collected',
    paragraphs: [
      '2.1. Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to: Email address, first name and last name, phone number, address, state, province, ZIP/postal code, city, cookies and usage data.',
    ],
  },
  {
    title: '3. Use of Data',
    paragraphs: [
      '3.1. We use the collected data for various purposes: For research purpose, to provide and maintain our Service, to notify you about changes to our Service, to provide customer support, to gather analysis or valuable information so that we can improve our Service, to monitor the usage of our Service, and to detect, prevent and address technical issues.',
    ],
  },
  {
    title: '4. Transfer of Data',
    paragraphs: [
      '4.1. Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.',
    ],
  },
  {
    title: '5. Disclosure of Data',
    paragraphs: [
      '5.1. We may disclose your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of Sakshi Singla, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of users of the Service or the public, and protect against legal liability.',
    ],
  },
  {
    title: '6. Security of Data',
    paragraphs: [
      '6.1. The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
    ],
  },
  {
    title: '7. Your Data Protection Rights Under General Data Protection Regulation (GDPR)',
    paragraphs: [
      '7.1. If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Sakshi Singla aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.',
    ],
  },
  {
    title: '8. Service Providers',
    paragraphs: [
      '8.1. We may employ third party companies and individuals to facilitate our Service (“Service Providers”), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.',
    ],
  },
  {
    title: '9. Links to Other Sites',
    paragraphs: [
      '9.1. Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.',
    ],
  },
  {
    title: '10. Changes to This Privacy Policy',
    paragraphs: [
      '10.1. We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
    ],
  },
  {
    title: '11. Contact Us',
    paragraphs: [
      '11.1. If you have any questions about this Privacy Policy, please contact us by email: admin@sakshisingla.com',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="08 July 2024"
      intro={[
        'Sakshi Singla (“us”, “we”, or “our”) operates the website www.sakshisingla.com (the “Service”).',
        'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
      ]}
      sections={sections}
    />
  );
}
