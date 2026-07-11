"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchResumes, fetchCustomizedResumes, deleteResume } from '../../services/resumeService';
import { fetchJobDescriptions } from '../../services/jobDescriptionService';
import { JOB_STATUSES } from '../../constants/jobStatus';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import ComingSoonBadge from '../../components/dashboard/ComingSoonBadge';
import {
  IcoFile, IcoStar, IcoBriefcase, IcoBarChart, IcoTemplate,
  IcoChevronRight, IcoPlus, IcoEdit, IcoCalendar, IcoClose, IcoDots, IcoSpinner,
} from '../../components/dashboard/icons';

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

// Overview grid intentionally excludes "saved" — it's the pre-pipeline state, not a stage of progress.
const OVERVIEW_STATUSES = JOB_STATUSES.filter((s) => s.id !== 'saved');

// ─── Sub-components ──────────────────────────────────────────────────────────

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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [resumes, setResumes] = useState([]);
  const [customResumes, setCustomResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
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
        const [r, c, j] = await Promise.all([fetchResumes(), fetchCustomizedResumes(), fetchJobDescriptions()]);
        setResumes(r);
        setCustomResumes(c);
        setJobs(j);
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

  const statusCounts = jobs.reduce((acc, j) => {
    acc[j.status] = (acc[j.status] || 0) + 1;
    return acc;
  }, {});

  const upcomingInterviews = jobs
    .filter((j) => j.status === 'interviewing' && j.interview_date)
    .sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date))
    .slice(0, 3);

  const displayName = user.first_name || user.username;
  const greeting = getGreeting();

  const quickActions = [
    { label: 'Create New Resume',     href: '/builder',       Icon: IcoFile,      available: true },
    { label: 'AI Customize Resume',   href: '/builder',       Icon: IcoStar,      available: true },
    { label: 'Track a Job',           href: '/dashboard/jobs', Icon: IcoBriefcase, available: true },
    { label: 'View Analytics',        href: '#',              Icon: IcoBarChart,  available: false },
    { label: 'Explore Templates',     href: '#',              Icon: IcoTemplate,  available: false },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                label="Tracked jobs"
                value={jobs.length}
                accent="#0EA5E9"
                sub={jobs.length > 0 ? `${(statusCounts.applied || 0) + (statusCounts.interviewing || 0)} in progress` : 'No jobs tracked yet'}
                icon={<IcoBriefcase size={18} style={{ color: '#0EA5E9' }} />}
                sparkline={<Sparkline color="#0EA5E9" points="0,25 16,25 32,25 48,25 64,25" />}
              />
              <StatCard
                label="Avg. match score"
                value={avgScore != null ? `${avgScore.toFixed(1)}%` : '—'}
                accent="#F59E0B"
                sub={customResumes.length > 0
                  ? `across ${customResumes.length} customization${customResumes.length !== 1 ? 's' : ''}`
                  : 'No customizations yet'}
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
                    <Link href="/dashboard/jobs" className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      Open tracker →
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {OVERVIEW_STATUSES.map(({ id, label, color }) => (
                      <div key={id} className="text-center">
                        <p className="text-xl font-bold text-gray-800">{statusCounts[id] || 0}</p>
                        <p className="text-[11px] text-gray-400 mt-1 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: color }}/>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {jobs.length === 0 && (
                    <p className="text-xs text-gray-400 text-center mt-4 pt-4 border-t border-gray-50">
                      Track a job application to see your pipeline here.
                    </p>
                  )}
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
                          .filter((c) => c.original_resume === resume.id)
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
                    <h2 className="text-sm font-bold text-gray-800">Upcoming interviews</h2>
                    <Link href="/dashboard/jobs" className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      Open tracker
                    </Link>
                  </div>

                  {upcomingInterviews.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingInterviews.map((job) => (
                        <Link
                          key={job.id}
                          href="/dashboard/jobs"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-teal-100 hover:bg-teal-50/20 transition-all"
                        >
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#6366F110' }}>
                            <IcoCalendar size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{job.title}</p>
                            {job.company && <p className="text-[10px] text-gray-400 truncate">@ {job.company}</p>}
                          </div>
                          <span className="text-[11px] font-semibold text-gray-500 shrink-0">
                            {new Date(job.interview_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-5 text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                        style={{ background: '#F0FDFA' }}>
                        <IcoCalendar size={30} />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">No upcoming interviews</p>
                      <p className="text-xs text-gray-400 mb-4 leading-relaxed px-2">
                        Set an interview date on a tracked job to see it here.
                      </p>
                      <Link
                        href="/dashboard/jobs"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all hover:-translate-y-px"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 8px rgba(13,148,136,0.22)' }}
                      >
                        <IcoPlus size={12} /> Track a Job
                      </Link>
                    </div>
                  )}
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
                        const title   = c.job_description?.title || 'Target Role';
                        const company = c.job_description?.company || '';
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
