"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await register(username, email, password);
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.error || 'Failed to create account');
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

      {/* ── Left form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full" style={{ maxWidth: '400px' }}>

          {/* Mobile brand */}
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
              Create your account
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">
              Start building resumes that actually get responses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 transition-all"
                style={{ outline: 'none', ...blurStyle }}
                placeholder="choose_a_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 transition-all"
                style={{ outline: 'none', ...blurStyle }}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 transition-all"
                style={{ outline: 'none', ...blurStyle }}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, blurStyle)}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="pt-1">
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
                    Creating account…
                  </span>
                ) : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-900 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right feature panel ── */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 shrink-0"
        style={{ background: 'linear-gradient(155deg, #134E4A 0%, #0F766E 45%, #0D9488 100%)' }}
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
              Free to get started
            </p>
            <h2 className="text-white font-bold text-[2.1rem] leading-tight" style={{ letterSpacing: '-0.03em' }}>
              Your resume,<br />optimized for every job.
            </h2>
            <p className="text-teal-100 mt-5 text-[0.95rem] leading-relaxed" style={{ maxWidth: '340px' }}>
              Stop rewriting your resume from scratch. Build once, customize infinitely — tailored to each role in seconds.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {[
              {
                title: 'Master CV builder',
                desc: 'Create your complete resume with a clean, section-by-section editor.',
              },
              {
                title: 'AI job customizer',
                desc: 'Paste a job description and get an ATS-optimized version instantly.',
              },
              {
                title: 'Match score insights',
                desc: 'See exactly how well your resume aligns with each role before you apply.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.14)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-teal-100 text-xs mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-teal-200 text-xs" style={{ opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} ATSResume &mdash; Built for job seekers.
        </p>
      </div>

    </div>
  );
}
