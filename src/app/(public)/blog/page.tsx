import type { Metadata } from "next";
import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog | Angel Metal & Alloys",
  description: "Read the latest news, technical articles, and updates from Angel Metal & Alloys.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, created_at, content")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      {/* Professional Corporate Hero */}
      <section className="bg-gradient-navy py-16 lg:py-24 border-b border-gold/20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Technical <span className="text-gold">Insights</span>
            </h1>
            <p className="text-silver/90 text-lg leading-relaxed">
              Expert guides, engineering resources, and material selection criteria for stainless steel pipe fittings, flanges, and industrial components.
            </p>
          </div>
        </div>
      </section>

      {/* Clean Grid Section */}
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="section-container">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200 shadow-sm">
              <h3 className="font-bold text-navy text-xl">No articles available</h3>
              <p className="text-gray-500 mt-2">Check back soon for new technical content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const readTime = Math.ceil((post.content?.split(' ').length || 0) / 200);
                return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-56 relative overflow-hidden bg-gray-100 border-b border-gray-200">
                    {post.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <span className="font-display font-bold text-xl">Angel Metal</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
                      <span className="text-navy">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{readTime} min read</span>
                    </div>
                    
                    <h2 className="font-bold text-navy text-xl leading-snug mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="text-gold font-bold text-sm flex items-center uppercase tracking-wide mt-auto">
                      Read Article 
                      <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
