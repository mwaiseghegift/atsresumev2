"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const EyeIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.6 18.6 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const UserIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.error || 'Invalid username or password');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = { borderColor: '#0D9488', boxShadow: '0 0 0 3px rgba(13,148,136,0.12)' };
  const blurStyle  = { borderColor: '#D1D5DB', boxShadow: 'none' };

  return (
    <div className="flex bg-gray-50" style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Left brand panel ── */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 shrink-0"
        style={{ background: 'linear-gradient(155deg, #0D9488 0%, #0F766E 55%, #134E4A 100%)' }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              AR
            </span>
            <span className="text-white text-xl font-bold" style={{ letterSpacing: '-0.02em' }}>
              ATSResume
            </span>
          </div>

          <div className="mt-16">
            <p className="text-teal-100 text-xs font-bold uppercase tracking-widest mb-5">
              Resume Intelligence
            </p>
            <h1 className="text-white font-bold text-[2.1rem] leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Build resumes that<br />get through the door.
            </h1>
            <p className="text-teal-100 mt-5 text-[0.95rem] leading-relaxed" style={{ maxWidth: '340px' }}>
              AI-powered optimization that tailors your resume to each job description — so recruiters actually see you.
            </p>
          </div>

          <ul className="mt-10 space-y-4">
            {[
              'Match score analysis for every application',
              'ATS keyword optimization powered by Gemini',
              'One-click customization from your master CV',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-teal-50 text-sm leading-snug">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.18)' }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-teal-200 text-xs" style={{ opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} ATSResume &mdash; Smarter job applications.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full" style={{ maxWidth: '380px' }}>

          {/* Mobile-only brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
            >
              AR
            </span>
            <span className="font-bold text-gray-900" style={{ letterSpacing: '-0.02em' }}>ATSResume</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900" style={{ letterSpacing: '-0.025em' }}>
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">
              Sign in to access your resumes and applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  {UserIcon}
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 transition-all"
                  style={{ outline: 'none', ...blurStyle }}
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  {LockIcon}
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 transition-all"
                  style={{ outline: 'none', ...blurStyle }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? EyeOffIcon : EyeIcon}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-start gap-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-px active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #0D9488, #0F766E)',
                boxShadow: '0 2px 10px rgba(13,148,136,0.28)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-teal-700 hover:text-teal-900 transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
