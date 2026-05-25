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
      <section className="bg-[#0a1628] py-24 lg:py-32 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="section-container relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold text-sm font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Engineering Insights
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="text-silver/70 text-lg md:text-xl max-w-2xl leading-relaxed">
            Expert insights, updates, and deep-dives into stainless steel piping materials, pressure classes, and manufacturing standards.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#FAFAFA] min-h-screen relative">
        <div className="section-container">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-display font-bold text-navy text-2xl">No articles yet</h3>
              <p className="text-gray-500 mt-2">Check back soon for new technical content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => {
                const readTime = Math.ceil((post.content?.split(' ').length || 0) / 200);
                return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full flex flex-col">
                  <div className="bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

                    <div className="h-56 relative overflow-hidden rounded-[1.5rem] mb-6">
                      {post.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-navy/5">
                          <span className="font-display font-bold text-2xl">Angel Metal</span>
                        </div>
                      )}
                      
                      {/* Floating Read Time Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-navy shadow-sm border border-white/20">
                        {readTime} min read
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4 flex flex-col flex-grow relative z-10">
                      <div className="text-xs text-gold font-bold mb-3 uppercase tracking-wider">
                        {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      
                      <h2 className="font-display font-bold text-navy text-2xl leading-tight mb-4 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="text-navy font-bold text-sm flex items-center group-hover:text-gold transition-colors mt-auto">
                        Read Technical Guide 
                        <span className="ml-2 w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
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
