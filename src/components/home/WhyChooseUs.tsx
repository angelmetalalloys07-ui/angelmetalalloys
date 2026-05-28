import { CheckCircle2, Globe, Clock4, Award, Truck, Shield, Headphones, FlaskConical } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "ISO Certified Quality",
    description:
      "Every batch comes with material test certificates (MTC). All products conform to ASTM, ASME, and EN international standards.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Globe,
    title: "30+ Countries Exported",
    description:
      "Trusted by buyers across USA, UK, Germany, UAE, Singapore, Australia, and 25+ more countries since 2007.",
    color: "text-steel",
    bg: "bg-steel/10",
  },
  {
    icon: Clock4,
    title: "On-Time Delivery",
    description:
      "Efficient production scheduling ensures timely dispatch. Air, sea, and road freight options available worldwide.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: FlaskConical,
    title: "All Grades Available",
    description:
      "SS/Carbon Steel 304/316L, 321, 347, 904L, Duplex 2205, Super Duplex 2507, Hastelloy, Inconel — all grades in stock.",
    color: "text-steel",
    bg: "bg-steel/10",
  },
  {
    icon: Award,
    title: "15–20 MT/Month Capacity",
    description:
      "In-house manufacturing at Sumel 6 Industrial Park, Ahmedabad with modern CNC machinery and quality control.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Truck,
    title: "Custom Orders Accepted",
    description:
      "Non-standard sizes, special grades, and custom markings available. OEM manufacturing with your branding.",
    color: "text-steel",
    bg: "bg-steel/10",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Responsive technical team for grade selection, standards guidance, and post-shipment support.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: CheckCircle2,
    title: "Third-Party Inspection",
    description:
      "Support for TPI by SGS, BV, Lloyds, DNV, and other inspection agencies on buyer's request.",
    color: "text-steel",
    bg: "bg-steel/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-brand-bg">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag justify-center">
            <span className="w-8 h-0.5 bg-gold" />
            Why Choose Us
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="section-heading mb-4">
            The{" "}
            <span className="text-gradient-gold">Angel Metal</span> Advantage
          </h2>
          <p className="section-desc mx-auto text-center">
            17 years of manufacturing excellence, trusted by procurement teams across 
            6 continents for critical piping applications.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={feature.color} />
                </div>
                <h3 className="font-display font-bold text-navy text-base mb-2 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
