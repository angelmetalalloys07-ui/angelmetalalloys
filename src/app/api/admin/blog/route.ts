import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getAdminSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function POST(req: Request) {
  try {
    const supabase = getAdminSupabase();
    const data = await req.json();

    const { data: inserted, error } = await supabase
      .from("posts")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: inserted });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
