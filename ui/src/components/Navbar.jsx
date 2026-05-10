"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : '';

  const navLinks = [
    { href: '/', label: 'Builder' },
    { href: '/dashboard', label: 'Resumes', authRequired: true },
    { href: '/job-tracker', label: 'Job Tracker', authRequired: true },
  ];

  return (
    <nav className="theme-navbar sticky top-0 w-full z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="theme-brand-mark inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black shadow-sm">
              AR
            </span>
            <span className="theme-brand theme-brand-text text-xl font-bold hidden sm:block">
              ATSResume
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, authRequired }) => {
              if (authRequired && !user) return null;
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {!loading && (
              user ? (
                <>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
                    title={user.username}
                  >
                    {initials}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5">
                    Log in
                  </Link>
                  <Link href="/register" className="btn-teal btn-teal-sm text-sm">
                    Sign up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
