"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetchResumes, fetchCustomizedResumes, deleteResume } from '../../services/resumeService';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'GOOD MORNING', emoji: '☀️' };
  if (h < 17) return { text: 'GOOD AFTERNOON', emoji: '🌤️' };
  return { text: 'GOOD EVENING', emoji: '👋' };
}

function getScoreLabel(score) {
  if (score >= 90) return 'Best match';
  if (score >= 78) return 'Strong match';
  if (score >= 60) return 'Good match';
  return 'Fair match';
}

function getScoreColor(score) {
  if (score >= 90) return '#0D9488';
  if (score >= 78) return '#10B981';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────

const IcoDashboard = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IcoFile = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const IcoStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const IcoBriefcase = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12"/>
  </svg>
);

const IcoLetter = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IcoTemplate = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const IcoBarChart = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

const IcoLink = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const IcoSettings = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const IcoLogout = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IcoChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const IcoSearch = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IcoPlus = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IcoEdit = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IcoCalendar = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M9 16l2 2 4-4"/>
  </svg>
);

const IcoClose = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IcoDots = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
);

const IcoDiamond = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.58a2.41 2.41 0 0 0 3.41 0l7.59-7.58a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/>
  </svg>
);

const IcoSpinner = () => (
  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// ─── Sub-components ──────────────────────────────────────────────────────────

function ComingSoonBadge({ className = '' }) {
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 ${className}`}>
      Soon
    </span>
  );
}

function CircularScore({ score }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = ((score ?? 0) / 100) * circ;
  const color = getScoreColor(score ?? 0);
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#E5E7EB" strokeWidth="3.5"/>
      <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3.5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 22 22)"/>
      <text x="22" y="26" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={color}>
        {score != null ? `${Math.round(score)}%` : '—'}
      </text>
    </svg>
  );
}

function Sidebar({ user, onLogout }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', Icon: IcoDashboard, comingSoon: false },
    { href: '#',          label: 'Resumes',           Icon: IcoFile,      comingSoon: false, href: '/dashboard' },
    { href: '#',          label: 'AI Customizations', Icon: IcoStar,      comingSoon: false, href: '/builder' },
    { href: '#',          label: 'Applications',      Icon: IcoBriefcase, comingSoon: true },
    { href: '#',          label: 'Cover Letters',     Icon: IcoLetter,    comingSoon: true },
    { href: '#',          label: 'Templates',         Icon: IcoTemplate,  comingSoon: true },
    { href: '#',          label: 'Analytics',         Icon: IcoBarChart,  comingSoon: true },
    { href: '#',          label: 'Linked Accounts',   Icon: IcoLink,      comingSoon: true },
    { href: '#',          label: 'Settings',          Icon: IcoSettings,  comingSoon: true },
  ];

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
        {navItems.map(({ href, label, Icon, comingSoon }) => {
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

function TopBar({ user }) {
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

function StatCard({ icon, label, value, sub, accent, sparkline }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent + '18' }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-gray-900" style={{ letterSpacing: '-0.03em' }}>{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: accent }}>{sub}</p>}
      </div>
      {sparkline && (
        <div className="shrink-0">
          {sparkline}
        </div>
      )}
    </div>
  );
}

function Sparkline({ points = '0,25 15,25 30,25 45,25 60,25', color = '#0D9488' }) {
  return (
    <svg width="64" height="32" viewBox="0 0 64 32">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RingChart({ pct, color }) {
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#E5E7EB" strokeWidth="4"/>
      <circle cx="26" cy="26" r={r} fill="none" stroke={pct ? color : '#E5E7EB'} strokeWidth="4"
        strokeDasharray={`${pct ? (pct / 100) * circ : 0} ${circ}`}
        strokeLinecap="round" transform="rotate(-90 26 26)"/>
      <text x="26" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill={pct ? color : '#9CA3AF'}>
        {pct != null ? `${Math.round(pct)}%` : '—%'}
      </text>
    </svg>
  );
}

function AppOverviewChart() {
  const today = new Date();
  const dates = [];
  for (let i = 0; i <= 28; i += 7) {
    const d = new Date(today.getFullYear(), today.getMonth(), 1 + i);
    dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  return (
    <div>
      <svg width="100%" height="90" viewBox="0 0 500 90" preserveAspectRatio="none">
        {[0, 1, 2].map((v) => (
          <line key={v} x1="28" y1={76 - v * 32} x2="496" y2={76 - v * 32} stroke="#F1F5F9" strokeWidth="1"/>
        ))}
        {[0, 1, 2].map((v) => (
          <text key={v} x="18" y={80 - v * 32} textAnchor="middle" fontSize="9" fill="#CBD5E1">{v}</text>
        ))}
        <polyline
          points="30,76 155,76 250,76 345,76 466,76"
          fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        {[30, 155, 250, 345, 466].map((x, i) => (
          <circle key={i} cx={x} cy={76} r="3.5" fill="#0D9488" stroke="white" strokeWidth="1.5"/>
        ))}
      </svg>
      <div className="flex justify-between px-5 text-[10px] text-gray-400 mt-1">
        {dates.map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [resumes, setResumes] = useState([]);
  const [customResumes, setCustomResumes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showProTip, setShowProTip] = useState(true);
  const [deleteState, setDeleteState] = useState({});

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setDataLoading(true);
      try {
        const [r, c] = await Promise.all([fetchResumes(), fetchCustomizedResumes()]);
        setResumes(r);
        setCustomResumes(c);
      } catch { /* silently fail */ }
      finally { setDataLoading(false); }
    })();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleDelete = async (id) => {
    setDeleteState((s) => ({ ...s, [id]: 'deleting' }));
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setDeleteState((s) => ({ ...s, [id]: 'idle' }));
    }
  };

  if (loading || !user) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <IcoSpinner /><span className="text-sm font-medium">Loading…</span>
        </div>
      </div>
    );
  }

  const avgScore = customResumes.length
    ? customResumes.reduce((sum, c) => sum + (c.match_score || 0), 0) / customResumes.length
    : null;

  const displayName = user.first_name || user.username;
  const greeting = getGreeting();

  const quickActions = [
    { label: 'Create New Resume',     href: '/builder', Icon: IcoFile,      available: true },
    { label: 'AI Customize Resume',   href: '/builder', Icon: IcoStar,      available: true },
    { label: 'Track Applications',    href: '#',        Icon: IcoBriefcase, available: false },
    { label: 'View Analytics',        href: '#',        Icon: IcoBarChart,  available: false },
    { label: 'Explore Templates',     href: '#',        Icon: IcoTemplate,  available: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" style={{ fontFamily: 'inherit' }}>

      {/* ── Sidebar ── */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <TopBar user={user} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-7xl mx-auto space-y-5">

            {/* ── Welcome ── */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {greeting.text} {greeting.emoji}
                </p>
                <h1 className="text-2xl font-bold text-gray-900" style={{ letterSpacing: '-0.025em' }}>
                  Welcome back, {displayName}
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px shrink-0"
                style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 10px rgba(13,148,136,0.22)' }}
              >
                <IcoPlus /> New Resume
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </Link>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Saved resumes"
                value={resumes.length}
                accent="#0D9488"
                sub={resumes.length > 0 ? `▲ ${resumes.length} this month` : 'No resumes yet'}
                icon={<IcoFile size={18} style={{ color: '#0D9488' }} />}
                sparkline={<Sparkline
                  color="#0D9488"
                  points={resumes.length ? '0,22 16,14 32,18 48,8 64,12' : '0,25 16,25 32,25 48,25 64,25'}
                />}
              />
              <StatCard
                label="AI customizations"
                value={customResumes.length}
                accent="#6366F1"
                sub={customResumes.length > 0 ? `${customResumes.length} customized` : 'No activity yet'}
                icon={<IcoStar size={18} style={{ color: '#6366F1' }} />}
                sparkline={<Sparkline color="#6366F1" points="0,25 16,25 32,25 48,25 64,25" />}
              />
              <StatCard
                label="Avg. match score"
                value={avgScore != null ? `${avgScore.toFixed(1)}%` : '—'}
                accent="#F59E0B"
                sub={customResumes.length > 0
                  ? `across ${customResumes.length} application${customResumes.length !== 1 ? 's' : ''}`
                  : 'No applications yet'}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>}
                sparkline={<RingChart pct={avgScore} color="#F59E0B" />}
              />
            </div>

            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-5 gap-5">

              {/* Left col (3/5) */}
              <div className="col-span-3 space-y-5">

                {/* Application overview */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-bold text-gray-800">Application overview</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 font-medium">
                        This month ▾
                      </span>
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 uppercase tracking-wide">
                        Coming soon
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-5 pb-5 border-b border-gray-50">
                    {[
                      { label: 'Applied',   value: 0, color: '#0D9488' },
                      { label: 'Interview', value: 0, color: '#6366F1' },
                      { label: 'Offer',     value: 0, color: '#10B981' },
                      { label: 'Rejected',  value: 0, color: '#EF4444' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="text-center">
                        <p className="text-xl font-bold text-gray-800">{value}</p>
                        <p className="text-[11px] text-gray-400 mt-1 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }}/>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <AppOverviewChart />
                </div>

                {/* Your Resumes */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-800">Your Resumes</h2>
                    <Link href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      View all
                    </Link>
                  </div>

                  {dataLoading ? (
                    <div className="flex items-center gap-2 py-8 text-gray-400">
                      <IcoSpinner /><span className="text-sm">Loading…</span>
                    </div>
                  ) : resumes.length === 0 ? (
                    <div className="flex flex-col items-center py-10 text-center">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: '#0D948810' }}>
                        <IcoFile size={20} style={{ color: '#0D9488' }} />
                      </div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">No resumes yet</p>
                      <p className="text-xs text-gray-400 mb-4">Build your master CV in the editor and save it here.</p>
                      <Link
                        href="/builder"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 8px rgba(13,148,136,0.22)' }}
                      >
                        <IcoEdit /> Open Builder
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {resumes.slice(0, 4).map((resume) => {
                        const name     = resume.resume_data?.name || resume.resume_data?.personalInfo?.name || `Resume #${resume.id}`;
                        const position = resume.resume_data?.position || resume.resume_data?.personalInfo?.position || '';
                        const date     = new Date(resume.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        const ds       = deleteState[resume.id] || 'idle';

                        const related   = customResumes
                          .filter((c) => c.resume === resume.id)
                          .sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
                        const bestScore = related[0]?.match_score ?? null;

                        return (
                          <div
                            key={resume.id}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/20 transition-all group"
                          >
                            {/* Doc icon */}
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: '#0D948810' }}>
                              <IcoFile size={15} style={{ color: '#0D9488' }} />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
                                  style={{ background: '#0D948815', color: '#0D9488' }}>
                                  MASTER
                                </span>
                              </div>
                              {position && <p className="text-xs text-gray-400 truncate">{position}</p>}
                              <p className="text-xs text-gray-400 mt-0.5">Saved {date}</p>
                            </div>

                            {/* Score + actions */}
                            <div className="flex items-center gap-3 shrink-0">
                              {bestScore != null && (
                                <div className="flex flex-col items-center">
                                  <CircularScore score={bestScore} />
                                  <span className="text-[9px] text-gray-400 mt-0.5" style={{ color: getScoreColor(bestScore) }}>
                                    {getScoreLabel(bestScore)}
                                  </span>
                                </div>
                              )}

                              {/* Three-dot / delete */}
                              {ds === 'confirming' ? (
                                <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-2 py-1">
                                  <span className="text-[11px] text-red-600 font-medium">Delete?</span>
                                  <button
                                    onClick={() => handleDelete(resume.id)}
                                    className="text-[11px] font-bold text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    Yes
                                  </button>
                                  <span className="text-red-200">|</span>
                                  <button
                                    onClick={() => setDeleteState((s) => ({ ...s, [resume.id]: 'idle' }))}
                                    className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteState((s) => ({ ...s, [resume.id]: 'confirming' }))}
                                  className="p-1.5 rounded-lg text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <IcoDots />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {resumes.length > 4 && (
                        <p className="text-xs text-gray-400 text-center pt-1">
                          +{resumes.length - 4} more ·{' '}
                          <Link href="#" className="text-teal-600 hover:underline font-medium">View all</Link>
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Right col (2/5) */}
              <div className="col-span-2 space-y-5">

                {/* Upcoming */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-gray-800">Upcoming</h2>
                    <button disabled className="text-xs font-semibold text-teal-600 opacity-40 cursor-not-allowed">
                      View calendar
                    </button>
                  </div>

                  <div className="flex flex-col items-center py-5 text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: '#F0FDFA' }}>
                      <IcoCalendar size={30} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">No upcoming events</p>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed px-2">
                      Add interview dates or follow-ups to stay on track.
                    </p>
                    <button
                      disabled
                      className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-200 text-gray-400 px-4 py-2 rounded-xl cursor-not-allowed"
                    >
                      <IcoPlus size={12} /> Add Event
                    </button>
                    <span className="text-[10px] text-amber-500 font-semibold mt-2 uppercase tracking-wide">
                      Coming soon
                    </span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <h2 className="text-sm font-bold text-gray-800 mb-3">Quick actions</h2>

                  <div className="space-y-0.5">
                    {quickActions.map(({ label, href, Icon, available }) => (
                      <Link
                        key={label}
                        href={available ? href : '#'}
                        onClick={(e) => !available && e.preventDefault()}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                          ${available
                            ? 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                            : 'text-gray-300 cursor-not-allowed'}`}
                      >
                        <Icon size={15} />
                        <span className="flex-1">{label}</span>
                        {available
                          ? <IcoChevronRight size={12} />
                          : <ComingSoonBadge />}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* AI Customizations preview (if any) */}
                {!dataLoading && customResumes.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-100 p-5"
                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-sm font-bold text-gray-800">AI Customizations</h2>
                      <span className="text-xs font-semibold text-indigo-600">{customResumes.length} total</span>
                    </div>
                    <div className="space-y-2">
                      {customResumes.slice(0, 3).map((c) => {
                        const title   = c.job_description_details?.title || 'Target Role';
                        const company = c.job_description_details?.company || '';
                        const score   = c.match_score;
                        const color   = getScoreColor(score ?? 0);
                        return (
                          <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#6366F110' }}>
                              <IcoStar size={13} style={{ color: '#6366F1' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-800 truncate">{title}</p>
                              {company && <p className="text-[10px] text-gray-400 truncate">@ {company}</p>}
                            </div>
                            {score != null && (
                              <span className="text-xs font-bold shrink-0" style={{ color }}>
                                {score.toFixed(0)}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ── Pro tip banner ── */}
            {showProTip && (
              <div
                className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/20">
                  <IcoStar size={16} style={{ color: 'white' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Pro tip</p>
                  <p className="text-xs text-white/80 mt-0.5">
                    Tailor your resume to each job and increase your match score.
                  </p>
                </div>
                <Link
                  href="/builder"
                  className="shrink-0 text-sm font-semibold bg-white text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-xl transition-colors"
                >
                  Try AI Customization
                </Link>
                <button
                  onClick={() => setShowProTip(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <IcoClose />
                </button>
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
