import * as React from 'react';
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from '@react-email/components';

interface InquiryEmailProps {
  id: string;
  full_name: string;
  company_name?: string;
  email: string;
  mobile: string;
  country: string;
  product_category?: string;
  quantity?: string;
  notes: string;
  source: string;
}

export const InquiryEmail = ({
  id, full_name, company_name, email, mobile, country, product_category, quantity, notes, source
}: InquiryEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Inquiry: {product_category || "General"} from {company_name || full_name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>New Inquiry Received</Heading>
            <Text style={headerSubtitle}>Ref: #{id}</Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}><strong>Contact:</strong> {full_name}</Text>
            {company_name && <Text style={paragraph}><strong>Company:</strong> {company_name}</Text>}
            <Text style={paragraph}><strong>Email:</strong> {email}</Text>
            <Text style={paragraph}><strong>Phone:</strong> {mobile}</Text>
            <Text style={paragraph}><strong>Location:</strong> {country}</Text>
            <Hr style={hr} />
            <Text style={paragraph}><strong>Product:</strong> {product_category || "N/A"}</Text>
            <Text style={paragraph}><strong>Quantity:</strong> {quantity || "N/A"}</Text>
            <Text style={paragraph}><strong>Requirements:</strong></Text>
            <Text style={paragraph}>{notes}</Text>
            <Hr style={hr} />
            <Text style={paragraph}><strong>Source:</strong> {source}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = { backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '40px auto', borderRadius: '8px', overflow: 'hidden', maxWidth: '600px' };
const header = { backgroundColor: '#0a1628', padding: '20px', textAlign: 'center' as const };
const headerTitle = { color: '#ffffff', fontSize: '20px', margin: '0' };
const headerSubtitle = { color: '#cda85c', fontSize: '12px', marginTop: '8px' };
const content = { padding: '30px' };
const paragraph = { color: '#4b5563', fontSize: '14px', marginBottom: '12px', whiteSpace: 'pre-wrap' as const };
const hr = { borderColor: '#e5e7eb', margin: '20px 0' };
