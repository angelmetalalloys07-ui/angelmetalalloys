"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const certs = ["ISO 9001:2015", "ASME B16.5", "ASTM A182", "ASME B16.9", "IBR Approved"];

  return (
    <section className="relative bg-navy min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-white/10">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-luminosity"
      >
        <source src="https://res.cloudinary.com/doudwrrwz/video/upload/q_auto/f_auto/v1779627821/Cinematic_documentary_style_vi_uagb9t.mp4" type="video/mp4" />
      </video>

      {/* Advanced Directional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06101f] via-[#06101f]/90 lg:via-[#06101f]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-transparent to-transparent pointer-events-none" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none mix-blend-overlay" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 pt-28 pb-20 flex-1 flex flex-col justify-center w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Award size={14} className="text-gold drop-shadow-md" />
              Est. 2007 · Ahmedabad · Worldwide Export
            </div>

            <h1 className="text-5xl lg:text-7xl font-display font-black text-white leading-[1.05] mb-6 drop-shadow-lg">
              Premium Quality <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold drop-shadow-sm">Stainless Steel</span><br />
              Fittings & Flanges
            </h1>

            <p className="text-lg lg:text-xl text-silver/90 font-medium leading-relaxed mb-10 max-w-2xl drop-shadow-md">
              Manufacturer and exporter of high-integrity SS pipe fittings, flanges, and forged components for critical industrial applications.
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap justify-start gap-2 mb-12">
              {["ASME/ANSI", "ASTM", "DIN", "SS 304/316/321", "Duplex"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 backdrop-blur-sm text-silver font-bold text-xs rounded-md border border-white/10 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-start gap-4 w-full sm:w-auto">
              <Link href="/request-quote" className="btn-gold group text-sm px-8 py-4 w-full sm:w-auto text-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                Get Instant Quote 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products" className="btn-navy-outline bg-white/5 backdrop-blur-sm text-white font-bold border-white/20 hover:bg-white/15 text-sm px-8 py-4 w-full sm:w-auto text-center justify-center">
                Browse Catalog
              </Link>
            </div>
          </div>
          {/* Right Column (Empty for Video Visibility) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5"></div>
        </div>
      </div>

      {/* Bottom Strip: Sleek Glassmorphism Certifications */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl absolute bottom-0 w-full z-20">
        <div className="section-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-silver/60">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck size={18} className="text-gold" />
              <span>Certified Quality:</span>
            </div>
            {certs.map((cert) => (
              <div key={cert} className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <CheckCircle2 size={14} className="text-gold/50" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
