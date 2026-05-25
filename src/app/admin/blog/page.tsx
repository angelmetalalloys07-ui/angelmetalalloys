import { createClient } from "@/lib/supabase/server";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-navy">Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn-gold flex items-center gap-2">
          <Plus size={18} /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-bg border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {!posts || posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No blog posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-navy">{post.title}</td>
                    <td className="p-4 text-gray-600">{post.author}</td>
                    <td className="p-4 text-gray-600">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          <Eye size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-gray-400 hover:text-gold transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
