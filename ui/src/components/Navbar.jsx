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
    { href: '/dashboard', label: 'Dashboard', authRequired: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 w-full z-50" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" style={{ textDecoration: 'none' }}>
            <span
              className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
            >
              AR
            </span>
            <span
              className="hidden sm:block text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              ATSResume
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, authRequired }) => {
              if (authRequired && !user) return null;
              const isActive = pathname === href || pathname.startsWith(href + '/');
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
          <div className="flex items-center gap-3 ml-auto">
            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/builder"
                    className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-900 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Builder
                  </Link>
                  <div className="w-px h-5 bg-gray-200 hidden sm:block" />
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
                      title={user.username}
                    >
                      {initials}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:-translate-y-px active:translate-y-0"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 8px rgba(13,148,136,0.3)' }}
                  >
                    Get started
                  </Link>
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
