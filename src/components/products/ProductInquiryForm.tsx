"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquirySchema, type InquiryFormData } from "@/lib/validations";

interface Props {
  product: {
    name: string;
    category?: string;
  };
}

export default function ProductInquiryForm({ product }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema) as any,
    defaultValues: {
      product_category: product.name,
      source: "product-page",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setStatus("loading");
    setErrorMsg("");
    
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          utm_source: new URLSearchParams(window.location.search).get("utm_source"),
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error ?? "Failed to send inquiry.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl shadow-navy/5 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="font-display font-bold text-navy text-xl mb-2">Inquiry Sent Successfully!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your interest in {product.name}. Our sales team will get back to you with a quote within 4 business hours.
        </p>
        <button onClick={() => setStatus("idle")} className="text-gold font-semibold text-sm hover:underline">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl shadow-navy/5">
      <div className="mb-6">
        <h3 className="font-display font-bold text-navy text-xl">Request a Quote</h3>
        <p className="text-gray-500 text-sm mt-1">Get pricing for {product.name}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Full Name *</label>
          <input {...register("full_name")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="John Doe" />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Company</label>
          <input {...register("company_name")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="Company Name" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address *</label>
          <input {...register("email")} type="email" className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="john@company.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Phone *</label>
            <input {...register("mobile")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="+1 234 567 8900" />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Country *</label>
            <input {...register("country")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="e.g. UAE, USA" />
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Quantity</label>
            <input {...register("quantity")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="e.g. 500 Pcs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Grade</label>
            <input {...register("material_grade")} className="form-input bg-gray-50 border-gray-200 focus:bg-white" placeholder="e.g. 316L" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Requirements *</label>
          <textarea
            {...register("notes")}
            rows={4}
            className="form-input bg-gray-50 border-gray-200 focus:bg-white resize-none"
            placeholder="Please specify size, schedule, standard, and end-use application..."
          />
          {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2 border border-red-100">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-navy w-full justify-center disabled:opacity-70 mt-2"
        >
          {status === "loading" ? (
            <><Loader2 size={16} className="animate-spin" /> Sending...</>
          ) : (
            <>Get Quote <ArrowRight size={16} /></>
          )}
        </button>

        <p className="text-gray-400 text-xs text-center mt-3">
          We respect your privacy. No spam.
        </p>
      </form>
    </div>
  );
}
