"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redirect to dashboard
        router.push("/admin");
        router.refresh();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://res.cloudinary.com/doudwrrwz/image/upload/q_auto/f_auto/v1779628595/lohi_j6uiop.png" 
              alt="Angel Metal & Alloys Logo" 
              className="h-16 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <p className="font-sans text-xs font-bold text-gold tracking-[0.3em] uppercase">
            Admin Portal
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Admin ID (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="admin@angelmetal.com"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Master Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStatus("idle");
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {status === "error" && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                Invalid Admin ID or Master Password.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-navy text-white font-semibold rounded-xl hover:bg-gold transition-colors disabled:opacity-70 disabled:hover:bg-navy"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Secure Login <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
