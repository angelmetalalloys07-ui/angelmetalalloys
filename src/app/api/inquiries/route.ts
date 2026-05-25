import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { InquirySchema } from "@/lib/validations";
import InquiryNotificationEmail from "@/emails/InquiryNotification";
import { sendAutoReply } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use service role to bypass RLS — inquiries are public-facing inserts
const getSupabase = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate body with Zod
    const validatedData = InquirySchema.parse(body);

    // 2. Extract IP, User-Agent, and UTMs
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    // Assuming UTMs are sent in the body via hidden fields, or we extract them if they exist
    const utm_source = body.utm_source || null;
    const utm_medium = body.utm_medium || null;
    const utm_campaign = body.utm_campaign || null;

    // 3. Detect Export Inquiry
    const is_export = validatedData.country.toLowerCase() !== "india";

    // 4. Set Priority
    let priority = "medium";
    const qtyStr = validatedData.quantity ? validatedData.quantity.toLowerCase() : "";
    const isHighQty = qtyStr.includes("mt") && parseInt(qtyStr.replace(/[^0-9]/g, "")) > 10;
    const isFlanges = validatedData.product_category?.toLowerCase().includes("flange");
    
    if (is_export || isHighQty || isFlanges) {
      priority = "high";
    }

    const supabase = getSupabase();

    // Rate Limiting: Max 3 per IP per hour
    if (ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", oneHourAgo);

      if (count && count >= 3) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    // 5. Insert into Supabase
    const { data: insertedInquiry, error: dbError } = await supabase
      .from("inquiries")
      .insert({
        full_name: validatedData.full_name,
        company_name: validatedData.company_name,
        email: validatedData.email,
        mobile: validatedData.mobile,
        country: validatedData.country,
        product_category: validatedData.product_category,
        quantity: validatedData.quantity,
        notes: validatedData.notes,
        source: validatedData.source,
        ip_address: ip,
        user_agent: userAgent,
        utm_source,
        utm_medium,
        utm_campaign,
        is_export,
        priority,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Database Error:", dbError);
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    const inquiryId = insertedInquiry.id;

    // 6. Insert initial activity
    await supabase.from("inquiry_activities").insert([{
      inquiry_id: inquiryId,
      activity_type: "system",
      content: `Inquiry received via ${validatedData.source || 'website'}`,
      performed_by: "System"
    }]);

    // 7. Send Admin Notification Email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
        to: [process.env.INQUIRY_NOTIFICATION_EMAIL ?? "angelmetalalloys@gmail.com"],
        subject: `New Inquiry #${inquiryId} — ${validatedData.product_category || "General"} from ${validatedData.company_name || validatedData.full_name}, ${validatedData.country}`,
        react: InquiryNotificationEmail({
          inquiry: {
            id: inquiryId,
            ...validatedData,
            ip_address: ip,
            is_export,
            priority,
            status: "new"
          } as any
        }),
      });
    } catch (emailError) {
      console.error("Admin Email Error:", emailError);
    }

    // 8. Send Auto-Reply to Customer
    try {
      await sendAutoReply({
        id: inquiryId,
        ...validatedData,
      } as any);
    } catch (autoReplyError) {
      console.error("Auto-reply Email Error:", autoReplyError);
    }

    // 9. Return Success
    return NextResponse.json({ success: true, inquiryId });

  } catch (error: any) {
    console.error("API Error:", error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
