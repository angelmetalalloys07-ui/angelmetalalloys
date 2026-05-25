import { createClient } from "@/lib/supabase/server";
import { Package, MessageSquare, Eye, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: inquiryCount },
    { count: newInquiries },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("inquiries")
      .select("id, name, company, email, country, product_interest, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const statusColor: Record<string, string> = {
    new: "bg-gold/15 text-gold border-gold/30",
    read: "bg-blue-50 text-blue-700 border-blue-200",
    replied: "bg-green-50 text-green-700 border-green-200",
    spam: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your Angel Metal & Alloys website</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { icon: Package, label: "Total Products", value: productCount ?? 0, color: "text-navy", bg: "bg-navy/10" },
          { icon: MessageSquare, label: "Total Inquiries", value: inquiryCount ?? 0, color: "text-blue-700", bg: "bg-blue-50" },
          { icon: Eye, label: "New Inquiries", value: newInquiries ?? 0, color: "text-gold", bg: "bg-gold/10" },
          { icon: Clock, label: "Awaiting Reply", value: newInquiries ?? 0, color: "text-orange-600", bg: "bg-orange-50" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className={`text-3xl font-display font-black ${color} mb-0.5`}>{value}</div>
            <div className="text-gray-500 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-navy text-base">Recent Inquiries</h2>
          <a href="/admin/inquiries" className="text-gold text-xs font-semibold hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Country</th>
                <th className="px-6 py-3 text-left">Product Interest</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(recentInquiries ?? []).map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="font-medium text-navy text-sm">{inq.name}</div>
                    <div className="text-gray-500 text-xs">{inq.email}</div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-600 text-sm">{inq.company ?? "—"}</td>
                  <td className="px-6 py-3.5 text-gray-600 text-sm">{inq.country ?? "—"}</td>
                  <td className="px-6 py-3.5 text-gray-600 text-sm max-w-[200px] truncate">
                    {inq.product_interest ?? "—"}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColor[inq.status] ?? ""}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 text-xs">
                    {formatDate(inq.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!recentInquiries || recentInquiries.length === 0) && (
            <div className="text-center py-12 text-gray-400 text-sm">No inquiries yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
