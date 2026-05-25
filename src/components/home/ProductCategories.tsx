import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/types";
import { ArrowRight, GitBranch, Minus, Circle, Hammer, MoveRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  MoveRight,
  Circle,
  Hammer,
  Minus,
  ArrowRight,
  GitBranch,
};

const categoryImages: Record<string, string> = {
  "butt-weld-fittings": "bg-gradient-to-br from-steel/80 to-navy",
  "flanges": "bg-gradient-to-br from-navy to-steel/80",
  "forged-fittings": "bg-gradient-to-br from-navy/90 to-steel",
  "pipe-nipples": "bg-gradient-to-br from-steel to-navy/90",
  "stub-ends": "bg-gradient-to-br from-navy to-steel/90",
  "olets": "bg-gradient-to-br from-steel/90 to-navy",
};

export default function ProductCategories() {
  return (
    <section id="products" className="py-24 bg-brand-bg">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag justify-center">
            <span className="w-8 h-0.5 bg-gold" />
            Our Products
            <span className="w-8 h-0.5 bg-gold" />
          </div>
          <h2 className="section-heading mb-4">
            Complete Range of{" "}
            <span className="text-gradient-gold">SS Pipe Fittings</span>
          </h2>
          <p className="section-desc mx-auto text-center">
            From butt weld fittings to precision flanges — all manufactured in-house at our 
            Ahmedabad facility and exported worldwide.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {PRODUCT_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Circle;
            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="product-card group"
              >
                {/* Card image area */}
                <div className={`h-40 ${categoryImages[cat.slug]} relative overflow-hidden flex items-center justify-center`}>
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 hero-grid opacity-30" />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Icon size={32} className="text-gold" />
                    </div>
                  </div>
                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-2 text-gold text-sm font-semibold">
                    View Products
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/products" className="btn-gold inline-flex">
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
