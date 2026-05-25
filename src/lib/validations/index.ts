import { z } from "zod";

export const InquirySchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  company_name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"),
  country: z.string().optional().default("India"),
  city: z.string().optional(),
  
  product_category: z.string().min(1, "Please select a product category"),
  product_subcategory: z.string().optional(),
  material_grade: z.string().optional(),
  size_nb: z.string().optional(),
  pressure_class: z.string().optional(),
  standard_required: z.string().optional(),
  quantity: z.string().optional(),
  delivery_date: z.string().optional(),
  
  notes: z.string().min(10, "Message must be at least 10 characters"),
  specification: z.string().optional(),
  
  source: z.enum([
    'website', 'email_campaign', 'whatsapp', 'google', 'referral', 
    'trade_fair', 'linkedin', 'justdial', 'indiamart', 'direct', 
    'contact-form', 'quote-form', 'product-page'
  ]).default("contact-form"),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export const QuoteSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  company_name: z.string().min(2, "Company name is required"),
  email: z.string().email("Valid email required"),
  mobile: z.string().min(5, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  
  product_category: z.string().min(1, "Please select a category"),
  product_subcategory: z.string().optional(),
  material_grade: z.string().optional(),
  size_nb: z.string().optional(),
  quantity: z.string().min(1, "Quantity is required"),
  delivery_port: z.string().optional(),
  notes: z.string().min(10, "Please provide more details about your requirement"),
});

export type QuoteFormData = z.infer<typeof QuoteSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const ProductSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  category: z.string().min(2),
  short_description: z.string().optional(),
  full_description: z.string().optional(),
  
  specifications: z.record(z.string(), z.string()).default({}),
  material_grades: z.array(z.string()).default([]),
  types_available: z.array(z.string()).default([]),
  standards: z.array(z.string()).default([]),
  
  size_range: z.string().optional(),
  pressure_class: z.string().optional(),
  
  primary_image_url: z.string().optional(),
  image_public_id: z.string().optional(),
  gallery_images: z.array(z.string()).default([]),
  
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  sort_order: z.number().default(0),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
