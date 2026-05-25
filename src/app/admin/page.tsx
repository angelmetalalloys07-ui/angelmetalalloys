"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, TrendingUp, Send, Globe, Trophy, Clock, ArrowRight, Activity 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const COLORS = ['#0a1628', '#cda85c', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  const { stats, charts, recent } = data;

  const statCards = [
    { title: "Total Inquiries", value: stats.total, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "New This Week", value: stats.newThisWeek, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Quotes Sent (Month)", value: stats.quotesSent, icon: Send, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Export Leads (Month)", value: stats.exportLeads, icon: Globe, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Won Deals (Month)", value: stats.wonDeals, icon: Trophy, color: "text-gold", bg: "bg-gold/10" },
    { title: "Pending Follow-ups", value: stats.pendingFollowUps, icon: Clock, color: "text-red-500", bg: "bg-red-500/10", alert: stats.pendingFollowUps > 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time CRM metrics and lead analytics.</p>
        </div>
        <Link href="/admin/inquiries/new" className="btn-navy py-2 px-4 text-sm">
          + Add Manual Lead
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`bg-white rounded-2xl p-4 border shadow-sm ${card.alert ? 'border-red-200 shadow-red-500/5' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${card.bg} ${card.color}`}>
                  <Icon size={16} />
                </div>
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider line-clamp-1" title={card.title}>
                  {card.title}
                </h3>
              </div>
              <div className={`text-3xl font-display font-bold ${card.alert ? 'text-red-500' : 'text-navy'}`}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-navy">Inquiries Trend (6 Months)</h3>
            <Activity size={18} className="text-gray-400" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <RechartsTooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="Inquiries" fill="#0a1628" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Category Mix */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-display font-bold text-navy mb-6">Product Interest</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.category}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {charts.category.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {charts.category.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name.length > 15 ? entry.name.substring(0,15)+'...' : entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-navy">Recent Inquiries</h3>
          <Link href="/admin/inquiries" className="text-sm font-semibold text-gold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recent.map((inq: any) => (
                <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{formatDate(inq.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy">{inq.full_name}</div>
                    {inq.company_name && <div className="text-xs text-gray-500">{inq.company_name}</div>}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{inq.product_category || "General"}</td>
                  <td className="px-6 py-4 text-gray-600">{inq.country}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      inq.status === 'new' ? 'bg-gold/10 text-gold border-gold/30' :
                      inq.status === 'quoted' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                      inq.status === 'won' ? 'bg-green-50 text-green-600 border-green-200' :
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/inquiries/${inq.id}`} className="text-gold font-semibold text-sm hover:underline">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No recent inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
