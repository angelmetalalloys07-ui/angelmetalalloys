import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.angelmetalalloys.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Angel Metal & Alloys | SS/Carbon Steel Pipe Fittings & Flanges Manufacturer, Ahmedabad",
    template: "%s | Angel Metal & Alloys",
  },
  description:
    "Angel Metal & Alloys — leading manufacturer & exporter of Stainless Steel/Carbon Steel pipe fittings, flanges & forged components in Ahmedabad, Gujarat. ISO certified. 30+ countries served since 2007.",
  keywords: [
    "SS/Carbon Steel flanges manufacturer Ahmedabad",
    "stainless steel/carbon steel pipe fittings Gujarat",
    "butt weld fittings exporter India",
    "SS/Carbon Steel 316L pipe fittings manufacturer",
    "ASME B16.9 fittings India",
    "forged fittings exporter India",
    "pipe fittings manufacturer Gujarat",
    "Angel Metal Alloys Ahmedabad",
    "stainless steel/carbon steel flanges supplier",
    "duplex pipe fittings manufacturer India",
  ],
  authors: [{ name: "Angel Metal & Alloys", url: siteUrl }],
  creator: "Angel Metal & Alloys",
  publisher: "Angel Metal & Alloys",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Angel Metal & Alloys",
    title: "Angel Metal & Alloys | SS/Carbon Steel Pipe Fittings & Flanges Manufacturer, Ahmedabad",
    description:
      "Leading manufacturer & exporter of Stainless Steel/Carbon Steel pipe fittings, flanges & forged components. ISO certified. Export to 30+ countries.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Angel Metal & Alloys — SS/Carbon Steel Pipe Fittings Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Metal & Alloys | SS/Carbon Steel Pipe Fittings Manufacturer",
    description: "ISO certified SS/Carbon Steel pipe fittings & flanges manufacturer in Ahmedabad. Export to 30+ countries.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// LocalBusiness JSON-LD
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Angel Metal & Alloys",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "Manufacturer & exporter of Stainless Steel/Carbon Steel pipe fittings, flanges and forged components based in Ahmedabad, Gujarat, India.",
  foundingDate: "2007",
  telephone: "+91-9974334455",
  email: "angelmetalalloys@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-820 Sun West Bank, Opp Rajasthan Hospital",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380013",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0225,
    longitude: 72.5714
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9974334455",
      contactType: "sales",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    {
      "@type": "ContactPoint",
      email: "angelmetalalloys@gmail.com",
      contactType: "customer service",
    },
  ],
  sameAs: [],
  areaServed: "Worldwide",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <head>
        {/* Google Tag Manager Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a1628" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased font-sans">
        {/* GTM noscript Placeholder */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
