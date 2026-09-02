import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Dietitian Sakshi Singla',
  description: 'Terms and Conditions for Dietitian Sakshi Singla website usage.',
};

const sections = [
  {
    title: '1. Interpretation and Definitions',
    paragraphs: [
      '1.1. The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
    ],
  },
  {
    title: '2. Intellectual Property',
    paragraphs: [
      '2.1. The Service and its original content, features and functionality are and will remain the exclusive property of Sakshi Singla and its licensors.',
    ],
  },
  {
    title: '3. Links to Other Websites',
    paragraphs: [
      '3.1. Our Service may contain links to third-party web sites or services that are not owned or controlled by Sakshi Singla.',
    ],
  },
  {
    title: '4. Termination',
    paragraphs: [
      '4.1. We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
    ],
  },
  {
    title: '5. Governing Law',
    paragraphs: [
      '5.1. These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.',
    ],
  },
  {
    title: '6. Changes',
    paragraphs: [
      '6.1. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',
    ],
  },
  {
    title: '7. Contact Us',
    paragraphs: [
      '7.1. If you have any questions about these Terms, please contact us by email: admin@sakshisingla.com.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      lastUpdated="08 July 2024"
      intro={[
        'Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using the www.sakshisingla.com website (the “Service”) operated by Sakshi Singla (“us”, “we”, or “our”).',
      ]}
      sections={sections}
    />
  );
}
