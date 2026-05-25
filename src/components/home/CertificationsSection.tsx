import { Shield, CheckCircle2 } from "lucide-react";

const certifications = [
  { code: "ISO 9001", title: "ISO 9001:2015", subtitle: "Quality Management System" },
  { code: "ASME", title: "ASME Certified", subtitle: "B16.9 · B16.5 · B16.11" },
  { code: "ASTM", title: "ASTM Compliant", subtitle: "A403 · A182 · A815" },
  { code: "PED", title: "PED Compliant", subtitle: "European Pressure Equipment" },
  { code: "EN", title: "EN Standards", subtitle: "EN 10253 · EN 1092" },
  { code: "MTC", title: "Mill Test Certificate", subtitle: "On every shipment" },
];

const testingMethods = [
  "Hydrostatic Testing",
  "PMI (Positive Material Identification)",
  "Dimensional Inspection",
  "Visual & Surface Inspection",
  "Hardness Testing",
  "Radiographic Testing (RT)",
  "Dye Penetrant Testing (PT)",
  "Magnetic Particle Testing (MT)",
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Quality Assurance
            </div>
            <h2 className="section-heading mb-6">
              Certified for{" "}
              <span className="text-gradient-gold">International Standards</span>
            </h2>
            <p className="section-desc mb-8">
              Every product from Angel Metal & Alloys is manufactured under strict quality 
              control procedures, backed by international certifications and third-party 
              inspection capabilities.
            </p>

            {/* Testing Methods */}
            <div className="space-y-2.5">
              <h4 className="font-display font-bold text-navy text-sm uppercase tracking-widest mb-4">
                Testing & Inspection Methods
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {testingMethods.map((method) => (
                  <div key={method} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={15} className="text-gold flex-shrink-0" />
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Certification Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.code}
                className="bg-brand-bg border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                  <Shield size={24} className="text-gold group-hover:text-white transition-colors" />
                </div>
                <div className="font-display font-bold text-navy text-sm mb-0.5 group-hover:text-gold transition-colors">
                  {cert.title}
                </div>
                <div className="text-gray-500 text-xs leading-tight">{cert.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
