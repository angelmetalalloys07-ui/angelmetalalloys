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
      
      {/* Hero Section */}
      <section className="bg-gradient-navy pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="section-container relative z-10">
          <Link href="/blog" className="inline-flex items-center text-silver/70 hover:text-white transition-colors mb-8 text-sm font-semibold">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-silver/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gold" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-gold" />
                <span>{post.author || "Angel Metal & Alloys"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gold" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white min-h-screen">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {post.cover_image && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            
            <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-gold hover:prose-a:text-navy prose-img:rounded-xl prose-th:bg-navy/5 prose-th:p-4 prose-td:p-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content || ""}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-brand-bg border-t border-gray-100">
          <div className="section-container max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-navy mb-4">Related <span className="text-gradient-gold">Products</span></h2>
              <p className="text-gray-600">Explore our manufacturing range related to this technical guide.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((product) => (
                <div key={product.slug} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center mb-4 text-gold">
                    <span className="font-display font-bold text-2xl">{product.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg mb-4">{product.name}</h3>
                  <Link 
                    href={`/products/${product.category}/${product.slug}`}
                    className="mt-auto btn-outline-gold w-full text-sm py-2"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
