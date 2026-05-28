import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Angel Metal & Alloys | Get Quote | Ahmedabad +91 9974334455",
  description: "Get in touch with Angel Metal & Alloys. Request a quote or reach out for technical inquiries regarding our stainless steel/carbon steel flanges and pipe fittings.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
