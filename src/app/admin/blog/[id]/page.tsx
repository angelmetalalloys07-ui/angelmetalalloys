"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function BlogFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Angel Metal & Alloys",
    published: false,
    meta_title: "",
    meta_description: "",
  });

  useEffect(() => {
    if (!isNew) {
      const fetchPost = async () => {
        try {
          const res = await fetch(`/api/admin/blog/${id}`);
          if (res.ok) {
            const json = await res.json();
            if (json.data) setFormData(json.data);
          } else {
            setError("Failed to load post");
          }
        } catch (err) {
          setError("An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(isNew ? "/api/admin/blog" : `/api/admin/blog/${id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save post");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-display font-bold text-navy">
            {isNew ? "Create New Post" : "Edit Post"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Title *</label>
            <input
              required
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Slug *</label>
            <input
              required
              type="text"
              className="form-input"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Excerpt</label>
          <textarea
            rows={2}
            className="form-input resize-none"
            value={formData.excerpt || ""}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Content (HTML or Markdown) *</label>
          <textarea
            required
            rows={10}
            className="form-input resize-y font-mono text-sm"
            value={formData.content || ""}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Meta Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.meta_title || ""}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase">Meta Description</label>
            <input
              type="text"
              className="form-input"
              value={formData.meta_description || ""}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-gold rounded border-gray-300 focus:ring-gold"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            <span className="text-sm font-semibold text-navy">Publish immediately</span>
          </label>

          <button type="submit" disabled={saving} className="btn-navy py-2 px-6">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={18} /> Save Post</>}
          </button>
        </div>
      </form>
    </div>
  );
}
