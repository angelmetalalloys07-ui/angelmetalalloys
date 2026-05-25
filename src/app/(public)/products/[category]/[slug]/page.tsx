import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createPublicClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/types";
import { ChevronRight, FileDown, CheckCircle2 } from "lucide-react";
import ProductInquiryForm from "@/components/products/ProductInquiryForm";

interface Props {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createPublicClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, meta_title, meta_description, short_description")
    .eq("slug", params.slug)
    .single();

  if (!product) return {};

  return {
    title: product.meta_title || `${product.name} | Angel Metal & Alloys`,
    description: product.meta_description || product.short_description,
    alternates: { canonical: `/products/${params.category}/${params.slug}` },
  };
}

export const revalidate = 3600; // ISR cache 1 hour

export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data: products } = await supabase.from("products").select("category, slug");
  return products?.map((p) => ({ category: p.category, slug: p.slug })) || [];
}

export default async function ProductDetailPage({ params }: Props) {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
  if (!category) notFound();

  const supabase = createPublicClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single();

  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.primary_image_url || "https://angelmetalalloys.com/og-image.jpg",
    description: product.full_description || product.short_description,
    brand: { "@type": "Brand", name: "Angel Metal & Alloys" },
    manufacturer: { "@type": "Organization", name: "Angel Metal & Alloys" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      { "@type": "ListItem", position: 3, name: category.label, item: `/products/${category.slug}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `/products/${category.slug}/${product.slug}` },
    ],
  };

  const materialGrades = Array.isArray(product.material_grades) ? product.material_grades : [];
  const standards = Array.isArray(product.standards) ? product.standards : [];
  const typesAvailable = Array.isArray(product.types_available) ? product.types_available : [];
  const specs = typeof product.specifications === 'object' && product.specifications !== null ? product.specifications : {};

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="bg-brand-bg min-h-screen pb-20">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-gray-200 pt-32 pb-4">
          <div className="section-container">
            <nav className="flex items-center gap-2 text-gray-500 text-xs overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
              <ChevronRight size={12} />
              <Link href={`/products/${category.slug}`} className="hover:text-gold transition-colors">{category.label}</Link>
              <ChevronRight size={12} />
              <span className="text-navy font-semibold">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="section-container pt-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 xl:gap-16">
            
            {/* Left Column: Product Details */}
            <div className="space-y-10">
              
              {/* Image & Main Info */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Image Box */}
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy/5 to-steel/10 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                    {product.primary_image_url ? (
                      <Image 
                        src={product.primary_image_url} 
                        alt={product.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-navy/20 font-display font-black text-6xl mb-2">SS</div>
                        <div className="text-navy/30 text-sm font-semibold tracking-widest uppercase">Premium Quality</div>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div>
                    <div className="standard-badge mb-4">{category.label}</div>
                    <h1 className="font-display font-bold text-3xl md:text-4xl text-navy mb-4">
                      {product.name}
                    </h1>
                    {product.short_description && (
                      <p className="text-gray-600 leading-relaxed mb-8">
                        {product.short_description}
                      </p>
                    )}

                    <div className="space-y-4">
                      {product.size_range && (
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Size Range</div>
                          <div className="text-navy font-medium">{product.size_range}</div>
                        </div>
                      )}
                      {product.pressure_class && (
                        <div>
                          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Pressure Class / Schedule</div>
                          <div className="text-navy font-medium">{product.pressure_class}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.full_description && (
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-display font-bold text-navy mb-4">Description</h3>
                  <div className="prose prose-gray max-w-none text-gray-600">
                    <p>{product.full_description}</p>
                  </div>
                </div>
              )}

              {/* Specifications & Grades */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-display font-bold text-navy mb-6">Material Grades</h3>
                  <div className="flex flex-wrap gap-2">
                    {materialGrades.map((g: string) => (
                      <span key={g} className="px-3 py-1.5 bg-steel/10 text-navy text-sm font-semibold rounded-lg border border-steel/20">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-display font-bold text-navy mb-6">Standards & Specifications</h3>
                  <div className="space-y-3">
                    {standards.map((s: string) => (
                      <div key={s} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{s}</span>
                      </div>
                    ))}
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700"><strong className="font-semibold">{key}:</strong> {val as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>

            {/* Right Column: Sticky Form */}
            <div className="relative">
              <div className="sticky top-24">
                <ProductInquiryForm product={product} />

                {/* Additional Info Cards */}
                <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h4 className="font-display font-bold text-navy mb-4">Why Source From Us?</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Mill Test Certificate (MTC) EN 10204 3.1 provided
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      100% Traceability & PMI Testing
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Third-Party Inspection (TPI) accepted
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Global shipping (FOB, CIF, DDP)
                    </li>
                  </ul>
                  <a href="#" className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                    <FileDown size={16} /> Download Catalog
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
