import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createPublicClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("published", true);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createPublicClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) {
    return {
      title: "Post Not Found | Angel Metal & Alloys",
    };
  }

  return {
    title: post.meta_title || `${post.title} | Angel Metal & Alloys`,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author || "Angel Metal & Alloys"],
      ...(post.cover_image && {
        images: [
          {
            url: post.cover_image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    alternates: {
      canonical: `https://angelmetalalloys.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createPublicClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) {
    notFound();
  }

  const readTime = Math.ceil((post.content?.split(" ").length || 0) / 200);

  // Generate JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author || "Angel Metal & Alloys",
    },
    publisher: {
      "@type": "Organization",
      name: "Angel Metal & Alloys",
      logo: {
        "@type": "ImageObject",
        url: "https://angelmetalalloys.com/logo.png",
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://angelmetalalloys.com/blog/${post.slug}`,
    },
    ...(post.cover_image && { image: post.cover_image }),
  };

  // Determine related products based on the slug
  type RelatedProduct = { name: string; slug: string; category: string; image: string };
  let relatedProducts: RelatedProduct[] = [];
  if (post.slug === "ss-304-vs-ss-316l-pipe-fittings-grade-selection-guide") {
    relatedProducts = [
      { name: "Butt Weld Fittings", slug: "butt-weld-fittings", category: "fittings", image: "/placeholder.png" },
      { name: "Forged Fittings", slug: "forged-fittings", category: "fittings", image: "/placeholder.png" },
      { name: "SS Pipes & Tubes", slug: "ss-pipes-tubes", category: "pipes", image: "/placeholder.png" },
    ];
  } else if (post.slug === "asme-b16-5-flange-pressure-class-selection-guide") {
    relatedProducts = [
      { name: "SS Flanges (Weld Neck)", slug: "weld-neck-flange", category: "flanges", image: "/placeholder.png" },
      { name: "Blind Flange", slug: "blind-flange", category: "flanges", image: "/placeholder.png" },
      { name: "Slip-On Flange", slug: "slip-on-flange", category: "flanges", image: "/placeholder.png" },
    ];
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🏭 B2B INDUSTRY STANDARD HERO SECTION */}
      <section className="bg-gray-50 border-b border-gray-200 pt-32 pb-12">
        <div className="section-container">
          <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-navy transition-colors mb-6 text-sm font-semibold uppercase tracking-wider">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Corporate Meta Data */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <User size={16} className="text-navy" />
                <span>{post.author || "Angel Metal & Alloys"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-navy" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-navy" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📚 MAIN CONTENT SECTION */}
      <section className="py-16 bg-white relative">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Content Area */}
            <div className="lg:w-2/3">
              {post.cover_image && (
                <div className="mb-12 border border-gray-200 p-2 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              )}
              
              <article className="prose prose-lg md:prose-xl max-w-none text-gray-700
                prose-headings:font-display prose-headings:font-bold prose-headings:text-navy
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-xl
                prose-a:text-navy prose-a:font-semibold prose-a:underline hover:prose-a:text-gold
                prose-ul:text-gray-700
                prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:font-medium
                prose-table:w-full prose-table:border prose-table:border-gray-200
                prose-th:bg-gray-100 prose-th:text-navy prose-th:p-3 prose-th:text-left prose-th:border-b prose-th:border-gray-300
                prose-td:p-3 prose-td:border-b prose-td:border-gray-200
                prose-img:border prose-img:border-gray-200
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content || ""}
                </ReactMarkdown>
              </article>
            </div>

            {/* Corporate Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Consultation Card */}
                <div className="bg-gray-50 border border-gray-200 p-8 text-center">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                    <User size={32} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy mb-3">Engineering Consultation</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    Need assistance selecting the correct material grade or pressure class? Our metallurgical experts are ready to help.
                  </p>
                  <Link href="/contact" className="btn-gold w-full flex justify-center text-sm py-3">
                    Contact Our Team
                  </Link>
                </div>

                {/* Topics List */}
                <div className="border border-gray-200 p-6">
                  <h3 className="font-display font-bold text-navy text-lg mb-4 border-b border-gray-200 pb-2">Related Topics</h3>
                  <ul className="space-y-3">
                    <li><Link href="/materials" className="text-gray-600 hover:text-gold text-sm font-medium">Stainless Steel Grades</Link></li>
                    <li><Link href="/products/flanges" className="text-gray-600 hover:text-gold text-sm font-medium">Flange Dimensions</Link></li>
                    <li><Link href="/products/butt-weld-fittings" className="text-gray-600 hover:text-gold text-sm font-medium">Pipe Fittings</Link></li>
                    <li><Link href="/industries" className="text-gray-600 hover:text-gold text-sm font-medium">Industry Applications</Link></li>
                  </ul>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* 🚀 RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="section-container max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-navy">Related Products</h2>
              </div>
              <Link href="/products" className="text-navy font-bold hover:text-gold transition-colors text-sm uppercase tracking-wider">
                View Catalog →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <Link 
                  key={product.slug}
                  href={`/products/${product.category}/${product.slug}`}
                  className="group bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <h3 className="font-display font-bold text-navy text-lg mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Manufactured to ASME / ASTM standards.
                  </p>
                  <div className="mt-auto text-gold text-sm font-bold uppercase tracking-wide flex items-center">
                    View Specs <ArrowRight size={14} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
