import { Html, Head, Preview, Body, Container, Section, Text, Link } from '@react-email/components';

export default function AdminNotification({ name, email, phone, goal }: {
  name: string; email: string; phone: string; goal: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>New lead — {name} — {goal}</Preview>
      <Body style={{ background: '#FBF8F2', margin: 0, padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', background: '#ffffff', borderRadius: '16px', padding: '32px 40px', boxShadow: '0 8px 32px rgba(31,51,41,0.08)' }}>
          <Section style={{ background: '#2F4A3E', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
            <Text style={{ color: '#C9D4BC', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, fontWeight: 600 }}>New Lead Received</Text>
          </Section>
          <Text style={{ fontSize: '22px', fontFamily: 'Fraunces, serif', color: '#1A1A1A', margin: '0 0 20px' }}>{name}</Text>
          <Text style={{ fontSize: '14px', color: '#2D2D2D', margin: '4px 0' }}><strong>Email:</strong> {email}</Text>
          <Text style={{ fontSize: '14px', color: '#2D2D2D', margin: '4px 0' }}><strong>Phone:</strong> {phone}</Text>
          <Text style={{ fontSize: '14px', color: '#2D2D2D', margin: '4px 0 24px' }}><strong>Goal:</strong> {goal}</Text>
          <Link href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} style={{ display: 'inline-block', background: '#2F4A3E', color: '#FBF8F2', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px' }}>
            Reach out on WhatsApp
          </Link>
        </Container>
      </Body>
    </Html>
  );
}