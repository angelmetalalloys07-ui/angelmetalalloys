import type { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle2, Award, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Policy & Certifications | Angel Metal & Alloys",
  description:
    "Angel Metal & Alloys maintains ISO 9001:2015 quality standards. Learn about our testing methods, certifications, MTC documentation, and third-party inspection capabilities.",
  alternates: { canonical: "/quality" },
};

const certifications = [
  { code: "ISO", title: "ISO 9001:2015", body: "Bureau Veritas", desc: "Quality Management System certification covering design, manufacture, and supply of SS pipe fittings and flanges." },
  { code: "ASME", title: "ASME B16.9 / B16.5", body: "ASME International", desc: "All butt weld fittings and flanges manufactured and tested per ASME standards." },
  { code: "ASTM", title: "ASTM A403 / A182", body: "ASTM International", desc: "Material sourced from ASTM-certified mills. Chemical & mechanical test reports included." },
  { code: "EN", title: "EN 10253 / EN 1092", body: "European Committee", desc: "European standard compliance for export to EU countries." },
  { code: "PED", title: "PED 2014/68/EU", body: "European Union", desc: "Pressure Equipment Directive compliance for export to European markets." },
  { code: "IBR", title: "IBR Approved", body: "Government of India", desc: "Indian Boiler Regulations compliance for power plant applications." },
];

const testingMethods = [
  { name: "Hydrostatic Testing", desc: "Pressure tested at 1.5x design pressure to verify integrity." },
  { name: "PMI (Positive Material Identification)", desc: "XRF analysis to verify chemical composition of each heat." },
  { name: "Dimensional Inspection", desc: "Full dimensional check per ASME/ASTM/EN standards using calibrated instruments." },
  { name: "Visual Inspection", desc: "Surface finish, defects, and marking verification on every piece." },
  { name: "Hardness Testing", desc: "Brinell/Rockwell hardness measurement per material specification." },
  { name: "Radiographic Testing (RT)", desc: "X-ray examination for internal defects on request." },
  { name: "Dye Penetrant Testing (PT)", desc: "Surface crack detection using liquid penetrant method." },
  { name: "Ultrasonic Testing (UT)", desc: "Internal flaw detection using ultrasonic waves on request." },
];

const packingStandards = [
  "Polythene bags with silica gel desiccant for moisture protection",
  "Wooden/plywood boxes with foam padding for international shipments",
  "Fumigated packing for phytosanitary compliance",
  "End caps on pipes and nipples",
  "Heat number, size, grade, and standard stencilled on products",
  "Bundles secured with steel strapping",
  "Packing list, MTC, invoice, and COO included",
];

export default function QualityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="section-container relative">
          <h1 className="section-heading-white mb-4">
            Quality <span className="text-gradient-gold">Assurance</span>
          </h1>
          <p className="text-silver/70 text-lg max-w-2xl">
            Every product from Angel Metal & Alloys undergoes rigorous quality control. 
            Our ISO 9001:2015 certified processes ensure consistent excellence across all 500+ SKUs.
          </p>
        </div>
      </section>

      <div className="py-20 bg-brand-bg">
        <div className="section-container">
          {/* Certifications */}
          <div className="mb-20">
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Certifications
            </div>
            <h2 className="section-heading mb-10">International Quality Standards</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.code}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gold/30 hover:shadow-card-hover transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-4 group-hover:bg-gold transition-colors">
                    <Shield size={20} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div className="font-display font-bold text-navy text-lg mb-0.5 group-hover:text-gold transition-colors">
                    {cert.title}
                  </div>
                  <div className="text-gold/70 text-xs font-semibold mb-3">{cert.body}</div>
                  <p className="text-gray-500 text-sm leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Methods */}
          <div className="mb-20 bg-white rounded-3xl p-8 lg:p-12 border border-gray-100">
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Testing & Inspection
            </div>
            <h2 className="section-heading mb-8">Testing Procedures</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {testingMethods.map((method) => (
                <div key={method.name} className="flex gap-4 p-4 rounded-xl hover:bg-brand-bg transition-colors">
                  <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-navy text-sm mb-1">{method.name}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{method.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="bg-navy rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 hero-grid opacity-20" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4">
                  <FileText size={22} className="text-gold" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-4">
                  Mill Test Certificates (MTC)
                </h3>
                <p className="text-silver/70 text-sm leading-relaxed mb-4">
                  Every shipment includes MTC / EN 10204 3.1 test certificates from the original mill, 
                  certifying chemical composition, mechanical properties, and heat/lot number traceability.
                </p>
                <div className="space-y-2">
                  {["Chemical composition analysis", "Tensile & yield strength values", "Elongation & hardness data", "Heat/lot number traceability"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-silver/80 text-xs">
                      <CheckCircle2 size={12} className="text-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Award size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-bold text-navy text-xl mb-4">
                Third-Party Inspection
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                We support third-party inspection by internationally recognized agencies on buyer&apos;s request. 
                Our facility is open for pre-shipment inspection.
              </p>
              <div className="flex flex-wrap gap-2">
                {["SGS", "Bureau Veritas (BV)", "DNV", "Lloyd&apos;s Register", "TÜV", "Intertek", "RINA", "EIL"].map((agency) => (
                  <span key={agency} className="standard-badge text-xs">{agency}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Packing */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8">
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Packing & Marking
            </div>
            <h2 className="section-heading mb-6">Export Packing Standards</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {packingStandards.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 size={15} className="text-gold flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/request-quote" className="btn-gold inline-flex">
              Request Quote with MTC <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
