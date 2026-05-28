import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Factory, Globe, Users, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Angel Metal & Alloys | SS/Carbon Steel Fittings Manufacturer Since 2007",
  description:
    "Angel Metal & Alloys, established 2007, is an Ahmedabad-based manufacturer and exporter of Stainless Steel/Carbon Steel pipe fittings, flanges, and forged components. 15-20 MT/month capacity, 30+ countries.",
  alternates: { canonical: "/about" },
};

export const revalidate = 86400; // Static enough for daily cache

const timeline = [
  { year: "2007", title: "Foundation", desc: "Angel Metal & Alloys was established by Mahendra Mehta in Ahmedabad with a vision to manufacture world-class SS/Carbon Steel pipe fittings." },
  { year: "2010", title: "Factory Expansion", desc: "Moved to Sumel 6 Industrial Park with expanded CNC machining capacity and quality control laboratory." },
  { year: "2013", title: "Export Launch", desc: "Started exporting to UAE, Saudi Arabia, and Singapore. Obtained ISO 9001 quality certification." },
  { year: "2016", title: "10+ Countries", desc: "Extended export reach to Europe (UK, Germany, Netherlands) and Southeast Asia." },
  { year: "2019", title: "Capacity Scale-up", desc: "Monthly production capacity reached 15-20 MT with addition of precision CNC machines." },
  { year: "2024", title: "30+ Countries", desc: "Now exporting to 30+ countries across 6 continents with 500+ product SKUs." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779779417/ChatGPT_Image_May_26_2026_12_39_40_PM_d4rlf0.png"
            alt="About Us Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
        </div>

        <div className="section-container relative z-10">
          <div className="section-tag text-gold/80">
            <span className="w-8 h-0.5 bg-gold" />
            About Us
          </div>
          <h1 className="section-heading-white mb-4">
            Manufacturer with{" "}
            <span className="text-gradient-gold">17 Years</span> of Excellence
          </h1>
          <p className="text-silver/80 text-lg max-w-2xl leading-relaxed">
            Since 2007, Angel Metal & Alloys has been manufacturing and exporting 
            Stainless Steel/Carbon Steel pipe fittings, flanges, and forged components from Ahmedabad, 
            India — to buyers in 30+ countries worldwide.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <div className="bg-gold py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "2007", label: "Year Established" },
              { value: "30+", label: "Countries Exported" },
              { value: "15–20 MT", label: "Monthly Capacity" },
              { value: "500+", label: "Product SKUs" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-display font-black text-navy mb-1">{s.value}</div>
                <div className="text-navy/70 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Story */}
            <div>
              <div className="section-tag">
                <span className="w-8 h-0.5 bg-gold" />
                Our Story
              </div>
              <h2 className="section-heading mb-6">
                From Ahmedabad to{" "}
                <span className="text-gradient-gold">the World</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2007 by <strong className="text-navy">Mahendra Mehta</strong>, 
                  Angel Metal & Alloys started as a small manufacturing unit in Ahmedabad, 
                  Gujarat. With an unwavering focus on quality and customer satisfaction, 
                  the company grew steadily to become a trusted exporter.
                </p>
                <p>
                  Operating from our state-of-the-art factory at <strong className="text-navy">
                  B-11/B-12 Sumel 6 Industrial Park</strong>, we manufacture a comprehensive 
                  range of SS/Carbon Steel pipe fittings and flanges conforming to international standards 
                  such as ASME B16.9, ASTM A403, ASME B16.5, ASTM A182, and EN 10253.
                </p>
                <p>
                  Today, Angel Metal & Alloys has a monthly production capacity of 
                  <strong className="text-navy"> 15–20 metric tonnes</strong>, an inventory 
                  of 500+ SKUs, and exports to buyers in the USA, UK, UAE, Singapore, 
                  Australia, and 25+ other countries.
                </p>
              </div>
            </div>

            {/* Proprietor Card */}
            <div className="bg-brand-bg rounded-3xl p-8">
              <div className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center mb-6">
                <Users size={36} className="text-gold" />
              </div>
              <div className="font-display font-bold text-navy text-2xl mb-1">Mahendra Mehta</div>
              <div className="text-gold font-semibold text-sm mb-4">Proprietor, Angel Metal & Alloys</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                With over 17 years in the stainless steel/carbon steel industry, Mahendra Mehta has built 
                Angel Metal & Alloys from the ground up — combining deep metallurgical knowledge 
                with a commitment to on-time delivery and international quality standards.
              </p>
              <div className="space-y-2">
                {[
                  "17+ years industry experience",
                  "Expert in SS/Carbon Steel grades & standards",
                  "Fluent: English, Hindi, Gujarati",
                  "Direct client communication",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manufacturing */}
          <div className="grid lg:grid-cols-3 gap-6 mb-24">
            {[
              { icon: Factory, title: "Manufacturing Facility", desc: "B-11/B-12 Sumel 6 Industrial Park, Near Hanumanpura BRTS, Ahmedabad. Modern CNC machinery, in-house testing lab, quality control floor." },
              { icon: Globe, title: "Export Infrastructure", desc: "Direct export to 30+ countries via sea freight (Mundra/JNPT port), air freight, and DDP/DAP delivery. All major trade terms accepted." },
              { icon: Award, title: "Quality Management", desc: "ISO 9001:2015 certified quality system. Every batch with Mill Test Certificates (MTC). Third-party inspection by SGS, BV, DNV available." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-brand-bg rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-4">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-display font-bold text-navy text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div>
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Our Journey
            </div>
            <h2 className="section-heading mb-12">
              17 Years of{" "}
              <span className="text-gradient-gold">Growth</span>
            </h2>
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-navy to-gold/20 hidden sm:block" />
              <div className="space-y-8">
                {timeline.map((item) => (
                  <div key={item.year} className="flex gap-6 items-start sm:pl-24 relative">
                    <div className="hidden sm:flex absolute left-10 w-12 h-12 rounded-full bg-gold items-center justify-center flex-shrink-0 -translate-x-1/2">
                      <span className="text-navy font-display font-black text-xs">{item.year}</span>
                    </div>
                    <div className="sm:hidden flex-shrink-0 w-14 h-14 rounded-2xl bg-gold flex items-center justify-center">
                      <span className="text-navy font-display font-black text-xs">{item.year}</span>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 hover:border-gold/30 hover:shadow-sm transition-all">
                      <h4 className="font-display font-bold text-navy mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-navy rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 hero-grid opacity-20" />
            <div className="relative">
              <h2 className="section-heading-white mb-4">Ready to Partner with Us?</h2>
              <p className="text-silver/70 mb-8 max-w-xl mx-auto">
                Join 30+ countries that trust Angel Metal & Alloys for their SS/Carbon Steel pipe fittings and flanges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-quote" className="btn-gold">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm border-2 border-white/20 hover:border-gold/60 hover:text-gold transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
