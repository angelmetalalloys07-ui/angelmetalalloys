import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Link,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { Inquiry } from "@/types";

interface InquiryNotificationProps {
  inquiry: Inquiry;
}

export const InquiryNotification = ({ inquiry }: InquiryNotificationProps) => {
  const timestamp = new Date(inquiry?.created_at || Date.now()).toLocaleString();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://angelmetalalloys.com';
  const adminLink = `${siteUrl}/admin/inquiries/${inquiry?.id}`;

  return (
    <Html>
      <Head />
      <Preview>New Inquiry: {inquiry?.product_category} from {inquiry?.company_name || inquiry?.full_name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>
              ANGEL METAL <span style={{ color: "#d4922a" }}>& ALLOYS</span>
            </Heading>
          </Section>

          {/* Content */}
          <Section style={content}>
            <div style={alertBox}>
              <Heading as="h3" style={alertTitle}>New Inquiry Received</Heading>
              <Text style={alertText}>Submitted on: {timestamp}</Text>
            </div>

            {/* Contact Details */}
            <table style={table} cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th style={th} colSpan={2}>Contact Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdLabel}><strong>Name</strong></td>
                  <td style={tdValue}>{inquiry?.full_name}</td>
                </tr>
                <tr style={trAlt}>
                  <td style={tdLabel}><strong>Company</strong></td>
                  <td style={tdValue}>{inquiry?.company_name || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={tdLabel}><strong>Mobile</strong></td>
                  <td style={tdValue}>{inquiry?.mobile}</td>
                </tr>
                <tr style={trAlt}>
                  <td style={tdLabel}><strong>Email</strong></td>
                  <td style={tdValue}><Link href={`mailto:${inquiry?.email}`} style={link}>{inquiry?.email}</Link></td>
                </tr>
                <tr>
                  <td style={tdLabel}><strong>Location</strong></td>
                  <td style={tdValue}>{inquiry?.country} {inquiry?.city ? `(${inquiry?.city})` : ''}</td>
                </tr>
              </tbody>
            </table>

            {/* Product Details */}
            <table style={table} cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th style={th} colSpan={2}>Product Requirements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdLabel}><strong>Product</strong></td>
                  <td style={tdValue}>{inquiry?.product_category} {inquiry?.product_subcategory ? ` - ${inquiry?.product_subcategory}` : ''}</td>
                </tr>
                <tr style={trAlt}>
                  <td style={tdLabel}><strong>Grade</strong></td>
                  <td style={tdValue}>{inquiry?.material_grade || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={tdLabel}><strong>Size/Class</strong></td>
                  <td style={tdValue}>{[inquiry?.size_nb, inquiry?.pressure_class].filter(Boolean).join(' / ') || 'N/A'}</td>
                </tr>
                <tr style={trAlt}>
                  <td style={tdLabel}><strong>Quantity</strong></td>
                  <td style={tdValue}>{inquiry?.quantity || 'N/A'}</td>
                </tr>
                <tr>
                  <td style={tdLabel}><strong>Delivery</strong></td>
                  <td style={tdValue}>{inquiry?.delivery_date || 'N/A'}</td>
                </tr>
              </tbody>
            </table>

            {inquiry?.notes && (
              <Section style={{ marginBottom: '25px' }}>
                <Text style={{ ...tdLabel, display: 'block', marginBottom: '8px' }}><strong>Notes / Specification:</strong></Text>
                <div style={notesBox}>{inquiry.notes}</div>
              </Section>
            )}

            {/* CTA */}
            <Section style={{ textAlign: "center", marginTop: "30px" }}>
              <Link href={adminLink} style={button}>
                View in Admin Dashboard
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Angel Metal & Alloys Admin System<br />
              This is an automated notification. Please do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InquiryNotification;

// Styles
const main = {
  backgroundColor: "#f1f5f9",
  fontFamily: "Arial, sans-serif",
  margin: "0",
  padding: "0",
};

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
};

const header = {
  backgroundColor: "#0a1628",
  padding: "30px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  letterSpacing: "1px",
};

const content = {
  padding: "30px",
};

const alertBox = {
  backgroundColor: "#f8fafc",
  borderLeft: "4px solid #d4922a",
  padding: "15px",
  marginBottom: "25px",
  borderRadius: "0 4px 4px 0",
};

const alertTitle = {
  margin: "0 0 5px 0",
  color: "#0a1628",
  fontSize: "18px",
};

const alertText = {
  margin: "0",
  color: "#64748b",
  fontSize: "13px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginBottom: "25px",
};

const th = {
  textAlign: "left" as const,
  padding: "12px",
  borderBottom: "2px solid #e2e8f0",
  color: "#334155",
  fontSize: "13px",
  textTransform: "uppercase" as const,
};

const tdLabel = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  color: "#1e293b",
  fontSize: "14px",
  width: "30%",
};

const tdValue = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  color: "#1e293b",
  fontSize: "14px",
};

const trAlt = {
  backgroundColor: "#f8fafc",
};

const notesBox = {
  backgroundColor: "#ffffff",
  padding: "10px",
  border: "1px solid #e2e8f0",
  borderRadius: "4px",
  whiteSpace: "pre-wrap" as const,
  color: "#1e293b",
  fontSize: "14px",
};

const button = {
  display: "inline-block",
  backgroundColor: "#d4922a",
  color: "#0a1628",
  textDecoration: "none",
  padding: "14px 24px",
  borderRadius: "6px",
  fontWeight: "bold",
  textAlign: "center" as const,
  fontSize: "14px",
};

const link = {
  color: "#d4922a",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  textAlign: "center" as const,
  borderTop: "1px solid #e2e8f0",
};

const footerText = {
  color: "#64748b",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.5",
};
