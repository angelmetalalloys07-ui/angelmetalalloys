"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { ProductSchema, type ProductFormData } from "@/lib/validations";
import type { ActionResult } from "./inquiry";

async function requireAdmin() {
  const supabase = await createAdminClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");
  return supabase;
}

export async function createProduct(formData: ProductFormData): Promise<ActionResult> {
  const parsed = ProductSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .insert([parsed.data])
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function updateProduct(
  id: string,
  formData: Partial<ProductFormData>
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .update({ ...formData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function toggleProductActive(
  id: string,
  is_active: boolean
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateInquiryStatus(
  id: string,
  status: "new" | "read" | "replied" | "spam"
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
