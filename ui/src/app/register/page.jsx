"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
        setError(res.error || 'Failed to register');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-auth-shell min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="theme-auth-card max-w-md w-full space-y-8 p-8 rounded-[1.75rem]">
        <div>
          <p className="theme-kicker text-center">Create Profile</p>
          <h2 className="theme-heading mt-4 text-center text-4xl font-extrabold text-white">Create a new account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="theme-input appearance-none relative block sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="theme-input appearance-none relative block sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="theme-input appearance-none relative block sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-[#ffd9d0] text-sm text-center bg-[rgba(231,111,81,0.12)] py-2 rounded-lg border border-[rgba(231,111,81,0.24)]">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="theme-button-primary group relative w-full flex justify-center py-3 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
          
          <div className="text-center text-sm theme-muted-text">
            Already have an account?{' '}
            <Link href="/login" className="font-medium theme-teal-text hover:text-white">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
