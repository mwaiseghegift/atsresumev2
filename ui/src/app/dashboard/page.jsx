"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchResumes, fetchCustomizedResumes, deleteResume } from '../../services/resumeService';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent + '18' }}
      >
        {icon(accent)}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900" style={{ letterSpacing: '-0.03em' }}>{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ResumeCard({ resume, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting]     = useState(false);

  const name     = resume.resume_data?.name || resume.resume_data?.personalInfo?.name || `Resume #${resume.id}`;
  const position = resume.resume_data?.position || resume.resume_data?.personalInfo?.position || '';
  const date     = new Date(resume.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteResume(resume.id);
      onDelete(resume.id);
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: '3px solid #0D9488' }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
          {position && <p className="text-xs text-gray-400 mt-0.5 truncate">{position}</p>}
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
          style={{ background: '#0D948818', color: '#0D9488' }}
        >
          Master
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400 shrink-0">Saved {date}</span>

        <div className="flex items-center gap-2">
          {/* Edit link */}
          <Link
            href="/builder"
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition-colors"
          >
            Edit
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Delete — two-step inline confirm */}
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete resume"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-2 py-1">
              <span className="text-[11px] text-red-600 font-medium whitespace-nowrap">Delete?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-[11px] font-bold text-red-600 hover:text-red-800 disabled:opacity-50 transition-colors"
              >
                {deleting ? '…' : 'Yes'}
              </button>
              <span className="text-red-200">|</span>
              <button
                onClick={() => setConfirming(false)}
                className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score }) {
  const color = score >= 80 ? '#0D9488' : score >= 60 ? '#F59E0B' : '#EF4444';
  const bg = score >= 80 ? '#0D948812' : score >= 60 ? '#F59E0B12' : '#EF444412';
  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
        style={{ background: bg, color, border: `1.5px solid ${color}30` }}
      >
        {score != null ? Math.round(score) : '—'}
      </div>
      <span className="text-[10px] text-gray-400">match %</span>
    </div>
  );
}

function CustomCard({ custom }) {
  const jobTitle = custom.job_description_details?.title || 'Target Role';
  const company = custom.job_description_details?.company || '';
  const score = custom.match_score;
  const date = new Date(custom.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const barColor = score >= 80 ? '#0D9488' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-start gap-4">
        <ScoreBadge score={score} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{jobTitle}</h3>
              {company && (
                <p className="text-xs text-gray-400 mt-0.5">
                  <span className="text-gray-300 mr-1">@</span>{company}
                </p>
              )}
            </div>
          </div>

          {score != null && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">ATS Match</span>
                <span className="text-[10px] font-semibold" style={{ color: barColor }}>{score.toFixed(1)}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min(score, 100)}%`, background: barColor }}
                />
              </div>
            </div>
          )}

          <p className="text-[10px] text-gray-400 mt-3">Customized {date}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ type }) {
  const isDefault = type === 'default';
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: '#0D948810' }}
      >
        {isDefault ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
            <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
          </svg>
        )}
      </div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        {isDefault ? 'No resumes yet' : 'No customizations yet'}
      </h3>
      <p className="text-sm text-gray-400 mb-5" style={{ maxWidth: '280px' }}>
        {isDefault
          ? 'Build your master CV in the editor and save it here to get started.'
          : 'Use the job customizer in the builder to create ATS-optimized versions of your CV.'}
      </p>
      <Link
        href="/builder"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px"
        style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 10px rgba(13,148,136,0.25)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Open Builder
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('default');
  const [resumes, setResumes] = useState([]);
  const [customResumes, setCustomResumes] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      (async () => {
        setDataLoading(true);
        try {
          const [r, c] = await Promise.all([fetchResumes(), fetchCustomizedResumes()]);
          setResumes(r);
          setCustomResumes(c);
        } catch {
          /* silently fail — data stays empty */
        } finally {
          setDataLoading(false);
        }
      })();
    }
  }, [user]);

  const handleDeleteResume = (id) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="text-sm font-medium">Loading…</span>
        </div>
      </div>
    );
  }

  const avgScore = customResumes.length
    ? customResumes.reduce((sum, c) => sum + (c.match_score || 0), 0) / customResumes.length
    : null;

  const displayName = user.first_name || user.username;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
              {getGreeting()}
            </p>
            <h1 className="text-3xl font-bold text-gray-900" style={{ letterSpacing: '-0.03em' }}>
              {displayName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-px shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 2px 10px rgba(13,148,136,0.25)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Resume
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Saved resumes"
            value={resumes.length}
            accent="#0D9488"
            icon={(c) => (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            )}
          />
          <StatCard
            label="AI customizations"
            value={customResumes.length}
            accent="#6366F1"
            icon={(c) => (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
                <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
              </svg>
            )}
          />
          <StatCard
            label="Avg. match score"
            value={avgScore != null ? `${avgScore.toFixed(1)}%` : '—'}
            sub={customResumes.length > 0 ? `across ${customResumes.length} application${customResumes.length !== 1 ? 's' : ''}` : 'No applications yet'}
            accent="#F59E0B"
            icon={(c) => (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          />
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200 pb-0">
          {[
            { id: 'default', label: 'Master CVs', count: resumes.length },
            { id: 'custom', label: 'AI Applications', count: customResumes.length },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                color: activeTab === id ? '#0D9488' : '#6B7280',
                borderBottom: activeTab === id ? '2px solid #0D9488' : '2px solid transparent',
                marginBottom: '-1px',
                background: 'none',
              }}
            >
              {label}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: activeTab === id ? '#0D948818' : '#F3F4F6',
                  color: activeTab === id ? '#0D9488' : '#9CA3AF',
                }}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {dataLoading ? (
          <div className="flex items-center gap-3 py-12 text-gray-400">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="text-sm">Loading your data…</span>
          </div>
        ) : activeTab === 'default' ? (
          resumes.length === 0 ? (
            <EmptyState type="default" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />
              ))}
            </div>
          )
        ) : (
          customResumes.length === 0 ? (
            <EmptyState type="custom" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customResumes.map((custom) => (
                <CustomCard key={custom.id} custom={custom} />
              ))}
            </div>
          )
        )}

      </div>
    </div>
  );
}
