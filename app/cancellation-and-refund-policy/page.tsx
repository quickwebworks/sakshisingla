import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Cancellation and Refund Policy | Dietitian Sakshi Singla',
  description: 'Cancellation and refund policy for appointments and services from Dietitian Sakshi Singla.',
};

const sections = [
  {
    title: 'Cancellation Policy',
    paragraphs: [
      '1. Consultation Appointments: Clients may cancel their consultation appointments up to 24 hours before the scheduled time without penalty. Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee.',
      '2. Workshops or Group Sessions: Cancellations for workshops or group sessions must be made at least 48 hours before the scheduled event to receive a full refund. Cancellations made within 48 hours of the event may not be eligible for a refund, depending on the circumstances.',
    ],
  },
  {
    title: 'Refund Policy',
    paragraphs: [
      '1. Consultation Services: Refunds for consultation services may be provided in certain circumstances, such as inability to reschedule a cancelled appointment within a reasonable timeframe. Refund requests will be evaluated on a case-by-case basis.',
      '2. Workshops or Group Sessions: Refunds for workshops or group sessions will be issued if the cancellation policy is adhered to (i.e., cancellation made within the specified timeframe).',
    ],
  },
  {
    title: 'How to Request a Refund',
    paragraphs: [
      'To request a refund, please contact us at admin@sakshisingla.com with your name, contact information, and details of your purchase or appointment.',
    ],
  },
  {
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions about our Cancellation and Refund Policy, please contact us by email: admin@sakshisingla.com.',
    ],
  },
];

export default function CancellationAndRefundPolicyPage() {
  return <LegalPage title="Cancellation and Refund Policy" lastUpdated="08 July 2024" sections={sections} />;
}
