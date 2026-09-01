import { Html, Head, Preview, Body, Container, Section, Hr, Text, Link, Img } from '@react-email/components';

export default function LeadConfirmation({ name, email, phone, goal }: {
  name: string; email: string; phone: string; goal: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>We received your health case — Sakshi will be in touch.</Preview>
      <Body style={{ background: '#FBF8F2', margin: 0, padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(31,51,41,0.08)' }}>
          <Section style={{ background: '#2F4A3E', padding: '32px 40px' }}>
            <Text style={{ color: '#C9D4BC', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 600 }}>Decode · Understand · Improve</Text>
            <Text style={{ color: '#FBF8F2', fontSize: '24px', fontFamily: 'Fraunces, serif', margin: 0 }}>Your case file is open.</Text>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ fontSize: '16px', color: '#1A1A1A', lineHeight: 1.6, margin: '0 0 24px' }}>
              Hi {name.split(' ')[0]}, thank you for reaching out. Sakshi personally reviews every enquiry and will get back to you within 24 hours.
            </Text>
            <Section style={{ background: '#F5EFE3', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <Text style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7E906F', fontWeight: 600, margin: '0 0 12px' }}>Case Summary</Text>
              <Text style={{ fontSize: '14px', color: '#1A1A1A', margin: '4px 0' }}><strong>Name:</strong> {name}</Text>
              <Text style={{ fontSize: '14px', color: '#1A1A1A', margin: '4px 0' }}><strong>Phone:</strong> {phone}</Text>
              <Text style={{ fontSize: '14px', color: '#1A1A1A', margin: '4px 0' }}><strong>Email:</strong> {email}</Text>
              <Text style={{ fontSize: '14px', color: '#1A1A1A', margin: '4px 0' }}><strong>Primary Goal:</strong> {goal}</Text>
            </Section>
            <Hr style={{ border: 'none', borderTop: '1px solid #E0D7C7', margin: '24px 0' }} />
            <Text style={{ fontSize: '14px', color: '#2D2D2D', lineHeight: 1.6, margin: '0 0 16px' }}>
              In the meantime, if you'd like to fast-track the conversation, reach Sakshi directly on WhatsApp.
            </Text>
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} style={{ display: 'inline-block', background: '#25D366', color: '#ffffff', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
              WhatsApp Sakshi
            </Link>
          </Section>
          <Section style={{ padding: '24px 40px', background: '#F5EFE3' }}>
            <Text style={{ fontSize: '12px', color: '#7E906F', margin: 0 }}>
              Dietitian Sakshi Singla · Personalized Nutrition Consulting
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}