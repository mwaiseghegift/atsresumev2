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
    <nav className="bg-slate-800 border-b border-slate-700 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                ATSResume
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="border-transparent text-slate-300 hover:border-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Builder
              </Link>
              {user && (
                <Link href="/dashboard" className="border-transparent text-slate-300 hover:border-slate-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
                    <span className="text-sm text-slate-300 bg-slate-700/50 py-1 px-3 rounded-full">
                      Welcome, <span className="font-semibold text-white">{user.username}</span>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/25"
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
