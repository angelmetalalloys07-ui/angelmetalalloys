"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Globe, EyeOff, LayoutDashboard, Upload, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { PRODUCT_CATEGORIES } from "@/types";

const PAGE_SIZE = 20;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter]);

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !currentStatus })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, is_published: !currentStatus } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatePrimaryImage = async (id: string, imageUrl: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primary_image_url: imageUrl })
      });
      if (res.ok) {
        setProducts(products.map(p => p.id === id ? { ...p, primary_image_url: imageUrl } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const publishedCount = products.filter(p => p.is_published).length;
  const draftCount = products.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Product Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? "Loading..." : `${products.length} total products · ${publishedCount} published · ${draftCount} drafts`}
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-navy py-2 px-4 text-sm flex items-center gap-2 whitespace-nowrap">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>

          {/* Category Filter */}
          <div className="relative flex-shrink-0">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="ml-auto text-xs text-gray-400 whitespace-nowrap">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                [...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
                        <div className="space-y-1.5">
                          <div className="h-3 w-36 bg-gray-100 rounded animate-pulse" />
                          <div className="h-2.5 w-24 bg-gray-100 rounded animate-pulse" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-3 w-28 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" /></td>
                    <td className="px-6 py-4 text-right"><div className="h-6 w-16 bg-gray-100 rounded animate-pulse ml-auto" /></td>
                  </tr>
                ))
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <LayoutDashboard size={32} className="text-gray-200" />
                      <span>No products found.</span>
                      {search && (
                        <button onClick={() => { setSearch(""); setCategoryFilter("all"); }} className="text-gold text-xs underline">
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center relative group flex-shrink-0">
                          {product.primary_image_url ? (
                            <img src={product.primary_image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-300 font-bold text-xs">SS</span>
                          )}
                          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer">
                            <CldUploadWidget
                              uploadPreset="angel-metal-products"
                              options={{ folder: 'angel-metal/products', maxFiles: 1, resourceType: 'image' }}
                              onSuccess={(result: any) => updatePrimaryImage(product.id, result.info.secure_url)}
                            >
                              {({ open }) => (
                                <button onClick={() => open()} title="Upload Image"><Upload size={14} className="text-white" /></button>
                              )}
                            </CldUploadWidget>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-navy truncate max-w-[220px]">{product.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-[220px]">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        {PRODUCT_CATEGORIES.find(c => c.slug === product.category)?.shortLabel || product.category}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => togglePublish(product.id, product.is_published)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                          product.is_published
                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {product.is_published ? <Globe size={11} /> : <EyeOff size={11} />}
                        {product.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredProducts.length)} of {filteredProducts.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 text-xs rounded border transition-colors ${
                    page === i + 1
                      ? "bg-navy text-white border-navy"
                      : "border-gray-200 text-gray-600 hover:bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
