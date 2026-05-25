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
    
    const { data: activities, error } = await supabase
      .from("inquiry_activities")
      .select("*")
      .eq("inquiry_id", params.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }

    return NextResponse.json({ data: activities });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    const body = await req.json();

    const { data, error } = await supabase
      .from("inquiry_activities")
      .insert({
        inquiry_id: params.id,
        activity_type: body.activity_type || "note",
        content: body.content,
        performed_by: body.performed_by || "Admin",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to add activity" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
