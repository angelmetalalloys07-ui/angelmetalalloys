import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase/server";
import { PRODUCT_CATEGORIES } from "@/types";
import { ArrowRight, ChevronRight, SlidersHorizontal } from "lucide-react";

interface Props {
  params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return {};
  
  return {
    title: `${cat.label} Manufacturer & Exporter in India | Angel Metal`,
    description: cat.description,
    alternates: { canonical: `/products/${params.category}` },
  };
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
  if (!category) notFound();

  const supabase = createPublicClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name, short_description, material_grades, primary_image_url")
    .eq("category", params.category)
    .eq("is_published", true)
    .order("sort_order");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
      { "@type": "ListItem", position: 3, name: category.label, item: `/products/${category.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-gradient-navy py-16">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-silver/60 text-xs mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-gold">{category.label}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="section-heading-white mb-4">{category.label}</h1>
            <p className="text-silver/80 text-lg leading-relaxed">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Filter / Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="section-container">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            <div className="flex items-center gap-1 text-gray-500 mr-3 flex-shrink-0">
              <SlidersHorizontal size={14} />
              <span className="text-xs font-medium">Filter:</span>
            </div>
            <Link
              href="/products"
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-brand-bg hover:text-gold transition-colors border border-gray-200"
            >
              All
            </Link>
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border ${
                  cat.slug === params.category 
                    ? "bg-navy text-white border-navy" 
                    : "text-gray-600 hover:bg-brand-bg hover:text-gold border-gray-200"
                } transition-colors`}
              >
                {cat.shortLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-brand-bg min-h-screen">
        <div className="section-container">
          {products?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${params.category}/${product.slug}`}
                  className="product-card group"
                >
                  <div className="h-48 bg-gradient-to-br from-navy/5 to-steel/10 flex items-center justify-center overflow-hidden relative">
                    {product.primary_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.primary_image_url} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="text-navy/20 font-display font-black text-3xl">SS/Carbon Steel</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-navy mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {product.short_description && (
                      <p className="text-gray-500 text-xs line-clamp-2 mb-3">{product.short_description}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-gold text-sm font-semibold">
                      View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-navy font-display font-bold text-xl mb-2">No products found</h3>
              <p className="text-gray-500">We are currently updating our catalog for this category.</p>
              <Link href="/contact" className="btn-navy mt-6 inline-flex">
                Contact Sales
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
