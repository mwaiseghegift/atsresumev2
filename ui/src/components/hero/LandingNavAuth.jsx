"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function LandingNavAuth() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-3 shrink-0" aria-hidden="true">
        <div className="w-20 h-4 rounded hidden sm:block" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div className="w-28 h-9 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
    );
  }

  if (user) {
    const initials = user.username?.slice(0, 2).toUpperCase() || "U";
    return (
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={logout}
          className="hidden sm:block text-sm font-medium transition-colors"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          Sign out
        </button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 2px 12px rgba(13,148,136,0.4)" }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
          >
            {initials}
          </span>
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 shrink-0">
      <Link
        href="/login"
        className="hidden sm:block text-sm font-medium transition-colors"
        style={{ color: "rgba(255,255,255,0.58)" }}
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="hidden sm:block text-sm font-medium border rounded-lg px-3.5 py-1.5 transition-colors"
        style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.12)" }}
      >
        Register
      </Link>
      <Link
        href="/builder"
        className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px hover:opacity-90"
        style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 2px 12px rgba(13,148,136,0.4)" }}
      >
        Get started free
      </Link>
    </div>
  );
}
