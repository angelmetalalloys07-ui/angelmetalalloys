import * as React from 'react';
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text, Img } from '@react-email/components';

interface AutoReplyEmailProps {
  fullName: string;
}

export const AutoReplyEmail = ({ fullName }: AutoReplyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Angel Metal & Alloys</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Angel Metal & Alloys</Heading>
            <Text style={headerSubtitle}>Premium SS/Carbon Steel Pipe Fittings & Flanges</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={paragraph}>Dear {fullName},</Text>
            <Text style={paragraph}>
              Thank you for reaching out to <strong>Angel Metal & Alloys</strong>. We have successfully received your inquiry.
            </Text>
            <Text style={paragraph}>
              Our sales engineering team is reviewing your requirements and will get back to you with a comprehensive quotation and technical details within 4 business hours.
            </Text>
            
            <Hr style={hr} />
            
            <Text style={paragraph}>
              <strong>Why Source From Us?</strong>
              <br />• 100% Traceability with EN 10204 3.1 MTC
              <br />• ISO 9001:2015 Certified Manufacturing
              <br />• Exporting to 30+ Countries
            </Text>

            <Text style={paragraph}>
              If your request is urgent, please feel free to call or WhatsApp us at <strong>+91 99743 34455</strong>.
            </Text>

            <Text style={signoff}>
              Best Regards,<br />
              <strong>Sales Team</strong><br />
              Angel Metal & Alloys<br />
              Ahmedabad, Gujarat, India
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '0',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#0a1628',
  padding: '30px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '1px',
};

const headerSubtitle = {
  color: '#cda85c',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
  margin: '8px 0 0 0',
};

const content = {
  padding: '30px',
};

const paragraph = {
  color: '#4b5563',
  fontSize: '15px',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const signoff = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.6',
  marginTop: '30px',
};
