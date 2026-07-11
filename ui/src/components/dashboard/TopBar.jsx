"use client";

import Link from 'next/link';
import { IcoSearch, IcoEdit } from './icons';

export default function TopBar({ user }) {
  const initials = user?.username?.slice(0, 2).toUpperCase() || 'U';
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-4 px-6 shrink-0">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <IcoSearch />
        </span>
        <input
          type="text"
          placeholder="Search resumes, jobs, or content..."
          className="w-full pl-9 pr-14 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-white border border-gray-200 rounded-md px-1.5 py-0.5 font-mono">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        {/* Builder button */}
        <Link
          href="/builder"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-teal-700 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-teal-200 hover:bg-teal-50 transition-all"
        >
          <IcoEdit />
          Builder
        </Link>

        {/* User avatar + name */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}>
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700">{user?.username}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
