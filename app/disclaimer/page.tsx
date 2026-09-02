import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Disclaimer | Dietitian Sakshi Singla',
  description: 'Disclaimer for the Dietitian Sakshi Singla website and content.',
};

const sections = [
  {
    title: 'General Information',
    paragraphs: [
      'The information provided on www.sakshisingla.com (the “Website”) is for general informational purposes only. All information on the Website is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.',
    ],
  },
  {
    title: 'Professional Advice',
    paragraphs: [
      'The content on this Website, including text, graphics, images, and other material, is intended for informational and educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this Website.',
    ],
  },
  {
    title: 'No Guarantees',
    paragraphs: [
      'While we strive to provide accurate and up-to-date information, the Website may contain typographical errors or inaccuracies. We do not guarantee that the information provided is complete, reliable, or current. Any reliance you place on such information is strictly at your own risk.',
    ],
  },
  {
    title: 'External Links',
    paragraphs: [
      'The Website may contain links to external websites that are not provided or maintained by or in any way affiliated with us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.',
    ],
  },
  {
    title: 'Testimonials and Results',
    paragraphs: [
      'The Website may contain testimonials from clients and customers that reflect real-life experiences and opinions. However, these testimonials are personal to those particular clients and may not necessarily be representative of all clients and customers. Individual results may vary, and we do not claim, nor should you assume, that you will have the same experiences and results.',
    ],
  },
  {
    title: 'Consultations and Services',
    paragraphs: [
      'All consultations and services provided through the Website are intended to support and assist you in achieving your health and wellness goals. However, individual success depends on various factors, including adherence to the recommended plans and personal dedication. We do not guarantee specific outcomes.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, we shall not be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of the Website or reliance on any information provided on the Website.',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions about this Disclaimer, please contact us at admin@sakshisingla.com.',
    ],
  },
];

export default function DisclaimerPage() {
  return <LegalPage title="Disclaimer" lastUpdated="08 July 2024" sections={sections} />;
}
