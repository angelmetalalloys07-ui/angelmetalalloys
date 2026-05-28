import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { INDUSTRIES } from "@/types";
import { Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries Served | SS/Carbon Steel Pipe Fittings for Oil & Gas, Petrochemical, Power & More",
  description:
    "Angel Metal & Alloys supplies SS/Carbon Steel pipe fittings and flanges to Oil & Gas, Petrochemical, Water Treatment, Power Generation, Pharmaceutical, Dairy Processing, and Food & Beverage industries.",
  alternates: { canonical: "/industries" },
};

const iconMap: Record<string, React.ElementType> = {
  Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom,
};

const industryImages: Record<string, string> = {
  "oil-gas": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700205/refineries-industry_dzbvgq.webp",
  "petrochemical": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700205/petrochemical_en_co_eugfo3.jpg",
  "water-treatment": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700204/pengolahan-air-limbah_wo4p79.webp",
  "power-generation": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700204/IMG_7126_01_39f416721d_bpuejt.jpg",
  "pharmaceutical": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700204/pharmaceutical-reactor_jacpvn.jpg",
  "dairy-processing": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700204/chemical-process-2_0_ir2svs.jpg",
  "food-beverage": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779700205/dw1_91_sisk95.webp",
  "chemical": "https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779776144/869302164-petrochemical-plant-16x9_hczqao.jpg",
};

const industryDetails: Record<string, { products: string[]; grades: string[]; standards: string[] }> = {
  "oil-gas": {
    products: ["Weld Neck Flanges", "Butt Weld Elbows", "Tees", "Reducers", "Blind Flanges", "Olets"],
    grades: ["SS/Carbon Steel 316L", "Duplex 2205", "Super Duplex 2507", "SS/Carbon Steel 321", "Inconel 625"],
    standards: ["ASME B16.9", "ASME B16.5", "ASTM A403", "ASTM A182", "NACE MR0175"],
  },
  "petrochemical": {
    products: ["Equal Tees", "Reducers", "Slip-On Flanges", "Weld Neck Flanges", "Stub Ends"],
    grades: ["SS/Carbon Steel 316L", "SS/Carbon Steel 904L", "Duplex 2205", "SS/Carbon Steel 317L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253", "ASME B16.5"],
  },
  "water-treatment": {
    products: ["Slip-On Flanges", "Butt Weld Fittings", "Socket Weld Fittings", "Pipe Nipples"],
    grades: ["SS/Carbon Steel 316L", "Duplex 2205", "SS/Carbon Steel 304L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253"],
  },
  "power-generation": {
    products: ["Weld Neck Flanges", "Elbows", "Tees", "Reducers"],
    grades: ["SS/Carbon Steel 321", "SS/Carbon Steel 347", "SS/Carbon Steel 316H", "Duplex 2205"],
    standards: ["ASME B16.5", "ASTM A182 F321", "IBR"],
  },
  "pharmaceutical": {
    products: ["Butt Weld Fittings", "Sanitary Flanges", "Pipe Nipples"],
    grades: ["SS/Carbon Steel 316L (Ra < 0.8µm)", "SS/Carbon Steel 304L"],
    standards: ["ASME BPE", "3-A Sanitary", "FDA Compliant"],
  },
  "dairy-processing": {
    products: ["Sanitary Fittings", "Tri-Clamp Fittings", "Dairy Valves", "Pipe Nipples"],
    grades: ["SS/Carbon Steel 304", "SS/Carbon Steel 316L"],
    standards: ["3-A Sanitary", "SMS", "DIN 11850", "IDF"],
  },
  "food-beverage": {
    products: ["Sanitary Fittings", "Butt Weld Elbows", "Reducers", "Pipe Nipples"],
    grades: ["SS/Carbon Steel 316L", "SS/Carbon Steel 304L"],
    standards: ["3-A Sanitary", "EHEDG", "FDA 21 CFR"],
  },
  "chemical": {
    products: ["All Fitting Types", "All Flange Types", "Forged Fittings"],
    grades: ["SS/Carbon Steel 904L", "SS/Carbon Steel 316L", "Duplex 2205", "Super Duplex 2507", "SS/Carbon Steel 317L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253"],
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779779092/ChatGPT_Image_May_26_2026_12_34_43_PM_fkfqdk.png"
            alt="Industries Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
        </div>

        <div className="section-container relative z-10">
          <h1 className="section-heading-white mb-4">
            Industries We <span className="text-gradient-gold">Serve</span>
          </h1>
          <p className="text-silver/80 text-lg max-w-2xl leading-relaxed">
            Angel Metal & Alloys supplies critical SS/Carbon Steel pipe fittings, flanges, and forged 
            components to the world&apos;s most demanding industrial sectors.
          </p>
        </div>
      </section>

      <div className="py-20 bg-brand-bg">
        <div className="section-container space-y-16">
          {INDUSTRIES.map((industry, idx) => {
            const Icon = iconMap[industry.icon] ?? Flame;
            const details = industryDetails[industry.slug];
            const image = industryImages[industry.slug];
            return (
              <div
                key={industry.slug}
                id={industry.slug}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Content */}
                <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${industry.color}20` }}
                  >
                    <Icon size={26} style={{ color: industry.color === "#0a1628" ? "#d4922a" : industry.color }} />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-navy mb-4">
                    SS/Carbon Steel Fittings for{" "}
                    <span className="text-gradient-gold">{industry.name}</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>

                  {details && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Products Supplied
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {details.products.map((p) => (
                            <span key={p} className="grade-badge text-xs">{p}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Recommended Grades
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {details.grades.map((g) => (
                            <span key={g} className="grade-badge text-xs">{g}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                          Standards
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {details.standards.map((s) => (
                            <span key={s} className="standard-badge text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <Link href="/request-quote" className="btn-gold mt-6 inline-flex">
                    Get Quote for {industry.name} <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Industry Image */}
                <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="rounded-3xl overflow-hidden h-80 relative shadow-xl group">
                    {image ? (
                      <Image
                        src={image}
                        alt={`SS/Carbon Steel Fittings for ${industry.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading={idx < 2 ? "eager" : "lazy"}
                      />
                    ) : (
                      <div
                        className="h-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${industry.color}15 0%, #0a1628 100%)` }}
                      >
                        <Icon size={64} style={{ color: industry.color }} />
                      </div>
                    )}
                    {/* Overlay label */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${industry.color}CC`, color: "#fff" }}
                      >
                        <Icon size={13} />
                        {industry.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
