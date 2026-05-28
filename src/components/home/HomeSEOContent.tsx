"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomeSEOContent() {
  const faqs = [
    {
      question: "What grades of stainless steel/carbon steel do you manufacture?",
      answer: "We manufacture fittings and flanges in a wide range of grades including SS/Carbon Steel 304/304L, 316/316L, 321, 347, 904L, Duplex 2205, and Super Duplex 2507, as well as Carbon Steel and Alloy Steel."
    },
    {
      question: "Do you provide Mill Test Certificates (MTC)?",
      answer: "Yes, every dispatch is accompanied by an EN 10204 3.1 Mill Test Certificate ensuring 100% material traceability and compliance."
    },
    {
      question: "What is your manufacturing capacity?",
      answer: "Our current capacity is 15-20 MT per month, allowing us to handle both bulk export orders and custom fast-track requirements."
    },
    {
      question: "Which countries do you export to?",
      answer: "We are a major exporter to over 30 countries including the USA, UK, UAE, Saudi Arabia, Germany, Singapore, and Australia."
    },
    {
      question: "Can you manufacture custom or non-standard fittings?",
      answer: "Absolutely. With our in-house CNC and forging facilities, we can manufacture fittings and flanges to custom drawings and OEM specifications."
    },
    {
      question: "Do you accept Third-Party Inspections (TPI)?",
      answer: "Yes, we regularly work with international inspection agencies like SGS, TUV, DNV, and LRIS based on client requirements."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* SEO Article */}
          <div>
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Company Profile
            </div>
            <h2 className="section-heading mb-6">
              Leading <span className="text-gradient-gold">Stainless Steel/Carbon Steel Pipe Fittings</span> Manufacturer in India
            </h2>
            <div className="prose prose-gray text-gray-600 text-sm leading-relaxed">
              <p>
                Established in 2007, <strong>Angel Metal & Alloys</strong> has emerged as a globally recognized manufacturer, supplier, and exporter of premium quality <strong>Stainless Steel/Carbon Steel Pipe Fittings</strong>, <strong>Flanges</strong>, and Forged Components based in Ahmedabad, Gujarat, India.
              </p>
              <p>
                We specialize in producing high-integrity <strong>butt weld fittings</strong> (elbows, tees, reducers), socket weld fittings, and threaded components conforming to stringent international standards like ASME B16.9, ASTM A403, and ASME B16.11. Our <strong>SS/Carbon Steel flanges</strong> (Weld Neck, Slip-On, Blind) are precision-engineered to ASME B16.5 and EN 1092-1 specifications.
              </p>
              <p>
                Our state-of-the-art manufacturing facility in Ahmedabad ensures that every product undergoes rigorous quality testing, including 100% Positive Material Identification (PMI) and hydrostatic testing. We cater to diverse industries including Oil & Gas, Petrochemicals, Pharmaceuticals, and Power Generation, offering materials ranging from SS/Carbon Steel 304/316L to exotic alloys like Duplex 2205 and Inconel.
              </p>
              <p>
                With a robust export network spanning over 30 countries, we guarantee competitive pricing, timely worldwide delivery, and absolute compliance with ISO 9001:2015 quality standards. Whether you need standard ASME fittings or custom OEM components, Angel Metal & Alloys is your trusted partner.
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h3 className="font-display font-bold text-navy text-2xl mb-8">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-xl transition-colors ${openIndex === idx ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <span className="font-semibold text-navy text-sm pr-4">{faq.question}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-gold transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
