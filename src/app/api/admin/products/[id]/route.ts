import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    const updates = await req.json();

    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: `Failed to update product: ${error.message || JSON.stringify(error)}` }, { status: 500 });
    }

    // Revalidate public pages so changes appear immediately
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getAdminSupabase();
    
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
