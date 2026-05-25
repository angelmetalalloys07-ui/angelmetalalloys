"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Sparkles,
  Globe,
  Calendar,
  FileText,
  Clock,
  Trophy,
  XCircle,
  Package,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const sections = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard }
      ]
    },
    {
      title: "LEADS",
      items: [
        { name: "All Inquiries", href: "/admin/inquiries", icon: Inbox },
        { name: "New Leads", href: "/admin/inquiries?status=new", icon: Sparkles },
        { name: "Export Inquiries", href: "/admin/inquiries?is_export=true", icon: Globe },
        { name: "Today's Leads", href: "/admin/inquiries?date=today", icon: Calendar },
      ]
    },
    {
      title: "CRM",
      items: [
        { name: "Quotations Sent", href: "/admin/inquiries?status=quoted", icon: FileText },
        { name: "Follow-ups Due", href: "/admin/inquiries?follow_up=due", icon: Clock },
        { name: "Won Deals", href: "/admin/inquiries?status=won", icon: Trophy },
        { name: "Lost Leads", href: "/admin/inquiries?status=lost", icon: XCircle },
      ]
    },
    {
      title: "CATALOGUE",
      items: [
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Add Product", href: "/admin/products/new", icon: PlusCircle },
      ]
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-[#0a1628] text-white flex flex-col border-r border-white/10 transition-all duration-300 z-50 ${
        isCollapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
        {!isCollapsed && (
          <Link href="/admin" className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-wider text-white">ANGEL METAL</span>
            <span className="font-sans text-[9px] font-bold text-gold tracking-[0.2em] uppercase -mt-1">Admin Portal</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded bg-gold text-navy font-black flex items-center justify-center mx-auto">
            A
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-silver/60 hover:text-white transition-colors p-1"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="px-3">
              {!isCollapsed && (
                <div className="text-[10px] font-bold text-silver/40 uppercase tracking-widest mb-3 px-3">
                  {section.title}
                </div>
              )}
              {isCollapsed && <div className="h-4" />} {/* Spacing when collapsed */}
              
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  // Exact match for dashboard, startswith for others
                  const isActive = item.href === "/admin" 
                    ? pathname === "/admin" 
                    : pathname.startsWith(item.href.split('?')[0]);
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                          isActive 
                            ? "bg-gold text-navy font-semibold" 
                            : "text-silver/70 hover:bg-white/5 hover:text-white font-medium"
                        }`}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={`${isActive ? "text-navy" : "text-silver/50 group-hover:text-gold"}`} />
                          {!isCollapsed && <span className="text-sm">{item.name}</span>}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 font-medium transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
}
