import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getAdminSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    
    // Get inquiry details
    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ data: inquiry });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    const updates = await req.json();

    const { data, error } = await supabase
      .from("inquiries")
      .update(updates)
      .eq("id", params.id)
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
