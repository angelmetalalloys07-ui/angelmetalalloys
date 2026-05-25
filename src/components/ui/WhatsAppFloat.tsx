"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down slightly
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-navy">
          Chat with us on WhatsApp
        </div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />

        {/* Button */}
        <a
          href="https://wa.me/919974334455"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-colors"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>
    </div>
  );
}
