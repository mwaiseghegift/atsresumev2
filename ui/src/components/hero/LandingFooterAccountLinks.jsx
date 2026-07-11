"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const linkClass = "text-xs transition-colors hover:text-white";
const linkStyle = { color: "rgba(255,255,255,0.42)" };

/** Footer "Account" column links — shows sign in/register when logged out,
 * dashboard/sign out when logged in, instead of always prompting to register. */
export default function LandingFooterAccountLinks() {
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <>
        <li>
          <Link href="/dashboard" className={linkClass} style={linkStyle}>
            Dashboard
          </Link>
        </li>
        <li>
          <button type="button" onClick={logout} className={linkClass} style={linkStyle}>
            Sign out
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/login" className={linkClass} style={linkStyle}>
          Sign in
        </Link>
      </li>
      <li>
        <Link href="/register" className={linkClass} style={linkStyle}>
          Register free
        </Link>
      </li>
    </>
  );
}
