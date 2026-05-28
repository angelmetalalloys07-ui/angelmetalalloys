import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createPublicClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/types";
import { categoryLabel } from "@/lib/utils";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

export const revalidate = 3600; // ISR cache 1 hour

export const metadata: Metadata = {
  title: "SS/Carbon Steel Pipe Fittings, Flanges Catalogue | Angel Metal Ahmedabad",
  description:
    "Browse Angel Metal & Alloys' complete catalog of Stainless Steel/Carbon Steel pipe fittings, flanges, forged fittings, pipe nipples and stub ends. All grades: 304, 316L, Duplex, 904L. ASME, ASTM, EN standards.",
  keywords: ["SS/Carbon Steel pipe fittings catalog", "stainless steel/carbon steel flanges list", "butt weld fittings India", "forged fittings manufacturer Gujarat"],
  alternates: { canonical: "/products" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
  ],
};

export default async function ProductsPage() {
  const supabase = createPublicClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name, category, short_description, material_grades, primary_image_url, sort_order")
    .eq("is_published", true)
    .order("sort_order");

  const byCategory: Record<string, typeof products> = {};
  (products ?? []).forEach((p) => {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category]!.push(p);
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Page Hero */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779780568/ChatGPT_Image_May_26_2026_12_34_43_PM_rkaglo.png"
            alt="Products Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
        </div>

        <div className="section-container relative z-10">
          <nav className="flex items-center gap-2 text-silver/60 text-xs mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">Products</span>
          </nav>
          <h1 className="section-heading-white mb-4">
            SS/Carbon Steel Pipe Fittings &{" "}
            <span className="text-gradient-gold">Flanges Catalog</span>
          </h1>
          <p className="text-silver/90 text-lg max-w-2xl leading-relaxed">
            Manufacturer of SS/Carbon Steel butt weld fittings, flanges, forged fittings, pipe nipples 
            and stub ends in all grades — ASME B16.9, ASTM A403, EN 10253 and more.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="section-container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            <div className="flex items-center gap-1 text-gray-500 mr-3 flex-shrink-0">
              <SlidersHorizontal size={14} />
              <span className="text-xs font-medium">Filter:</span>
            </div>
            <Link
              href="/products"
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold bg-navy text-white"
            >
              All Products
            </Link>
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-brand-bg hover:text-gold transition-colors border border-gray-200"
              >
                {cat.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products by Category */}
      <div className="py-16 bg-brand-bg">
        <div className="section-container space-y-20">
          {PRODUCT_CATEGORIES.map((cat) => {
            const catProducts = byCategory[cat.slug] ?? [];
            if (!catProducts.length) return null;
            return (
              <div key={cat.slug} id={cat.slug}>
                {/* Category Header */}
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="section-tag">
                      <span className="w-6 h-0.5 bg-gold" />
                      {cat.label}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-navy">{cat.label}</h2>
                    <p className="text-gray-500 text-sm mt-1 max-w-xl">{cat.description}</p>
                  </div>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="flex items-center gap-2 text-gold text-sm font-semibold hover:underline flex-shrink-0"
                  >
                    View all <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {catProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.category}/${product.slug}`}
                      className="product-card group"
                    >
                      <div className="h-44 bg-gradient-to-br from-navy/5 to-steel/10 flex items-center justify-center overflow-hidden relative">
                        {product.primary_image_url ? (
                          <Image
                            src={product.primary_image_url}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-navy/10 flex items-center justify-center">
                            <span className="text-navy/40 font-display font-black text-xl">SS/Carbon Steel</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-bold text-navy text-sm mb-1.5 group-hover:text-gold transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        {product.short_description && (
                          <p className="text-gray-500 text-xs line-clamp-2 mb-3">{product.short_description}</p>
                        )}
                        <div className="flex items-center gap-1 text-gold text-xs font-semibold">
                          Get Quote <ArrowRight size={11} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
