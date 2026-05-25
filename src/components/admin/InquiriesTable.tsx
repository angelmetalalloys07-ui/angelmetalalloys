"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Filter, Download, MoreHorizontal, MessageSquare, 
  Mail, Phone, Archive, ChevronLeft, ChevronRight, CheckCircle2 
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function InquiriesTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 25, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  
  // Filters state
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get("priority") || "");
  const [exportFilter, setExportFilter] = useState(searchParams.get("is_export") || "");

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      const json = await res.json();
      if (json.data) {
        setData(json.data);
        setMeta(json.meta);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set("search", search);
      else params.delete("search");
      params.set("page", "1"); // Reset page on search
      router.push(`${pathname}?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Handle filter changes
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Status update
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); updateFilter("status", e.target.value); }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="won">Won Deals</option>
            <option value="lost">Lost</option>
          </select>

          <select 
            value={exportFilter} 
            onChange={(e) => { setExportFilter(e.target.value); updateFilter("is_export", e.target.value); }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 bg-white"
          >
            <option value="">All Regions</option>
            <option value="false">Domestic (India)</option>
            <option value="true">Export Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4">ID / Date</th>
              <th className="px-6 py-4">Contact Detail</th>
              <th className="px-6 py-4">Requirement</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading inquiries...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No inquiries found matching criteria.</td>
              </tr>
            ) : (
              data.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link href={`/admin/inquiries/${inq.id}`} className="text-navy font-bold hover:text-gold block">
                      #{inq.id.substring(0, 8)}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">{formatDate(inq.created_at)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy flex items-center gap-2">
                      {inq.full_name}
                      {inq.is_export && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded font-bold">EXPORT</span>}
                    </div>
                    <div className="text-xs text-gray-500">{inq.company_name || 'Individual'} • {inq.country}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{inq.product_category || "General"}</div>
                    <div className="text-xs text-gray-500">{inq.quantity || "Qty Not Spec"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border focus:outline-none focus:ring-2 ${
                        inq.status === 'new' ? 'bg-gold/10 text-gold border-gold/30 ring-gold/20' :
                        inq.status === 'contacted' ? 'bg-blue-50 text-blue-600 border-blue-200 ring-blue-200' :
                        inq.status === 'quoted' ? 'bg-purple-50 text-purple-600 border-purple-200 ring-purple-200' :
                        inq.status === 'won' ? 'bg-green-50 text-green-600 border-green-200 ring-green-200' :
                        'bg-gray-100 text-gray-600 border-gray-200 ring-gray-200'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {inq.priority === 'high' ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> High
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-500">Normal</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`https://wa.me/${inq.mobile.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:bg-green-50 p-1.5 rounded" title="WhatsApp">
                        <MessageSquare size={16} />
                      </a>
                      <a href={`mailto:${inq.email}`} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded" title="Email">
                        <Mail size={16} />
                      </a>
                      <Link href={`/admin/inquiries/${inq.id}`} className="text-gold font-semibold text-xs border border-gold/30 hover:bg-gold/10 px-3 py-1.5 rounded-lg transition-colors">
                        Review
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm">
        <div className="text-gray-500">
          Showing <span className="font-semibold text-navy">{(meta.page - 1) * meta.limit + (data.length > 0 ? 1 : 0)}</span> to <span className="font-semibold text-navy">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-semibold text-navy">{meta.total}</span> leads
        </div>
        <div className="flex items-center gap-2">
          <button 
            disabled={meta.page <= 1}
            onClick={() => updateFilter("page", String(meta.page - 1))}
            className="p-1 border border-gray-200 rounded bg-white text-gray-500 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 font-semibold text-navy">Page {meta.page} of {meta.totalPages}</span>
          <button 
            disabled={meta.page >= meta.totalPages}
            onClick={() => updateFilter("page", String(meta.page + 1))}
            className="p-1 border border-gray-200 rounded bg-white text-gray-500 disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
