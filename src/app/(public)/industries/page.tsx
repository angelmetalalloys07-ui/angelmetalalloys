import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/types";
import { Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries Served | SS Pipe Fittings for Oil & Gas, Petrochemical, Power & More",
  description:
    "Angel Metal & Alloys supplies SS pipe fittings and flanges to Oil & Gas, Petrochemical, Water Treatment, Power Generation, Pharmaceutical, Shipbuilding, and Food & Beverage industries.",
  alternates: { canonical: "/industries" },
};

const iconMap: Record<string, React.ElementType> = {
  Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom,
};

const industryDetails: Record<string, { products: string[]; grades: string[]; standards: string[] }> = {
  "oil-gas": {
    products: ["Weld Neck Flanges", "Butt Weld Elbows", "Tees", "Reducers", "Blind Flanges", "Olets"],
    grades: ["SS 316L", "Duplex 2205", "Super Duplex 2507", "SS 321", "Inconel 625"],
    standards: ["ASME B16.9", "ASME B16.5", "ASTM A403", "ASTM A182", "NACE MR0175"],
  },
  "petrochemical": {
    products: ["Equal Tees", "Reducers", "Slip-On Flanges", "Weld Neck Flanges", "Stub Ends"],
    grades: ["SS 316L", "SS 904L", "Duplex 2205", "SS 317L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253", "ASME B16.5"],
  },
  "water-treatment": {
    products: ["Slip-On Flanges", "Butt Weld Fittings", "Socket Weld Fittings", "Pipe Nipples"],
    grades: ["SS 316L", "Duplex 2205", "SS 304L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253"],
  },
  "power-generation": {
    products: ["Weld Neck Flanges", "Elbows", "Tees", "Reducers"],
    grades: ["SS 321", "SS 347", "SS 316H", "Duplex 2205"],
    standards: ["ASME B16.5", "ASTM A182 F321", "IBR"],
  },
  "pharmaceutical": {
    products: ["Butt Weld Fittings", "Sanitary Flanges", "Pipe Nipples"],
    grades: ["SS 316L (Ra < 0.8µm)", "SS 304L"],
    standards: ["ASME BPE", "3-A Sanitary", "FDA Compliant"],
  },
  "shipbuilding": {
    products: ["Weld Neck Flanges", "Butt Weld Fittings", "Forged Fittings"],
    grades: ["Super Duplex 2507", "Duplex 2205", "SS 316L"],
    standards: ["ASME B16.5", "DNV GL", "Lloyd's Register"],
  },
  "food-beverage": {
    products: ["Sanitary Fittings", "Butt Weld Elbows", "Reducers", "Pipe Nipples"],
    grades: ["SS 316L", "SS 304L"],
    standards: ["3-A Sanitary", "EHEDG", "FDA 21 CFR"],
  },
  "chemical": {
    products: ["All Fitting Types", "All Flange Types", "Forged Fittings"],
    grades: ["SS 904L", "SS 316L", "Duplex 2205", "Super Duplex 2507", "SS 317L"],
    standards: ["ASME B16.9", "ASTM A403", "EN 10253"],
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="section-container relative">
          <h1 className="section-heading-white mb-4">
            Industries We <span className="text-gradient-gold">Serve</span>
          </h1>
          <p className="text-silver/70 text-lg max-w-2xl leading-relaxed">
            Angel Metal & Alloys supplies critical SS pipe fittings, flanges, and forged 
            components to the world&apos;s most demanding industrial sectors.
          </p>
        </div>
      </section>

      <div className="py-20 bg-brand-bg">
        <div className="section-container space-y-16">
          {INDUSTRIES.map((industry, idx) => {
            const Icon = iconMap[industry.icon] ?? Flame;
            const details = industryDetails[industry.slug];
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
                    SS Fittings for{" "}
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

                {/* Visual Card */}
                <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div
                    className="rounded-3xl p-8 h-72 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${industry.color}15 0%, #0a1628 100%)`,
                      border: `1px solid ${industry.color}20`,
                    }}
                  >
                    <div className="absolute inset-0 hero-grid opacity-20" />
                    <div className="relative text-center">
                      <div
                        className="w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${industry.color}25` }}
                      >
                        <Icon size={48} style={{ color: industry.color === "#0a1628" ? "#d4922a" : industry.color }} />
                      </div>
                      <div className="text-white font-display font-bold text-xl">{industry.name}</div>
                      <div className="text-silver/50 text-sm mt-1">Industry Solutions</div>
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
