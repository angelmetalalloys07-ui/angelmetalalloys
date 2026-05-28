import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, FileText } from "lucide-react";
import WeightCalculator from "@/components/materials/WeightCalculator";

export const metadata: Metadata = {
  title: "Stainless Steel/Carbon Steel Materials & Weight Calculator | Angel Metal & Alloys",
  description:
    "Explore AISI/ASTM chemical compositions for Stainless Steel/Carbon Steel grades and use our interactive weight calculator for SS/Carbon Steel pipes, sheets, round bars, and flat bars.",
  alternates: { canonical: "/materials" },
};

export default function MaterialsPage() {
  const ssGrades = [
    { grade: "304 / 304L", c: "0.08 max", mn: "2.00", cr: "18.0 - 20.0", ni: "8.0 - 10.5", mo: "-" },
    { grade: "316 / 316L", c: "0.08 max", mn: "2.00", cr: "16.0 - 18.0", ni: "10.0 - 14.0", mo: "2.0 - 3.0" },
    { grade: "321", c: "0.08 max", mn: "2.00", cr: "17.0 - 19.0", ni: "9.0 - 12.0", mo: "-", other: "Ti: 5x(C) min" },
    { grade: "347", c: "0.08 max", mn: "2.00", cr: "17.0 - 19.0", ni: "9.0 - 13.0", mo: "-", other: "Cb+Ta: 10x(C) min" },
    { grade: "Duplex 2205", c: "0.03 max", mn: "2.00", cr: "22.0 - 23.0", ni: "4.5 - 6.5", mo: "3.0 - 3.5", other: "N: 0.14-0.20" },
    { grade: "Super Duplex 2507", c: "0.03 max", mn: "1.20", cr: "24.0 - 26.0", ni: "6.0 - 8.0", mo: "3.0 - 5.0", other: "N: 0.24-0.32" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779778845/ChatGPT_Image_May_26_2026_12_30_25_PM_s0kxwk.png"
            alt="Materials Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
        </div>

        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-silver/60 text-xs mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-gold">Materials Reference</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="section-heading-white mb-6">
              Materials <span className="text-gradient-gold">& Specifications</span>
            </h1>
            <p className="text-silver/80 text-lg leading-relaxed">
              Comprehensive reference guide for Stainless Steel/Carbon Steel chemical compositions and an interactive weight calculator for your piping and structural requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-brand-bg min-h-screen">
        <div className="section-container space-y-20">
          
          {/* Chemical Composition Table */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="section-tag">
                  <span className="w-6 h-0.5 bg-gold" />
                  Technical Data
                </div>
                <h2 className="text-3xl font-display font-bold text-navy">
                  Chemical Composition <span className="text-gray-400 font-medium">(ASTM A182 / A403)</span>
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-navy text-white text-sm font-semibold uppercase tracking-wider text-left">
                    <tr>
                      <th className="px-6 py-4">Grade</th>
                      <th className="px-6 py-4">C (Carbon)</th>
                      <th className="px-6 py-4">Mn (Manganese)</th>
                      <th className="px-6 py-4">Cr (Chromium)</th>
                      <th className="px-6 py-4">Ni (Nickel)</th>
                      <th className="px-6 py-4">Mo (Molybdenum)</th>
                      <th className="px-6 py-4">Other Elements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {ssGrades.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-navy">{item.grade}</td>
                        <td className="px-6 py-4 text-gray-600">{item.c}</td>
                        <td className="px-6 py-4 text-gray-600">{item.mn}</td>
                        <td className="px-6 py-4 text-gray-600">{item.cr}</td>
                        <td className="px-6 py-4 text-gray-600">{item.ni}</td>
                        <td className="px-6 py-4 text-gray-600">{item.mo}</td>
                        <td className="px-6 py-4 text-gray-600">{item.other || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <FileText size={14} className="text-gold" />
              <span>Note: Values shown are typical limits. Please refer to standard MTC for exact heat values.</span>
            </div>
          </div>

          {/* Weight Calculator */}
          <div id="calculator">
            <div className="mb-8">
              <div className="section-tag">
                <span className="w-6 h-0.5 bg-gold" />
                Tools
              </div>
              <h2 className="text-3xl font-display font-bold text-navy">
                Metal Weight Calculator
              </h2>
              <p className="text-gray-500 mt-2">
                Use our dynamic calculator to estimate the theoretical weight of your stainless steel/carbon steel materials.
              </p>
            </div>
            
            <WeightCalculator />
          </div>

        </div>
      </section>
    </>
  );
}
