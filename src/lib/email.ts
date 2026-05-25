import { Resend } from 'resend';
import { Inquiry } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_COLORS = {
  navy: '#0a1628',
  gold: '#d4922a',
  lightGray: '#f8fafc',
  darkGray: '#334155',
  border: '#e2e8f0',
};

const BASE_STYLES = {
  fontFamily: 'Arial, sans-serif',
  body: 'margin: 0; padding: 0; background-color: #f1f5f9; font-family: Arial, sans-serif;',
  container: 'max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);',
  header: `background-color: ${BRAND_COLORS.navy}; padding: 30px; text-align: center;`,
  headerText: `color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 1px;`,
  headerHighlight: `color: ${BRAND_COLORS.gold};`,
  content: 'padding: 30px;',
  alertBox: `background-color: ${BRAND_COLORS.lightGray}; border-left: 4px solid ${BRAND_COLORS.gold}; padding: 15px; margin-bottom: 25px; border-radius: 0 4px 4px 0;`,
  table: 'width: 100%; border-collapse: collapse; margin-bottom: 25px;',
  th: `text-align: left; padding: 12px; border-bottom: 2px solid ${BRAND_COLORS.border}; color: ${BRAND_COLORS.darkGray}; font-size: 13px; text-transform: uppercase;`,
  td: `padding: 12px; border-bottom: 1px solid ${BRAND_COLORS.border}; color: #1e293b; font-size: 14px;`,
  tdAlt: `background-color: ${BRAND_COLORS.lightGray};`,
  button: `display: inline-block; background-color: ${BRAND_COLORS.gold}; color: ${BRAND_COLORS.navy}; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-weight: bold; text-align: center; font-size: 14px;`,
  footer: `background-color: ${BRAND_COLORS.lightGray}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};`,
  footerText: 'color: #64748b; font-size: 12px; margin: 0; line-height: 1.5;',
  link: `color: ${BRAND_COLORS.gold}; text-decoration: none; font-weight: bold;`,
};

