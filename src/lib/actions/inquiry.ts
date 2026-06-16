"use server";

import { createClient } from "@/lib/supabase/server";
import { InquirySchema, QuoteSchema, type InquiryFormData, type QuoteFormData } from "@/lib/validations";
import { Resend } from "resend";
import InquiryNotificationEmail from "@/emails/InquiryNotification";
import { sendAutoReply } from "@/lib/email";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ActionResult = {
  success: boolean;
  error?: string;
  data?: unknown;
};

export async function submitInquiry(
  formData: InquiryFormData
): Promise<ActionResult> {
  const parsed = InquirySchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Validation failed",
    };
  }

  const headersList = await headers();
  const ip_address = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "";
  
  const is_export = parsed.data.country && parsed.data.country.toLowerCase() !== "india";
  
  let priority = "medium";
  if (is_export && parsed.data.quantity) {
    priority = "urgent";
  } else if (is_export || parsed.data.product_category?.toLowerCase().includes("flanges")) {
    priority = "high";
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inquiries")
    .insert([{
      ...parsed.data,
      ip_address,
      is_export,
      priority
    }])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: "Failed to save inquiry. Please try again." };
  }

  // Insert initial activity
  await supabase.from("inquiry_activities").insert([{
    inquiry_id: data.id,
    activity_type: "system",
    content: `Inquiry received via ${parsed.data.source || 'website'}`,
    performed_by: "System"
  }]);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [process.env.INQUIRY_NOTIFICATION_EMAIL ?? "info@angelalloys.com"],
      subject: `New Inquiry from ${parsed.data.full_name} (${parsed.data.country ?? "Unknown"}) — Angel Metal & Alloys`,
      react: InquiryNotificationEmail({ inquiry: data as any }),
    });
    
    // Send auto-reply to customer
    await sendAutoReply(data as any);
  } catch (emailError) {
    console.error("Resend email error:", emailError);
  }

  return { success: true, data };
}

export async function submitQuote(
  formData: QuoteFormData
): Promise<ActionResult> {
  const parsed = QuoteSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Validation failed",
    };
  }

  const supabase = await createClient();

  // Map quote fields to inquiry schema
  const { data, error } = await supabase
    .from("inquiries")
    .insert([
      {
        full_name: parsed.data.full_name,
        company_name: parsed.data.company_name,
        email: parsed.data.email,
        mobile: parsed.data.mobile,
        country: parsed.data.country,
        city: parsed.data.city,
        product_category: parsed.data.product_category,
        product_subcategory: parsed.data.product_subcategory,
        material_grade: parsed.data.material_grade,
        size_nb: parsed.data.size_nb,
        quantity: parsed.data.quantity,
        notes: `${parsed.data.notes}${parsed.data.delivery_port ? `\n\nDelivery Port: ${parsed.data.delivery_port}` : ""}`,
        source: "quote-form",
      },
    ])
    .select()
    .single();

  if (error) {
    return { success: false, error: "Failed to save quote request. Please try again." };
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: [process.env.INQUIRY_NOTIFICATION_EMAIL ?? "info@angelalloys.com"],
      subject: `Quote Request: ${parsed.data.product_category} from ${parsed.data.company_name} (${parsed.data.country})`,
      react: InquiryNotificationEmail({ inquiry: data as any }),
    });
    
    // Send auto-reply to customer
    await sendAutoReply(data as any);
  } catch (e) {
    console.error("Email error:", e);
  }

  return { success: true, data };
}
