import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Shipping and Delivery Policy | Dietitian Sakshi Singla',
  description: 'Shipping and delivery policy for Dietitian Sakshi Singla orders and services.',
};

const sections = [
  {
    title: '1. Shipping Policy',
    paragraphs: [
      '1.1. Order Processing Time: All orders are processed within 2 business days. Orders are not shipped or delivered on weekends or holidays.',
      '1.2. Shipping Rates and Delivery Estimates: Shipping charges for your order will be calculated and displayed at checkout. Delivery estimates will be provided once your order has been processed and shipped.',
      '1.3. Shipment Confirmation and Order Tracking: You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.',
      '1.4. International Shipping: We currently do not offer international shipping. Contact us for more information.',
    ],
  },
  {
    title: '2. Delivery Options',
    paragraphs: [
      '2.1. Standard Delivery: Delivery will typically take 5 to 7 business days after processing.',
      '2.2. Express Delivery: Express delivery options are available upon request. Additional charges may apply.',
    ],
  },
  {
    title: '3. Shipping Destinations',
    paragraphs: [
      '3.1. Domestic Shipping: We ship to addresses within India.',
      '3.2. International Shipping: Contact us directly for international shipping options.',
    ],
  },
  {
    title: '4. Shipping Policy Disclaimers',
    paragraphs: [
      '4.1. Shipping Delays: Sakshi Singla is not responsible for any delays caused by factors outside of our control, such as natural disasters, customs delays, or shipping carrier delays.',
      '4.2. Incorrect Address: It is the responsibility of the customer to provide an accurate and complete shipping address. Sakshi Singla is not liable for orders shipped to incorrect addresses provided by the customer.',
    ],
  },
  {
    title: '5. Contact Us',
    paragraphs: [
      '5.1. If you have any questions about our Shipping and Delivery Policy, please contact us by email: admin@sakshisingla.com.',
    ],
  },
];

export default function ShippingAndDeliveryPolicyPage() {
  return <LegalPage title="Shipping and Delivery Policy" lastUpdated="08 July 2024" sections={sections} />;
}
