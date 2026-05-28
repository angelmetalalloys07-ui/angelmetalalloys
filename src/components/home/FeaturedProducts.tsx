import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { categoryLabel } from "@/lib/utils";

interface Props {
  products: Partial<Product>[];
}

export default function FeaturedProducts({ products }: Props) {
  if (!products.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="section-tag">
              <span className="w-8 h-0.5 bg-gold" />
              Featured Products
            </div>
            <h2 className="section-heading">
              Top-Selling{" "}
              <span className="text-gradient-gold">SS/Carbon Steel Products</span>
            </h2>
          </div>
          <Link href="/products" className="btn-navy-outline flex-shrink-0 text-sm">
            All Products <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.category}/${product.slug}`}
              className="product-card group"
            >
              {/* Image Placeholder */}
              <div className="relative h-52 bg-gradient-to-br from-navy/5 to-steel/10 flex items-center justify-center overflow-hidden">
                {product.primary_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.primary_image_url}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="w-16 h-16 rounded-full border-2 border-navy/20 flex items-center justify-center">
                      <span className="text-navy/40 font-display font-bold text-2xl">SS/Carbon Steel</span>
                    </div>
                    <span className="text-xs text-navy/40 font-medium">
                      {categoryLabel(product.category ?? "")}
                    </span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="standard-badge text-[10px]">
                    {categoryLabel(product.category ?? "")}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-navy text-base mb-2 group-hover:text-gold transition-colors line-clamp-1">
                  {product.name}
                </h3>
                {product.short_description && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-gold text-sm font-semibold">
                  Get Quote <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
