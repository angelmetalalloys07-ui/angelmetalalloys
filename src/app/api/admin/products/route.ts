import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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
    const category = url.searchParams.get("category");

    let query = supabase.from("products").select("*").order("sort_order", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getAdminSupabase();
    const body = await req.json();

    const { data, error } = await supabase
      .from("products")
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: `Failed to create product: ${error.message || JSON.stringify(error)}` }, { status: 500 });
    }

    // Revalidate public pages so changes appear immediately
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
