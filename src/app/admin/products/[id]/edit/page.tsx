import ProductForm from "@/components/admin/ProductForm";
import { createAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product | Admin Portal",
};

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createAdminClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  return <ProductForm initialData={product} isEdit={true} />;
}
