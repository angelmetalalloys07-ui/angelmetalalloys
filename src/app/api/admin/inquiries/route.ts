import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Utility to get admin supabase client
const getAdminSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function GET(req: Request) {
  try {
    const supabase = getAdminSupabase();
    const url = new URL(req.url);

    // Pagination
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "25");
    const offset = (page - 1) * limit;

    // Filters
    const search = url.searchParams.get("search");
    const status = url.searchParams.get("status"); // can be comma separated
    const category = url.searchParams.get("category");
    const source = url.searchParams.get("source");
    const is_export = url.searchParams.get("is_export");
    const priority = url.searchParams.get("priority");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    let query = supabase
      .from("inquiries")
      .select("*", { count: "exact" });

    // Apply Filters
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,company_name.ilike.%${search}%,email.ilike.%${search}%,mobile.ilike.%${search}%`);
    }
    if (status) {
      query = query.in("status", status.split(","));
    }
    if (category) {
      query = query.eq("product_category", category);
    }
    if (source) {
      query = query.eq("source", source);
    }
    if (is_export === "true") {
      query = query.eq("is_export", true);
    } else if (is_export === "false") {
      query = query.eq("is_export", false);
    }
    if (priority) {
      query = query.eq("priority", priority);
    }
    if (startDate) {
      query = query.gte("created_at", startDate);
    }
    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    // Apply Pagination & Sorting
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
    }

    return NextResponse.json({
      data,
      meta: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = getAdminSupabase();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("inquiries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
