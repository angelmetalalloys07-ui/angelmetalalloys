"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const videos = [
  "https://res.cloudinary.com/doudwrrwz/video/upload/q_auto/f_auto/v1779957528/mp__oedlyi.mp4",
  "https://res.cloudinary.com/doudwrrwz/video/upload/q_auto/f_auto/v1779627821/Cinematic_documentary_style_vi_uagb9t.mp4"
];

export default function HeroSection() {
  const certs = ["ISO 9001:2015", "ASME B16.5", "ASTM A182", "ASME B16.9", "IBR Approved"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Force the current video to play, especially useful for Safari/Mobile
    // which might pause inactive/invisible videos to save battery.
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.play().catch(e => console.log("Video play error:", e));
    }
  }, [currentVideoIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    } else if (isRightSwipe) {
      setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    }
  };

  return (
    <section 
      className="relative bg-navy min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-white/10 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Backgrounds */}
      {videos.map((src, index) => (
        <video 
          key={src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-luminosity transition-opacity duration-1000 ${
            index === currentVideoIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold drop-shadow-sm">Stainless Steel/Carbon Steel</span><br />
              Fittings & Flanges
            </h1>

            <p className="text-lg lg:text-xl text-silver/90 font-medium leading-relaxed mb-10 max-w-2xl drop-shadow-md">
              Manufacturer and exporter of high-integrity SS/Carbon Steel pipe fittings, flanges, and forged components for critical industrial applications.
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap justify-start gap-2 mb-12">
              {["ASME/ANSI", "ASTM", "DIN", "SS/Carbon Steel 304/316/321", "Duplex"].map((tag) => (
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

      {/* Video Carousel Indicators */}
      <div className="absolute bottom-[80px] left-0 right-0 flex justify-center gap-3 z-20 pb-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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

