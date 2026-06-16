"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail, Globe, ShieldCheck, MessageCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/types";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Materials", href: "/materials" },
    { name: "Industries", href: "/industries" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-navy text-white py-1.5 hidden lg:block border-b border-white/5">
        <div className="section-container flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-gold" />
              <a href="tel:+919974334455">+91 9974334455</a>
            </div>
            <div className="flex items-center gap-2 text-silver/80 hover:text-white transition-colors">
              <Mail size={14} className="text-gold" />
              <a href="mailto:info@angelalloys.com">info@angelalloys.com</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gold bg-gold/10 px-2 py-0.5 rounded-sm">
              <Globe size={12} />
              <span>Worldwide Export</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-gray-100 ${
          isScrolled ? "shadow-md shadow-gray-200/50 py-2" : "py-3 lg:py-4"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img 
              src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" 
              alt="Angel Metal Logo" 
              className="h-12 lg:h-14 w-auto object-contain transition-opacity hover:opacity-90"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-display font-black text-2xl lg:text-[32px] text-navy tracking-tight group-hover:text-gold transition-colors leading-none">
                ANGEL
              </span>
              <span className="font-sans text-[9px] lg:text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mt-1">
                Metal and Alloys
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-bold transition-colors hover:text-gold ${
                pathname === "/" ? "text-gold" : "text-navy"
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-gold ${
                  pathname.startsWith("/products") ? "text-gold" : "text-navy"
                }`}
              >
                Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-[600px] p-6 grid grid-cols-2 gap-x-8 gap-y-4 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-brand-bg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md bg-navy/5 flex items-center justify-center text-navy group-hover/item:bg-navy group-hover/item:text-gold transition-colors flex-shrink-0">
                        <span className="font-display font-bold text-sm">SS/Carbon Steel</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy group-hover/item:text-gold transition-colors mb-0.5">
                          {cat.label}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">{cat.description}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 mt-2 pt-4 border-t border-gray-100 text-center">
                    <Link href="/products" className="text-sm font-bold text-gold hover:text-navy transition-colors">
                      View Full Catalog &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold transition-colors hover:text-gold ${
                  pathname === link.href ? "text-gold" : "text-navy"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/request-quote"
              className="px-5 py-2.5 bg-gold text-navy font-bold text-sm rounded-lg hover:bg-white transition-colors shadow-lg shadow-gold/20"
            >
              Request Quote
            </Link>
            <a
              href="https://wa.me/919974334455"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-bold text-sm rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-navy p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" 
              alt="Angel Metal & Alloys Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-display font-black text-2xl text-navy tracking-tight leading-none">
                ANGEL
              </span>
              <span className="font-sans text-[9px] font-bold text-gray-500 tracking-[0.15em] uppercase mt-1">
                Metal and Alloys
              </span>
            </div>
          </Link>
          <button
            className="text-gray-500 hover:text-red-500 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg font-bold text-navy hover:text-gold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-3">
              <div className="text-lg font-bold text-navy">Products</div>
              <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                <Link
                  href="/products"
                  className="block text-gray-600 hover:text-gold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    className="block text-gray-600 hover:text-gold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-bold text-navy hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-3">
            <Link
              href="/request-quote"
              className="flex justify-center w-full px-5 py-3 bg-navy text-white font-bold rounded-lg hover:bg-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
            <a
              href="https://wa.me/919974334455"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>

          <div className="space-y-2 pt-6">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={16} className="text-gold" />
              <a href="tel:+919974334455">+91 9974334455</a>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={16} className="text-gold" />
              <a href="mailto:info@angelalloys.com">info@angelalloys.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
