import Link from "next/link";
import {
  Phone, Mail, MapPin, ArrowRight, Globe, Shield, Clock, Award
} from "lucide-react";

const productLinks = [
  { label: "Butt Weld Fittings", href: "/products/butt-weld-fittings" },
  { label: "Flanges", href: "/products/flanges" },
  { label: "Forged Fittings", href: "/products/forged-fittings" },
  { label: "Pipe Nipples", href: "/products/pipe-nipples" },
  { label: "Stub Ends", href: "/products/stub-ends" },
  { label: "Olets / Branch Connections", href: "/products/olets" },
];

const industryLinks = [
  { label: "Oil & Gas", href: "/industries#oil-gas" },
  { label: "Petrochemical", href: "/industries#petrochemical" },
  { label: "Water Treatment", href: "/industries#water-treatment" },
  { label: "Power Generation", href: "/industries#power-generation" },
  { label: "Pharmaceutical", href: "/industries#pharmaceutical" },
  { label: "Shipbuilding", href: "/industries#shipbuilding" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Quality Policy", href: "/quality" },
  { label: "Blog / Resources", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request a Quote", href: "/request-quote" },
  { label: "Admin Portal", href: "/admin/login" },
];

const trustItems = [
  { icon: Shield, label: "ISO 9001 Certified" },
  { icon: Globe, label: "30+ Countries" },
  { icon: Clock, label: "Est. 2007" },
  { icon: Award, label: "15-20 MT/Month" },
];

export default function Footer() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Angel Metal & Alloys",
    image: "https://www.angelmetalalloys.com/og-image.jpg",
    "@id": "https://www.angelmetalalloys.com",
    url: "https://www.angelmetalalloys.com",
    telephone: "+91-9974334455",
    email: "angelmetalalloys@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-917 Sun West Bank, Opp Rajasthan Hospital",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380013",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.0483,
      longitude: 72.5937
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:30"
    }
  };

  return (
    <footer className="bg-navy text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* Trust Bar */}
      <div className="border-b border-white/10 bg-steel/30">
        <div className="section-container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <span className="text-sm font-semibold text-silver">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6 inline-block">
              <img 
                src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" 
                alt="Angel Metal & Alloys Logo" 
                className="h-20 w-auto object-contain bg-white/95 p-2 rounded-xl shadow-sm"
              />
            </div>
            <p className="text-silver text-sm leading-relaxed mb-6">
              Manufacturer & exporter of premium Stainless Steel pipe fittings, flanges & forged components. 
              Serving 30+ countries with ISO-certified quality since 2007.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-silver">
                <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white text-xs mb-0.5">Office</div>
                  B-917 Sun West Bank, Opp Rajasthan Hospital,<br />
                  Ahmedabad – 380013, Gujarat, India
                </div>
              </div>
              <div className="flex items-start gap-3 text-silver">
                <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white text-xs mb-0.5">Factory</div>
                  B-11/B-12 Sumel 6 Industrial Park,<br />
                  Near Hanumanpura BRTS, Ahmedabad
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Products
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-silver text-sm hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="text-gold/40 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Industries
            </h3>
            <ul className="space-y-2.5">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-silver text-sm hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="text-gold/40 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gold inline-block" />
              Contact
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+919974334455" className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors">
                  <Phone size={14} className="text-gold flex-shrink-0" />
                  +91 9974334455
                </a>
              </li>
              <li>
                <a href="tel:+919825003949" className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors">
                  <Phone size={14} className="text-gold flex-shrink-0" />
                  +91 9825003949
                </a>
              </li>
              <li>
                <a href="tel:+919712012040" className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors">
                  <Phone size={14} className="text-gold flex-shrink-0" />
                  +91 9712012040
                </a>
              </li>
              <li>
                <a href="mailto:angelmetalalloys@gmail.com" className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors break-all">
                  <Mail size={14} className="text-gold flex-shrink-0" />
                  angelmetalalloys@gmail.com
                </a>
              </li>
            </ul>
            <div className="space-y-2.5">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="flex items-center gap-2 text-silver text-sm hover:text-gold transition-colors group">
                  <ArrowRight size={12} className="text-gold/40 group-hover:text-gold transition-colors" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-silver/60">
          <div>
            © {new Date().getFullYear()} Angel Metal & Alloys. All rights reserved. | 
            GST: <span className="text-silver/80">24ESRPM8437G1Z6</span> | 
            Proprietor: <span className="text-silver/80">Mahendra Mehta</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with ♥ in</span>
            <span className="text-[#FF9933] font-semibold">India</span>
            <span>🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
