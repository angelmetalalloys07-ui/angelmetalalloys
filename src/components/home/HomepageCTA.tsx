"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InquirySchema, type InquiryFormData } from "@/lib/validations";

export default function HomepageCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema) as any,
    defaultValues: { source: "website" },
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

  return (
    <section
      id="inquiry"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 60%, #0a1628 100%)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/8 blur-3xl pointer-events-none" />

      <div className="relative section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="section-tag text-gold/80">
              <span className="w-8 h-0.5 bg-gold" />
              Get In Touch
            </div>
            <h2 className="section-heading-white mb-6">
              Ready to Source{" "}
              <span className="text-gradient-gold">Premium SS Fittings?</span>
            </h2>
            <p className="text-silver/70 text-lg leading-relaxed mb-8">
              Tell us your requirements — product type, grade, size, quantity, and delivery port. 
              Our team responds within <strong className="text-gold">4 business hours</strong>.
            </p>
            <div className="space-y-3">
              {[
                "Free grade selection consultation",
                "Competitive FOB / CIF pricing",
                "Mill test certificates with every order",
                "Third-party inspection support",
                "Air & sea freight worldwide",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-silver/80 text-sm">
                  <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                  {point}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/request-quote" className="btn-gold">
                Get Detailed Quote <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919974334455?text=Hello%2C%20I%20am%20interested%20in%20your%20SS%20pipe%20fittings."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm border-2 border-white/20 hover:border-green-400/60 hover:text-green-400 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Quick Inquiry Form */}
          <div className="glass-card p-8">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Inquiry Sent!</h3>
                <p className="text-silver/70 text-sm">
                  Thank you! We&apos;ll respond within 4 business hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-gold text-sm font-medium hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-white text-xl mb-6">
                  Quick Inquiry
                </h3>
                <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("full_name")}
                        placeholder="Your Name *"
                        className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                      />
                      {errors.full_name && <p className="text-red-400 text-xs mt-1">{errors.full_name.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register("company_name")}
                        placeholder="Company"
                        className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email Address *"
                      className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("mobile")}
                        placeholder="Phone / WhatsApp"
                        className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <input
                        {...register("country")}
                        placeholder="Country *"
                        className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                      />
                      {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input
                      {...register("product_category")}
                      placeholder="Product Interest (e.g. SS 316L Butt Weld Elbow 6&quot;)"
                      className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <textarea
                      {...register("notes")}
                      placeholder="Message / Requirements *"
                      rows={3}
                      className="form-input bg-white/10 border-white/20 text-white placeholder:text-silver/50 focus:border-gold focus:ring-gold/20 resize-none"
                    />
                    {errors.notes && <p className="text-red-400 text-xs mt-1">{errors.notes.message}</p>}
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-3 py-2">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold w-full justify-center disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : (
                      <>Send Inquiry <ArrowRight size={16} /></>
                    )}
                  </button>

                  <p className="text-silver/40 text-xs text-center">
                    Your information is kept strictly confidential.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
