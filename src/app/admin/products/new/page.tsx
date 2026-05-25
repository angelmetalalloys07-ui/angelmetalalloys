import ProductForm from "@/components/admin/ProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Admin Portal",
};

export default function NewProductPage() {
  return <ProductForm />;
}
