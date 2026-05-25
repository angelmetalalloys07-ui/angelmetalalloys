import Link from "next/link";
import { INDUSTRIES } from "@/types";
import { Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Flame, FlaskConical, Droplets, Zap, Microscope, Anchor, UtensilsCrossed, Atom,
};

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-steel/20 blur-3xl" />

      <div className="relative section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag justify-center text-gold/80">
            <span className="w-8 h-0.5 bg-gold" />
            Industries Served
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="section-heading-white mb-4">
            Critical Applications Across{" "}
            <span className="text-gradient-gold">Global Industries</span>
          </h2>
          <p className="text-silver/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Our SS pipe fittings and flanges are trusted in the most demanding industrial 
            environments worldwide.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          {INDUSTRIES.map((industry) => {
            const Icon = iconMap[industry.icon] ?? Flame;
            return (
              <Link
                key={industry.slug}
                href={`/industries#${industry.slug}`}
                className="industry-card bg-white/5 hover:bg-white/10 border-white/10 hover:border-gold/30 group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${industry.color}20` }}
                >
                  <Icon size={22} style={{ color: industry.color === "#0a1628" ? "#d4922a" : industry.color }} />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-gold transition-colors">
                  {industry.name}
                </h3>
                <p className="text-silver/60 text-sm leading-relaxed mb-4">
                  {industry.description}
                </p>
                <div className="flex items-center gap-1 text-gold/60 text-xs font-semibold group-hover:text-gold transition-colors">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
