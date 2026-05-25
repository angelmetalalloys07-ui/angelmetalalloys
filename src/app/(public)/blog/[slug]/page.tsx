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
      
      {/* 🚀 PREMIUM HERO SECTION */}
      <section className="bg-[#0a1628] relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 border-b border-white/10">
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-gold/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 hero-grid opacity-10" />
        </div>

        <div className="section-container relative z-10">
          <Link href="/blog" className="inline-flex items-center text-gold/80 hover:text-gold transition-colors mb-8 text-sm font-bold tracking-wider uppercase">
            <ArrowLeft size={16} className="mr-2" /> Back to Technical Blog
          </Link>
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Title & Meta */}
            <div className={`lg:col-span-${post.cover_image ? '7' : '10'} space-y-8`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-silver/70 text-lg md:text-xl leading-relaxed max-w-2xl border-l-2 border-gold/50 pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Glassmorphism Meta Card */}
              <div className="inline-flex flex-wrap items-center gap-6 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 text-silver/90 text-sm font-medium">
                  <User size={16} className="text-gold" />
                  <span>{post.author || "Angel Metal & Alloys"}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
                <div className="flex items-center gap-2 text-silver/90 text-sm font-medium">
                  <Calendar size={16} className="text-gold" />
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20 hidden md:block" />
                <div className="flex items-center gap-2 text-silver/90 text-sm font-medium">
                  <Clock size={16} className="text-gold" />
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Image */}
            {post.cover_image && (
              <div className="lg:col-span-5 relative group perspective">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.02] bg-[#0a1628]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-auto object-contain max-h-[400px] p-2 rounded-3xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 📚 PREMIUM CONTENT SECTION */}
      <section className="py-20 bg-[#FAFAFA] relative">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content Area */}
            <div className="lg:w-2/3">
              <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg md:prose-xl max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#0a1628]
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4
                prose-h3:text-2xl prose-h3:text-[#0a1628]/90
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-[#d4922a] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0a1628]
                prose-ul:text-gray-600 prose-li:marker:text-[#d4922a]
                prose-blockquote:border-l-4 prose-blockquote:border-[#d4922a] prose-blockquote:bg-brand-bg prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:font-medium
                prose-table:w-full prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-gray-200
                prose-th:bg-[#0a1628] prose-th:text-white prose-th:p-4 prose-th:text-left prose-th:font-semibold
                prose-td:p-4 prose-td:border-b prose-td:border-gray-100 prose-tr:last:border-0 prose-tr:hover:bg-gray-50
                prose-img:rounded-2xl prose-img:shadow-md
                first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-[#d4922a] first-letter:mr-3 first-letter:float-left
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content || ""}
                </ReactMarkdown>
              </article>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                {/* Expert Consultation Card */}
                <div className="bg-gradient-navy rounded-3xl p-8 relative overflow-hidden shadow-xl border border-[#0a1628]/10 group">
                  <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl group-hover:bg-gold/30 transition-colors" />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                      <User size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">Need Technical Advice?</h3>
                    <p className="text-silver/80 text-sm mb-8 leading-relaxed">
                      Our metallurgical experts can help you select the exact grade and pressure class for your specific application.
                    </p>
                    <Link href="/contact" className="btn-gold w-full flex justify-center text-sm py-4">
                      Contact Engineering Team
                    </Link>
                  </div>
                </div>

                {/* Tags / Categories (Placeholder) */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="font-display font-bold text-navy text-xl mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 rounded-full bg-brand-bg text-gray-600 text-xs font-semibold hover:bg-[#d4922a]/10 hover:text-[#d4922a] transition-colors cursor-pointer">Stainless Steel</span>
                    <span className="px-4 py-2 rounded-full bg-brand-bg text-gray-600 text-xs font-semibold hover:bg-[#d4922a]/10 hover:text-[#d4922a] transition-colors cursor-pointer">Engineering</span>
                    <span className="px-4 py-2 rounded-full bg-brand-bg text-gray-600 text-xs font-semibold hover:bg-[#d4922a]/10 hover:text-[#d4922a] transition-colors cursor-pointer">Pipe Fittings</span>
                    <span className="px-4 py-2 rounded-full bg-brand-bg text-gray-600 text-xs font-semibold hover:bg-[#d4922a]/10 hover:text-[#d4922a] transition-colors cursor-pointer">Flanges</span>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* 🚀 PREMIUM RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-white border-t border-gray-100 relative">
          <div className="section-container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                  Recommended <span className="text-gradient-gold">Products</span>
                </h2>
                <p className="text-gray-500 text-lg">
                  Explore our manufacturing range certified for these applications.
                </p>
              </div>
              <Link href="/products" className="text-gold font-bold hover:text-navy transition-colors flex items-center gap-2">
                View Full Catalog <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((product, idx) => (
                <Link 
                  key={product.slug}
                  href={`/products/${product.category}/${product.slug}`}
                  className="group"
                >
                  <div className="bg-brand-bg rounded-3xl p-8 border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-2">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                         style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2a40 100%)' }}>
                      <span className="font-display font-bold text-3xl text-gradient-gold">{product.name.charAt(0)}</span>
                    </div>
                    
                    <h3 className="font-display font-bold text-navy text-xl mb-3 group-hover:text-gold transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-8 flex-grow">
                      Manufactured strictly to ASME and ASTM standards. Available in all grades discussed above.
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-navy group-hover:text-gold transition-colors mt-auto">
                      View Specifications <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
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
