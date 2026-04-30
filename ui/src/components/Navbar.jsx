// ui/src/components/Navbar.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="theme-navbar sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <span className="theme-brand-mark inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black shadow-lg shadow-black/10">
                  AR
                </span>
                <span className="theme-brand theme-brand-text text-2xl font-bold">
                  ATSResume
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="theme-outline-link inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-[rgba(233,196,106,0.45)]">
                Builder
              </Link>
              {user && (
                <Link href="/dashboard" className="theme-outline-link inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-[rgba(233,196,106,0.45)]">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="theme-chip text-sm py-1.5 px-3 rounded-full">
                      Welcome, <span className="font-semibold text-white">{user.username}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="theme-outline-link text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="theme-outline-link text-sm font-medium"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="theme-button-primary px-4 py-2 text-sm"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
