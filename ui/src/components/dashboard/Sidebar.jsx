"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  IcoDashboard, IcoFile, IcoStar, IcoBriefcase, IcoLetter, IcoTemplate,
  IcoBarChart, IcoLink, IcoSettings, IcoLogout, IcoDiamond,
} from './icons';
import ComingSoonBadge from './ComingSoonBadge';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', Icon: IcoDashboard, comingSoon: false },
  { href: '/dashboard', label: 'Resumes', Icon: IcoFile, comingSoon: false },
  { href: '/builder', label: 'AI Customizations', Icon: IcoStar, comingSoon: false },
  { href: '/dashboard/jobs', label: 'Job Tracker', Icon: IcoBriefcase, comingSoon: false },
  { href: '#', label: 'Cover Letters', Icon: IcoLetter, comingSoon: true },
  { href: '#', label: 'Templates', Icon: IcoTemplate, comingSoon: true },
  { href: '#', label: 'Analytics', Icon: IcoBarChart, comingSoon: true },
  { href: '#', label: 'Linked Accounts', Icon: IcoLink, comingSoon: true },
  { href: '#', label: 'Settings', Icon: IcoSettings, comingSoon: true },
];

export default function Sidebar({ user, onLogout }) {
  const pathname = usePathname();
  const initials = user?.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full bg-white border-r border-gray-100 overflow-y-auto"
      style={{ boxShadow: '1px 0 0 #F1F5F9' }}>

      {/* Logo */}
      <div className="px-5 h-14 flex items-center gap-2.5 border-b border-gray-100">
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}>
          AR
        </span>
        <span className="text-sm font-bold" style={{
          background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          ATSResume
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, Icon, comingSoon }) => {
          const isActive = !comingSoon && pathname === href;
          return (
            <Link
              key={label}
              href={comingSoon ? '#' : href}
              onClick={(e) => comingSoon && e.preventDefault()}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-teal-50 text-teal-700'
                  : comingSoon
                    ? 'text-gray-300 cursor-default'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
            >
              <Icon size={15} />
              <span className="flex-1 truncate">{label}</span>
              {comingSoon && <ComingSoonBadge />}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="mx-3 mb-3 rounded-2xl p-4 text-center border border-purple-100"
        style={{ background: 'linear-gradient(135deg, #6366F108, #0D948808)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
          style={{ background: '#6366F115' }}>
          <IcoDiamond />
        </div>
        <p className="text-xs font-bold text-gray-800 mb-1">Unlock Premium</p>
        <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
          Get AI suggestions, advanced analytics and more.
        </p>
        <button className="w-full py-2 text-xs font-bold text-white rounded-xl transition-all hover:-translate-y-px"
          style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 8px rgba(13,148,136,0.25)' }}>
          Upgrade Now
        </button>
      </div>

      {/* User footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-800 truncate">{user?.username}</p>
            <p className="text-[10px] text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          <IcoLogout />
          Sign out
        </button>
      </div>
    </aside>
  );
}
