"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteSchema, type QuoteFormData } from "@/lib/validations";
import { CheckCircle2, Loader2, ArrowRight, Phone, Mail } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/types";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Australia","Austria","Bahrain",
  "Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia","Denmark","Egypt",
  "Finland","France","Germany","Ghana","Greece","Hong Kong","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait",
  "Malaysia","Mexico","Morocco","Myanmar","Netherlands","New Zealand","Nigeria","Norway",
  "Oman","Pakistan","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Saudi Arabia","Singapore","South Africa","South Korea","Spain","Sri Lanka","Sweden",
  "Switzerland","Taiwan","Tanzania","Thailand","Turkey","UAE","UK","Ukraine","USA",
  "Venezuela","Vietnam","Yemen","Zimbabwe"
];

const GRADES = [
  "SS/Carbon Steel 304", "SS/Carbon Steel 304L", "SS/Carbon Steel 316", "SS/Carbon Steel 316L", "SS/Carbon Steel 321", "SS/Carbon Steel 347",
  "SS/Carbon Steel 904L", "Duplex 2205", "Super Duplex 2507", "SS/Carbon Steel 310", "SS/Carbon Steel 317L",
];

export default function RequestQuotePage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setStatus("loading");
    setErrorMsg("");
    
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "quote-form",
          utm_source: new URLSearchParams(window.location.search).get("utm_source"),
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
        setErrorMsg(result.error ?? "Failed to send inquiry.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="section-container relative">
          <h1 className="section-heading-white mb-4">
            Request a <span className="text-gradient-gold">Quote</span>
          </h1>
          <p className="text-silver/70 text-lg max-w-2xl">
            Fill in your requirements below. Our team will respond with competitive pricing 
            within 4–8 business hours.
          </p>
        </div>
      </section>

      <div className="py-16 bg-brand-bg">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h2 className="font-display font-bold text-navy text-2xl mb-3">Quote Request Sent!</h2>
                  <p className="text-gray-500 mb-2">
                    Thank you! We&apos;ve received your quote request and will respond within 4–8 business hours.
                  </p>
                  <p className="text-gray-400 text-sm mb-8">
                    For urgent requirements, call us directly at <strong className="text-navy">+91 9974334455</strong>
                  </p>
                  <button onClick={() => setStatus("idle")}
                    className="btn-gold inline-flex">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                  <h2 className="font-display font-bold text-navy text-xl mb-6">Quote Details</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Contact Section */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                        Your Contact Information
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                          <input {...register("full_name")} className="form-input" placeholder="Your full name" />
                          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name *</label>
                          <input {...register("company_name")} className="form-input" placeholder="Your company" />
                          {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                          <input {...register("email")} type="email" className="form-input" placeholder="you@company.com" />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone / WhatsApp *</label>
                          <input {...register("mobile")} className="form-input" placeholder="+1 234 567 8900" />
                          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Country *</label>
                          <select {...register("country")} className="form-input">
                            <option value="">Select Your Country</option>
                            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Product Section */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                        Product Requirements
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Category *</label>
                          <select {...register("product_category")} className="form-input">
                            <option value="">Select Category</option>
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <option key={cat.slug} value={cat.label}>{cat.label}</option>
                            ))}
                          </select>
                          {errors.product_category && <p className="text-red-500 text-xs mt-1">{errors.product_category.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name / Type</label>
                          <input {...register("product_subcategory")} className="form-input" placeholder="e.g. 90° LR Elbow, Weld Neck Flange" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Material Grade</label>
                          <select {...register("material_grade")} className="form-input">
                            <option value="">Select Grade</option>
                            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Size / Schedule</label>
                          <input {...register("size_nb")} className="form-input" placeholder='e.g. 4" NB SCH 40S' />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity Required *</label>
                          <input {...register("quantity")} className="form-input" placeholder="e.g. 500 Nos, 2 MT, 1 FCL" />
                          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Destination Port / City</label>
                          <input {...register("delivery_port")} className="form-input" placeholder="e.g. Jebel Ali, Rotterdam" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Special Requirements / Notes *</label>
                          <textarea {...register("notes")} rows={5} className="form-input resize-none"
                            placeholder="Standard required, end use application, delivery timeline, trade terms (FOB/CIF/DDP), inspection agency, any other special requirements..." />
                          {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
                        </div>
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">{errorMsg}</div>
                    )}

                    <button type="submit" disabled={status === "loading"}
                      className="btn-gold w-full justify-center py-4 text-base disabled:opacity-60">
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Submitting Request...</>
                      ) : (
                        <>Submit Quote Request <ArrowRight size={18} /></>
                      )}
                    </button>

                    <p className="text-gray-400 text-xs text-center">
                      All information is kept strictly confidential. We will never share your contact details.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="space-y-5">
              <div className="bg-navy rounded-2xl p-6 text-center">
                <div className="text-gold font-display font-bold text-2xl mb-1">4–8 Hours</div>
                <div className="text-silver/70 text-sm">Average response time</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
                <h3 className="font-display font-bold text-navy text-base">Direct Contact</h3>
                <a href="tel:+919712012040" className="flex items-center gap-3 text-gray-600 text-sm hover:text-gold transition-colors">
                  <Phone size={15} className="text-gold" /> +91 9712012040
                </a>
                <a href="mailto:angelmetalalloys@gmail.com" className="flex items-center gap-3 text-gold text-sm hover:underline break-all">
                  <Mail size={15} className="text-gold flex-shrink-0" /> angelmetalalloys@gmail.com
                </a>
              </div>
              <div className="bg-brand-bg border border-gray-200 rounded-2xl p-6 space-y-3">
                <h3 className="font-display font-bold text-navy text-sm">What to Expect</h3>
                {[
                  "Competitive FOB/CIF pricing",
                  "Lead time & availability",
                  "MTC & certification details",
                  "Packing & marking options",
                  "TPI arrangement if needed",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={13} className="text-gold flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
