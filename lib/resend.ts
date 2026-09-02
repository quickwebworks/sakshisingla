import { Resend } from 'resend';
import LeadConfirmation from '@/lib/emails/lead-confirmation';
import AdminNotification from '@/lib/emails/admin-notification';
import PaymentConfirmation from '@/lib/emails/payment-confirmation';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('Resend API key is not configured');
  return new Resend(apiKey);
}

function getFromAddress() {
  const fromAddress = process.env.RESEND_FROM;
  if (!fromAddress) throw new Error('Resend from address is not configured');
  return `${process.env.RESEND_FROM_NAME ?? 'Dietitian Sakshi Singla'} <${fromAddress}>`;
}

export async function sendLeadEmails(input: {
  name: string; email: string; phone: string; goal: string; referenceNumber: string;
}) {
  const resend = getResend();
  const from = getFromAddress();
  const [userEmail, adminEmail] = await Promise.all([
    resend.emails.send({
      from,
      to: input.email,
      subject: `Enquiry received — ${input.referenceNumber}`,
      react: LeadConfirmation(input),
    }),
    resend.emails.send({
      from,
      to: process.env.ADMIN_EMAIL!,
      subject: `New enquiry — ${input.referenceNumber} — ${input.goal}`,
      react: AdminNotification(input),
    }),
  ]);

  if (userEmail.error) throw new Error(`User email failed: ${userEmail.error.message}`);
  if (adminEmail.error) throw new Error(`Admin email failed: ${adminEmail.error.message}`);
  return { userEmail, adminEmail };
}

export async function sendPaymentConfirmationEmail(input: {
  name: string; email: string; plan: string; amount: number;
}) {
  return getResend().emails.send({
    from: getFromAddress(),
    to: input.email,
    subject: `Payment received — ${input.plan}`,
    react: PaymentConfirmation(input),
  });
}