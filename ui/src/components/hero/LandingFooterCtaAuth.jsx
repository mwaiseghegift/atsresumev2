"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

/** Secondary CTA button in the footer's "build a resume" section — swaps the
 * register prompt for a dashboard link when the visitor is already signed in. */
export default function LandingFooterCtaAuth() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Link
      href={user ? "/dashboard" : "/register"}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5"
      style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      {user ? "Go to Dashboard" : "Create free account"}
    </Link>
  );
}
