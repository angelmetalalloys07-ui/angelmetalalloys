import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Total Inquiries
    const { count: totalInquiries } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true });

    // New this week
    const { count: newThisWeek } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")
      .gte("created_at", startOfWeek.toISOString());

    // Quotes Sent this month
    const { count: quotesSent } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "quoted")
      .gte("created_at", startOfMonth.toISOString());

    // Export Leads this month
    const { count: exportLeads } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("is_export", true)
      .gte("created_at", startOfMonth.toISOString());

    // Won Deals this month
    const { count: wonDeals } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "won")
      .gte("created_at", startOfMonth.toISOString());

    // Pending Follow-ups
    const { count: pendingFollowUps } = await supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .not("follow_up_date", "is", null)
      .lte("follow_up_date", now.toISOString());

    // Fetch all recent for charts (last 6 months limit for performance)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    
    const { data: recentInquiries } = await supabase
      .from("inquiries")
      .select("created_at, product_category, source")
      .gte("created_at", sixMonthsAgo.toISOString());

    // Process Chart Data
    const monthlyDataMap: Record<string, number> = {};
    const categoryDataMap: Record<string, number> = {};
    const sourceDataMap: Record<string, number> = {};

    (recentInquiries || []).forEach((inq) => {
      // Month map
      const date = new Date(inq.created_at);
      const monthStr = date.toLocaleString('default', { month: 'short' });
      monthlyDataMap[monthStr] = (monthlyDataMap[monthStr] || 0) + 1;

      // Category map
      const cat = inq.product_category || "General";
      categoryDataMap[cat] = (categoryDataMap[cat] || 0) + 1;

      // Source map
      const src = inq.source || "Direct";
      sourceDataMap[src] = (sourceDataMap[src] || 0) + 1;
    });

    const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthlyData = Object.entries(monthlyDataMap)
      .sort((a, b) => MONTH_ORDER.indexOf(a[0]) - MONTH_ORDER.indexOf(b[0]))
      .map(([name, Inquiries]) => ({ name, Inquiries }));
    const categoryData = Object.entries(categoryDataMap).map(([name, value]) => ({ name, value }));
    const sourceData = Object.entries(sourceDataMap).map(([name, value]) => ({ name, value }));

    // Recent 10 inquiries for dashboard table
    const { data: latestTableRows } = await supabase
      .from("inquiries")
      .select("id, full_name, company_name, product_category, country, status, priority, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      stats: {
        total: totalInquiries || 0,
        newThisWeek: newThisWeek || 0,
        quotesSent: quotesSent || 0,
        exportLeads: exportLeads || 0,
        wonDeals: wonDeals || 0,
        pendingFollowUps: pendingFollowUps || 0,
      },
      charts: {
        monthly: monthlyData,
        category: categoryData,
        source: sourceData,
      },
      recent: latestTableRows || []
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
