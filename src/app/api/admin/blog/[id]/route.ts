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
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    const updates = await req.json();

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("posts").delete().eq("id", params.id);
    if (error) return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
