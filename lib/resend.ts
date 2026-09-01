import { Resend } from 'resend';
import LeadConfirmation from '@/emails/lead-confirmation';
import AdminNotification from '@/emails/admin-notification';
import PaymentConfirmation from '@/emails/payment-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY!);

const from = `${process.env.RESEND_FROM_NAME!} <${process.env.RESEND_FROM!}>`;

export async function sendLeadEmails(input: {
  name: string; email: string; phone: string; goal: string;
}) {
  const [userEmail, adminEmail] = await Promise.all([
    resend.emails.send({
      from,
      to: input.email,
      subject: 'We received your health case, ' + input.name.split(' ')[0],
      react: LeadConfirmation(input),
    }),
    resend.emails.send({
      from,
      to: process.env.ADMIN_EMAIL!,
      subject: `New lead — ${input.name} — ${input.goal}`,
      react: AdminNotification(input),
    }),
  ]);
  return { userEmail, adminEmail };
}

export async function sendPaymentConfirmationEmail(input: {
  name: string; email: string; plan: string; amount: number;
}) {
  return resend.emails.send({
    from,
    to: input.email,
    subject: `Payment received — ${input.plan}`,
    react: PaymentConfirmation(input),
  });
}