import { Html, Head, Preview, Body, Container, Section, Text, Link } from '@react-email/components';

export default function PaymentConfirmation({ name, email, plan, amount }: {
  name: string; email: string; plan: string; amount: number;
}) {
  return (
    <Html>
      <Head />
      <Preview>Payment received — {plan}</Preview>
      <Body style={{ background: '#FBF8F2', margin: 0, padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', background: '#ffffff', borderRadius: '24px', overflow: 'hidden' }}>
          <Section style={{ background: '#2F4A3E', padding: '32px 40px' }}>
            <Text style={{ color: '#FBF8F2', fontSize: '24px', fontFamily: 'Fraunces, serif', margin: 0 }}>Payment received.</Text>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ fontSize: '16px', color: '#1A1A1A', lineHeight: 1.6, margin: '0 0 24px' }}>
              Hi {name.split(' ')[0]}, we've received your payment of <strong>₹{amount.toLocaleString('en-IN')}</strong> for the <strong>{plan}</strong>.
            </Text>
            <Text style={{ fontSize: '14px', color: '#2D2D2D', lineHeight: 1.6, margin: '0 0 16px' }}>
              Sakshi will personally reach out within the next 24 hours to kick off your program.
            </Text>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} style={{ display: 'inline-block', background: '#25D366', color: '#ffffff', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
              Say hi on WhatsApp
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}