export async function sendInquiryNotification(inquiry: Inquiry) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://angelmetalalloys.com';
  const adminLink = `${siteUrl}/admin/inquiries/${inquiry.id}`;
  const timestamp = new Date(inquiry.created_at || Date.now()).toLocaleString();
  
  const subject = `🔔 New Inquiry #${inquiry.id.substring(0,6).toUpperCase()} — ${inquiry.product_category} from ${inquiry.company_name || inquiry.full_name}, ${inquiry.country}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="${BASE_STYLES.body}">
        <div style="${BASE_STYLES.container}">
          <!-- Header -->
          <div style="${BASE_STYLES.header}">
            <img src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" alt="Angel Metal & Alloys" style="height: 48px; width: auto; margin-bottom: 15px;" />
          </div>
          
          <!-- Content -->
          <div style="${BASE_STYLES.content}">
            <div style="${BASE_STYLES.alertBox}">
              <h3 style="margin: 0 0 5px 0; color: ${BRAND_COLORS.navy};">New Inquiry Received</h3>
              <p style="margin: 0; color: #64748b; font-size: 13px;">Submitted on: ${timestamp}</p>
            </div>

            <table style="${BASE_STYLES.table}">
              <tr>
                <th style="${BASE_STYLES.th}" colspan="2">Contact Details</th>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}; width: 30%;"><strong>Name</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.full_name}</td>
              </tr>
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}"><strong>Company</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.company_name || 'N/A'}</td>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}"><strong>Mobile</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.mobile}</td>
              </tr>
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}"><strong>Email</strong></td>
                <td style="${BASE_STYLES.td}"><a href="mailto:${inquiry.email}" style="${BASE_STYLES.link}">${inquiry.email}</a></td>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}"><strong>Location</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.country} ${inquiry.city ? `(${inquiry.city})` : ''}</td>
              </tr>
            </table>

            <table style="${BASE_STYLES.table}">
              <tr>
                <th style="${BASE_STYLES.th}" colspan="2">Product Requirements</th>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}; width: 30%;"><strong>Product</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.product_category} ${inquiry.product_subcategory ? ` - ${inquiry.product_subcategory}` : ''}</td>
              </tr>
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}"><strong>Grade</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.material_grade || 'N/A'}</td>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}"><strong>Size/Class</strong></td>
                <td style="${BASE_STYLES.td}">${[inquiry.size_nb, inquiry.pressure_class].filter(Boolean).join(' / ') || 'N/A'}</td>
              </tr>
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}"><strong>Quantity</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.quantity || 'N/A'}</td>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}"><strong>Delivery</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.delivery_date || 'N/A'}</td>
              </tr>
              ${inquiry.notes ? `
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}" colspan="2">
                  <strong style="display:block; margin-bottom:8px;">Notes / Specification:</strong>
                  <div style="background:#ffffff; padding:10px; border:1px solid ${BRAND_COLORS.border}; border-radius:4px; white-space:pre-wrap;">${inquiry.notes}</div>
                </td>
              </tr>` : ''}
            </table>

            <table style="${BASE_STYLES.table}">
              <tr>
                <th style="${BASE_STYLES.th}" colspan="2">Lead Data</th>
              </tr>
              <tr>
                <td style="${BASE_STYLES.td}; width: 30%;"><strong>Source</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.source || 'Website'} ${inquiry.utm_campaign ? `(${inquiry.utm_campaign})` : ''}</td>
              </tr>
              <tr style="${BASE_STYLES.tdAlt}">
                <td style="${BASE_STYLES.td}"><strong>Is Export</strong></td>
                <td style="${BASE_STYLES.td}">${inquiry.is_export ? '✅ Yes' : '❌ No'}</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${adminLink}" style="${BASE_STYLES.button}">View in Admin Dashboard</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="${BASE_STYLES.footer}">
            <p style="${BASE_STYLES.footerText}">Angel Metal & Alloys Admin System<br/>This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Angel Metal Admin <admin@angelmetalalloys.com>', // Assuming verified domain
      to: process.env.ADMIN_EMAIL || 'angelmetalalloys@gmail.com',
      subject: subject,
      html: html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending inquiry notification:', error);
    return { success: false, error };
  }
}

export async function sendAutoReply(inquiry: Inquiry) {
  const subject = "Thank you for your inquiry — Angel Metal & Alloys";

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="${BASE_STYLES.body}">
        <div style="${BASE_STYLES.container}">
          <!-- Header -->
          <div style="${BASE_STYLES.header}">
            <img src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" alt="Angel Metal & Alloys" style="height: 48px; width: auto; margin-bottom: 15px;" />
          </div>
          
          <!-- Content -->
          <div style="${BASE_STYLES.content}">
            <p style="font-size: 16px; color: ${BRAND_COLORS.darkGray}; margin-top: 0;">Dear ${inquiry.full_name},</p>
            
            <p style="font-size: 15px; color: ${BRAND_COLORS.darkGray}; line-height: 1.6;">
              Thank you for contacting Angel Metal & Alloys. We have received your inquiry regarding <strong>${inquiry.product_category}</strong> and our sales team is currently reviewing your requirements.
            </p>
            
            <div style="${BASE_STYLES.alertBox}; background-color: #f0f9ff; border-left-color: #0284c7;">
              <p style="margin: 0; color: #0369a1; font-size: 14px; font-weight: bold;">
                ⏱️ We will respond to your inquiry within 24 business hours.
              </p>
            </div>

            <h3 style="color: ${BRAND_COLORS.navy}; font-size: 16px; margin-top: 30px; border-bottom: 2px solid ${BRAND_COLORS.border}; padding-bottom: 8px;">Inquiry Summary</h3>
            <ul style="color: ${BRAND_COLORS.darkGray}; font-size: 14px; line-height: 1.8; padding-left: 20px;">
              <li><strong>Product:</strong> ${inquiry.product_category}</li>
              ${inquiry.quantity ? `<li><strong>Quantity:</strong> ${inquiry.quantity}</li>` : ''}
              ${inquiry.material_grade ? `<li><strong>Grade:</strong> ${inquiry.material_grade}</li>` : ''}
              <li><strong>Destination:</strong> ${inquiry.country}</li>
            </ul>

            <div style="background-color: ${BRAND_COLORS.navy}; color: white; padding: 20px; border-radius: 8px; margin-top: 35px; text-align: center;">
              <p style="margin-top: 0; font-size: 15px;">For a faster response or urgent requirements:</p>
              <a href="https://wa.me/919974334455" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 15px; margin-top: 10px;">
                💬 WhatsApp Us at +91 9974334455
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="${BASE_STYLES.footer}">
            <p style="${BASE_STYLES.footerText}; font-weight: bold; color: ${BRAND_COLORS.navy}; margin-bottom: 5px;">Angel Metal & Alloys</p>
            <p style="${BASE_STYLES.footerText}; margin-bottom: 5px;">Manufacturer & Exporter of Stainless Steel Pipe Fittings & Flanges</p>
            <p style="${BASE_STYLES.footerText}; margin-bottom: 10px;">B-917 Sun West Bank, Opp Rajasthan Hospital, Ahmedabad – 380013, Gujarat, India</p>
            <p style="${BASE_STYLES.footerText}; font-size: 11px;">GST: 24ESRPM8437G1Z6 | <a href="https://angelmetalalloys.com" style="color: ${BRAND_COLORS.gold};">www.angelmetalalloys.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Angel Metal & Alloys <sales@angelmetalalloys.com>', // Verified domain address
      to: inquiry.email,
      subject: subject,
      html: html,
      replyTo: 'angelmetalalloys@gmail.com',
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    return { success: false, error };
  }
}
