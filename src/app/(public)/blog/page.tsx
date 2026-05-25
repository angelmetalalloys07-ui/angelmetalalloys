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
      <section className="bg-gradient-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="section-container relative">
          <h1 className="section-heading-white mb-4">
            Technical <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="text-silver/70 text-lg max-w-2xl">
            Insights, updates, and technical deep-dives into stainless steel piping materials and manufacturing.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-bg min-h-screen">
        <div className="section-container">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <h3 className="font-display font-bold text-navy text-xl">No articles yet</h3>
              <p className="text-gray-500 mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const readTime = Math.ceil((post.content?.split(' ').length || 0) / 200);
                return (
                <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-md transition-all">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {post.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-navy/5">
                        <span className="font-display font-bold text-xl">Angel Metal</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gold font-bold mb-2">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span className="text-gray-300">•</span>
                      <span>{readTime} min read</span>
                    </div>
                    <h2 className="font-display font-bold text-navy text-xl mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="text-navy font-semibold text-sm flex items-center gap-2 hover:text-gold transition-colors">
                      Read More <span className="text-gold">→</span>
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
