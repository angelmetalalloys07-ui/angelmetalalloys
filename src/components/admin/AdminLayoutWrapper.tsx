"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? "lg:ml-[80px]" : "lg:ml-[260px]"
        }`}
      >
        <div className="p-8 min-h-full">{children}</div>
      </main>
    </div>
  );
}
