"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquirySchema, type InquiryFormData } from "@/lib/validations";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Australia","Austria","Bahrain",
  "Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia","Croatia","Czech Republic",
  "Denmark","Ecuador","Egypt","Ethiopia","Finland","France","Germany","Ghana","Greece",
  "Hong Kong","Hungary","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Japan","Jordan","Kazakhstan","Kenya","Kuwait","Malaysia","Mexico","Morocco","Myanmar",
  "Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Singapore","South Africa",
  "South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Taiwan","Tanzania",
  "Thailand","Turkey","UAE","UK","Ukraine","USA","Venezuela","Vietnam","Yemen","Zimbabwe"
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema) as any,
    defaultValues: { source: "contact-form" },
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
          source: "contact-form",
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
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779779417/ChatGPT_Image_May_26_2026_12_39_40_PM_d4rlf0.png"
            alt="Contact Us Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent" />
        </div>

        <div className="section-container relative z-10">
          <h1 className="section-heading-white mb-4">
            Contact <span className="text-gradient-gold">Angel Metal & Alloys</span>
          </h1>
          <p className="text-silver/90 text-lg max-w-2xl">
            Get in touch for product inquiries, pricing, technical specifications, and export queries. 
            Our team responds within 4 business hours.
          </p>
        </div>
      </section>

      <div className="py-16 bg-brand-bg">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-6">
              {/* Office */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-navy">Office Address</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  B-820 Sun West Bank,<br />
                  Opp Rajasthan Hospital,<br />
                  Ahmedabad – 380013,<br />
                  Gujarat, India
                </p>
              </div>

              {/* Factory */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-navy">Factory / Works</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  B-11/B-12 Sumel 6 Industrial Park,<br />
                  Near Hanumanpura BRTS,<br />
                  Ahmedabad, Gujarat, India
                </p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-navy">Phone / WhatsApp</h3>
                </div>
                <div className="space-y-2">
                  {["+91 9974334455", "+91 9712012040"].map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-gray-600 text-sm hover:text-gold transition-colors">
                      <Phone size={13} className="text-gold/50" /> {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display font-bold text-navy">Email</h3>
                </div>
                <a href="mailto:info@angelalloys.com"
                  className="text-gold text-sm hover:underline break-all">
                  info@angelalloys.com
                </a>
                <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                  <Clock size={12} /> Responds within 4 business hours
                </div>
              </div>

              {/* GST */}
              <div className="bg-brand-bg border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-500">
                <span className="font-semibold text-navy">Proprietor:</span> Mahendra Mehta
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="font-display font-bold text-navy text-2xl mb-2">Send an Inquiry</h2>
                <p className="text-gray-500 text-sm mb-8">
                  Fill in the form below with your requirements. The more detail you provide, 
                  the faster we can prepare your quote.
                </p>

                {status === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="font-display font-bold text-navy text-xl mb-2">Inquiry Received!</h3>
                    <p className="text-gray-500">Our team will contact you within 4 business hours.</p>
                    <button onClick={() => setStatus("idle")}
                      className="mt-6 text-gold font-medium text-sm hover:underline">
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input {...register("full_name")} className="form-input" placeholder="Your full name" />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Company Name
                        </label>
                        <input {...register("company_name")} className="form-input" placeholder="Your company" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input {...register("email")} type="email" className="form-input" placeholder="you@company.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Phone / WhatsApp
                        </label>
                        <input {...register("mobile")} className="form-input" placeholder="+1 234 567 8900" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Country *
                        </label>
                        <select {...register("country")} className="form-input">
                          <option value="">Select Country</option>
                          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Product Interest
                        </label>
                        <input {...register("product_category")} className="form-input"
                          placeholder="e.g. SS/Carbon Steel 316L Butt Weld Elbow 6&quot;" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Required Quantity
                      </label>
                      <input {...register("quantity")} className="form-input"
                        placeholder="e.g. 2 MT, 500 Nos, 1 container" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Message / Requirements *
                      </label>
                      <textarea {...register("notes")} rows={5} className="form-input resize-none"
                        placeholder="Describe your requirements — grade, size, schedule, standard, delivery terms, port of delivery..." />
                      {errors.notes && <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>}
                    </div>

                    {status === "error" && (
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <button type="submit" disabled={status === "loading"} className="btn-gold w-full justify-center py-4 text-base disabled:opacity-70">
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Sending Inquiry...</>
                      ) : (
                        <>Send Inquiry <ArrowRight size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Map embed */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 h-72">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.985!2d72.5773!3d23.0293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzQ1LjUiTiA3MsKwMzQnMzguMyJF!5e0!3m2!1sen!2sin!4v1621500000000!5m2!1sen!2sin"
                  width="100%"
                  height="288"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Angel Metal & Alloys Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
